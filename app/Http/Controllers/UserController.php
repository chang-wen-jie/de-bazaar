<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        $users = User::with('role')->paginate(10);

        return Inertia::render('Users/Index', [
            'users' => $users,
        ]);
    }

    public function show(User $user): Response
    {
        $user->load([
            'role',
            'reviews.reviewer',
            'advertisements' => function($query) {
                $query->whereHas('status', function($q) {
                    $q->where('name', 'active');
                })->with('type');
            },
            'rentals.advertisement.type',
            'purchases.advertisement.type',
        ]);

        $averageRating = $user->reviews->avg('rating') ?? 0;
        $reviewCount = $user->reviews->count();
        $user->advertisements_count = $user->advertisements->count();

        $hasReviewed = Auth::check() && $user->reviews->where('reviewer_id', Auth::id())->count() > 0;

        $rentedListings = $user->rentals
            ->map(function($rental) {
                $ad = $rental->advertisement;
                if (!$ad) return null;
                $ad->rental_dates = [
                    'start' => $rental->start_date,
                    'end' => $rental->end_date,
                ];
                $ad->acquisition_type = 'rental';
                return $ad;
            })
            ->filter();

        $boughtListings = $user->purchases
            ->map(function($purchase) {
                $ad = $purchase->advertisement;
                if (!$ad) return null;
                $ad->purchase_date = $purchase->created_at;
                $ad->acquisition_type = 'purchase';
                return $ad;
            })
            ->filter();

        $allListings = $rentedListings
            ->merge($boughtListings)
            ->unique('id')
            ->values();

        return Inertia::render('Users/Show', [
            'user' => $user,
            'averageRating' => $averageRating,
            'reviewCount' => $reviewCount,
            'hasReviewed' => $hasReviewed,
            'currentUserId' => Auth::id(),
            'allListings' => $allListings,
        ]);
    }
}
