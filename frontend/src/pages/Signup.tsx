// imports
import { useNavigate } from 'react-router-dom'
// App imports
import Quote from '../components/Quote'
import AuthHeader from '../components/AuthHeader'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { useAuthProvider } from '../context/AuthContext'

const Signup = () => {
   const { 
        signupRequest, 
        signUpInput, 
        setSignUpInput,
        loading,
        setIsAuthenticated
    } = useAuthProvider()
    const navigate = useNavigate();

    const clickHandler = async() => {
        try{
            await signupRequest()
            if(localStorage.getItem('token')){
                setIsAuthenticated(true)
                navigate(`/blogs`)
            }
        }
        catch(err) {
            console.log(err)
        }
    }

  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2'>
            <div className='h-screen flex flex-col'>
                <div className='flex justify-center m-auto'>
                    <div>
                        <div className='px-10'>
                            <AuthHeader type='signup' />
                        </div>
                        <div className='pt-4'>
                            <InputBox type="text" label='Name' placeHolderName='Prince Sachan' onChange={(e) => {
                                setSignUpInput({
                                    ...signUpInput,
                                    name: e.target.value
                                })
                            }} />
                            <InputBox type="text" label='Email' placeHolderName='prins@gmail.com' onChange={(e) => {
                                setSignUpInput({
                                    ...signUpInput,
                                    email: e.target.value
                                })
                            }} />
                            <InputBox type="password" label='Password' placeHolderName='123456' onChange={(e) => {
                                setSignUpInput({
                                    ...signUpInput,
                                    password: e.target.value
                                })
                            }} />
                            <Button 
                                children={loading ? 'Signing up...': 'Sign up'} 
                                type='submit' onClick={clickHandler} 
                                className={'w-full hover:bg-gray-800 bg-gray-900 py-2.5 mt-4 mb-2 rounded-md'} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='hidden md:block'>
                <Quote />
            </div>
        </div>
    </div>
  )
}

export default Signup