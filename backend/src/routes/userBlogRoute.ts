import { Hono } from "hono";
import { HonoTypes } from "../honotype";
import { verify } from "hono/jwt";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from "@prisma/extension-accelerate";

export const userBlogRoute = new Hono<HonoTypes>()

// middleware for user blog route
userBlogRoute.use(async(c, next) => {
    try{
        // get authorization header
        const authHeader = c.req.header('Authorization')
        if(!authHeader){
            c.status(401)
            return c.json({
                error: "Unauthorized"
            })
        }

        // split the token
        const token = authHeader.split(" ")[1]
        const payload = await verify(token, c.env.JWT_SECRET)
        if(payload){
            c.set('userId', payload.id)
            await next()
        } else {
            c.status(401)
            return c.json({
                error: 'Unauthorized'
            })
        }
    }
    catch(err) {
        c.status(401)
        return c.json({
            error: `Unauthorized ${err}`
        })
    }
})

// get all the user blog route
userBlogRoute.get('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const authorId = c.get('userId')
    try{
        const userBlog = await prisma.post.findMany({
            where: {
                authorId: authorId
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
            userBlog
        })
    }
    catch(err) {
        c.status(403)
        return c.json({
            message: `Error while fetching user blog ${err}`
        })
    }
})
