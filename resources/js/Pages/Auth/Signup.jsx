import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import './Signup.css';

export default function Signup() {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        role: "student" // Default role
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically post to a controller
        console.log("Signing up:", values);
    };

    return (
        <div className="signup-container">
            <div className="signup-glass-box">
                <div className="signup-header">
                    <h1>Join Quizzor</h1>
                    <p>Create your universal account</p>
                </div>

                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="form-row">
                        <label>Full Name</label>
                        <input type="text" placeholder="John Doe" required 
                               onChange={e => setValues({...values, name: e.target.value})}/>
                    </div>

                    <div className="form-row">
                        <label>Email</label>
                        <input type="email" placeholder="name@example.com" required 
                               onChange={e => setValues({...values, email: e.target.value})}/>
                    </div>

                    <div className="form-row">
                        <label>I am a...</label>
                        <select value={values.role} onChange={e => setValues({...values, role: e.target.value})}>
                            <option value="student">Student</option>
                            <option value="professor">Professor</option>
                        </select>
                    </div>

                    <div className="form-row">
                        <label>Password</label>
                        <input type="password" placeholder="••••••••" required 
                               onChange={e => setValues({...values, password: e.target.value})}/>
                    </div>

                    <button type="submit" className="signup-submit">Sign Up</button>
                </form>

                <p className="footer-text">
                    Already have an account? <Link href="/">Log In</Link>
                </p>
            </div>
        </div>
    );
}