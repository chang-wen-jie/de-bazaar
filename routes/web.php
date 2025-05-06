<?php

use App\Http\Controllers\AdvertisementController;
use App\Http\Controllers\AdvertisementPurchaseController;
use App\Http\Controllers\ContractController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\QrCodeController;
use App\Http\Controllers\RentalController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route(Auth::check() ? 'dashboard' : 'login');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/language/{locale}', [LanguageController::class, 'switch'])->name('language.switch');

    Route::middleware([AdminMiddleware::class])->group(function () {
        Route::get('/users', [UserController::class, 'index'])->name('users.index');
        Route::get('/users/{user}/contract', [UserController::class, 'downloadContract'])->name('users.contract');
    });
    Route::get('/users/{user}', [UserController::class, 'show'])->name('users.show');

    Route::get('/advertisements', [AdvertisementController::class, 'index'])->name('advertisements.index');
    Route::get('/advertisements/{advertisement}', [AdvertisementController::class, 'show'])->name('advertisements.show');
    Route::get('/advertisements/create/new', [AdvertisementController::class, 'create'])->name('advertisements.create');
    Route::get('/qr-code/{id}', [QrCodeController::class, 'show'])->name('qrcode.show');
    Route::post('/advertisements/{advertisement}/purchase', [AdvertisementPurchaseController::class, 'purchase'])->name('advertisements.purchase');
    Route::post('/advertisements/{advertisement}/favorite', [FavoriteController::class, 'toggle'])->name('advertisements.favorite.toggle');
    Route::post('/advertisements', [AdvertisementController::class, 'store'])->name('advertisements.store');

    Route::get('/favorites', [FavoriteController::class, 'index'])->name('favorites.index');
    Route::post('/reviews/{type}/{id}', [ReviewController::class, 'store'])->name('reviews.store');

    Route::get('/rentals', [RentalController::class, 'index'])->name('rentals.index');
    Route::post('/rentals/{rental}/return', [RentalController::class, 'returnItem'])->name('rentals.return');

    Route::get('/contracts', [ContractController::class, 'index'])->name('contracts.index');
    Route::get('/contracts/create', [ContractController::class, 'create'])->name('contracts.create');
    Route::post('/contracts', [ContractController::class, 'store'])->name('contracts.store');
    Route::get('/contracts/{contract}', [ContractController::class, 'show'])->name('contracts.show');
    Route::get('/contracts/{contract}/download', [ContractController::class, 'download'])->name('contracts.download');
    Route::delete('/contracts/{contract}', [ContractController::class, 'destroy'])->name('contracts.destroy');
});

require __DIR__.'/auth.php';
