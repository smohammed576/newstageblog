<?php

namespace App\Http\Controllers;

use App\Enums\ActivityType;
use App\Models\Activity;
use App\Models\Movie;
use App\Models\User;
use App\Models\Watchlist;
use App\Services\ActivityService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityController extends Controller
{
    public function index(User $user){
        $profile = User::with('activities.user')->find($user->id);

        $activities = $profile->activities()->with('model')->where('private', false)->orderBy('created_at', 'desc')->get();
        if(auth()->id() != 1){
            ActivityService::log(ActivityType::VIEWED_ACTIVITY, $user);
        }
        return Inertia::render('Activity/Activities', [
            'profile' => $profile,
            'activities' => $activities
        ]);
    }

    public function show(User $user, int $tmdb){
        $activities = $user->activities()->with('model')->where('private', false)->whereJsonContains('meta->tmdb', $tmdb)->orderBy('created_at', 'desc')->get();
        $activities->each(function ($item){
            if($item->model && method_exists($item->model, 'movie')){
                $item->model->load('movie');
            }
        });

        return Inertia::render('Activity/Activity', [
            'tmdb' => $tmdb,
            'profile' => $user,
            'activities' => $activities
        ]);
    }
}
