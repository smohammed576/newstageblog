<?php

namespace App\Http\Controllers;

use App\Enums\ActivityType;
use App\Models\Movie;
use App\Models\User;
use App\Models\Watchlist;
use App\Services\ActivityService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MovieController extends Controller
{
    public function index(User $user){
        $profile = User::find($user->id);
        $movies = Movie::where('user_id', $user->id)->orderBy('release', 'desc')->paginate(66);
        return Inertia::render('Movies/Movies', [
            'profile' => $profile,
            'movies' => $movies
        ]);
    }

    public function store(Request $request){
        $user = auth()->user();
        $data = $this->validateData($request);

        $checkExists = $user->movies()->where('tmdb', $data['tmdb'])->first();
        if($checkExists){
            $checkExists->delete();
            return back();
        }
        $checkInWatchlist = $user->watchlists()->where('tmdb', $data['tmdb'])->first();
        if($checkInWatchlist){
            $activity = $user->activities()->where('model_type', Watchlist::class)->where('model_id', $checkInWatchlist->id)->where('type', 'added_watchlist')->first();
            if($activity){
                $activity->delete();
            }
            $checkInWatchlist->delete();
        }
        $movie = $user->movies()->create($data);
        ActivityService::log(ActivityType::ADDED_FILM, $movie, null, ['tmdb' => $movie['tmdb']], false);

        return back();
    }

    public function show(int $id){
        $user = auth()->user();
        $movie = $user->movies()->where('tmdb', $id)->first();
        $diaries = $user->diaries()->where('tmdb', $id)->get();
        $watchlist = $user->watchlists()->where('tmdb', $id)->first();
        if($user->id != 1){
            ActivityService::log(ActivityType::VIEWED_FILM, $user, null, ['tmdb' => $id]);
        }
        return Inertia::render(
            'Movies/Movie', [
                'id' => $id,
                'movie' => $movie,
                'diaries' => $diaries,
                'watchlist' => $watchlist
            ]
        );
    }

    public function update(Request $request, int $id){
        $user = auth()->user();
        $data = $this->validateData($request);
        $movie = $user->movies()->find($id);
        
        $movie->update($data);
        if($movie->wasChanged('liked')){
            $user->activities()->where('model_type', Movie::class)->where('model_id', $id)->where('type', 'liked_film')->delete();
            if($movie->liked){
                ActivityService::log(ActivityType::LIKED_FILM, $movie, null, ['tmdb' => $movie->tmdb], false);
            }
        }
        if($movie->wasChanged('rating')){
            if($movie->rating){
                $user->activities()->where('model_type', Movie::class)->where('model_id', $id)->where('type', 'rated_film')->delete();
                ActivityService::log(ActivityType::RATED_FILM, $movie, null, ['rated' => $movie->rating, 'tmdb' => $movie->tmdb], false);
            }
        }
        
        return back()->with('status', 'Movie was updated');

    }

    public function destroy(int $id){
        $user = auth()->user();
        $movie = Movie::find($id);
        $movie->delete();
        $user->activities()->where('model_type', Movie::class)->where('model_id', $id)->delete();
        return back()->with('status', 'Movie was removed');
    }

    protected function validateData(Request $request){
        $data = $request->validate([
            'title' => 'required',
            'poster' => 'required',
            'backdrop' => 'required',
            'tmdb' => 'required',
            'release' => '',
            'rating' => '',
            'liked' => '',
        ]);
        return $data;
    }
}
