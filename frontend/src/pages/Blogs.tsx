import Appbar from '../components/Appbar'
import BlogCard from '../components/BlogCard'
import BlogSkeleton from '../components/BlogSkeleton'
import Header from '../components/Header'
import { useBlogs } from '../hooks/blog'
import { format } from 'date-fns'
import { enIN } from 'date-fns/locale'

const Blogs = () => {
    const { loading, blogs  } = useBlogs()

    if(loading) {
        return (
            <div>
                <div className='flex justify-center'>
                    <div >
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                    </div>
                </div>
            </div>
        )
    }
  return (
    <div>
        <div className='flex justify-center'>
            <Header />
        </div>
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