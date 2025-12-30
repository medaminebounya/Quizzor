<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];
    public static function getRoleFromSchoolId($schoolId) {
    if (str_starts_with($schoolId, 'ADM-')) return 'admin';
    if (str_starts_with($schoolId, 'PRO-')) return 'professor';
    if (str_starts_with($schoolId, 'STU-')) return 'student';
    return null;
}

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Role Helper Methods
    public function isAdmin() { return $this->role === 'admin'; }
    public function isProfessor() { return $this->role === 'professor'; }
    public function isStudent() { return $this->role === 'student'; }

    // Relationship: Student has many Enrollments
    public function enrollments()
    {
        return $this->hasMany(Enrollment::class, 'student_id');
    }

    // Relationship: Student can access Courses through Enrollments
    public function enrolledCourses()
    {
        return $this->belongsToMany(Course::class, 'enrollments', 'student_id', 'course_id')
                    ->withPivot('status')
                    ->withTimestamps();
    }
}