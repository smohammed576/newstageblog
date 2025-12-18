<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Watchlist;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WatchlistController extends Controller
{
    public function show(User $user){
        $watchlist = $user->watchlists()->latest()->get();
        return Inertia::render('Watchlist/Watchlist', [
            'user' => $user,
            'watchlist' => $watchlist
        ]);
    }

    public function store(Request $request){
        $data = $request->validate([
            'title' => 'required',
            'poster' => 'required',
            'release' => 'required',
            'tmdb' => 'required'
        ]);

        $user = auth()->user();
        $checkIfExists = $user->watchlists()->where('tmdb', $data['tmdb'])->first();
        if($checkIfExists){
            return back()->with('status', $data['title']." is already in your watchlist.");
        }
        else{
            $user->watchlists()->create($data);
            return back()->with('status', $data['title']." was added to your watchlist.");
        }
    }

    public function destroy(int $id){
        $watchlist = Watchlist::find($id);
        $watchlist->delete();
        return back()->with('status', $watchlist->title." was deleted from your watchlist.");
    }
}
