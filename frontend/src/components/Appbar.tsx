import React from 'react'
import { Avatar } from './BlogCard'

const Appbar = () => {
  return (
    <div className='border-b flex justify-between px-10 py-4'>
        <div className='flex flex-col justify-center font-semibold'>
            Logbook
        </div>
        <div>
            <Avatar size='big' name={'Prince'} />
        </div>
    </div>
  )
}

export default Appbar