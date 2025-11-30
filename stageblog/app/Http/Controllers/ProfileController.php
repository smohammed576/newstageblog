<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Movie;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{

    public function show(int $id){
        $posts = auth()->user()->posts()->get();
        $favorites = auth()->user()->favorites()->get();
        // $profile = User::where('id', $id)->get();
        $profile = User::with(['favorites.user', 'posts.user', 'movies.user', 'shows.user'])->findOrFail($id);
        // $films = Movie::with('user')->where
        // $films = Movie::with('user')->
        $films = Movie::with('user')->where('user_id', $id)->latest()->paginate(4);
        return Inertia::render('Profile/Profile', [
            'profile' => $profile,
            'movies' => $films
            // 'posts' => $posts,
            // 'favorites' => $favorites
        ]);
    }

    public function settings() {
        $user = auth()->user();
        $favorites = $user->favorites()->get();
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
