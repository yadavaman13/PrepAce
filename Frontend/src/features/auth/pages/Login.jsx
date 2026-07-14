import React, { useState } from 'react'
import '../auth.form.scss';
import { useNavigate,Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const Login = () => {

    const { loading, actionLoading, handleLogin } = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fieldErrors, setFieldErrors] = useState({})
    const [toastMessage, setToastMessage] = useState("")

    const navigate = useNavigate();

    const showToast = (message) => {
        setToastMessage(message)
        window.clearTimeout(showToast.timeoutId)
        showToast.timeoutId = window.setTimeout(() => {
            setToastMessage("")
        }, 3000)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nextFieldErrors = {}
        const bothMissing = !email.trim() && !password.trim()

        if(bothMissing){
            setFieldErrors({})
            showToast('Enter both email and password to login')
            return
        }

        if(!email.trim()){
            nextFieldErrors.email = 'Please enter your email'
        }

        if(!password.trim()){
            nextFieldErrors.password = 'Please enter your password'
        }

        setFieldErrors(nextFieldErrors)

        if(Object.keys(nextFieldErrors).length > 0){
            const firstError = Object.values(nextFieldErrors)[0]
            showToast(firstError)
            return
        }

        try {
            await handleLogin({email,password})
            navigate('/dashboard')
        } catch (err) {
            showToast(err.message || 'Login failed')
        }
    }



    if(loading){
        return (<main><h1>Loading.........</h1></main>)
    }


  return (
    <main>
        {toastMessage && (
            <div className='toast-message toast-message--error'>
                <svg className='toast-message__icon' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <span>{toastMessage}</span>
            </div>
        )}

        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
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
                    {actionLoading ? 'Logging in...' : 'Login'}
                </button>

            </form>

            <p>Don't have an account? <Link to={'/register'} >Register</Link> </p>
        </div>
    </main>
  )
}

export default Login
