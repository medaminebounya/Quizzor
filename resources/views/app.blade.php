<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        
        <!-- Vite for React + Tailwind -->
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        
        <!-- Inertia head tags -->
        @inertiaHead
        
        <title>Quizzor</title>
    </head>
    <body>
        <!-- Inertia mounts React here -->
        @inertia
    </body>
</html>