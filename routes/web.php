<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\AttemptController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('/admin/login', function () {
    return Inertia::render('Admin/Login');
});

Route::post('/admin/login', function () {
    return redirect('/admin/dashboard');
});

Route::get('/professor/login', function () {
    return Inertia::render('Professor/Login');
});

Route::post('/professor/login', function () {
    return redirect('/professor/dashboard');
});

Route::get('/student/login', function () {
    return Inertia::render('Student/Login');
});

Route::post('/student/login', function () {
    return redirect('/student/dashboard');
});

Route::get('/admin/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
})->name('admin.dashboard');

Route::get('/professor/dashboard', function () {
    return Inertia::render('Professor/Dashboard');
})->name('courses.index');

Route::get('/student/dashboard', function () {
    return Inertia::render('Student/Dashboard');
})->name('student.dashboard');

Route::get('/signup', function () {
    return Inertia::render('Auth/Signup');
});

Route::resource('courses.quizzes', QuizController::class)->shallow();

Route::post('/courses/{course}/enroll', [EnrollmentController::class, 'store'])->name('courses.enroll');
Route::post('/quizzes/{quiz}/attempts', [AttemptController::class, 'store'])->name('attempts.store');
Route::get('/attempts/{attempt}', [AttemptController::class, 'show'])->name('attempts.show');
Route::post('/attempts/{attempt}/submit', [AttemptController::class, 'update'])->name('attempts.submit');