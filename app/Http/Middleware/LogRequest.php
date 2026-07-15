<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class LogRequest
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        Log::channel('requestlog')->info('Incomming Request', [
            'method'    => $request->method(),
            'url'       => $request->fullUrl(),
            'path'      => $request->path(),
            'ip'        => $request->ip(),
            'user_agent'=> $request->userAgent(),
            'headers'   => collect($request->headers->all())
                ->except(['authorization', 'cookie'])
                ->toArray(),
            'query'       => $request->query(),
            'payload' => $request->except([
                'password', 'password_confirmation', 'token',
            ]),
            'user_id'   => optional($request->user())->id,
            'timestamp' => now()->toDateTimeString(),
        ]);

        return $response;
    }
}
