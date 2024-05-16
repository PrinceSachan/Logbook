import { Hono } from "hono";

const app = new Hono()

app.post('/api/v1/user/signup', (c) => {
    return c.text('signup');
})

app.post('/api/v1/user/signin', (c) => {
    return c.text('signin');
})

app.post('/api/v1/blog', (c) => {
    return c.text('blog created');
})

app.put('/api/v1/blog', (c) => {
    return c.text('blog updated');
})

app.get('/api/v1/blog/:id', (c) => {
    const id = c.req.param()
    console.log(id)
    return c.text('Specific blog got.');
})

app.get('/api/v1/blog/bulk', (c) => {
    return c.text('blog created');
})

// export default app;