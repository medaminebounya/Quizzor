<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends Model
{
     use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'status',
        'professor_id',
        'submitted_at',
        'approved_at'
    ];

    // Relationship: Course belongs to a Professor
    public function professor()
    {
        return $this->belongsTo(User::class, 'professor_id');
    }

    // Relationship: Course has many Quizzes
    public function quizzes()
    {
        return $this->hasMany(Quiz::class);
    }

    // Relationship: Course has many Students through Enrollments
    public function students() 
    { 
        return $this->belongsToMany(User::class, 'enrollments', 'course_id', 'student_id')
                    ->withPivot('status')
                    ->withTimestamps();
    }

    // Helper Methods
    public function isDraft() {
        return $this->status === 'draft';
    }
    public function isApproved() {
        return $this->status === 'approved';
    }
    public function isPending() {
        return $this->status === 'pending';
    }
}