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
        Schema::table('diaries', function (Blueprint $table){
           $table->dropForeign('movies_user_id_foreign');
           $table->foreign('user_id', 'diaries_user_id_foreign')->references('id')->on('users')->onDelete('cascade'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('diaries', function (Blueprint $table){
           $table->dropForeign('diaries_user_id_foreign');
           $table->foreign('user_id', 'movies_user_id_foreign')->references('id')->on('users')->onDelete('cascade'); 
        });
    }
};
