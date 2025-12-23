<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Activity extends Model
{
    use SoftDeletes;
    protected $fillable = ['user_id', 'type', 'meta', 'private'];

    protected $casts = [
        'meta' => 'array'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function model(){
        return $this->morphTo();
    }
}
