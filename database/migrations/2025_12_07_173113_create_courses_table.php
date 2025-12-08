<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
        $table->id(); // Id_Course
        $table->string('title');
        $table->text('description')->nullable();
        $table->enum('status', ['draft', 'pending', 'approved', 'archived'])->default('draft');
        
        // FK
        $table->foreignId('professor_id')->constrained('users')->onDelete('cascade');
        
        // Tracking
        $table->timestamp('submitted_at')->nullable();
        $table->timestamp('approved_at')->nullable();
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
