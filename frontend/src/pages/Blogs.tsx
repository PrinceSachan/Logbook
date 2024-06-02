import BlogCard from '../components/BlogCard'
import { useBlogs } from '../hooks/blog'
import { format } from 'date-fns'
import { enIN } from 'date-fns/locale'

const Blogs = () => {
    const { loading, blogs  } = useBlogs()

    if(loading) {
        return (
            <div>
                loading...
            </div>
        )
    }
  return (
    <div>
        <div className='flex justify-center'>                                         
            <div>
                {blogs?.map(blog => 
                <div key={blog.id}>
                    <BlogCard 
                        id={blog.id}
                        authorName ={blog.author.name}
                        title = {blog.title}
                        content= {blog.content}
                        publishedDate = {format((blog.createdAt), "MMMM dd yyyy", { locale: enIN })}
                    />
                </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default Blogs