import React, { useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';


const Signup = () => {
    const [user,setUser]=useState({});
    const [error,setError]=useState('');
    const navigate=useNavigate();
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setUser({...user,[name]:value});
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth,user.email,user.password);
            toast.success('Account Created!');
            setUser({});
            setTimeout(() => navigate('/login'), 1500);
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="form-container">
                            <p className="title">Create an account</p>
                            <p>{error}</p>
                            <form className="form" method='post' onSubmit={handleSubmit}>
                                <input type="email" className="input" name='email' placeholder="Email" onChange={handleChange} value={user.email || ''} />
                                <input type="password" name='password' className="input" placeholder="Password" onChange={handleChange} value={user.password || ''} />
                                <button className="form-btn">Sign up</button>
                            </form>
                            <p className="sign-up-label">
                                Already have an account?<span className="sign-up-link"><Link to="/">Log in</Link></span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
