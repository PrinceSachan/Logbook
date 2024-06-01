// imports
import { useState } from 'react'
import { SignupInput } from '@princerudi/common'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

// App imports
import Quote from '../components/Quote'
import AuthHeader from '../components/AuthHeader'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { BACKEND_URL } from '../config'

const Signup = () => {
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate();

    async function signupRequest() {
        await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs)
        .then(response => {
            const token = response.data.token
            // alert(`User has created ${JSON.stringify(token)}`)
            localStorage.setItem('token', token)
        })
        .catch(error => alert(JSON.stringify(error.response.data)))
        navigate('/blogs')
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
                                setPostInputs({
                                    ...postInputs,
                                    name: e.target.value
                                })
                            }} />
                            <InputBox type="text" label='Email' placeHolderName='prins@gmail.com' onChange={(e) => {
                                setPostInputs({
                                    ...postInputs,
                                    email: e.target.value
                                })
                            }} />
                            <InputBox type="password" label='Password' placeHolderName='123456' onChange={(e) => {
                                setPostInputs({
                                    ...postInputs,
                                    password: e.target.value
                                })
                            }} />
                            <Button children={"Sign up"} type='submit' onClick={signupRequest} className={'w-full hover:bg-gray-800 bg-gray-900 py-2.5 mt-4 mb-2 rounded-md'} />
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