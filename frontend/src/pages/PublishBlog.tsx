// Imports
import { useRef, useState } from 'react'
import JoditEditor from 'jodit-react';
import { useNavigate } from 'react-router-dom';

// app imports
import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';
import { useWriteBlog } from '../hooks';

const PublishBlog = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState("")
  const { writeBlog } = useWriteBlog() 
  const editor = useRef(null);
  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      const blogId = await writeBlog(title, content);
      navigate(`/blog/${blogId}`) //navigate to blog page
    } catch (error) {
      console.error('Error posting blog:', error);
    }
  };

    
  return (
    <div className='flex justify-center'>
      <div className='max-w-4xl'>
        <div>
          <div className='pb-4'>
            <InputBox 
              type='text' 
              label='Title' 
              placeHolderName='Title...' 
              onChange={(e) => setTitle(e.target.value)} 
            />
          </div>
          <div className='text-sm font-semibold text-left py-2'>Content</div>
          <div className='border rounded-lg '>
            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => setContent(newContent)} // Update state with HTML content
            />
          </div>
          <div>
            <Button 
              children='Publish blog' 
              type='button' 
              onClick={handleClick} 
              className={'hover:bg-gray-800 bg-gray-900 py-2.5 mt-4 mb-2 rounded-md'} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PublishBlog