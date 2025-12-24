<?php

namespace App\Http\Controllers;

use App\Enums\ActivityType;
use App\Models\Favorite;
use App\Services\ActivityService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    public function store(Request $request){
        $user = auth()->user();
        $data = $request->validate([
            'title' => 'required',
            'poster' => '',
            'backdrop' => '',
            'release' => '',
            'tmdb' => 'required',
            'position' => 'required'
        ]);
        $checkIfExists = $user->movies()->where('tmdb', $data['tmdb'])->first();
        if(!$checkIfExists){
            $movie = $user->movies()->create($data);
            ActivityService::log(ActivityType::ADDED_FILM, $movie, null, ['tmdb' => $data['tmdb']], false);
        }
        $movie = $user->movies()->where('tmdb', $data['tmdb'])->first();
        $checkIfExists = $user->favorites()->where('position', $data['position'])->first();
        if($checkIfExists){
            $favorite = $checkIfExists->update([
                'title' => $data['title'],
                'tmdb' => $data['tmdb'],
                'movie_id' => $movie->id
            ]);
            ActivityService::log(ActivityType::CHANGED_FAVORITE, $checkIfExists);
            return back();
        }
        else{
            $favorite = $movie->favorites()->create([...$data, 'user_id' => $user->id]);
            ActivityService::log(ActivityType::ADDED_FAVORITE, $favorite);
            return back();
        }

    }

    public function destroy(int $id){
        $user = auth()->user();
        $favorite = Favorite::find($id)->delete();
        $activity = $user->activities()->where('model_type', Favorite::class)->where('model_id', $id)->first();
        if($activity){
            $activity->delete();
        }
        return back();
    }
}
