import React, { useState } from 'react';
import './Admin.css';

export default function AdminDashboard() {
    // Mock Data - This is what you'll replace with Laravel data later
    const [courses, setCourses] = useState([
        { id: 1, title: "Algorithmiques", author: "Dr. Remmach", status: "Pending" },
        { id: 2, title: "Statistiques", author: "Prof. Sharaf", status: "Pending" },
    ]);

    const [stats] = useState({
        totalStudents: 1240,
        activeQuizzes: 45,
        avgProgress: "78%"
    });

    const handleAction = (id, newStatus) => {
        setCourses(courses.map(c => c.id === id ? { ...c, status: newStatus } : c));
        // ...c etant le spread operator
        //car on change pas la data directement, on l'utilise pour dire prends tout les properties
        // et "spread" ces properties dans un nouveau objet et overwrite le status
    };

    return (
        <div className="admin-container">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <h2 className="logo-text">Quizzor <span>Admin</span></h2>
                <nav className="nav-links">
                    <div className="nav-item active">Dashboard</div>
                    <div className="nav-item">Course Approval</div>
                    <div className="nav-item">User Management</div>
                    <div className="nav-item">Analytics</div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <header className="admin-header">
                    <h1>System Overview</h1>
                    <div className="admin-profile">Admin Unit #1</div>
                </header>

                {/* Stats Grid */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <span className="label">TOTAL STUDENTS</span>
                        <div className="value">{stats.totalStudents}</div>
                    </div>
                    <div className="stat-card highlight">
                        <span className="label">ACTIVE QUIZZES</span>
                        <div className="value">{stats.activeQuizzes}</div>
                    </div>
                    <div className="stat-card">
                        <span className="label">AVG PROGRESS</span>
                        <div className="value">{stats.avgProgress}</div>
                    </div>
                </div>

                {/* Course Management Section */}
                <section className="management-section">
                    <h3>Course Approval Queue</h3>
                    <div className="glass-table-wrapper">
                        <table className="glass-table">
                            <thead>
                                <tr>
                                    <th>Course Title</th>
                                    <th>Professor</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map(course => (
                                    <tr key={course.id}>
                                        <td>{course.title}</td>
                                        <td>{course.author}</td>
                                        <td><span className={`status-tag ${course.status.toLowerCase()}`}>{course.status}</span></td>
                                        {/*Ici parceque le status change, et le style change avec, on utilise ${}
                                        pour changer le style avec dependant du status*/}
                                        <td>
                                            <button className="btn-approve" onClick={() => handleAction(course.id, 'Approved')}>✓</button>
                                            <button className="btn-reject" onClick={() => handleAction(course.id, 'Rejected')}>✕</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
}