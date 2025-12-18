<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
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
            $user->movies()->create($data);
        }
        $movie = $user->movies()->where('tmdb', $data['tmdb'])->first();
        $checkIfExists = $user->favorites()->where('position', $data['position'])->first();
        if($checkIfExists){
            $checkIfExists->update([
                'title' => $data['title'],
                'tmdb' => $data['tmdb'],
                'movie_id' => $movie->id
            ]);
            return back();
        }
        else{
            $movie->favorites()->create([...$data, 'user_id' => $user->id]);
            return back();
        }

    }

    public function destroy(int $id){
        $favorite = Favorite::find($id)->delete();
        return back();
    }
}
