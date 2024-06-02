import { Navigate, Outlet } from "react-router-dom"
import { useAuthProvider } from "../context/AuthContext"


const ProtectedRoute = () => {
    const { isAuthenticated } = useAuthProvider()

    return (
        <div>
            {isAuthenticated ? <Outlet /> : <Navigate to='/' />}
        </div>
    )
}

export default ProtectedRoute