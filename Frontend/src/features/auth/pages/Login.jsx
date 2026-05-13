import React, { useState } from 'react'
import '../auth.form.scss';
import { useNavigate,Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const Login = () => {

    const { loading, actionLoading, handleLogin } = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fieldErrors, setFieldErrors] = useState({})
    const [formError, setFormError] = useState("")

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nextFieldErrors = {}
        const bothMissing = !email.trim() && !password.trim()

        if(bothMissing){
            setFieldErrors({})
            setFormError('Enter both email and password to login')
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
            setFormError('')
            return
        }

        setFormError("")

        try {
            await handleLogin({email,password})
            navigate('/dashboard')
        } catch (err) {
            setFormError('Enter correct email and password')
        }
    }

    const submitError = formError



    if(loading){
        return (<main><h1>Loading.........</h1></main>)
    }


  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                {submitError && <p className="form-error">{submitError}</p>}
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
