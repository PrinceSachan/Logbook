// imports
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SigninInput } from '@princerudi/common'
import axios from 'axios'

// App imports
import Quote from '../components/Quote'
import AuthHeader from '../components/AuthHeader'
import { Button } from '../components/Button'
import { InputBox } from '../components/InputBox'
import { BACKEND_URL } from '../config'

// signin component
const Signin = () => {
    const [postInputs, setPostInputs] = useState<SigninInput>({
        email: "",
        password: ""
    });
    const navigate = useNavigate()

// signup request
async function signinRequest() {
  await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs)
    .then(response => {
        const token = response.data.token
        alert(`User have loggedin ${JSON.stringify(token)}`)
        localStorage.setItem('token', token)
    })
    .catch(error => alert(`Error occured: ${JSON.stringify(error.response.data)}`))
    navigate('/blogs')
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
                        <Button label={"Sign in"} type='submit' onClick={signinRequest} />
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