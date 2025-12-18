<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Watchlist extends Model
{
    protected $fillable = ['title', 'poster', 'release', 'tmdb', 'user_id'];

    public function users(){
        return $this->belongsTo(User::class);
    }
}
