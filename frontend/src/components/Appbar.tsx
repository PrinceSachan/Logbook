import React from 'react'
import { Avatar } from './BlogCard'
import { Link } from 'react-router-dom'

const Appbar = () => {
  return (
    <div className='border-b flex justify-between px-10 py-4'>
      <Link to={'/blogs'} className='flex flex-col justify-center font-semibold cursor-pointer'>
        Logbook
      </Link>
        <div>
            <Avatar size='big' name={'Prince'} />
        </div>
    </div>
  )
}

export default Appbar