import { useState } from 'react'
import BlogCard from '../components/BlogCard'
import BlogSkeleton from '../components/BlogSkeleton'
import Pagination from '../components/Pagination'
import { useBlogs } from '../hooks/blog'
import { format } from 'date-fns'
import { enIN } from 'date-fns/locale'

const Blogs = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const postPerPage = 5
    const indexOfLastPost = currentPage * postPerPage
    const indexOfFirstPost = indexOfLastPost - postPerPage
    let skip = indexOfFirstPost
    let take = postPerPage
    const { loading, blogs, totalPost } = useBlogs({skip, take})
    console.log(totalPost)

    const paginate = (currentPage: number)=> {
        setCurrentPage(currentPage)
    }
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
        <div>  
            <div className='flex flex-col justify-center'>
                <div className='mx-auto'>
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
                <div>
                    <Pagination totalPost={totalPost} paginate={paginate} postPerPage={postPerPage}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Blogs