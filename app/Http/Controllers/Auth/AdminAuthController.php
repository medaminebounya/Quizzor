<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminAuthController extends Controller {
    public function showLogin() {
        return Inertia::render('Login'); 
    }

    public function login(Request $request) {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
            'assignedId' => ['required', 'string', 'regex:/^ADM-/'], 
        ]);

        if (Auth::attempt(['email' => $credentials['email'], 'password' => $credentials['password']])) {
            if (auth()->user()->role === 'admin' && auth()->user()->school_id === $credentials['assignedId']) {
                $request->session()->regenerate();
                return redirect()->intended('/admin/dashboard');
            }
            Auth::logout();
        }
        return back()->withErrors(['assignedId' => 'Invalid Admin Credentials.']);
    }
}