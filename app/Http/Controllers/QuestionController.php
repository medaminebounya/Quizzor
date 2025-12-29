<?php

namespace App\Http\Controllers;
use App\Models\Quiz;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class QuestionController extends Controller
{
    public function store(Request $request, Quiz $quiz)
    {
        if ($quiz->professor_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        if (!$quiz->canBeEdited()) {
            abort(403, 'This quiz is locked and cannot be modified.');
        }

        $validated = $request->validate([
            'question_text' => 'required|string',
            'score' => 'required|integer|min:1',
            'type' => 'required|in:multiple_choice,true_false,text',

            'answers' => 'required_if:type,multiple_choice,true_false|array|min:1',
            'answers.*.answer_text' => 'required|string',   //syntax allows Laravel to automatically validate every item in the array sent from the React frontend
            'answers.*.is_correct' => 'required|boolean',
        ]);

        DB::transaction(function () use ($validated, $quiz) {
            $question = $quiz->questions()->create([
                'question_text' => $validated['question_text'],
                'score' => $validated['score'],
                'type' => $validated['type'],
            ]);

            if ($validated['type'] !== 'text') {
                foreach ($validated['answers'] as $answerData) {
                    $question->answers()->create([
                        'answer_text' => $answerData['answer_text'],
                        'is_correct' => $answerData['is_correct'],
                    ]);
                }
            }
        });

        return back()->with('success', 'Question and answers added successfully!');
    }
}
