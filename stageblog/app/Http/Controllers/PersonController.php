<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PersonController extends Controller
{
    public function show(int $id){
        return Inertia::render('Person/Person', ['id' => $id]);
    }
}
