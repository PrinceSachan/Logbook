import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
  return (
    <div className='p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md'>
        <div className='grid'>
            <div className='grid grid-cols-8'>
                <div className='col-start-1'>
                    <button onClick={() => navigate('/blogs')}>All blogs</button>
                </div>
                <div className='col-start-2'>
                    <button onClick={() => navigate('/userBlogs')}>User blogs</button>
                </div>
                <div className='col-end-9'>
                    <div className='justify-items-end'>
                        sort by
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header