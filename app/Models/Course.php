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

    // Helper method to check if course is draft
    public function isDraft()
    {
        return $this->status === 'draft';
    }

    // Helper method to check if course is approved
    public function isApproved()
    {
        return $this->status === 'approved';
    }
}
