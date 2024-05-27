// imports
import { Link } from 'react-router-dom'

const AuthHeader = ({type}: {type: "signup" | "signin"}) => {

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