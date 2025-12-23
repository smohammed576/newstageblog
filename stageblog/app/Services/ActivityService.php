<?php

namespace App\Services;

use App\Enums\ActivityType;
use App\Models\Activity;

class ActivityService
{
    protected static function message(
        ActivityType $type,
        $model,
        $user,
        array $meta = []
    ) : string {
        return match ($type){
            ActivityType::LOGGED_IN => "{$user->name} logged in",
            ActivityType::VIEWED_PROFILE => "{$user->name} viewed {$model->name}'s profile",
            ActivityType::VIEWED_POST => "{$user->name} viewed {$model->title}",
            ActivityType::COMMENTED => "{$user->name} commented on {$model->title}",
            ActivityType::CREATED_POST => "{$user->name} created a new post",
            ActivityType::WATCHED_FILM => "{$user->name} watched {$model->title}",
            ActivityType::LIKED_FILM => "{$user->name} liked {$model->title}",
            ActivityType::RATED_FILM => "{$user->name} rated {$model->title}",
            ActivityType::ADDED_WATCHLIST => "{$user->name} added {$model->title} to your watchlist",
        };
    }

    public static function log(
        ActivityType $type,
        $model,
        $user = null,
        array $meta = [],
        bool $private = true
    ) : void {
        $user = $user ?? auth()->user();
        if($user){
            $activity = new Activity([
                'user_id' => $user->id,
                'type' => $type->value,
                'model' => $model,
                // 'activity' => '',
                'meta' => $meta,
                'private' => $private
            ]);

            if($model){
                $activity->model()->associate($model);
            }

            $activity->save();
        }
    }
    /**
     * Create a new class instance.
     */
    // public function __construct()
    // {
    //     //
    // }
}
