<?php

use App\Http\Controllers\AdvertisementController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route(Auth::check() ? 'dashboard' : 'login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/users', [UserController::class, 'index'])->middleware(['auth'])->name('users.index');
Route::get('/users/{user}', [UserController::class, 'show'])->middleware(['auth'])->name('users.show');
Route::post('/users/{user}/reviews', [ReviewController::class, 'store'])->middleware(['auth'])->name('users.reviews.store');
Route::get('/advertisements', [AdvertisementController::class, 'index'])->middleware(['auth'])->name('advertisements.index');
Route::get('/advertisements/{advertisement}', [AdvertisementController::class, 'show'])->middleware(['auth'])->name('advertisements.show');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
