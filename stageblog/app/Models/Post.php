<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['title', 'slug', 'intro', 'content', 'user_id', 'image', 'type', 'tags', 'views', 'stage', 'published'];

    protected $casts = [
        'tags' => 'array'
    ];

    protected static function booted(){
        static::creating(function ($model){
            $model->slug = self::createSlug($model->title);

        });
        static::updating(function ($model){
            if($model->isDirty('title')){
                $model->slug = self::createSlug($model->title, $model->id);
            }
        });
    }

    protected static function createSlug($title, $id = null){
        $create = \Str::slug($title);
        $slug = $create;
        $i = 1;

        while(self::where('slug', $slug)->when($id, fn($item) => $item->where('id', '!=', $id))->exists()){
            $slug = $create . '-' . $i;
            $i++;
        }

        return $slug;
    }

    public function comments(){
        return $this->hasMany(Comment::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
