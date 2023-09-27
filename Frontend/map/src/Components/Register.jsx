import { useRef, useState } from 'react';
import './register.css';
import axios from "axios"
import { MdOutlineCancel } from 'react-icons/md';

export default function Register({setShowRegister}) {

    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            passwordRef: passwordRef.current.value
        }
        try {
            await axios.post("https://pinpoint.onrender.com/user/register", newUser)
            setSuccess(true);
            setError(false);
        } catch (err) {
            setError(true);
        }
    }
    return (
        <div className='registerContainer'>
            <div className='logoregister'>PinPoint</div>
            <form onSubmit={handleOnSubmit}>
                <input type='text' placeholder='Username' ref={nameRef}></input>
                <input type='email' placeholder='Email' ref={emailRef}></input>
                <input type='password' placeholder='Password' ref={passwordRef}></input>
                <button className='registerBtn'>Register</button>

                {success &&
                    <span className='success'>Successfull!! You can Login now.</span>
                }
                {error &&
                    <span className='failure'>Something went wrong!</span>
                }
            </form>
            <MdOutlineCancel className='registerCancel' onClick={()=>setShowRegister(false)}/>
        </div>
    )
}
