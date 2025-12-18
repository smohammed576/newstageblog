<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Diary extends Model
{
    protected $fillable = ['title', 'tmdb', 'user_id', 'movie_id', 'rating', 'liked', 'rewatched', 'type', 'release'];

    public function user(){
        return $this->belongsTo(User::class);
    }
    public function movie(){
        return $this->belongsTo(Movie::class);
    }
}
