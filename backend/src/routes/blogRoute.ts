import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";

type HonoTypes = {
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string; 
    },
    Variables: {
        userId: string;
    }
}

// private blog route for specific user
export const blogPrivateRouter = new Hono<HonoTypes>();

blogPrivateRouter.use('/*', async(c, next) => {
    const authHeader = c.req.header('Authorization') || "";
    try {
        // const payload = authHeader.split(' ')[1]
        const user = await verify(authHeader, c.env.JWT_SECRET)
        if(user){
            c.set("userId", user.id)
            await next()
        } else {
            c.status(403)
            return c.json({
                message: 'You are not logged In'
            })
        }
    }
    catch(err) {
        c.status(403)
        return c.json({
            message: 'You are not logged In'
        })
    }
})

blogPrivateRouter.post('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const authorId = c.get("userId")
    const body = await c.req.json()
    try {
        const createBlog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId
            }
        })

        return c.json({
            id: createBlog.id,
            createBlog
        })
    }
    catch(err) {
        c.status(403)
        return c.json({
            message: 'Error while creating blog'
        })
    }
})

blogPrivateRouter.put('/:id', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const userId = c.get('userId')
    const id = c.req.param("id")
    const body = await c.req.json()
    try {
        const updateBlog = await prisma.post.update({
            where: {
                id: Number(id),
                authorId: userId
            },
            data: {
                title: body.title,
                content: body.content
            }

        })
        return c.json({
            id: updateBlog.id
        })
    }
    catch(err) {
        c.status(403)
        return c.json({
            message: 'Error while creating blog'
        })
    }
})

// public blog route for all users
export const blogPublicRouter = new Hono<HonoTypes>()

//Todo: add pagination

blogPublicRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const body = await c.req.json()
    try {
        const bulkBlog = await prisma.post.findMany({
            // take: 5,
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                },
                createdAt: true
            }
        })

        return c.json({
            bulkBlog
        })
    }
    catch(err) {
        c.status(403)
        return c.json({
            message: 'Error while creating blog'
        })
    }
})

blogPublicRouter.get('/:id', async(c) => {
    const id = c.req.param("id")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                },
                createdAt: true
            }
        })
    
        return c.json({
            blog
        });
    }
    catch(err) {
        c.status(411)
        return c.json({
            message: 'Error while fetching blog'
        })
    }
})
