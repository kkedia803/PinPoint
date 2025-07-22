import { useRef, useState } from 'react';
import './login.css';
import axios from "axios"
import { MdOutlineCancel } from 'react-icons/md';

export default function Login({setShowLogin, myStorage, setCurrentUser}) {

    const [error, setError] = useState(null);

    const nameRef = useRef();
    const passwordRef = useRef();

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username: nameRef.current.value,
            passwordRef: passwordRef.current.value
        }
        try {
            const res = await axios.post(`${process.env.REACT_APP_URL}/user/login`, user);
            myStorage.setItem("user",res.data.username);
            setCurrentUser(res.data.username)
            setShowLogin(false);
            setError(false);
        } catch (err) {
            setError(true);
        }
    }
    return (
        <div className='loginContainer'>
            <div className='logologin'>PinPoint</div>
            <form onSubmit={handleOnSubmit} className='loginform'>
                <input type='text' placeholder='Username' ref={nameRef}></input>
                <input type='password' placeholder='Password' ref={passwordRef}></input>
                <button className='loginBtn'>Login</button>

                {error &&
                    <span className='failure'>Something went wrong!</span>
                }
            </form>
            <MdOutlineCancel className='registerCancel' onClick={()=>setShowLogin(false)}/>
        </div>
    )
}
