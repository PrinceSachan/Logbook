import { Hono } from 'hono'
import  Bindings from 'hono/types'
import { userRoutes } from './routes/userRoute';
import { blogPrivateRouter, blogPublicRouter } from './routes/blogRoute';
import { cors } from 'hono/cors';

type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/*', cors())
app.route('/api/v1/user', userRoutes);
app.route('/api/v1/blog/private', blogPrivateRouter);
app.route('/api/v1/blog/public', blogPublicRouter);

export default app
