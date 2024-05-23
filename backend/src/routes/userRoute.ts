import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signinInput, signupInput } from "@princerudi/common"

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
    try {
      const body = await c.req.json()
      // check for signup input type
      const { success } = signupInput.safeParse(body)
      if(!success) {
        c.status(411)
        return c.json({
          message: "Invalied credentials"
        })
      }

      // check for if user email is already exist
      const isUser = await prisma.user.findUnique({
        where: {
          email: body.email
        }
      })
      if(isUser){
        c.status(411)
        return c.json({
          error: 'Email is already taken, try to signup with different email.'
        })
      }

      // create new user
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
  
      // signup with jwt
      const token = await sign({ id: createUser.id }, c.env.JWT_SECRET)
      return c.json({ token: token });
    }
    catch(err) {
      c.status(403);
      return c.json({ message: err});
    }
})
  
userRoutes.post('/signin', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
      const body = await c.req.json()

      // check for signin input
      const { success } = signinInput.safeParse(body)
      if(!success){
        c.status(403)
        return c.json({
          message: 'Invalid input credentials'
        })
      }

      // check for user
      const isUser = await prisma.user.findUnique({
        where: {
          email: body.email,
          password: body.password
        }
      })
  
      if (!isUser) {
        c.status(403);
        return c.json({ message: 'User does not exist, try to signup'})
      }
      
      // signin with jwt
      const token = await sign( {id: isUser.id }, c.env.JWT_SECRET )
      return c.json({ token: token })
    }
    catch (err) {
      c.status(403);
      return c.json({ message: err})
    }
})