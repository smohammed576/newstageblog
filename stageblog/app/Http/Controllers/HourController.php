<?php

namespace App\Http\Controllers;

use App\Models\Hour;
use Illuminate\Http\Request;

class HourController extends Controller
{
    public function index(){
        $totalhours = 800;
        $logged = Hour::where('stage', 2)->sum('hours');
        if($logged < $totalhours){
            $remaining = max($totalhours - $logged, 0);
            return redirect(route('blog.index', compact('logged', 'remaining')));
        }
    }

    public function store(Request $request){
        $request->validate([
            'hours' => 'required',
            'stage' => 'required'
        ]);

        Hour::create($request->all());

        // return redirect()->route('blog.index');
        return back();
    }
}
