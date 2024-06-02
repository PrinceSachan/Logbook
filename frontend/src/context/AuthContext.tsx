import { ReactNode, createContext, useContext } from "react";
import { AuthReturnType, useAuth } from "../hooks/auth";

type AuthContextProviderProp = {
    children: ReactNode
}

export const AuthContext = createContext<AuthReturnType | null>(null);

export function AuthContextProvider ({children}: AuthContextProviderProp) {
    const auth = useAuth()
    return (
        <AuthContext.Provider value={ auth }>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthProvider() {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error (
            "useAuthProvider must be used in AuthContextProvider"
        )
    }
    return context
}