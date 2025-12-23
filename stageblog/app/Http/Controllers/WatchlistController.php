<?php

namespace App\Http\Controllers;

use App\Enums\ActivityType;
use App\Models\User;
use App\Models\Watchlist;
use App\Services\ActivityService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WatchlistController extends Controller
{
    public function show(User $user){
        $watchlist = $user->watchlists()->latest()->get();
        if(auth()->id() != 1){
            ActivityService::log(ActivityType::VIEWED_WATCHLIST, $user);
        }
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
            $watchlist = $user->watchlists()->create($data);
            ActivityService::log(ActivityType::ADDED_WATCHLIST, $watchlist, null, ['tmdb' => $data['tmdb']], false);
            return back()->with('status', $data['title']." was added to your watchlist.");
        }
    }

    public function destroy(int $id){
        $watchlist = Watchlist::find($id);
        $user = auth()->user();
        $user->activities()->where('model_type', Watchlist::class)->where('model_id', $id)->where('type', 'added_watchlist')->delete();
        // if($activity){
        //     $activity->delete();
        // }
        $watchlist->delete();
        return back()->with('status', $watchlist->title." was deleted from your watchlist.");
    }
}
