<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/login', function () {
    $role = request('role');
    return view('auth.login', ['role' => $role]);
})->name('login');
