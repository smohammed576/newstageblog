<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MovieController extends Controller
{
    public function index(){
        $movies = Movie::latest()->get();
    }

    public function show(int $id){
        return Inertia::render(
            'Movies/Movie', [
                'id' => $id
            ]
        );
    }

    public function upload(){
        return Inertia::render('Movies/Form');
    }

    public function store(Request $request){
        $data = $request->validate([
            'title' => 'required',
            'poster' => 'required',
            'tmdb' => 'required',
            'user_id' => 'required',
            'rating' => '',
            'watched' => '',
            'liked' => '',
            'rewatched' => ''
        ]);

        $movie = new Movie($data);
        $movie->save();

        return redirect()->route('blog.index');
    }
}
