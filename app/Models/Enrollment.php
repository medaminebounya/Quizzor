<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    protected $fillable = ['student_id', 'course_id', 'status', 'completed_at'];

    public function student() {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function course() {
        return $this->belongsTo(Course::class);
    }

    // Helper to see if student finished all quizzes in this course
    public function updateStatus() {
        // Logic would go here to check if all quizzes are passed
    }
}
