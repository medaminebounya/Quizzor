import React from 'react';
import { useForm } from '@inertiajs/react';
import '../../../../css/LoginCommon.css'; // Using our shared theme

export default function CreateQuiz({ course }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        time_limit: 60,
        max_attempts: 3,
        passing_score: 70,
        order_number: 1,
        is_published: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('courses.quizzes.store', course.id));
    };

    return (
        <div className="login-page-container theme-professor" style={{alignItems: 'flex-start', padding: '40px'}}>
            <div className="shared-login-card" style={{maxWidth: '700px'}}>
                <h1>Create New Quiz</h1>
                <p style={{opacity: 0.6}}>Course: {course.title}</p>

                <form onSubmit={submit} className="dashboard-sections" style={{gridTemplateColumns: '1fr'}}>
                    <div className="input-group">
                        <label>Quiz Title</label>
                        <input value={data.title} onChange={e => setData('title', e.target.value)} placeholder="e.g. Mid-term Exam" />
                        {errors.title && <span className="error-text">{errors.title}</span>}
                    </div>

                    <div className="dashboard-grid" style={{marginBottom: 0}}>
                        <div className="input-group">
                            <label>Time Limit (Minutes)</label>
                            <input type="number" value={data.time_limit} onChange={e => setData('time_limit', e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Max Attempts</label>
                            <input type="number" value={data.max_attempts} onChange={e => setData('max_attempts', e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Passing Score (%)</label>
                            <input type="number" value={data.passing_score} onChange={e => setData('passing_score', e.target.value)} />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Description</label>
                        <textarea 
                            style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '15px', color: 'white'}}
                            value={data.description} 
                            onChange={e => setData('description', e.target.value)} 
                        />
                    </div>

                    <button type="submit" className="login-btn" disabled={processing}>
                        {processing ? 'Saving...' : 'Create Quiz & Add Questions'}
                    </button>
                </form>
            </div>
        </div>
    );
}