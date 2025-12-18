<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    protected $fillable = ['title', 'tmdb', 'user_id', 'movie_id', 'position'];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function movie(){
        return $this->belongsTo(Movie::class);
    }

}
