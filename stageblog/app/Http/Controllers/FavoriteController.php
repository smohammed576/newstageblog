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
            'poster' => 'required',
            'tmdb' => 'required',
            'position' => 'required'
        ]);
        
        $checkIfExists = $user->favorites()->where('position', $data['position'])->first();
        if($checkIfExists){
            $checkIfExists->update([
                'title' => $data['title'],
                'poster' => $data['poster'],
                'tmdb' => $data['tmdb']
            ]);
            return back();
        }
        else{
            $user->favorites()->create($data);
            return back();
        }

    }

    public function destroy(int $id){
        $favorite = Favorite::find($id)->delete();
        return back();
    }
}
