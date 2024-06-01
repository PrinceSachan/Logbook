// Imports
import { useRef, useState } from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// app imports
import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import JoditEditor from 'jodit-react';
import { useNavigate } from 'react-router-dom';

const PublishBlog = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState("")
  const editor = useRef(null);
  const navigate = useNavigate()

  const handleClick = async() => {
    try {
      axios.post(`${BACKEND_URL}/api/v1/blog`, {
        title,
        content
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      })
      .then(res => {
        navigate(`/blog/${res.data.id}`)
      })
    }
    catch(err) {
      console.log(err)
    }
  }
    
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
            {/* <Editor 
              editorState={editorState} 
              toolbarClassName='toolbarclassName'
              wrapperClassName="wrapperclassName"
              editorClassName="editorclassName"
              onEditorStateChange={onEditorStateChange} 
              onTab={onHandleKeyBindings}
            /> */}
          </div>
          <div>
            <Button children='Publish blog' type='button' onClick={handleClick} className={'hover:bg-gray-800 bg-gray-900 py-2.5 mt-4 mb-2 rounded-md'} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PublishBlog