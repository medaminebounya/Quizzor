import React, { useState } from 'react';
import './ProfessorDash.css';

export default function ProfessorDashboard() {
    // State to toggle between "Class View" and "Single Student View"
    const [view, setView] = useState('class'); 
    
    // Mock Data for the Class
    const [classData] = useState([
        { id: 1, name: "Ahmed Alami", progress: 85, lastQuiz: 18, status: "Excellent" },
        { id: 2, name: "Sara Tazi", progress: 42, lastQuiz: 10, status: "At Risk" },
        { id: 3, name: "Yassine Ben", progress: 70, lastQuiz: 14, status: "Steady" },
    ]);

    return (
        <div className="prof-container">
            {/* Sidebar with CRUD Panels */}
            <aside className="prof-sidebar">
                <div className="sidebar-brand">Quizzor <span>Professor</span></div>
                <nav className="nav-group">
                    <label>MAIN</label>
                    <div className={`nav-link ${view === 'class' ? 'active' : ''}`} onClick={() => setView('class')}>Class Overview</div>
                    
                    <label>MANAGEMENT (CRUD)</label>
                    <div className="nav-link">Manage Courses</div>
                    <div className="nav-link">Edit Quizzes</div>
                    <div className="nav-link">Create New Task</div>
                </nav>
            </aside>

            <main className="prof-content">
                <header className="prof-header">
                    <h1>{view === 'class' ? "Class Analytics: CS101" : "Student Deep-Dive"}</h1>
                    <div className="view-toggle">
                        <button onClick={() => setView('class')} className={view === 'class' ? 'btn-active' : ''}>Class</button>
                        <button onClick={() => setView('student')} className={view === 'student' ? 'btn-active' : ''}>Individual</button>
                    </div>
                </header>

                {view === 'class' ? (
                    <div className="class-grid">
                        {/* Summary Cards */}
                        <div className="summary-card">
                            <span>Average Grade</span>
                            <h3>14.5/20</h3>
                        </div>
                        <div className="summary-card">
                            <span>Participation</span>
                            <h3>92%</h3>
                        </div>

                        {/* Student List Table */}
                        <div className="glass-panel student-list">
                            <h3>Student Performance</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Student Name</th>
                                        <th>Course Progress</th>
                                        <th>Last Quiz Score</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classData.map(student => (
                                        <tr key={student.id} onClick={() => setView('student')} className="clickable-row">
                                            <td>{student.name}</td>
                                            <td>
                                                <div className="progress-bar-bg">
                                                    <div className="progress-fill" style={{ width: `${student.progress}%` }}></div>
                                                </div>
                                            </td>
                                            <td>{student.lastQuiz}/20</td>
                                            <td><span className={`tag ${student.status.toLowerCase().replace(" ", "")}`}>{student.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    /* Single Student View */
                    <div className="single-student-view glass-panel">
                        <h2>Ahmed Alami - Performance Report</h2>
                        <div className="stats-row">
                            <div className="mini-stat"><h4>Total Quizzes</h4><p>12</p></div>
                            <div className="mini-stat"><h4>Time Spent</h4><p>48h</p></div>
                        </div>
                        <div className="chart-placeholder">
                            [Interactive Progress Chart Area]
                        </div>
                        <button className="back-btn" onClick={() => setView('class')}>Return to Class View</button>
                    </div>
                )}
            </main>
        </div>
    );
}