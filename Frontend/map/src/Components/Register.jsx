import { useRef, useState } from 'react';
import './register.css';
import axios from "axios"
import { MdOutlineCancel, MdPersonAdd, MdPerson, MdEmail, MdLock } from 'react-icons/md';

export default function Register({setShowRegister}) {

    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        try {
            await axios.post(`${process.env.REACT_APP_URL}/user/register`, newUser);
            setSuccess(true);
            setError(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='register-overlay'>
            <div className='register-container'>
                <button 
                    className='close-button' 
                    onClick={() => setShowRegister(false)}
                    aria-label="Close register"
                >
                    <MdOutlineCancel />
                </button>

                <div className='register-header'>
                    <div className='logo-container'>
                        <MdPersonAdd className='logo-icon' />
                        <h1 className='logo-text'>PinPoint</h1>
                    </div>
                    <p className='register-subtitle'>Create your account to start exploring.</p>
                </div>

                <form onSubmit={handleOnSubmit} className='register-form'>
                    <div className='input-group'>
                        <div className='input-wrapper'>
                            <MdPerson className='input-icon' />
                            <input 
                                type='text' 
                                placeholder='Username' 
                                ref={nameRef}
                                required
                                className='register-input'
                            />
                        </div>
                    </div>

                    <div className='input-group'>
                        <div className='input-wrapper'>
                            <MdEmail className='input-icon' />
                            <input 
                                type='email' 
                                placeholder='Email' 
                                ref={emailRef}
                                required
                                className='register-input'
                            />
                        </div>
                    </div>

                    <div className='input-group'>
                        <div className='input-wrapper'>
                            <MdLock className='input-icon' />
                            <input 
                                type='password' 
                                placeholder='Password' 
                                ref={passwordRef}
                                required
                                className='register-input'
                            />
                        </div>
                    </div>

                    {success && (
                        <div className='success-message'>
                            <span>Account created successfully! You can now sign in.</span>
                        </div>
                    )}

                    {error && (
                        <div className='error-message'>
                            <span>{error}</span>
                        </div>
                    )}

                    <button 
                        type='submit' 
                        className={`register-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <div className='spinner'></div>
                                Creating Account...
                            </>
                        ) : (
                            <>
                                <MdPersonAdd />
                                Create Account
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}
