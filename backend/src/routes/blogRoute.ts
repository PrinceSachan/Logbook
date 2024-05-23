import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
import {  createBlogInput, updateBlogInput } from "@princerudi/common";

type HonoTypes = {
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string; 
    },
    Variables: {
        userId: string;
    }
}

// blog router
export const blogRouter = new Hono<HonoTypes>();

// middleware
blogRouter.use(async(c, next) => {
    try {
        // check for user authorization
        const authHeader = c.req.header('Authorization')
        if(!authHeader){
            c.status(401)
            return c.json({
                error: "Unauthorized"
            })
        }

        // split Bearer token
        const token = authHeader.split(" ")[1]
        const payload = await verify(token, c.env.JWT_SECRET)
        if(payload){
            c.set("userId", payload.id)
            await next()
        } else {
            c.status(401)
            return c.json({
                error: "Unauthorized"
            })
        }
    }
    catch(err) {
        console.error("Error verifying JWT token:", err)
        c.status(401)
        return c.json({
            error: "Unauthorized"
        })
    }
})

// route for create new blog
blogRouter.post('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const authorId = c.get("userId")
    try {
        const body = await c.req.json()

        // check for blog input type
        const { success } = createBlogInput.safeParse(body)
        if(!success) {
            c.status(403)
            return c.json({
                message: "Invalied input credentials"
            })
        }

        // create new blog
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
            message: err
        })
    }
})

// route for update blog with specific id
blogRouter.put('/:id', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const userId = c.get('userId')
    try {
        const id = c.req.param("id")
        const body = await c.req.json()

        // check update blog input
        const { success } = updateBlogInput.safeParse(body)
        if(!success){
            c.status(403)
            return c.json({
                message: "Invalied input credentials"
            })
        }

        // update blog
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
            message: err
        })
    }
})

//Todo: add pagination
blogRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
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
            message: 'Error while Fetching blogs.'
        })
    }
})

blogRouter.get('/:id', async(c) => {
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
            message: "Error while fetching blog with id"
        })
    }
})
