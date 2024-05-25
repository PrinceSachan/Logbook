import { Hono } from 'hono'
import  Bindings from 'hono/types'
import { userRoutes } from './routes/userRoute';
import { blogRouter } from './routes/blogRoute';
import { cors } from 'hono/cors';
import { HonoTypes } from "./honotype";

const app = new Hono<HonoTypes>()

app.use('/*', cors())
app.route('/api/v1/user', userRoutes);
app.route('/api/v1/blog', blogRouter);

export default app
