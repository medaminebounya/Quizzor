<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QuizController extends Controller
{
    // Show all quizzes for a course
    public function index(Course $course)
    {
        // Check if user can view quizzes for this course
        if (!$course->isApproved() && $course->professor_id !== Auth::id() && !Auth::user()->isAdmin()) {
            abort(403, 'Unauthorized');
        }

        $quizzes = $course->quizzes()->orderBy('order_number')->get();
        
        return inertia('Courses/Quizzes/Index', [
            'course' => $course,
            'quizzes' => $quizzes,
        ]);
    }

    // Show form to create new quiz
    public function create(Course $course)
    {
        // Only professor of this course can create quizzes
        if ($course->professor_id !== Auth::id()) {
            abort(403, 'Only the course professor can create quizzes');
        }

        // Only if course is not approved yet
        if ($course->isApproved()) {
            abort(403, 'Cannot add quizzes to an approved course');
        }

        return inertia('Courses/Quizzes/Create', [
            'course' => $course,
        ]);
    }

    // Store new quiz
    public function store(Request $request, Course $course)
    {
        // Authorization check
        if ($course->professor_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        if ($course->isApproved()) {
            abort(403, 'Cannot add quizzes to an approved course');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'time_limit' => 'nullable|integer|min:1|max:300',
            'max_attempts' => 'required|integer|min:1|max:10',
            'passing_score' => 'required|integer|min:50|max:100',
            'order_number' => 'required|integer|min:1',
            'is_published' => 'boolean',
        ]);

        $quiz = $course->quizzes()->create([
            ...$validated,
            'professor_id' => Auth::id(),
        ]);

        return redirect()->route('courses.quizzes.index', $course)
            ->with('success', 'Quiz created successfully!');
    }

    // Show single quiz
    public function show(Course $course, Quiz $quiz)
    {
        // Check if quiz belongs to course
        if ($quiz->course_id !== $course->id) {
            abort(404);
        }

        // Authorization
        if (!$course->isApproved() && $course->professor_id !== Auth::id() && !Auth::user()->isAdmin()) {
            abort(403, 'Unauthorized');
        }

        return inertia('Courses/Quizzes/Show', [
            'course' => $course,
            'quiz' => $quiz->load('questions'),
        ]);
    }

    // Show form to edit quiz
    public function edit(Course $course, Quiz $quiz)
    {
        // Check ownership and permissions
        if ($quiz->course_id !== $course->id) {
            abort(404);
        }

        if ($course->professor_id !== Auth::id()) {
            abort(403, 'Only the course professor can edit quizzes');
        }

        if (!$quiz->canBeEdited()) {
            abort(403, 'This quiz cannot be edited (course is approved or quiz is published)');
        }

        return inertia('Courses/Quizzes/Edit', [
            'course' => $course,
            'quiz' => $quiz,
        ]);
    }

    // Update quiz
    public function update(Request $request, Course $course, Quiz $quiz)
    {
        // Validation checks
        if ($quiz->course_id !== $course->id) {
            abort(404);
        }

        if ($course->professor_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        if (!$quiz->canBeEdited()) {
            abort(403, 'This quiz cannot be edited');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'time_limit' => 'nullable|integer|min:1|max:300',
            'max_attempts' => 'required|integer|min:1|max:10',
            'passing_score' => 'required|integer|min:50|max:100',
            'order_number' => 'required|integer|min:1',
            'is_published' => 'boolean',
        ]);

        $quiz->update($validated);

        return redirect()->route('courses.quizzes.show', [$course, $quiz])
            ->with('success', 'Quiz updated successfully!');
    }

    // Delete quiz
    public function destroy(Course $course, Quiz $quiz)
    {
        if ($quiz->course_id !== $course->id) {
            abort(404);
        }

        if ($course->professor_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        if (!$quiz->canBeEdited()) {
            abort(403, 'This quiz cannot be deleted');
        }

        $quiz->delete();

        return redirect()->route('courses.quizzes.index', $course)
            ->with('success', 'Quiz deleted successfully!');
    }
}