import React from 'react'
import BlogCard from '../components/BlogCard'

const Blogs = () => {
  return (
    <div className='flex justify-center'>
        <div className='max-w-xl'>
            <BlogCard 
                authorName = {"Prince"}
                title = {'How an ugly single page website makes $5000 a month without affiliate marketing'}
                content = {`How an ugly single page website makes $5000 a month without affiliate marketing
                    How an ugly single page website makes $5000 a month without affiliate marketing`}
                publishedDate = {'2nd May 2023'}
            />
            <BlogCard 
                authorName = {"Prince"}
                title = {'How an ugly single page website makes $5000 a month without affiliate marketing'}
                content = {`How an ugly single page website makes $5000 a month without affiliate marketing
                    How an ugly single page website makes $5000 a month without affiliate marketing`}
                publishedDate = {'2nd May 2023'}
            />
            <BlogCard 
                authorName = {"Prince"}
                title = {'How an ugly single page website makes $5000 a month without affiliate marketing'}
                content = {`How an ugly single page website makes $5000 a month without affiliate marketing
                    How an ugly single page website makes $5000 a month without affiliate marketing`}
                publishedDate = {'2nd May 2023'}
            />
        </div>
    </div>
  )
}

export default Blogs