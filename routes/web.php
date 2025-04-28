<?php

use App\Http\Controllers\AdvertisementController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QrCodeController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route(Auth::check() ? 'dashboard' : 'login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/users', [UserController::class, 'index'])->middleware(['auth'])->name('users.index');
    Route::get('/users/{user}', [UserController::class, 'show'])->middleware(['auth'])->name('users.show');
    Route::get('/advertisements', [AdvertisementController::class, 'index'])->middleware(['auth'])->name('advertisements.index');
    Route::get('/advertisements/{advertisement}', [AdvertisementController::class, 'show'])->middleware(['auth'])->name('advertisements.show');
    Route::get('/qr-code/{id}', [QrCodeController::class, 'show'])->name('qrcode.show');
    Route::get('/favorites', [FavoriteController::class, 'index'])->name('favorites.index');
    Route::post('/advertisements/{advertisement}/favorite', [FavoriteController::class, 'toggle'])->name('advertisements.favorite.toggle');
    Route::post('/reviews/{type}/{id}', [ReviewController::class, 'store'])->name('reviews.store');
});

require __DIR__.'/auth.php';
