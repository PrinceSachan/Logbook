//imports
import { enIN } from 'date-fns/locale'
import { format } from 'date-fns'

// app imports
import { Avatar } from './BlogCard'
import { Blogstype } from '../hooks/blog'

const Fullblog = ({ blog }: { blog: Blogstype}) => {
  return (
    <div>
      <div className='flex justify-center'>
        <div className='grid grid-cols-12 px-10 w-full max-w-screen-xl pt-10'>
            <div className='col-span-8'>
              <div className='text-4xl font-extrabold'>
                {blog.title}
              </div>
              <div className='font-normal text-slate-500 text-md pt-2'>
                Posted on {format((blog.createdAt), "MMMM dd, yyyy", { locale: enIN })}
              </div>
              <div className='pt-4' dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
            <div className='col-span-4'>
              <div className='text-slate-600 text-lg'>
                Author
              </div>
              <div className='flex w-full'>
                <div className='pr-4 flex flex-col justify-center'>
                  <Avatar size='big' name={blog.author.name} />
                </div>
                <div>
                  <div className='text-xl font-bold'>
                    {blog.author.name}
                  </div>
                  <div className='pt-2 text-slate-500'>
                    Random catch pharse about the author's ability to grab user's attention
                  </div>
                </div>
                </div>
              </div>
        </div>
      </div>
      </div>
  )
}

export default Fullblog