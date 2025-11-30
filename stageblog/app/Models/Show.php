<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Show extends Model
{
    protected $fillable = ['name', 'poster', 'tmdb', 'user_id', 'position'];

    public function user(){
        return $this->belongsTo(User::class);
    }

}
