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
        Schema::create('permissions', function (Blueprint $table) {
        $table->id();
        $table->string('action_perm'); // e.g., 'edit_course', 'approve_quiz'
        $table->string('status_perm');
        $table->foreignId('prof_id')->constrained('users');
        $table->foreignId('admin_id')->constrained('users');
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permissions');
    }
};
