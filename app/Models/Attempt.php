<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attempt extends Model
{
    protected $fillable = ['student_id', 'quiz_id', 'score', 'started_at', 'submitted_at'];

    public function quiz() {
        return $this->belongsTo(Quiz::class);
    }

    public function student() {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function studentAnswers() {
        return $this->hasMany(StudentAnswer::class);
    }
}
