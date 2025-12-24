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

        $diaries = Diary::with('movie')->where('user_id', $user->id)->orderBy('watched_at', 'desc')->paginate(50);
        $sorted = $diaries->groupBy(function ($item){
            return Carbon::parse($item['watched_at'])->format('Y-m');
        })->sortKeysDesc();
        
        $sorted = $sorted->toArray();
        if(auth()->id() != 1){
            ActivityService::log(ActivityType::VIEWED_DIARY, $user);
        }
        return redirect()->route('maintenance.construction');
        // return Inertia::render('Diary/Diary', [
        //     'profile' => $profile,
        //     'diaries' => $sorted,
        //     'links' => $diaries
        // ]);
    }

    public function upload(){
        $user = auth()->user();
        $movies = $user->movies()->get();
        $diaries = Diary::where('user_id', $user->id)->get();
        return Inertia::render('Movies/Form', [
            'movies' => $movies,
            'diaries' => $diaries
        ]);
    }

    public function store(Request $request){
        $user = auth()->user();
        $data = $this->validateData($request);
        $checkIfExists = $user->movies()->where('tmdb', $data['tmdb'])->first();
        if(!$checkIfExists){
            $user->movies()->create($data);
            // ActivityService::log(ActivityType::ADDED_FILM, $checkIfExists, null, ['tmdb' => $data['tmdb']], false);
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
        $user->diaries()->find($id)->delete();
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
            'release' => '',
            'watched_at' => ''
        ]);

        if(!empty($data['watched_at'])){
            $data['watched_at'] = Carbon::parse($data['watched_at']);
        }
        return $data;
    }
}
