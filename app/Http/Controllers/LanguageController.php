<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class LanguageController extends Controller
{
    /**
     * Switch the application's locale
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $locale
     * @return \Illuminate\Http\RedirectResponse
     */
    public function switch(Request $request, $locale)
    {
        if (!in_array($locale, ['en', 'nl'])) {
            $locale = config('app.locale');
        }

        $oldLocale = session('locale');
        session(['locale' => $locale]);
        App::setLocale($locale);

        session()->flash('locale_switched', "Language switched from {$oldLocale} to {$locale}");

        return redirect()->back()->with([
            'x-inertia-request' => true,
            'force-refresh' => true
        ]);
    }
}
