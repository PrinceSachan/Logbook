
import { Link } from 'react-router-dom';

interface BlogCardProps {
    id: number;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
  return (
    <div>

        <div>
            <Link to={`/blog/${id}`}>
                <div className='p-4 border-b border-slate-200 pb-2 w-screen max-w-screen-md cursor-pointer'>
                    <div className='flex'>
                        <Avatar name={authorName} size='small' /> 
                        <div className='font-normal pl-2 text-md flex justify-center flex-col'>
                            {authorName}
                        </div>
                        <div className='flex justify-center flex-col pl-2 flex justify-center flex-col'>
                            <Circle />
                        </div>
                        <div className='font-extralight pl-2 text-slate-500 text-sm flex justify-center flex-col'>
                            {publishedDate}
                        </div>
                    </div>
                    <div className='text-xl font-bold pt-4'>
                        {title}
                    </div>
                    <div 
                        className='text-md font-light text-slate-700 pt-2'
                        dangerouslySetInnerHTML={{__html: 
                            content.length > 150 ? 
                            `${content.substring(0, 139)}...` : content
                        }}
                    />
                    <div className='text-slate-500 text-md font-thin pt-6 pb-2'>
                        {`${Math.ceil(content.length/100)} min read`}
                    </div>
                </div>
            </Link>
        </div>
    </div>
  )
}

export function Circle() {
    return (
        <div className='w-1 h-1 rounded-full bg-slate-500'>

        </div>
    )
}

export function Avatar({ name, size = "small" }: { name: any, size?: "small" | "big" }){
    return (
        <div className={`relative inline-flex items-center justify-center ${size === 'small' ? 'w-6 h-6' : 'w-9 h-9'} overflow-hidden bg-gray-100 rounded-full bg-slate-200`}>
            <span className={`${size === 'small' ? 'text-xs' : 'text:md'} text-slate-900 font-semibold`}>{name[0]}</span>
        </div>

    )
}

export default BlogCard