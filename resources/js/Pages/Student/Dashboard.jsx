import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import './Dashboard.css';

const ProgressWheel = ({ percent }) => {
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;
    return (
        <div className="progress-wheel" style={{width: '80px', height: '80px'}}>
            <svg width="80" height="80">
                <circle className="bg" cx="40" cy="40" r={radius} strokeWidth="6" />
                <circle className="fill" cx="40" cy="40" r={radius} strokeWidth="6"
                        style={{ strokeDasharray: circumference, strokeDashoffset: offset }} />
            </svg>
            <div className="wheel-text" style={{fontSize: '0.9rem'}}>{percent}%</div>
        </div>
    );
};

export default function StudentDashboard() {
    const [activeTab, setActiveTab] = useState('Overview');

    return (
        <div className="dashboard-wrapper theme-student">
            {/* SIDEBAR */}
            <aside className="sidebar">
                <div className="sidebar-logo">QUIZZOR.</div>
                <nav>
                    {['Overview', 'Available Courses', 'My Quizzes', 'Grades', 'Settings'].map(item => (
                        <div key={item}
                             className={`nav-item ${activeTab === item ? 'active' : ''}`}
                             onClick={() => setActiveTab(item)}>
                            {item}
                        </div>
                    ))}
                </nav>
                <div style={{marginTop: 'auto'}}>
                    <Link href="/" className="nav-item" style={{color: '#ff6b6b'}}>Sign Out</Link>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="main-content">
                <header style={{display: 'flex', justifyContent: 'space-between', marginBottom: '40px'}}>
                    <div>
                        <h1 style={{margin: 0}}>Student Dashboard</h1>
                        <p style={{opacity: 0.6}}>Tracking your academic journey</p>
                    </div>
                    <div style={{textAlign: 'right'}}>
                        <div style={{fontWeight: 'bold'}}>Amine Bounya</div>
                        <div style={{fontSize: '12px', color: '#10b981'}}>STU-2025-001</div>
                    </div>
                </header>

                {/* TOP ANALYTICS */}
                <div className="dashboard-grid">
                    <div className="stat-card" style={{minHeight: '140px', flexDirection: 'row', gap: '20px'}}>
                        <ProgressWheel percent={72} />
                        <div>
                            <h4 style={{margin: 0}}>Total Progress</h4>
                            <p style={{fontSize: '12px', opacity: 0.5}}>Across 5 courses</p>
                        </div>
                    </div>
                    <div className="stat-card" style={{minHeight: '140px'}}>
                        <h2 style={{margin: 0, color: '#10b981'}}>12</h2>
                        <p style={{margin: 0, fontSize: '14px'}}>Quizzes Taken</p>
                    </div>
                    <div className="stat-card" style={{minHeight: '140px'}}>
                        <h2 style={{margin: 0}}>15.25</h2>
                        <p style={{margin: 0, fontSize: '14px'}}>Note Generale</p>
                    </div>
                </div>

                {/* DYNAMIC CONTENT BASED ON SECTION */}
                <section>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                        <h2 style={{margin: 0}}>Available Quizzes</h2>
                        <span style={{color: '#10b981', fontSize: '14px'}}>View all →</span>
                    </div>

                    {/* ACTIVE QUIZ CARD */}
                    <div className="quiz-action-card">
                        <div>
                            <span className="badge" style={{background: '#10b981', marginBottom: '10px'}}>URGENT</span>
                            <h3 style={{margin: '5px 0'}}>Mid-Term: Intro to Artificial Intelligence</h3>
                            <p style={{fontSize: '14px', opacity: 0.7, margin: 0}}>Time Limit: 45 mins | 20 Questions</p>
                        </div>
                        <button className="login-btn" style={{width: 'auto', padding: '12px 30px'}}>Start Quiz</button>
                    </div>

                    {/* COURSE PROGRESS SECTION */}
                    <div className="dashboard-sections" style={{marginTop: '40px'}}>
                        <div>
                            <h3>Courses in Progress</h3>
                            <div className="course-item">
                                <div style={{display:'flex', justifyContent:'space-between', fontSize: '14px'}}>
                                    <span>Database Management Systems</span>
                                    <span>82%</span>
                                </div>
                                <div className="progress-bar-bg" style={{marginTop: '8px'}}><div className="progress-fill" style={{width: '82%'}}></div></div>
                            </div>
                            <div className="course-item">
                                <div style={{display:'flex', justifyContent:'space-between', fontSize: '14px'}}>
                                    <span>React Frameworks</span>
                                    <span>40%</span>
                                </div>
                                <div className="progress-bar-bg" style={{marginTop: '8px'}}><div className="progress-fill" style={{width: '40%'}}></div></div>
                            </div>
                        </div>

                        <div>
                            <h3>🏆 Recent Grades</h3>
                            <table style={{width: '100%', borderCollapse: 'collapse'}}>
                                <tbody>
                                    <tr style={{borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                                        <td style={{padding: '12px 0'}}>UI Design Basics</td>
                                        <td style={{textAlign: 'right', color: '#10b981', fontWeight: 'bold'}}>95/100</td>
                                    </tr>
                                    <tr style={{borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                                        <td style={{padding: '12px 0'}}>Laravel Auth Systems</td>
                                        <td style={{textAlign: 'right', color: '#10b981', fontWeight: 'bold'}}>88/100</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}