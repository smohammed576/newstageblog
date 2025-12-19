<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Role
{
    public function handle(Request $request, Closure $next, ...$role): Response
    {
        // dd($role);
        // request->user()->hasRole($role)){
        //     return $next($request);
        // }
        if(auth()->check() && $request->user()->hasAnyRole($role)){
            return $next($request);
        }
        return redirect('/');
    }
}
