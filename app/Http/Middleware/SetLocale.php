<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $locale = session()->has('locale') ? session('locale') : config('app.locale');

        try {
            App::setLocale($locale);
        } catch (\Exception $e) {
            \Log::error("Failed to set locale: " . $e->getMessage());
            App::setLocale(config('app.locale'));
        }

        $response = $next($request);

        if (method_exists($response, 'withViewData')) {
            $response->withViewData(['locale' => $locale]);
        }

        return $response;
    }
}
