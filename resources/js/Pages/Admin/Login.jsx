import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import '../../../css/LoginCommon.css';

export default function AdminLogin() {
    const [values, setValues] = useState({
        email: "",
        password: "",
        assignedId: ""
    });

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
        if (values.password.length < 8) {
            setError("Cannot submit: Password too short.");
            return;
        }
        router.get('/admin/dashboard');
    };

    return (
        <div className="login-page-container theme-admin">
            <div className="shared-login-card">
                <div className="login-header">
                    <span className="badge">SECURE ACCESS</span>
                    <h1>Admin Login</h1>
                    <p>Enter your credentials to access the system</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            name="email"
                            placeholder="admin@quizzor.com" 
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
                        <label>Assigned Admin ID</label>
                        <input 
                            type="text" 
                            name="assignedId"
                            placeholder="e.g. ADM-9921" 
                            value={values.assignedId}
                            onChange={handleChange}
                            required 
                        />
                        <small>Use the ID provided by your department</small>
                    </div>

                    <button type="submit" className="login-btn">
                        Enter Portal
                    </button>
                </form>

                <Link href="/" className="back-link">Go Back</Link>
            </div>
        </div>
    );
}