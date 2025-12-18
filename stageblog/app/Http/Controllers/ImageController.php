<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Storage;

class ImageController extends Controller
{
    public function index(){
        $files = Storage::disk('public')->files('images');
        return Inertia::render('Image/Images', ['files' => $files]);
    }
    public function upload(){
        return Inertia::render('Image/Form');
    }
    public function store(Request $request, string $type){
        $request->validate([
            'image' => 'required'
        ]);
        $path = $request->file('image')->store($type, 'public');

        if($type == 'avatars'){
            $user = auth()->user();
            $user->image = '/'.'storage/'.$path;
            $user->save();
        }
        return back()->with('status', $path);
    }
}
