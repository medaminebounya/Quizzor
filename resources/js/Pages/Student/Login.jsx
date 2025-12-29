import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import '../../../css/LoginCommon.css';

export default function StudentLogin() {
    const [values, setValues] = useState({ email: "", password: "", enrollmentId: "" });


    const [error, setError] = useState("");
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(oldValues => ({
            ...oldValues,
            [name]: value,
        }));

        if (name === "password") {
            if (value.length > 0 && value.length < 8) {
                setError("Password must be at least 8 characters.");
            } else {
                setError("");
            }
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        router.get('/student/dashboard');
    };

    return (
        <div className="login-page-container theme-student">
            <div className="shared-login-card">
                <div className="login-header">
                    <span className="badge" style={{background: '#10b981'}}>STUDENT PORTAL</span>
                    <h1>Student Login</h1>
                    <p>Enter your enrollment details to continue</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            name="email"
                            placeholder="student@quizzor.com" 
                            value={values.email}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            name="password"
                            placeholder="••••••••" 
                            value={values.password}
                            onChange={handleChange}
                            required 
                        />
                        {error && <span className="error-text">{error}</span>}
                    </div>
                    <div className="input-group">
                        <label>Enrollment ID</label>
                        <input type="text" placeholder="e.g. STU-2025-XXXX" 
                        required />
                    </div>
                    <button type="submit" className="login-btn">Start Learning</button>
                </form>
                <Link href="/" className="back-link">Go Back</Link>
            </div>
        </div>
    );
}