<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    protected $fillable = ['title', 'poster', 'backdrop', 'tmdb', 'release', 'user_id', 'rating', 'liked'];
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function diaries(){
        return $this->hasMany(Diary::class);
    }
    public function favorites(){
        return $this->hasMany(Favorite::class);
    }
}
