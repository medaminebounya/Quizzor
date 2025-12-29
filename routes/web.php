<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\EnrollmentController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('/admin/login', function () {
    return Inertia::render('Admin/Login');
});

Route::get('/admin/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
});

Route::get('/professor/login', function () {
    return Inertia::render('Professor/Login');
});

Route::get('/professor/dashboard', function () {
    return Inertia::render('Professor/Dashboard');
});

Route::get('/student/login', function () {
    return Inertia::render('Student/Login');
});

Route::get('/student/dashboard', function () {
    return Inertia::render('Student/Dashboard');
});

Route::get('/signup', function () {
    return Inertia::render('Auth/Signup');
});

Route::middleware(['auth'])->group(function () {
    Route::resource('courses.quizzes', QuizController::class)->shallow();
});

Route::post('/courses/{course}/enroll', [EnrollmentController::class, 'store'])
    ->name('courses.enroll')
    ->middleware('auth');