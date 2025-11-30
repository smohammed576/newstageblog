<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['title', 'intro', 'content', 'user_id', 'image', 'type', 'tags', 'views', 'stage', 'published'];

    protected $casts = [
        'tags' => 'array'
    ];

    public function comments(){
        return $this->hasMany(Comment::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
