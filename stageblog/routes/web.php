<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\HourController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BlogAdminController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ShowController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/', function () {
//     // return Inertia::render('Home');
//     return redirect(route('blog.index'));
// })->middleware(['auth', 'verified'])->name('home');

// Route::get('/', [BlogController::class, 'index'])->name('index');
Route::get('/', function (){
    return redirect(route('blog.index'));
})->middleware(['auth', 'verified'])->name('index');

Route::middleware('auth')->group(function () {
    // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/', [BlogController::class, 'index'])->name('blog.index');
    Route::get('/movie', [MovieController::class, 'upload'])->name('movies.upload');
    Route::get('/movie/{id}', [MovieController::class, 'show'])->name('movies.show');
    Route::post('/movie', [MovieController::class, 'store'])->name('movies.store');
    Route::get('/profile/{id}', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('/settings', [ProfileController::class, 'settings'])->name('profile.settings');
    Route::post('/favorite', [FavoriteController::class, 'store'])->name('favorites.store');
    Route::delete('/favorite', [FavoriteController::class, 'destroy'])->name('favorites.destroy');
    Route::post('/post/{post}/comment', [CommentController::class, 'store'])->name('comments.store');
    Route::get('/about', [AboutController::class, 'index'])->name('about.index');
    Route::post('/hours', [HourController::class, 'store'])->name('hours.store');
    Route::get('/posts/stage/{stage}', [BlogAdminController::class, 'stage'])->name('posts.stage');
    Route::get('/posts/filter/{tag}', [BlogAdminController::class, 'filter'])->name('posts.filter');
    Route::get('/show/{id}', [ShowController::class, 'show'])->name('shows.show');
    Route::post('/show', [ShowController::class, 'store'])->name('shows.store');
    Route::delete('/show', [ShowController::class, 'destroy'])->name('shows.destroy');
    Route::post('/settings/upload', [ImageController::class, 'store'])->name('images.store');

    Route::resources([
        'posts' => BlogAdminController::class
    ]);

});

require __DIR__.'/auth.php';
