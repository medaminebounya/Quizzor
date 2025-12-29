<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnrollmentController extends Controller
{
    // Enroll a student in a course
    public function store(Request $request, Course $course)
    {
        // 1. Security: Ensure the course is actually approved/public
        if (!$course->isApproved()) {
            abort(403, 'This course is not yet available for enrollment.');
        }

        // 2. Prevent double enrollment
        $exists = Auth::user()->enrolledCourses()->where('course_id', $course->id)->exists();
        
        if ($exists) {
            return back()->with('error', 'You are already enrolled in this course.');
        }

        // 3. Create the enrollment
        Auth::user()->enrolledCourses()->attach($course->id, [
            'status' => 'active',
            'enrolled_at' => now(),
        ]);

        return redirect()->route('student.dashboard')
            ->with('success', "You have successfully enrolled in {$course->title}!");
    }

    // Drop a course
    public function destroy(Course $course)
    {
        Auth::user()->enrolledCourses()->updateExistingPivot($course->id, [
            'status' => 'dropped'
        ]);

        return back()->with('success', 'Course dropped.');
    }
}