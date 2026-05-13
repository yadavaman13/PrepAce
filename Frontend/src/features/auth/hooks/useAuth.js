import { useContext } from "react";
import { AuthContext } from "../authContext.js";
import { login,register,logout } from "../services/auth.api";

export const useAuth = () => {

    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }

    const {user,setUser,loading,setLoading,actionLoading,setActionLoading,error,setError} = context

    const handleLogin = async ({ email, password }) => {
        setActionLoading(true)
        setError(null)
        try{
            const data = await login({ email, password })
            if(data?.user){
                setUser(data.user)
            }
            return data
        } catch(err){
            setError(err?.message || "Login failed")
            throw err
        } finally{
            setActionLoading(false)
        }

    }

    const handleRegister = async ({ username, email, password }) => {
        setActionLoading(true)
        setError(null)
        try{
            const data = await register({ username, email, password })
            if(data?.user){
                setUser(data.user)
            }
            return data
        } catch(err){
            setError(err?.message || "Registration failed")
            throw err
        } finally{
            setActionLoading(false)
        }
    }

    const handleLogout = async () =>{
        setActionLoading(true)
        try{
            await logout()
            setUser(null)
        } catch(err){
            throw err
        } finally{
            setActionLoading(false)
        }
    }

    return { user, loading, actionLoading, error, handleRegister, handleLogin, handleLogout, setError }

}