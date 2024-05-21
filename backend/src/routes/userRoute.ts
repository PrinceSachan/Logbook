import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'

type HonoTypes = {
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string; 
    }
}

export const userRoutes = new Hono<HonoTypes>()

userRoutes.post('/signup', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()
    try {
      const createUser = await prisma.user.create({
        data: {
          email: body.email,
          name: body.name,
          password: body.password,
        }
      })
  
      if(!createUser){
        c.status(403);
        return c.json({ message: 'Error while signingup, wrong credentials'})
      }
  
      const token = await sign({ id: createUser.id }, c.env.JWT_SECRET)
  
      return c.json({ jwt: token });
    }
    catch(err) {
      c.status(403);
      return c.json({ message: 'Error while signingup'})
    }
})
  
userRoutes.post('/api/v1/user/signin', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()
    try{
      const isUser = await prisma.user.findUnique({
        where: {
          email: body.email
        }
      })
  
      if (!isUser) {
        c.status(403);
        return c.json({ message: 'Error while Logging in'})
      }
  
      const token = await sign( {id: isUser.id }, c.env.JWT_SECRET )
  
      return c.json({ jwt: token })
    }
    catch (err) {
      c.status(403);
      return c.json({ message: 'Error while logging in'})
    }
})