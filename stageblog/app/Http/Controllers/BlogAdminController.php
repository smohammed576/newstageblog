<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $all = Post::latest()->get();
        $posts = Post::latest()->paginate(10);
        return Inertia::render(
            'Posts/Posts', [
                'posts' => $posts,
                'all' => $all
            ]
        );
    }

    public function stage(int $stage)
    {
        $posts = Post::where('stage', $stage)->latest()->paginate(5);
        return Inertia::render(
            'Posts/Posts', [
                'posts' => $posts
            ]
        )->with('status', 'hasFilter');
    }

    public function filter(string $tag)
    {
        $posts = Post::whereJsonContains('tags', $tag)->latest()->paginate(5);
        return Inertia::render(
            'Posts/Posts', [
                'posts' => $posts
            ]
        )->with('status', 'hasFilter');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Posts/Form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required',
            'intro' => 'required',
            'content' => 'required',
            'image' => 'required',
            'type' => '',
            'tags' => '',
            'views' => '',
            'stage' => 'required',
            'published' => 'required'
        ]);
        $user = auth()->user();
        $post = new Post($data);
        $user->posts()->create($data);

        return redirect(route('posts.show', $post->id));
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $post = Post::with(['user', 'comments.user'])->findOrFail($id);
        return Inertia::render('Posts/Post', [
            'post' => $post,
            'comments' => $post->comments()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
