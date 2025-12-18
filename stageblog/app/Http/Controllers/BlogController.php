<?php

namespace App\Http\Controllers;

use App\Models\Diary;
use App\Models\Post;
use App\Models\Hour;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

class BlogController extends Controller
{
    public function index(){
        $posts = Post::latest()->take(3)->get();
        $totalhours = 800;
        $hours = Hour::where('stage', 2)->sum('hours');
        $remaininghours = max($totalhours - $hours, 0);
        $diaries = Diary::with(['movie', 'user'])->latest()->take(6)->get();
        return Inertia::render('Home', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'posts' => $posts,
            'hours' => $hours,
            'remaininghours' => $remaininghours,
            'diaries' => $diaries
        ]);
    }
}
