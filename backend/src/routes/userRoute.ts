import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signinInput, signupInput } from "@princerudi/common"
import { HonoTypes } from "../honotype";

export const userRoutes = new Hono<HonoTypes>()

// user signup router
userRoutes.post('/signup', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
      const body = await c.req.json()
      // check for signup input type
      const { success, error } = signupInput.safeParse(body)
      if(!success) {
        c.status(411)
        return c.json({
          message: error.formErrors.fieldErrors
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
          error: 'Email is already taken, try to signin or signup with different email.'
        })
      }

      const password = body.password;
      if(password.length !== 6){
        c.status(411)
        return c.json({
          error: 'Password should have 6 character'
        })
      }
      // create new user
      const createUser = await prisma.user.create({
        data: {
          email: body.email,
          name: body.name,
          password: password,
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
 
// user signin router
userRoutes.post('/signin', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
      const body = await c.req.json()

      // check for signin input
      const { success, error } = signinInput.safeParse(body)
      if(!success){
        c.status(403)
        return c.json({
          message: error.formErrors.fieldErrors
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