import React from 'react';
import { Link } from '@inertiajs/react';
import './Welcome.css';

export default function Welcome() {
    return (
        <div className="welcome-wrapper">
            {/* Sign Up Navigation */}
            <div className="top-nav">
                <Link href="/signup" className="signup-btn-main">
                    Create Account
                </Link>
            </div>

            <h1 className="main-title">Quizzor</h1>

            <div className="cards-group">
                {/* Admin Card */}
                <Link href="/admin/login" className="portal-card glass-card">
                    <span className="badge">SYSTEM</span>
                    <h2>Admin</h2>
                    <p>Manage users, monitor, and configure global settings.</p>
                </Link>

                {/* Professor Card */}
                <Link href="/professor/login" className="portal-card glass-card">
                    <span className="badge">ACADEMIC</span>
                    <h2>Professor</h2>
                    <p>Create dynamic quizzes, manage students, and track performance analytics.</p>
                </Link>

                {/* Student Card */}
                <Link href="/student/login" className="portal-card glass-card">
                    <span className="badge">LEARNER</span>
                    <h2>Student</h2>
                    <p>Access your dashboard, participate in active quizzes, and review your scores.</p>
                </Link>
            </div>
        </div>
    );
}