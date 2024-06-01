import { Avatar } from './BlogCard'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './Button'

const Appbar = () => {
  const navigate = useNavigate()
  return (
    <div className='border-b flex justify-between px-10 py-4'>
      <Link to={'/blogs'} className='flex flex-col justify-center font-semibold cursor-pointer'>
        Logbook
      </Link>
        <div className='flex'>
          <div className=' flex flex-col justify-center'>
            <Button 
              children='Write Blog' 
              type='button' 
              onClick={() => navigate('/writeBlog')}
              className={'rounded-full bg-green-700 hover:bg-green-800 py-2 mr-4'} 
            />
          </div>
          <div>
            <Avatar size='big' name={'Prince'} />
          </div>
        </div>
    </div>
  )
}

export default Appbar