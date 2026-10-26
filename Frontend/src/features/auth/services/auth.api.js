import axios from 'axios';

const api = axios.create({
    baseURL: '/api/auth',
    withCredentials: true
})

export async function register({username, email, password}){
    
    try{
        const response = await api.post('/register', {
        username, email, password
        })

        return response.data

    } catch(err){
        throw new Error(err?.response?.data?.message || err?.message || 'Registration failed')
    }
}

export async function login({email, password}) {

    try{

        const response = await api.post('/login',{
            email, password
        })
    
        return response.data

    } catch(err){
        throw new Error(err?.response?.data?.message || err?.message || 'Login failed')
    }
}

export async function logout(){
    try{

        const response = await api.get('/logout')

        return response.data

    } catch(err){
        throw new Error(err?.response?.data?.message || err?.message || 'Logout failed')
    }
}

export async function getMe() {
    try{
        const response = await api.get('/get-me')

        return response.data

    } catch(err){
        throw new Error(err?.response?.data?.message || err?.message || 'Unable to fetch user')
    }
}