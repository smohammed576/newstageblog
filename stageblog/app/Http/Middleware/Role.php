<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Role
{
    public function handle(Request $request, Closure $next, $role): Response
    {
        // dd($role);
        if(auth()->check() && $request->user()->hasRole($role)){
            return $next($request);
        }
        return redirect('/');
    }
}
