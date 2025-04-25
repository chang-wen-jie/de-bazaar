<?php

namespace App\Http\Controllers;

use App\Models\Advertisement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

        return Inertia::render('Advertisements/Index', [
           'advertisements' => $advertisements,
            'filters' => $request->only(['type', 'sortBy', 'sortOrder']),
        ]);
    }

    public function show(Advertisement $advertisement): Response
    {
        $advertisement->load(['user', 'type', 'status']);

//        if ($advertisement->status->name !== 'active' && $advertisement->user_id !== Auth::id()) {
//            abort(404);
//        }

        return Inertia::render('Advertisements/Show', [
            'advertisement' => $advertisement
        ]);
    }
}
