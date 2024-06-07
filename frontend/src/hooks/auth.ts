//imports
import { SigninInput, SignupInput } from "@princerudi/common";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react"

// app imports
import { BACKEND_URL } from "../config";

export type AuthReturnType = {
    loading: boolean;
    isAuthenticated: boolean;
    signUpInput: SignupInput;
    signinInput: SigninInput;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>
    setSignUpInput: Dispatch<SetStateAction<SignupInput>>
    setSigninInput: Dispatch<SetStateAction<SigninInput>>
    signupRequest: () => Promise<void> 
    signinRequest: () => Promise<void> 
    signout: () => Promise<void>
}

export const useAuth = (): AuthReturnType  => {
    // check if user logged in or not
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = localStorage.getItem('token')
        return token !== null
    })

    // signup request payload
    const [signUpInput, setSignUpInput] = useState<SignupInput>({
        email: '',
        password: '',
        name: '',
    })

    // signin request payload
    const [signinInput, setSigninInput] = useState<SigninInput>({
        email: '',
        password: '',
    })

    //for request loading state
    const [loading, setLoading] = useState<boolean>(false)

    //signup request api
    const signupRequest = async() => {
        setLoading(true)
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, signUpInput)
            const token = response.data.token
            localStorage.setItem('token', token)
            localStorage.setItem('name', response.data.name)
        }
        catch(err) {
            console.log('Error while signinup: ', err)
        }
        finally {
            setLoading(false)
        }
    }

    //signin request api
    const signinRequest = async() => {
        setLoading(true)
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, signinInput)
            const token = response.data.token
            localStorage.setItem('token', token)
            localStorage.setItem('name', response.data.name)
        }
        catch(err) {
            console.log('Error while signinup: ', err)
        }
        finally {
            setLoading(false)
        }
    }

    const signout = async() => {
        setLoading(true)
        try{
            await localStorage.removeItem('token')
        }
        catch(err) {
            console.log('Error while logging out: ', err)
        }
        finally{
            setLoading(false)
        }
    }

    //return all the states and functions.
    return {
        loading,
        isAuthenticated,
        setIsAuthenticated,
        signinInput,
        setSignUpInput,
        signUpInput,
        setSigninInput,
        signinRequest,
        signupRequest,
        signout
    }
}