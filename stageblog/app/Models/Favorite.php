<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    protected $fillable = ['title', 'poster', 'tmdb', 'user_id', 'position'];

    public function user(){
        return $this->belongsTo(User::class);
    }

}
