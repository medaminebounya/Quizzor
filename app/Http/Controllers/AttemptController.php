<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Quiz;
use App\Models\Attempt;
use App\Models\Grade;
use App\Models\StudentAnswer;
use Illuminate\Support\Facades\Auth;

class AttemptController extends Controller
{
    // Start a new attempt
    public function store(Quiz $quiz)
    {
        // Use that method from your Quiz.php!
        if ($quiz->getRemainingAttempts(Auth::id()) <= 0) {
            return back()->with('error', 'No attempts remaining.');
        }

        $attempt = Attempt::create([
            'quiz_id' => $quiz->id,
            'student_id' => Auth::id(),
            'started_at' => now(),
        ]);

        return redirect()->route('attempts.show', $attempt);
    }

    // Submit and Grade
    public function update(Request $request, Attempt $attempt)
{
    // Security: Ensure the student owns this attempt and hasn't submitted it yet
    if ($attempt->student_id !== Auth::id() || $attempt->submitted_at !== null) {
        abort(403, 'Action not allowed or quiz already submitted.');
    }

    $totalEarnedPoints = 0;
    $maxPossiblePoints = 0;
    
    // Get all questions for this quiz
    $questions = $attempt->quiz->questions()->with('answers')->get();

    // Loop through questions to grade them
    foreach ($questions as $question) {
        $maxPossiblePoints += $question->score;
        
        // Data from React frontend: answers[$question_id] = $answer_id
        $submittedAnswerId = $request->input("answers.{$question->id}");
        $submittedText = $request->input("text_answers.{$question->id}");

        $isCorrect = false;
        $earnedPoints = 0;

        if ($question->type !== 'text') {
            // Check against correct answer in DB
            $correctAnswer = $question->answers->where('is_correct', true)->first();
            
            if ($submittedAnswerId == $correctAnswer?->id) {
                $isCorrect = true;
                $earnedPoints = $question->score;
                $totalEarnedPoints += $earnedPoints;
            }
        }

        // Save to student_answers table (Following your MCD)
        $attempt->studentAnswers()->create([
            'question_id' => $question->id,
            'answer_id' => $submittedAnswerId,
            'text_answer' => $submittedText,
            'score' => $earnedPoints, // Individual question score
        ]);
    }

    // Calculate Final Percentage
    $finalScore = ($maxPossiblePoints > 0) ? ($totalEarnedPoints / $maxPossiblePoints) * 100 : 0;

    // Finalize the Attempt
    $attempt->update([
        'submitted_at' => now(),
        'score' => $finalScore,
    ]);

    // Create the Grade record (Final result shown on transcripts)
    Grade::create([
        'final_score' => $finalScore,
        'status_grade' => $finalScore >= $attempt->quiz->passing_score ? 'Passed' : 'Failed',
        'student_id' => $attempt->student_id,
        'course_id' => $attempt->quiz->course_id,
        'professor_id' => $attempt->quiz->course->professor_id,
        'prof_comment' => 'Automatically graded by system.',
    ]);

    return redirect()->route('attempts.results', $attempt->id)
                     ->with('success', 'Quiz submitted successfully!');
}
}
