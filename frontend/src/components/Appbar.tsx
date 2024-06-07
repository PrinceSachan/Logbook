import { Avatar } from './BlogCard'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './Button'
import { useAuthProvider } from '../context/AuthContext'

const Appbar = () => {
  const { isAuthenticated, setIsAuthenticated, signout }  = useAuthProvider()
  const name = localStorage.getItem('name')
  const navigate = useNavigate()


  const clickHandler = async() => {
    try{
      await signout()
      localStorage.removeItem('name')
      if(!localStorage.getItem('token')){
        setIsAuthenticated(false)
        navigate('/')
      }
    }
    catch(err) {
      console.log(err)
    }
  }

  return (
    <div className='border-b flex justify-between px-10 py-3'>
      <Link to={'/blogs'} className='flex flex-col justify-center font-semibold text-md cursor-pointer'>
        Logbook
      </Link>
      { isAuthenticated ? 
        <div className='flex'>
          <div className='flex flex-col justify-center mr-4'>
            <Avatar size='big' name={name} />
          </div>
          <div className='flex flex-col justify-center mr-2'>
            <Button 
              children='Write blog' 
              type='button' 
              onClick={() => navigate('/writeBlog')}
              className={'hover:bg-gray-800 bg-gray-900 py-2.5 rounded-md'} 
            />
          </div>
          <div className='flex flex-col justify-center'>
            <Button 
              children='Logout' 
              type='button' 
              onClick={clickHandler}
              className={'hover:bg-gray-800 bg-gray-900 py-2.5 rounded-md'} 
            />
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