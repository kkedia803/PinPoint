import { useRef, useState } from 'react';
import './login.css';
import axios from "axios"
import { MdOutlineCancel, MdLogin, MdPerson, MdLock } from 'react-icons/md';

export default function Login({setShowLogin, myStorage, setCurrentUser}) {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const nameRef = useRef();
    const passwordRef = useRef();

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const user = {
            username: nameRef.current.value,
            password: passwordRef.current.value
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_URL}/user/login`, user);
            myStorage.setItem("user", res.data.username);
            setCurrentUser(res.data.username);
            setShowLogin(false);
            setError(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid username or password');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='login-overlay'>
            <div className='login-container'>
                <button 
                    className='close-button' 
                    onClick={() => setShowLogin(false)}
                    aria-label="Close login"
                >
                    <MdOutlineCancel />
                </button>

                <div className='login-header'>
                    <div className='logo-container'>
                        <MdLogin className='logo-icon' />
                        <h1 className='logo-text'>PinPoint</h1>
                    </div>
                    <p className='login-subtitle'>Welcome back! Please sign in to your account.</p>
                </div>

                <form onSubmit={handleOnSubmit} className='login-form'>
                    <div className='input-group'>
                        <div className='input-wrapper'>
                            <MdPerson className='input-icon' />
                            <input 
                                type='text' 
                                placeholder='Username' 
                                ref={nameRef}
                                required
                                className='login-input'
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
                                className='login-input'
                            />
                        </div>
                    </div>

                    {error && (
                        <div className='error-message'>
                            <span>{error}</span>
                        </div>
                    )}

                    <button 
                        type='submit' 
                        className={`login-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <div className='spinner'></div>
                                Signing in...
                            </>
                        ) : (
                            <>
                                <MdLogin />
                                Sign In
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}
