<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quizzor</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.css">
</head>
<body>
    <!-- Background elements -->
    <div class="bg-circle bg-circle-1"></div>
    <div class="bg-circle bg-circle-2"></div>
    
    <main class="container">
        <div class="header">
            <h1>DeepSite</h1>
            <p class="subtitle">Your gateway to knowledge</p>
        </div>
        
        <div class="cards-container">
            <!-- Student Card -->
            <a href="{{ route('login', ['role' => 'student']) }}" class="card card-student">
                <div class="card-icon">
                    <i data-feather="book-open"></i>
                </div>
                <h3>Student</h3>
                <p>Take quizzes, track progress, and learn at your own pace</p>
            </a>
            
            <!-- Professor Card -->
            <a href="{{ route('login', ['role' => 'professor']) }}" class="card card-professor">
                <div class="card-icon">
                    <i data-feather="edit-3"></i>
                </div>
                <h3>Professor</h3>
                <p>Create quizzes, manage classes, and track student performance</p>
            </a>
            
            <!-- Admin Card -->
            <a href="{{ route('login', ['role' => 'admin']) }}" class="card card-admin">
                <div class="card-icon">
                    <i data-feather="settings"></i>
                </div>
                <h3>Admin</h3>
                <p>Manage users, system settings, and platform configuration</p>
            </a>
        </div>
    </main>
    
    <!-- Feather Icons Script -->
    <script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script>
    <script>
        // Initialize feather icons after page loads
        document.addEventListener('DOMContentLoaded', function() {
            feather.replace();
        });
    </script>
</body>
</html>