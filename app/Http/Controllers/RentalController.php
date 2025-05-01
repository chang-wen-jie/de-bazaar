<?php

namespace App\Http\Controllers;

use App\Models\Rental;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class RentalController extends Controller
{
    public function index(): Response
    {
        $activeRentals = Rental::where('user_id', Auth::id())
            ->where('end_date', '>=', Carbon::now()->toDateString())
            ->with('advertisement')
            ->orderBy('start_date', 'asc')
            ->get();

        return Inertia::render('Rentals/Index', [
            'activeRentals' => $activeRentals,
        ]);
    }
}
