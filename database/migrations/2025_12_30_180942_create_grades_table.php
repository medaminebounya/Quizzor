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
        Schema::create('grades', function (Blueprint $table) {
        $table->id();
        $table->decimal('final_score', 5, 2);
        $table->string('status_grade');
        $table->text('prof_comment')->nullable();
        
        // Foreign Keys
        $table->foreignId('student_id')->constrained('users');
        $table->foreignId('course_id')->constrained();
        $table->foreignId('professor_id')->constrained('users');
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('grades');
    }
};
