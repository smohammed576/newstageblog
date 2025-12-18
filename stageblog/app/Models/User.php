<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */

    use HasRoles;
    protected $fillable = [
        'name',
        'slug',
        'email',
        'password',
        'image',
        'first_name',
        'last_name',
        'backdrop',
        'bio',
        'location',
        'website',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    protected static function booted(){
        static::creating(function ($model){
            $model->slug = \Str::slug($model->name);
        });
    }

    public function posts(){
        return $this->hasMany(Post::class);
    }

    public function favorites(){
        return $this->hasMany(Favorite::class);
    }

    public function comments(){
        return $this->hasMany(Comment::class);
    }
    public function diaries(){
        return $this->hasMany(Diary::class);
    }

    public function shows(){
        return $this->hasMany(Show::class);
    }

    public function actions(){
        return $this->hasMany(Action::class);
    }

    public function watchlists(){
        return $this->hasMany(Watchlist::class);
    }
    public function movies(){
        return $this->hasMany(Movie::class);
    }
}
