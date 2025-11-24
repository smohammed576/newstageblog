<?php

use App\Http\Controllers\MovieController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BlogAdminController;
use App\Http\Controllers\BlogController;
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

Route::get('/', [BlogController::class, 'index'])->name('index');

Route::middleware('auth')->group(function () {
    // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
    Route::get('/movie', [MovieController::class, 'upload'])->name('movie.upload');
    Route::get('/movie/{id}', [MovieController::class, 'show'])->name('movie.show');
    Route::post('/movie', [MovieController::class, 'store'])->name('movie.store');
    Route::get('/profile/{id}', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('/settings', [ProfileController::class, 'settings'])->name('profile.settings');

    Route::resources([
        'posts' => BlogAdminController::class
    ]);

});

require __DIR__.'/auth.php';
