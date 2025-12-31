import React, { useState } from 'react';
import './Admin.css';

export default function AdminDashboard() {
    // Mock Data for Courses
    const [courses, setCourses] = useState([
        { id: 1, title: "Algorithmiques", author: "Dr. Remmach", status: "Pending" },
        { id: 2, title: "Base de Données", author: "Prof. Amine", status: "Pending" },
        { id: 3, title: "Systèmes d'Exploitation", author: "Dr. Zahi", status: "Pending" },
    ]);

    // Mock Data for User Management
    const [users] = useState([
        { id: 1, name: "St. Med Amine", role: "Student", id_school: "STU-882" },
        { id: 2, name: "Prof. Ahmed", role: "Professor", id_school: "PRO-441" },
    ]);

    const handleAction = (id, newStatus) => {
        setCourses(courses.map(c => c.id === id ? { ...c, status: newStatus } : c));
    };

    return (
        <div className="admin-container">
            {/* Sidebar - Styles applied via .admin-sidebar in Admin.css */}
            <aside className="admin-sidebar">
                <h2 className="logo-text">Quizzor <span>Admin Portal</span></h2>
                <nav className="nav-links">
                    <div className="nav-item active">Dashboard</div>
                    <div className="nav-item">Course Approval</div>
                    <div className="nav-item">User Management</div>
                    <div className="nav-item">System Settings</div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <header className="admin-header">
                    <h1>Admin Command Center</h1>
                    <div className="admin-profile">
                        System Administrator
                    </div>
                </header>

                {/* Stats Grid - Using .stat-card classes from Admin.css */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <span className="label">TOTAL STUDENTS</span>
                        <div className="value">1,240</div>
                    </div>
                    {/* highlight class applies the blue theme color */}
                    <div className="stat-card highlight">
                        <span className="label">PENDING REQUESTS</span>
                        <div className="value">{courses.filter(c => c.status === 'Pending').length}</div>
                    </div>
                    <div className="stat-card">
                        <span className="label">SYSTEM UPTIME</span>
                        <div className="value">99.9%</div>
                    </div>
                </div>

                {/* Tables Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                    
                    {/* Course Approval Table - Using .glass-table-wrapper */}
                    <section className="glass-table-wrapper">
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Course Validation Queue</h3>
                        <table className="glass-table">
                            <thead>
                                <tr>
                                    <th>COURSE</th>
                                    <th>PROFESSOR</th>
                                    <th>STATUS</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map(course => (
                                    <tr key={course.id}>
                                        <td>{course.title}</td>
                                        <td style={{ color: '#338aca' }}>{course.author}</td>
                                        <td>
                                            <span className={`status-tag ${course.status.toLowerCase()}`}>
                                                {course.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn-approve" onClick={() => handleAction(course.id, 'Approved')}>✓</button>
                                            <button className="btn-reject" onClick={() => handleAction(course.id, 'Rejected')}>✕</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>

                    {/* Quick User View - Styled to match the blue base */}
                    <section className="glass-table-wrapper">
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Recent Users</h3>
                        {users.map(user => (
                            <div key={user.id} style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>
                                <div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{user.name}</div>
                                    <div style={{ fontSize: '0.7rem', opacity: 0.5 }}>{user.id_school}</div>
                                </div>
                                <div style={{ fontSize: '0.8rem', color: '#338aca', fontWeight: '700' }}>{user.role}</div>
                            </div>
                        ))}
                    </section>
                </div>
            </main>
        </div>
    );
}