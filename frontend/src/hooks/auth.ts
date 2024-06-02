import { SigninInput, SignupInput } from "@princerudi/common";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react"
import { BACKEND_URL } from "../config";

export type AuthReturnType = {
    isAuthenticated: boolean;
}

export type SignupReturns = {
    loading: boolean;
    signUpInput: SignupInput;
    setSignUpInput: Dispatch<SetStateAction<SignupInput>>
    signupRequest: () => Promise<void> 
}

export type SigninReturns = {
    loading: boolean;
    signinInput: SigninInput;
    setSigninInput: Dispatch<SetStateAction<SigninInput>>
    signinRequest: () => Promise<void> 
}

export const useAuth = (): AuthReturnType  => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    return { isAuthenticated }
}

export const useSignup = (): SignupReturns => {
    const [signUpInput, setSignUpInput] = useState<SignupInput>({
        email: '',
        password: '',
        name: '',
    })
    const [loading, setLoading] = useState<boolean>(false)

    const signupRequest = async() => {
        setLoading(true)
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, signUpInput)
            const token = response.data.token
            localStorage.setItem('token', token)
            const name = response.data.name
            localStorage.setItem('Username', name)
            const id = response.data.id
            localStorage.setItem('UserId', id)
        }
        catch(err) {
            console.log('Error while signinup: ', err)
        }
        finally {
            setLoading(false)
        }
    }

    return {
        signupRequest,
        loading,
        signUpInput,
        setSignUpInput
    }
}

export const useSignin = (): SigninReturns => {
    const [signinInput, setSigninInput] = useState<SigninInput>({
        email: '',
        password: '',
    })
    const [loading, setLoading] = useState<boolean>(false)

    const signinRequest = async() => {
        setLoading(true)
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, signinInput)
            const token = response.data.token
            localStorage.setItem('token', token)
            const name = response.data.name
            localStorage.setItem('Username', name)
            const id = response.data.id
            localStorage.setItem('UserId', id)
        }
        catch(err) {
            console.log('Error while signinup: ', err)
        }
        finally {
            setLoading(false)
        }
    }

    return {
        loading,
        signinInput,
        setSigninInput,
        signinRequest,
    }
}