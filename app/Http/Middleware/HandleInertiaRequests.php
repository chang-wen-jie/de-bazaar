<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $locale = session('locale', config('app.locale', 'en'));
        app()->setLocale($locale);

        app('translator')->setLoaded([]);
        $translations = trans()->get('messages');

        return array_merge(parent::share($request), [
            'auth' => function () use ($request) {
                return [
                    'user' => $request->user() ? [
                        'id' => $request->user()->id,
                        'email' => $request->user()->email,
                        'name' => $request->user()->name,
                        'role_id' => $request->user()->role_id,
                        'is_admin' => $request->user()->is_admin ?? false,
                        // Add other user fields you need globally
                    ] : null,
                ];
            },
            'flash' => function () use ($request) {
                return [
                    'success' => $request->session()->get('success'),
                    'error' => $request->session()->get('error'),
                    'locale_switched' => $request->session()->get('locale_switched'),
                ];
            },
            'locale' => $locale,
            'translations' => $translations,
        ]);
    }
}
