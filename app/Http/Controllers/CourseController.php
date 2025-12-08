<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    // Show all courses (for professor)
    public function index()
    {
        // Get courses for current professor
        $courses = Course::where('professor_id', auth()->id())->get();
        return view('courses.index', compact('courses'));
    }

    // Show form to create new course
    public function create()
    {
        return view('courses.create');
    }

    // Store new course in database
    public function store(Request $request)
    {
        // Validate input
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // Create course with current professor
        Course::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'professor_id' => auth()->id(),
            'status' => 'draft' // Default status
        ]);

        return redirect()->route('courses.index')
            ->with('success', 'Course created successfully!');
    }

    // Show single course
    public function show(Course $course)
    {
        // Check if user can view this course
        if ($course->professor_id !== auth()->id() && !auth()->user()->isAdmin()) {
            abort(403, 'Unauthorized');
        }

        return view('courses.show', compact('course'));
    }

    // Show form to edit course
    public function edit(Course $course)
    {
        // Check if professor owns this course AND it's draft
        if ($course->professor_id !== auth()->id() || !$course->isDraft()) {
            abort(403, 'You can only edit your own draft courses');
        }

        return view('courses.edit', compact('course'));
    }

    // Update course
    public function update(Request $request, Course $course)
    {
        // Authorization check
        if ($course->professor_id !== auth()->id() || !$course->isDraft()) {
            abort(403, 'Unauthorized');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $course->update($validated);

        return redirect()->route('courses.show', $course)
            ->with('success', 'Course updated successfully!');
    }

    // Delete course
    public function destroy(Course $course)
    {
        // Only allow deletion of draft courses
        if ($course->professor_id !== auth()->id() || !$course->isDraft()) {
            abort(403, 'Unauthorized');
        }

        $course->delete();

        return redirect()->route('courses.index')
            ->with('success', 'Course deleted successfully!');
    }

    // CUSTOM METHOD: Submit course for approval
    public function submit(Course $course)
    {
        if ($course->professor_id !== auth()->id() || !$course->isDraft()) {
            abort(403, 'Unauthorized');
        }

        $course->update([
            'status' => 'pending',
            'submitted_at' => now()
        ]);

        return redirect()->route('courses.show', $course)->with('success', 'Course submitted for admin approval!');
    }
}