// imports
import { useNavigate } from 'react-router-dom'

// App imports
import Quote from '../components/Quote'
import AuthHeader from '../components/AuthHeader'
import { Button } from '../components/Button'
import { InputBox } from '../components/InputBox'
import { useAuth, useSignin } from '../hooks/auth'

// signin component
const Signin = () => {
    const { 
        signinRequest, 
        signinInput, 
        setSigninInput,
        loading
    } = useSignin()
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()

    // signin request
    const clickHandler = async() => {
        console.log(isAuthenticated)
        try{
            await signinRequest()
            navigate(`/blogs`)
            console.log(isAuthenticated)
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
                                <AuthHeader type='signin' />
                            </div>
                            <div className='pt-4'>
                                <InputBox type="text" label='Email' placeHolderName='prins@gmail.com' onChange={(e) => {
                                    setSigninInput({
                                        ...signinInput,
                                        email: e.target.value
                                    })
                                }} />
                                <InputBox type="password" label='Password' placeHolderName='123456' onChange={(e) => {
                                    setSigninInput({
                                        ...signinInput,
                                        password: e.target.value
                                    })
                                }} />
                                <Button 
                                    children={loading ? 'Signing in...' : 'Sign in'} 
                                    type='submit' 
                                    onClick={clickHandler} 
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

export default Signin