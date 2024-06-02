import { Avatar } from './BlogCard'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './Button'
import { useAuthProvider } from '../context/AuthContext'

const Appbar = () => {
  const { isAuthenticated }  = useAuthProvider()
  const userName = localStorage.getItem('Username')
  const navigate = useNavigate()

  return (
    <div className='border-b flex justify-between px-10 py-4'>
      <Link to={'/blogs'} className='flex flex-col justify-center font-semibold cursor-pointer'>
        Logbook
      </Link>
      { isAuthenticated ? 
        <div className='flex'>
          <div className='flex flex-col justify-center'>
            <Button 
              children='Write Blog' 
              type='button' 
              onClick={() => navigate('/writeBlog')}
              className={'rounded-full bg-green-700 hover:bg-green-800 py-2 mr-4'} 
            />
          </div>
          <div>
            <Avatar size='big' name={userName} />
          </div>
        </div>
      :         
        <div className='flex'>
          <div className='flex flex-col justify-center'>
            <Button 
              children='Get started' 
              type='button' 
              onClick={() => navigate('/signin')}
              className={'rounded-full bg-gray-900 py-2'} 
            />
          </div>
        </div>
      }
    </div>
  )
}

export default Appbar