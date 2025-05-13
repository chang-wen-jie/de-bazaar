<?php

namespace App\Http\Controllers;

use App\Models\Advertisement;
use App\Models\AdvertisementStatus;
use App\Models\AdvertisementType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class AdvertisementController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Advertisement::with(['user', 'type', 'status'])
            ->where('user_id', '!=', Auth::id())
            ->whereHas('status', function ($q) {
                $q->where('name', 'active');
            });

        if ($request->has('type')) {
            $query->whereHas('type', function ($q) use ($request) {
                $q->where('name', $request->type);
            });
        }

        if ($request->has('sortBy') && in_array($request->sortBy, ['title', 'price'])) {
            $query->orderBy($request->sortBy, $request->get('sortOrder', 'asc'));
        }

        $advertisements = $query->paginate(8)->appends($request->query());

        $userCanCreate = true;

        if (Auth::check()) {
            $favoriteIds = Auth::user()->favorites()->pluck('advertisement_id')->toArray();

            foreach ($advertisements as $advertisement) {
                $advertisement->isFavorited = in_array($advertisement->id, $favoriteIds);
            }

            $types = AdvertisementType::pluck('id')->toArray();
            $userCounts = Advertisement::getCountsByTypeForUser(Auth::id());

            $userCanCreate = false;
            foreach ($types as $typeId) {
                $count = $userCounts[$typeId] ?? 0;
                if ($count < 4) {
                    $userCanCreate = true;
                    break;
                }
            }
        }

        return Inertia::render('Advertisements/Index', [
            'advertisements' => $advertisements,
            'filters' => $request->only(['type', 'sortBy', 'sortOrder']),
            'userCanCreate' => $userCanCreate,
            'flash' => [
                'success' => session('success'),
                'error' => session('error')
            ],
        ]);
    }

    public function show(Advertisement $advertisement): Response
    {
        $advertisement->load(['user', 'type', 'reviews.reviewer']);

        $averageRating = $advertisement->reviews->avg('rating') ?: 0;

        $isFavorited = false;
        $hasReviewed = false;

        if (Auth::check()) {
            $isFavorited = Auth::user()->favorites()
                ->where('advertisement_id', $advertisement->id)
                ->exists();

            $hasReviewed = $advertisement->reviews()
                ->where('reviewer_id', Auth::id())
                ->exists();
        }

        return Inertia::render('Advertisements/Show', [
            'advertisement' => $advertisement,
            'averageRating' => $averageRating,
            'reviewCount' => $advertisement->reviews->count(),
            'isFavorited' => $isFavorited,
            'hasReviewed' => $hasReviewed,
            'currentUserId' => Auth::id(),
            'translations' => trans('messages'), // Add translations to match the Create component
            'flash' => [
                'success' => session('success'),
                'error' => session('error')
            ],
        ]);
    }

    public function create(): Response
    {
        $types = AdvertisementType::all();

        $userId = Auth::id();
        $userAdCounts = Advertisement::getCountsByTypeForUser($userId);

        return Inertia::render('Advertisements/Create', [
            'types' => $types,
            'userCounts' => $userAdCounts,
            'translations' => trans('messages'),
            'flash' => [
                'success' => session('success'),
                'error' => session('error')
            ],
            'errors' => session('errors') ? session('errors')->getBag('default')->getMessages() : (object) [],
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'price' => 'required|numeric|min:0',
                'type_id' => 'required|exists:advertisement_types,id',
                'start_date' => 'required|date',
                'end_date' => 'required|date|after_or_equal:start_date',
            ]);

            $userId = Auth::id();
            $typeId = $request->type_id;

            $activeStatus = AdvertisementStatus::where('name', 'active')->first();

            if (!$activeStatus) {
                throw new \Exception("Status 'active' not found in the database.");
            }

            $maxAllowed = 4;
            if (Advertisement::hasReachedTypeLimit($userId, $typeId, $maxAllowed)) {
                return redirect()->back()->withErrors([
                    'limit_reached_title' => "You can only have {$maxAllowed} active advertisements"
                ]);
            }

            $advertisement = Advertisement::create([
                'user_id' => $userId,
                'status_id' => $activeStatus->id,
                ...$validated,
            ]);

            return redirect()->route('advertisements.show', $advertisement->id)
                ->with('success', 'Advertisement created successfully!');

        } catch (\Exception $e) {
            Log::error('Advertisement creation failed', [
                'error' => $e->getMessage(),
                'user_id' => Auth::id(),
                'input' => $request->all()
            ]);

            return redirect()->back()
                ->with('error', 'Er is een fout opgetreden bij het aanmaken van de advertentie. Probeer het later opnieuw.');
        }
    }
}
