<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            // Get courses with status 'pending' (Following MCD Status_Course)
            'courses' => Course::with('professor')
                ->where('status_course', 'pending')
                ->get(),
            
            // Calculate real stats from the USER table
            'stats' => [
                'totalStudents' => User::where('role', 'student')->count(),
            ]
        ]);
    }

    public function updateStatus(Request $request, Course $course)
    {
        $validated = $request->validate([
            'status' => 'required|in:Approved,Rejected'
        ]);

        $course->update([
            'status_course' => $validated['status'],
            'admin_id' => auth()->id() // Track which admin made the decision
        ]);

        return back()->with('success', 'Course status updated successfully.');
    }
}