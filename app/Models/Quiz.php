<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'time_limit',
        'max_attempts',
        'passing_score',
        'order_number',
        'is_published',
        'course_id',
        'professor_id',
    ];

    // Relationships
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function professor()
    {
        return $this->belongsTo(User::class, 'professor_id');
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function attempts()
    {
        return $this->hasMany(Attempt::class);
    }

    // Helper Methods
    public function isPublished()
    {
        return $this->is_published;
    }

    public function getTimeLimitFormatted()
    {
        if (!$this->time_limit) return 'No time limit';
        
        $hours = floor($this->time_limit / 60);
        $minutes = $this->time_limit % 60;
        
        if ($hours > 0 && $minutes > 0) {
            return "{$hours} hour" . ($hours > 1 ? 's' : '') . " {$minutes} minute" . ($minutes > 1 ? 's' : '');
        } elseif ($hours > 0) {
            return "{$hours} hour" . ($hours > 1 ? 's' : '');
        } else {
            return "{$minutes} minute" . ($minutes > 1 ? 's' : '');
        }
    }

    public function getRemainingAttempts($studentId)
    {
        $usedAttempts = $this->attempts()
            ->where('student_id', $studentId)
            ->count();
            
        return max(0, $this->max_attempts - $usedAttempts);
    }

    public function canBeEdited()
    {
        return !$this->course->isApproved() && !$this->isPublished();
    }
}