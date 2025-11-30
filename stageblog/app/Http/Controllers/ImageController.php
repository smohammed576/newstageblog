<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function store(Request $request){
        $request->validate([
            'image' => 'required'
        ]);
        $path = $request->file('image')->store('avatars', 'public');


        $user = auth()->user();
        $user->image = '/'.'storage/'.$path;
        $user->save();
        // dd($path);
        return back()->with('status', $path);
    }
}
