<?php

namespace App\Http\Controllers;

use App\Models\Advertisement;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdvertisementController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Advertisement::with(['user', 'type', 'status']);

        if ($request->has('type')) {
            $query->whereHas('type', function ($q) use ($request) {
                $q->where('name', $request->type);
            });
        }

        if ($request->has('status')) {
            $query->whereHas('status', function ($q) use ($request) {
                $q->where('name', $request->status);
            });
        }

        if ($request->has('sortBy') && in_array($request->sortBy, ['title', 'price', 'start_date'])) {
            $query->orderBy($request->sortBy, $request->get('sortOrder', 'asc'));
        }

        $advertisements = $query->paginate(8)->appends($request->query());

        return Inertia::render('Advertisements/Index', [
           'advertisements' => $advertisements,
            'filters' => $request->only(['type', 'status', 'sortBy', 'sortOrder']),
        ]);
    }
}
