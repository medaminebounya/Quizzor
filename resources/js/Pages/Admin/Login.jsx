import React from 'react';
import { Link, useForm } from '@inertiajs/react'; // Changed to useForm
import '../../../css/LoginCommon.css';

export default function AdminLogin() {
    // useForm handles the state, errors, and submission for us
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        assignedId: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/login');
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
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            placeholder="admin@quizzor.com" 
                            required 
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                            placeholder="••••••••" 
                            required 
                        />
                        {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>

                    <div className="input-group">
                        <label>Assigned Admin ID (Matricule)</label>
                        <input 
                            type="text" 
                            value={data.assignedId}
                            onChange={e => setData('assignedId', e.target.value)}
                            placeholder="e.g. ADM-9921" 
                            required 
                        />
                        {errors.assignedId && <span className="error-text">{errors.assignedId}</span>}
                        <small>Must start with "ADM-"</small>
                    </div>

                    <button type="submit" className="login-btn" disabled={processing}>
                        {processing ? 'Connecting...' : 'Enter Portal'}
                    </button>
                </form>

                <Link href="/" className="back-link">Go Back</Link>
            </div>
        </div>
    );
}