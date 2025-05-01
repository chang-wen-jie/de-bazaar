<?php

use App\Http\Controllers\AdvertisementController;
use App\Http\Controllers\AdvertisementPurchaseController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QrCodeController;
use App\Http\Controllers\RentalController;
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
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/users/{user}', [UserController::class, 'show'])->name('users.show');

    Route::get('/advertisements', [AdvertisementController::class, 'index'])->name('advertisements.index');
    Route::get('/advertisements/{advertisement}', [AdvertisementController::class, 'show'])->name('advertisements.show');
    Route::get('/qr-code/{id}', [QrCodeController::class, 'show'])->name('qrcode.show');
    Route::post('/advertisements/{advertisement}/purchase', [AdvertisementPurchaseController::class, 'purchase'])->name('advertisements.purchase');
    Route::post('/advertisements/{advertisement}/favorite', [FavoriteController::class, 'toggle'])->name('advertisements.favorite.toggle');

    Route::get('/favorites', [FavoriteController::class, 'index'])->name('favorites.index');
    Route::post('/reviews/{type}/{id}', [ReviewController::class, 'store'])->name('reviews.store');

    Route::get('/rentals', [RentalController::class, 'index'])->name('rentals.index');
});

require __DIR__.'/auth.php';
