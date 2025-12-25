<?php

namespace App\Http\Controllers;

use App\Enums\ActivityType;
use App\Models\Post;
use App\Models\User;
use App\Services\ActivityService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $all = Post::with('user')->latest()->get();
        $posts = Post::with('user')->latest()->paginate(10);
        return Inertia::render(
            'Posts/Posts', [
                'posts' => $posts
                // 'all' => $all
            ]
        );
    }

    public function stage(int $stage)
    {
        $posts = Post::with('user')->where('stage', $stage)->latest()->paginate(5);
        return Inertia::render(
            'Posts/Posts', [
                'posts' => $posts
            ]
        )->with('status', 'hasFilter');
    }

    public function filter(string $tag)
    {
        $posts = Post::with('user')->whereJsonContains('tags', $tag)->latest()->paginate(5);
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
        $data = $this->validateData($request);
        $user = auth()->user();
        $post = $user->posts()->create($data);
        ActivityService::log(ActivityType::CREATED_POST, $post, null, [], false);

        $users = User::pluck('email');
        foreach($users as $email){
            mail($email, 'New post', $post->title);
        };

        return redirect(route('posts.show', $post));
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $ids = [3, 4];
        if(auth()->check() && in_array(auth()->id(), $ids)){
            $post->increment('views');
        }
        $prev = Post::where('id', $post->id - 1)->first();
        $post = Post::with(['user', 'comments.user', 'comments.actions'])->findOrFail($post->id);
        $next = Post::where('id', $post->id + 1)->first();
        if(auth()->id() != 1){
            ActivityService::log(ActivityType::VIEWED_POST, $post);
        }
        return Inertia::render('Posts/Post', [
            'post' => $post,
            'comments' => $post->comments(),
            'prev' => $prev,
            'next' => $next
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        return Inertia::render('Posts/Form', [
            'post' => $post
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $this->validateData($request);
        $post = Post::find($id);
        $post->update($data);
        $post->save();

        return redirect(route('posts.show', $post));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $post = Post::find($id);
        $post->delete();

        return redirect(route('blog.index'));
    }

    protected function validateData(Request $request){
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
        return $data;
    }
}
