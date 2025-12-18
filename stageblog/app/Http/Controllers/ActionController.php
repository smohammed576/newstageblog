<?php

namespace App\Http\Controllers;

use App\Models\Action;
use App\Models\Comment;
use Illuminate\Http\Request;

class ActionController extends Controller
{
    public function store(Request $request, $id)
    {
        $data = $request->validate([
            'like' => 'required'
        ]);
        $comment = Comment::find($id);
        $checkIfExists = $comment->actions()->where('user_id', auth()->id())->first();
        if($checkIfExists){
            if($checkIfExists->like == $data['like']){
                $action = Action::find($checkIfExists->id);
                if($action->user_id == auth()->id()){
                    $action->delete();
                }
            }
            else{
                $checkIfExists->update([
                    'like' => $data['like']
                ]);
            }
        }
        else{
            $comment->actions()->create([
                'like' => $data['like'],
                'user_id' => auth()->id()
            ]);
        }
        return back();
    }

    public function destroy(int $id)
    {
        $action = Action::find($id);
        if($action->user_id == auth()->id()){
            $action->delete();
        }
        return back();
    }
}
