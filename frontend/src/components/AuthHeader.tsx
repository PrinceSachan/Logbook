import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { InputBox } from './InputBox'
import { SignupInput } from '@princerudi/common'
import { Button } from './Button'

const AuthHeader = ({type}: {type: "signup" | "signin"}) => {
    // const [postInputs, setPostInputs] = useState<SignupInput>({
    //     name: "",
    //     email: "",
    //     password: ""
    // })
  return (
    <div>
        <div className='text-3xl font-extrabold text-center'>
            {type === "signup" ? "Create an account" : "Sign in" }
        </div>
        <div className='text-slate-400 text-center'>
            {type === "signin" ? "Don't have an account?": "Already have an account? "}
            <Link to={type === "signin" ? "/signup" : "/signin"} className='font-bold text-green-700 pl-2 underline'>
                {type === "signin" ? "Signup" : "Signin"}
            </Link>
        </div>
    </div>
  )
}

export default AuthHeader;