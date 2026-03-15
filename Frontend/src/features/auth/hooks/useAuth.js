import { useContext, useEffect } from "react";
import { AuthContext } from "../authContext.js";
import { login,register,logout,getMe } from "../services/auth.api";

export const useAuth = () => {

    const context = useContext(AuthContext)
    const {user,setUser,loading,setLoading} = context

    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try{
            const data = await login({ email, password })
            setUser(data.user)
        } catch(err){
            console.log(err)
        } finally{
            setLoading(false)
        }

    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try{
            const data = await register({ username, email, password })
            setUser(data.user) //user ka data jo backend dega
        } catch(err){
            console.log(err)
        } finally{
            setLoading(false)
        }
    }

    const handleLogout = async () =>{
        setLoading(true)
        try{
            const data = await logout()
            setUser(null)
        } catch(err){
            console.log(err)
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {

        const getAndSetUser = async()=>{
            try {
                const data = await getMe()
                if (data && data.user) {
                    setUser(data.user)
                } else {
                    setUser(null)
                }
            } catch(err){
                console.log("Error fetching user:", err)
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        getAndSetUser()

    }, [])

    return { user, loading, handleRegister, handleLogin, handleLogout }

}