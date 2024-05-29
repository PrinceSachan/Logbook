import React from 'react'

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
  return (
    <div className='p-4 border-b border-slate-200 pb-2'>
        <div className='flex'>
            <Avatar name={authorName} /> 
            <div className='font-normal pl-2 text-sm flex justify-center flex-col'>
                {authorName}
            </div>
            <div className='flex justify-center flex-col pl-2 flex justify-center flex-col'>
                <Circle />
            </div>
            <div className='font-extralight pl-2 text-slate-500 text-sm flex justify-center flex-col'>
                {publishedDate}
            </div>
        </div>
        <div className='text-xl font-bold pt-2'>
            {title}
        </div>
        <div className='text-md font-light text-slate-700'>
            {
                content.length > 100 ? 
                `${content.substring(0, 99)}...` : content
            }
        </div>
        <div className='text-slate-500 text-sm font-thin pt-2'>
            {`${Math.ceil(content.length/100)} min read`}
        </div>
    </div>
  )
}

function Circle() {
    return (
        <div className='w-1 h-1 rounded-full bg-slate-500'>

        </div>
    )
}

function Avatar({ name }: { name: string }){
    return (
        <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="text-xs text-gray-600 dark:text-gray-300">{name[0]}</span>
        </div>

    )
}

export default BlogCard