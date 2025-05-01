<?php

namespace App\Http\Controllers;

use App\Enums\AdvertisementTypeEnum;
use App\Enums\RoleEnum;
use App\Models\Advertisement;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
            'reviewable_id' => 'required|integer',
            'reviewable_type' => 'required|string',
        ]);

        $reviewableClass = $request->reviewable_type;
        $reviewableId = $request->reviewable_id;

        if (!in_array($reviewableClass, [User::class, Advertisement::class])) {
            return back()->with('error', 'Invalid reviewable entity.');
        }

        $reviewable = $reviewableClass::findOrFail($reviewableId);

        if ($reviewableClass === User::class && Auth::id() === $reviewable->id) {
            return back()->with('error', 'You cannot review yourself.');
        }

        if ($reviewableClass === User::class && $reviewable->role->name === RoleEnum::GUEST) {
            return back()->with('error', 'You can only review advertisers.');
        }

        if ($reviewableClass === Advertisement::class && $reviewable->type->name !== AdvertisementTypeEnum::RENTAL) {
            return back()->with('error', 'You can only review rental advertisements.');
        }

        $existingReview = Review::where('reviewable_type', $reviewableClass)
            ->where('reviewable_id', $reviewableId)
            ->where('reviewer_id', Auth::id())
            ->first();

        if ($existingReview) {
            return back()->with('error', 'You have already reviewed this entity.');
        }

        $reviewable->reviews()->create([
            'rating' => $validated['rating'],
            'comment' => $validated['comment'] ?? null,
            'reviewer_id' => Auth::id(),
        ]);

        return back()->with('success', 'Review posted successfully!');
    }
}
