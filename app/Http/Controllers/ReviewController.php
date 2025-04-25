<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class ReviewController extends Controller
{
    public function store(Request $request, User $user)
    {
        // Validate the request
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
        ]);

        if (Auth::id() === $user->id) {
            return back()->with('error', 'You cannot review yourself.');
        }

        $existingReview = Review::where('user_id', $user->id)
            ->where('reviewer_id', Auth::id())
            ->first();

        if ($existingReview) {
            return back()->with('error', 'You have already reviewed this user.');
        }

        $user->reviews()->create([
            'comment' => $validated['rating'],
            'content' => $validated['content'],
            'reviewer_id' => Auth::id(),
        ]);

        return Redirect::route('users.show', $user->id)->with('success', 'Review posted successfully!');
    }
}
