<?php

namespace App\Http\Controllers;

use App\Enums\ActivityType;
use App\Models\Post;
use App\Services\ActivityService;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, Post $post){
        $data = $request->validate([
            'comment' => 'required'
        ]);
        ActivityService::log(ActivityType::COMMENTED, $post, null, [], false);

        $post->comments()->create([
            'comment' => $data['comment'],
            'user_id' => auth()->id()
        ]);

        return back();
    }
}
