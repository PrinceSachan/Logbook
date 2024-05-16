import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import  Bindings  from 'hono/types'
import { sign } from 'hono/jwt'
// import app from './routes/userRoute'

type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
}

const app = new Hono<{ Bindings: Bindings }>()

app.post('/api/v1/user/signup', async(c) => {
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

    return c.json({ token, createUser });
  }
  catch(err) {
    c.status(403);
    return c.json({ message: 'Error while signingup'})
  }
})

app.post('/api/v1/user/signin', async(c) => {
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

    return c.json({ token, isUser })
  }
  catch (err) {
    c.status(403);
    return c.json({ message: 'Error while logging in'})
  }
})

app.post('/api/v1/blog', (c) => {
  return c.text('blog created');
})

app.put('/api/v1/blog', (c) => {
  return c.text('blog updated');
})

app.get('/api/v1/blog/bulk', (c) => {
  return c.text('blog created');
})
app.get('/api/v1/blog/:id', (c) => {
  const id = c.req.param()
  console.log(id)
  return c.text('Specific blog got');
})


export default app
