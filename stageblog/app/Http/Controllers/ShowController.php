<?php

namespace App\Http\Controllers;

use App\Models\Show;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShowController extends Controller
{

    public function show(int $id){
        return Inertia::render('Shows/Show', [
            'id' => $id
        ]);
    }
    public function store(Request $request){
        $user = auth()->user();
        $data = $request->validate([
            'name' => 'required',
            'poster' => 'required',
            'tmdb' => 'required',
            'position' => 'required'
        ]);
        
        $checkIfExists = $user->shows()->where('position', $data['position'])->first();
        if($checkIfExists){
            $checkIfExists->update([
                'name' => $data['name'],
                'poster' => $data['poster'],
                'tmdb' => $data['tmdb']
            ]);
            return back();
        }
        else{
            $user->shows()->create($data);
            return back();
        }

    }

    public function destroy(int $id){
        $show = Show::find($id)->delete();
        return back();
    }
}
