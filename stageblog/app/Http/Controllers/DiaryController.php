<?php

namespace App\Http\Controllers;

use App\Enums\ActivityType;
use App\Models\Diary;
use App\Models\Movie;
use App\Models\User;
use App\Models\Watchlist;
use App\Services\ActivityService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DiaryController extends Controller
{
    public function index(User $user){
        $profile = User::with('diaries.user')->find($user->id);

        $diaries = Diary::with('movie')->where('user_id', $user->id)->orderBy('created_at', 'desc')->get();
        $sorted = $diaries->groupBy(function ($item){
            return Carbon::parse($item['created_at'])->format('Y-m');
        })->sortKeysDesc();
        
        $sorted = $sorted->toArray();
        if(auth()->id() != 1){
            ActivityService::log(ActivityType::VIEWED_DIARY, $user);
        }
        return Inertia::render('Diary/Diary', [
            'profile' => $profile,
            'diaries' => $sorted
        ]);
    }

    public function upload(){
        return Inertia::render('Movies/Form');
    }

    public function store(Request $request){
        $user = auth()->user();
        $data = $this->validateData($request);
        $checkIfExists = $user->movies()->where('tmdb', $data['tmdb'])->first();
        if(!$checkIfExists){
            ActivityService::log(ActivityType::ADDED_FILM, $checkIfExists, null, ['tmdb' => $data['tmdb']], false);
            $user->movies()->create($data);
        }
        $checkInWatchlist = $user->watchlists()->where('tmdb', $data['tmdb'])->first();
        if($checkInWatchlist){
            $activity = $user->activities()->where('model_type', Watchlist::class)->where('model_id', $checkInWatchlist->id)->where('type', 'added_watchlist')->first();
            if($activity){
                $activity->delete();
            }
            $checkInWatchlist->delete();
        }
        $movie = $user->movies()->where('tmdb', $data['tmdb'])->first();
        $diary = $movie->diaries()->create([...$data, 'user_id' => $user->id]);
        if($diary->rewatched){
            ActivityService::log(ActivityType::REWATCHED_FILM, $diary, null, ['tmdb' => $data['tmdb']], false);
        }
        else{
            ActivityService::log(ActivityType::WATCHED_FILM, $diary, null, ['tmdb' => $data['tmdb']], false);
        }

        return redirect()->route('blog.index');
    }

    public function update(Request $request, int $id){
        $user = auth()->user();
        $data = $this->validateData($request);
        $diary = $user->diaries()->find($id);
        
        $diary->update($data);
        
        return back()->with('status', 'Diary was updated');
    }

    public function destroy(int $id){
        $user = auth()->user();
        $user->diaries()->where('tmdb', $id)->delete();
        $activity = $user->activities()->where('model_type', Diary::class)->where('model_id', $id)->where('type', 'watched_film')->first();
        if($activity){
            $activity->delete();
        }
        return back();

    }

    protected function validateData(Request $request){
        $data = $request->validate([
            'title' => 'required',
            'poster' => '',
            'backdrop' => '',
            'tmdb' => 'required',
            'rating' => '',
            'watched' => '',
            'liked' => '',
            'rewatched' => '',
            'type' => '',
            'release' => ''
        ]);
        return $data;
    }
}
