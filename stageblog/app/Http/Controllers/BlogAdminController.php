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
        $posts = Post::latest()->paginate(10);
        return Inertia::render(
            'Posts/Posts', [
                'posts' => $posts
            ]
        );
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
            'tagline' => 'required',
            'content' => 'required',
            'user_id' => 'required',
            'image' => 'required',
            'type' => '',
            'tags' => '',
            'views' => '',
            'stage' => 'required',
            'published' => 'required'
        ]);

        $post = new Post($data);
        $post->save();

        return redirect(route('posts.show', $post->id));
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $post = Post::where('id', $id)->get();
        return Inertia::render('Posts/Post', ['post' => $post]);
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
