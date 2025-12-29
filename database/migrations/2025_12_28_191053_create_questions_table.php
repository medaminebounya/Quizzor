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
    Schema::create('questions', function (Blueprint $table) {
        $table->id();
        $table->text('question_text');
        $table->integer('score')->default(1);
        $table->enum('type', ['multiple_choice', 'true_false', 'text']);
        
        // Linking to the Quiz
        $table->foreignId('quiz_id')->constrained()->onDelete('cascade');
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
