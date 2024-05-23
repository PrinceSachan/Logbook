import { Hono } from 'hono'
import  Bindings from 'hono/types'
import { userRoutes } from './routes/userRoute';
import { blogRouter } from './routes/blogRoute';
import { cors } from 'hono/cors';

type HonoTypes = {
  Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string; 
  },
  Variables: {
      userId: string;
  }
}

const app = new Hono<HonoTypes>()

app.use('/*', cors())
app.route('/api/v1/user', userRoutes);
app.route('/api/v1/blog', blogRouter);
// app.route('/api/v1/blog/public', blogPublicRouter);

export default app
