// Imports
import './init'
import { useState } from 'react'
import{ Editor }from 'react-draft-wysiwyg';
import {EditorState, RichUtils, getDefaultKeyBinding, convertToRaw} from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// app imports
import { InputBox } from './InputBox';
import { Button } from './Button';
import axios from 'axios';
import { BACKEND_URL } from '../config';

const DraftInput = () => {
  const [title, setTitle] = useState<String>()
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty()
  );

  const onHandleKeyBindings = (e: any) => {
    if(e.keyCode === 9) {
      setEditorState(RichUtils.onTab(e, editorState, 4));
    } else {
      return getDefaultKeyBinding(e)
    }
  }

  const clickHandle = () => {
    console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent ())))
    // axios.post(`${BACKEND_URL}/api/v1/blog`, {
    //   title: title,
    //   content: JSON.stringify(editorState)
    // }, {
    //   headers: {
    //     Authorization: "Bearer " + localStorage.getItem('token')
    //   }
    // })
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
            <Editor 
              editorState={editorState} 
              toolbarClassName='toolbarclassName'
              wrapperClassName="wrapperclassName"
              editorClassName="editorclassName"
              onEditorStateChange={setEditorState} 
              onTab={onHandleKeyBindings}
            />
          </div>
          <div>
            <Button children='Publish blog' type='button' onClick={clickHandle} className={'hover:bg-gray-800 bg-gray-900 py-2.5 mt-4 mb-2 rounded-md'} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DraftInput