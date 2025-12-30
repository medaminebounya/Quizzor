import React, { useState } from 'react';
import './Dashboard.css';

export default function StudentDashboard() {
    const [view, setView] = useState('browse');

    const [quizzes] = useState([
        { id: 1, title: "Data Structures Midterm", course: "CS101", time: "45m", diff: "Hard", xp: "500 XP" },
        { id: 2, title: "React Hooks & State", course: "Web Dev", time: "20m", diff: "Medium", xp: "250 XP" },
        { id: 3, title: "Database Normalization", course: "DB System", time: "30m", diff: "Medium", xp: "300 XP" },
    ]);

    return (
        <div className="stu-container">
            {/* Professional Glass Sidebar */}
            <aside className="stu-sidebar">
                <div className="sidebar-brand">Quizzor <span>Student</span></div>
                
                <div className="stu-profile-card">
                    <div className="stu-avatar">AB</div>
                    <div className="stu-meta">
                        <p className="stu-name">Amine Bounya</p>
                        <p className="stu-rank">Rank: #12 Global</p>
                    </div>
                </div>

                <nav className="nav-group">
                    <label>LEARNING HUB</label>
                    <div className={`nav-link ${view === 'browse' ? 'active' : ''}`} onClick={() => setView('browse')}>
                        Browse Quizzes
                    </div>
                    <div className={`nav-link ${view === 'results' ? 'active' : ''}`} onClick={() => setView('results')}>
                        My Results
                    </div>
                    
                    <label>GAMIFICATION</label>
                    <div className="nav-link">Leaderboard</div>
                    <div className="nav-link">Achievements <span className="badge-pill">5</span></div>
                </nav>
            </aside>

            {/* Main Content Area with proper scaling */}
            <main className="stu-content">
                <div className="content-inner">
                    <header className="stu-header">
                        <div className="header-info">
                            <h1>Available Quizzes</h1>
                            <p>Track your progress and level up your skills.</p>
                        </div>
                        
                        <div className="level-system">
                            <div className="level-info">
                                <span className="lvl-badge">Level 8</span>
                                <span className="xp-text">2,400 / 3,000 XP</span>
                            </div>
                            <div className="xp-track">
                                <div className="xp-progress" style={{width: '75%'}}></div>
                            </div>
                        </div>
                    </header>

                    <div className="main-grid-layout">
                        {/* Primary Dashboard Side */}
                        <section className="primary-view">
                            <div className="stats-row">
                                <div className="stat-card">
                                    <span className="stat-label">QUIZZES DONE</span>
                                    <div className="stat-val">24</div>
                                </div>
                                <div className="stat-card highlight">
                                    <span className="stat-label">AVG. SCORE</span>
                                    <div className="stat-val">16.4/20</div>
                                </div>
                                <div className="stat-card">
                                    <span className="stat-label">TOTAL XP</span>
                                    <div className="stat-val">12.5k</div>
                                </div>
                            </div>

                            <div className="quiz-feed">
                                {quizzes.map(quiz => (
                                    <div key={quiz.id} className="quiz-card-heavy">
                                        <div className="card-top">
                                            <span className="course-tag">{quiz.course}</span>
                                            <span className={`diff-pill ${quiz.diff.toLowerCase()}`}>{quiz.diff}</span>
                                        </div>
                                        <h2>{quiz.title}</h2>
                                        <div className="card-meta">
                                            <div className="meta-item">⏱ {quiz.time}</div>
                                            <div className="xp-reward">+{quiz.xp}</div>
                                        </div>
                                        <button className="btn-attempt">Start Attempt</button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Secondary Sidebar Content to fill the right side */}
                        <section className="secondary-view">
                            <div className="glass-panel">
                                <h3>Global Leaderboard</h3>
                                <div className="leaderboard-list">
                                    <div className="rank-item"><span>1. Sarah J.</span> <span>18.2k</span></div>
                                    <div className="rank-item active"><span>12. You</span> <span>12.5k</span></div>
                                    <div className="rank-item"><span>13. Karim L.</span> <span>12.1k</span></div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}