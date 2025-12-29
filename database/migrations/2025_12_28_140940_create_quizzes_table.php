<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quizzes', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->integer('time_limit')->nullable()->comment('Time in minutes (60 = 1 hour)');
            $table->integer('max_attempts')->default(3);
            $table->integer('passing_score')->default(70)->comment('Percentage required to pass');
            $table->integer('order_number')->default(1)->comment('For sequencing (Quiz 1, Quiz 2)');
            $table->boolean('is_published')->default(false);
            
            // Foreign keys
            $table->foreignId('course_id')->constrained()->onDelete('cascade');
            $table->foreignId('professor_id')->constrained('users')->onDelete('cascade');
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quizzes');
    }
};