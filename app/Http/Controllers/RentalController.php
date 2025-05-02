<?php

namespace App\Http\Controllers;

use App\Models\Rental;
use App\Models\Advertisement;
use App\Enums\RoleEnum;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class RentalController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();
        $isGuest = $user->hasRole(RoleEnum::GUEST);

        if ($isGuest) {
            // For guests: show their rented advertisements
            $rentals = Rental::where('user_id', $user->id)
                ->where('end_date', '>=', Carbon::now()->toDateString())
                ->with('advertisement')
                ->orderBy('start_date', 'asc')
                ->get();
        } else {
            // For other roles: show their advertisements that have been rented out
            $rentals = Rental::whereHas('advertisement', function ($query) use ($user) {
                $query->where('user_id', $user->id)
                    ->whereHas('type', function($query) {
                        $query->where('name', 'rental');
                    });
            })
                ->where('end_date', '>=', Carbon::now()->toDateString())
                ->with(['advertisement', 'user'])
                ->orderBy('start_date', 'asc')
                ->get();
        }

        return Inertia::render('Rentals/Index', [
            'rentals' => $rentals,
            'isGuest' => $isGuest,
        ]);
    }

    public function returnItem(Request $request, Rental $rental)
    {
        // Validate that this rental belongs to the authenticated user (if guest)
        if (Auth::user()->hasRole(RoleEnum::GUEST) && $rental->user_id !== Auth::id()) {
            abort(403, 'You are not authorized to return this item.');
        }

        // Validate request
        $request->validate([
            'return_photo' => 'required|image|max:2048',
        ]);

        $path = $request->file('return_photo')->store('return_photos', 'public');

        $wearAndTear = rand(0, 100) . '%';

        $rental->update([
            'return_photo' => $path,
            'wear_and_tear' => $wearAndTear,
        ]);

        return redirect()->route('rentals.index')->with('success', 'Item returned successfully. Wear and tear assessment: ' . $wearAndTear);
    }
}
