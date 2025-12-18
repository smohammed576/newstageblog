<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\ActionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\DiaryController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\HourController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BlogAdminController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ShowController;
use App\Http\Controllers\WatchlistController;
use App\Http\Middleware\Role;
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

Route::get('/test', function (){
    return 'yuh';
});
    // Route::middleware([Role::class. ':admin'])->post('/hours', [HourController::class, 'store'])->name('hours.store');

// // Route::get('/', [BlogController::class, 'index'])->name('index');
// Route::get('/', function (){
//     return redirect(route('blog.index'));
// })->middleware(['auth', 'verified'])->name('index');
// Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
// Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// Route::get('/profile/{id}', [ProfileController::class, 'show'])->name('profile.show');

Route::middleware('auth')->group(function () {
    //home
    Route::get('/', [BlogController::class, 'index'])->name('blog.index');

    //register
    Route::middleware([Role::class. ':admin'])->group(function(){
        Route::get('register', [RegisteredUserController::class, 'create'])
            ->name('register');
    
        Route::post('register', [RegisteredUserController::class, 'store']);
    });


    //settings + profile
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::get('/profile/{user:slug}', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('/settings', [ProfileController::class, 'settings'])->name('profile.settings');
    
    
    //diaries
    Route::middleware([Role::class. ':admin'])->group(function(){
        Route::get('/diary', [DiaryController::class, 'upload'])->name('diaries.upload');
    });
    Route::post('/diary', [DiaryController::class, 'store'])->name('diaries.store');
    Route::patch('/diary/{id}', [DiaryController::class, 'update'])->name('diaries.update');
    Route::delete('/diary/{id}', [DiaryController::class, 'destroy'])->name('diaries.destroy');
    Route::get('/profile/{user:slug}/diary', [DiaryController::class, 'index'])->name('diaries.index');

    //posts
    Route::middleware([Role::class. ':admin'])->group(function(){
        Route::resource('posts', BlogAdminController::class);
    });
    Route::get('/posts/stage/{stage}', [BlogAdminController::class, 'stage'])->name('posts.stage');
    Route::get('/posts/filter/{tag}', [BlogAdminController::class, 'filter'])->name('posts.filter');
    Route::get('posts/{post:slug}', [BlogAdminController::class, 'show'])->name('posts.show');
    Route::get('posts', [BlogAdminController::class, 'index'])->name('posts.index');

    //comments
    Route::post('/post/{post}/comment', [CommentController::class, 'store'])->name('comments.store');

    //watchlist
    Route::post('/watchlist', [WatchlistController::class, 'store'])->name('watchlist.store');
    Route::get('/{user:slug}/watchlist', [WatchlistController::class, 'show'])->name('watchlist.show');
    Route::delete('/watchlist/{id}', [WatchlistController::class, 'destroy'])->name('watchlist.destroy');


    //favorites
    Route::post('/favorite', [FavoriteController::class, 'store'])->name('favorites.store');
    Route::delete('/favorite', [FavoriteController::class, 'destroy'])->name('favorites.destroy');

    //about
    Route::get('/about', [AboutController::class, 'index'])->name('about.index');

    //hours
    Route::middleware([Role::class. ':admin'])->group(function(){
        Route::post('/hours', [HourController::class, 'store'])->name('hours.store');
    });

    //movies
    Route::get('/movie/{id}', [MovieController::class, 'show'])->name('movies.show');
    Route::post('/movie', [MovieController::class, 'store'])->name('movies.store');
    Route::patch('/movie/{id}', [MovieController::class, 'update'])->name('movies.update');

    //shows
    Route::get('/show/{id}', [ShowController::class, 'show'])->name('shows.show');
    Route::post('/show', [ShowController::class, 'store'])->name('shows.store');
    Route::delete('/show', [ShowController::class, 'destroy'])->name('shows.destroy');


    //images
    Route::middleware([Role::class. ':admin'])->group(function(){
        Route::get('/image/upload', [ImageController::class, 'upload'])->name('images.upload');
        Route::get('/image', [ImageController::class, 'index'])->name('images.index');
    });
    Route::post('/settings/upload/{type}', [ImageController::class, 'store'])->name('images.store');


    //actions
    Route::post('/comments/{comments}/action', [ActionController::class, 'store'])->name('actions.store');
    Route::delete('/comments/{comments}/action', [ActionController::class, 'destroy'])->name('actions.destroy');

    
    //person
    Route::get('/person/{id}', [PersonController::class, 'show'])->name('person.show');



    // Route::resources([
    //     'posts' => BlogAdminController::class
    // ], [
    //     'middleware' => [Role::class. ':admin']
    // ]);

    // Route::resource('posts', BlogAdminController::class)->middleware([Role::class.':admin'])->except(['get']);
// Route::middleware('role:admin')->resource('posts', BlogAdminController::class)->except(['index', 'show']);

    // Route::middleware([Role::class. ':admin'])->group(function () {
    // });


});

require __DIR__.'/auth.php';
