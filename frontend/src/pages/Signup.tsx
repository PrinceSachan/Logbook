// imports
import { useState } from 'react'

// App imports
import Quote from '../components/Quote'
import AuthHeader from '../components/AuthHeader'
import { SignupInput } from '@princerudi/common'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import axios from 'axios'
import { BACKEND_URL } from '../config'

const Signup = () => {
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })

    async function signupRequest() {
        await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs)
        .then(response => alert(`User has created ${JSON.stringify(response.data)}`))
        .catch(error => alert(JSON.stringify(error.response.data)))
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
                            <Button label={"Sign up"} type='submit' onClick={signupRequest} />
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