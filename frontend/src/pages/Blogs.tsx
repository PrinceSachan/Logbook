import React, { useEffect } from 'react'
import BlogCard, { Avatar } from '../components/BlogCard'
import Appbar from '../components/Appbar'
import { useBlogs } from '../hooks'

const Blogs = () => {
    const { loading, blogs, bulkblog } = useBlogs()

    useEffect(() => {
        async function fetchBlog() {
            await bulkblog()
        }
        fetchBlog()
    }, [])

    if(loading) {
        return (
            <div>
                loading...
            </div>
        )
    }
  return (
    <div>
        <Appbar />
        <div className='flex justify-center'>                                         
            <div className='max-w-xl'>
                {blogs?.map(blog => 
                <div key={blog.id}>
                    <BlogCard 
                        authorName ={blog.author.name}
                        title = {blog.title}
                        content = {blog.content}
                        publishedDate = {blog.createdAt}
                    />
                </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default Blogs