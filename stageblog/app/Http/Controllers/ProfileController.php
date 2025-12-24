<?php

namespace App\Http\Controllers;

use App\Enums\ActivityType;
use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Diary;
use App\Models\Movie;
use App\Models\User;
use App\Models\Watchlist;
use App\Services\ActivityService;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{

    public function show(User $user){
        $profile = User::with(['favorites.movie', 'posts.user', 'diaries.user', 'shows.user'])->findOrFail($user->id);
        $films = Diary::with(['user', 'movie'])->where('user_id', $user->id)->latest()->paginate(4);
        $watchlist = Watchlist::where('user_id', $user->id)->latest()->paginate(5);
        $movies = Movie::where('user_id', $user->id)->get();

        $diaries = Diary::where('user_id', $user->id)->orderBy('watched_at', 'desc')->take(10)->get();
        $sorted = $diaries->groupBy(function ($item){
            return Carbon::parse($item['watched_at'])->format('Y-m');
        })->sortKeysDesc();
        

        // $sorted = $sorted->sortKeysDesc();
        $sorted = $sorted->toArray();
        
        if(auth()->id() != 1){
            ActivityService::log(ActivityType::VIEWED_PROFILE, $user);
        }

        return Inertia::render('Profile/Profile', [
            'profile' => $profile,
            'diaries' => $films,
            'watchlist' => $watchlist,
            'diary' => $sorted,
            'movies' => $movies
        ]);
    }

    public function settings() {
        $user = auth()->user();
        $favorites = $user->favorites()->with('movie')->get();
        $shows = $user->shows()->get();
        return Inertia::render('Settings/Settings', [
            'favorites' => $favorites,
            'shows' => $shows,
            'status' => session('status')
        ]);
    }

    /**
     * Display the user's profile form.
     */
    // public function edit(Request $request): Response
    // {
    //     return Inertia::render('Profile/Edit', [
    //         'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
    //         'status' => session('status'),
    //     ]);
    // }

    // /**
    //  * Update the user's profile information.
    //  */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        // dd($request->validated());

        $request->user()->save();

        return back()->with('status', 'Your details were saved.');
    }

    // /**
    //  * Delete the user's account.
    //  */
    // public function destroy(Request $request): RedirectResponse
    // {
    //     $request->validate([
    //         'password' => ['required', 'current_password'],
    //     ]);

    //     $user = $request->user();

    //     Auth::logout();

    //     $user->delete();

    //     $request->session()->invalidate();
    //     $request->session()->regenerateToken();

    //     return Redirect::to('/');
    // }
}
