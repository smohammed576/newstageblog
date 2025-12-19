<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Models\User;
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
            $checkInWatchlist->delete();
        }
        $user->movies()->create($data);

        return back();
    }

    public function show(int $id){
        $user = auth()->user();
        $movie = $user->movies()->where('tmdb', $id)->first();
        $diaries = $user->diaries()->where('tmdb', $id)->get();
        $watchlist = $user->watchlists()->where('tmdb', $id)->first();
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
        if($movie->wasChanged('poster')){
            $checkInFavorite = $user->favorites()->where('tmdb', $data['tmdb'])->first();
            if($checkInFavorite){
                $checkInFavorite->update(['poster' => $movie->poster]);
            }
        }
        
        return back()->with('status', 'Movie was updated');

    }

    public function destroy(int $id){
        $movie = Movie::find($id);
        $movie->delete();
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
