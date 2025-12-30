import React, { useState } from 'react';
import './ProfessorDash.css';

export default function ProfessorDashboard() {
    const [view, setView] = useState('class'); 
    
    const [classData] = useState([
        { id: 1, name: "Ahmed Alami", progress: 85, lastQuiz: 18, status: "Excellent", attendance: "98%" },
        { id: 2, name: "Sara Tazi", progress: 42, lastQuiz: 10, status: "At Risk", attendance: "75%" },
        { id: 3, name: "Yassine Ben", progress: 70, lastQuiz: 14, status: "Steady", attendance: "90%" },
    ]);

    return (
        <div className="prof-container">
            {/* Extended Sidebar */}
            <aside className="prof-sidebar">
                <div className="sidebar-brand">Quizzor <span>Professor Portal</span></div>
                <nav className="nav-group">
                    <label>ANALYTICS</label>
                    <div className={`nav-link ${view === 'class' ? 'active' : ''}`} onClick={() => setView('class')}>
                        Class Insights
                    </div>
                    <div className="nav-link"> Grade Trends</div>
                    
                    <label>CONTENT BUILDER</label>
                    <div className="nav-link">My Courses</div>
                    <div className="nav-link">Quiz Bank</div>

                    <label>COMMUNICATION</label>
                    <div className="nav-link">Alerts <span className="badge-count">3</span></div>
                </nav>
            </aside>

            <main className="prof-content">
                <header className="prof-header">
                    <div className="header-titles">
                        <h1>{view === 'class' ? "Computer Science 101" : "Student Deep-Dive"}</h1>
                        <p>Semester 1 • Section A • 42 Students Enrolled</p>
                    </div>
                    <div className="view-toggle">
                        <button onClick={() => setView('class')} className={view === 'class' ? 'btn-active' : ''}>Class View</button>
                        <button onClick={() => setView('student')} className={view === 'student' ? 'btn-active' : ''}>Individual</button>
                    </div>
                </header>

                {view === 'class' ? (
                    <div className="dashboard-layout">
                        {/* Top Stats Row */}
                        <div className="stats-grid">
                            <div className="summary-card">
                                <span className="label">AVG. SCORE</span>
                                <div className="value">14.5/20</div>
                                <div className="trend positive">↑ 2.4% vs last week</div>
                            </div>
                            <div className="summary-card highlight">
                                <span className="label">QUIZZES READY</span>
                                <div className="value">08</div>
                                <div className="trend">Next: Final Exam</div>
                            </div>
                            <div className="summary-card">
                                <span className="label">PENDING GRADING</span>
                                <div className="value">12</div>
                                <div className="trend negative">Action Required</div>
                            </div>
                        </div>

                        {/* Middle Row: Split Table and Curriculum */}
                        <div className="content-row">
                            <div className="glass-panel main-table">
                                <div className="panel-header">
                                    <h3>Student Performance Matrix</h3>
                                    <button className="export-btn">Download CSV</button>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Student</th>
                                            <th>Attendance</th>
                                            <th>Progress</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {classData.map(student => (
                                            <tr key={student.id} onClick={() => setView('student')} className="clickable-row">
                                                <td>
                                                    <div className="student-info">
                                                        <div className="avatar">{student.name.charAt(0)}</div>
                                                        <span>{student.name}</span>
                                                    </div>
                                                </td>
                                                <td>{student.attendance}</td>
                                                <td>
                                                    <div className="progress-bar-bg">
                                                        <div className="progress-fill" style={{ width: `${student.progress}%`, background: '#338aca' }}></div>
                                                    </div>
                                                </td>
                                                <td><span className={`tag ${student.status.toLowerCase().replace(" ", "")}`}>{student.status}</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* New Side Element: Upcoming Quizzes */}
                            <div className="glass-panel timeline">
                                <h3>Curriculum Timeline</h3>
                                <div className="timeline-item active">
                                    <div className="dot"></div>
                                    <p><strong>Recursion Quiz</strong><br/>Live - 24 Submissions</p>
                                </div>
                                <div className="timeline-item">
                                    <div className="dot"></div>
                                    <p><strong>OOP Basics</strong><br/>Scheduled: Friday</p>
                                </div>
                                <div className="timeline-item muted">
                                    <div className="dot"></div>
                                    <p><strong>Final Project</strong><br/>Draft Mode</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="single-student-view glass-panel">
                        <div className="student-profile-header">
                            <h2 style={{ color: '#338aca' }}>Ahmed Alami - Performance Report</h2>
                            <button className="back-btn" onClick={() => setView('class')}>← Return to List</button>
                        </div>
                        <div className="stats-row">
                            <div className="mini-stat"><h4>Rank in Class</h4><p>#4 / 42</p></div>
                            <div className="mini-stat"><h4>Success Rate</h4><p>94%</p></div>
                            <div className="mini-stat"><h4>Time Spent</h4><p>48h</p></div>
                        </div>
                        <div className="chart-placeholder">
                            <div className="fake-chart-bar" style={{height: '60%'}}></div>
                            <div className="fake-chart-bar" style={{height: '80%'}}></div>
                            <div className="fake-chart-bar" style={{height: '45%'}}></div>
                            <div className="fake-chart-bar" style={{height: '90%'}}></div>
                            <p>Activity Distribution (Weekly)</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}