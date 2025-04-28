<?php

namespace App\Http\Controllers;

use App\Models\Advertisement;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class FavoriteController extends Controller
{
    public function toggle(Advertisement $advertisement): JsonResponse
    {
        $user = auth()->user();

        if ($user->favorites()->where('advertisement_id', $advertisement->id)->exists()) {
            $user->favorites()->where('advertisement_id', $advertisement->id)->delete();
            $favorited = false;
        } else {
            $user->favorites()->create([
                'advertisement_id' => $advertisement->id
            ]);
            $favorited = true;
        }

        return response()->json([
            'favorited' => $favorited
        ]);
    }

    public function index(): Response
    {
        $user = Auth::user();
        $favorites = $user->favorites()->with(['advertisement.type', 'advertisement.user'])->get();

        return Inertia::render('Favorites/Index', [
            'favorites' => $favorites->map(fn($favorite) => $favorite->advertisement)
        ]);
    }
}
