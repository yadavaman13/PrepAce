import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const Register = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {loading, actionLoading, handleRegister} = useAuth()
    const [fieldErrors, setFieldErrors] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nextFieldErrors = {}

        if(!username.trim()){
            nextFieldErrors.username = 'Please enter your username'
        }

        if(!email.trim()){
            nextFieldErrors.email = 'Please enter your email'
        }

        if(!password.trim()){
            nextFieldErrors.password = 'Please enter your password'
        }

        setFieldErrors(nextFieldErrors)

        if(Object.keys(nextFieldErrors).length > 0){
            return
        }

        try {
            await handleRegister({username,email,password})
            navigate('/dashboard')
        } catch (err) {
            return
        }
    }

    if(loading){
        return (<main><h1>Loading.........</h1></main>)
    }

  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor='username'>Username</label>
                    <input 
                    onChange={(e)=>{setUsername(e.target.value)}}
                    type='text' id='username' name='username' placeholder='Enter your username'
                    className={fieldErrors.username ? 'input-error' : ''} />
                    {fieldErrors.username && <span className='field-error'>{fieldErrors.username}</span>}
                </div>
                <div className="input-group">
                    <label htmlFor='email'>Email</label>
                    <input 
                    onChange={(e)=>{setEmail(e.target.value)}}
                    type='email' id='email' name='email' placeholder='Enter your email address'
                    className={fieldErrors.email ? 'input-error' : ''} />
                    {fieldErrors.email && <span className='field-error'>{fieldErrors.email}</span>}
                </div>
                <div className="input-group">
                    <label htmlFor='password'>Password</label>
                    <input 
                    onChange={(e)=>{setPassword(e.target.value)}}
                    type='password' id='password' name='password' placeholder='Enter your password'
                    className={fieldErrors.password ? 'input-error' : ''} />
                    {fieldErrors.password && <span className='field-error'>{fieldErrors.password}</span>}
                </div>

                <button className='button primary-button' disabled={actionLoading}>
                    {actionLoading ? 'Creating...' : 'Create Account'}
                </button>

            </form>

            <p>Already have an account? <Link to={'/login'} >Login</Link> </p>
        </div>
    </main>
  )
}

export default Register
