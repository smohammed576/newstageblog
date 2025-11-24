<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['title', 'tagline', 'content', 'user_id', 'image', 'type', 'tags', 'views', 'stage', 'published'];
}
