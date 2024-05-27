import { useState } from 'react'
import Quote from '../components/Quote'
import { SigninInput } from '@princerudi/common'
import AuthHeader from '../components/AuthHeader'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'

const Signin = () => {
  const [postInputs, setPostInputs] = useState<SigninInput>({
    email: "",
    password: ""
})
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
                        <Button label={"Sign in"} type='submit' onClick={(e) => console.log('first')} />
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