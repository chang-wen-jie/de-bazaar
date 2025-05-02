<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ContractController extends Controller
{
    /**
     * Display a listing of the contracts.
     */
    public function index(): Response
    {
        $contracts = Contract::with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Contracts/Index', [
            'contracts' => $contracts,
        ]);
    }

    public function create(): Response
    {
        $users = User::select('id', 'first_name', 'infix', 'last_name')
            ->orderBy('first_name')
            ->get()
            ->map(function ($user) {
                $fullName = $user->first_name;
                if ($user->infix) {
                    $fullName .= ' ' . $user->infix;
                }
                $fullName .= ' ' . $user->last_name;

                return [
                    'id' => $user->id,
                    'name' => $fullName
                ];
            });

        return Inertia::render('Contracts/Create', [
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'contract_file' => 'required|file|mimes:pdf,doc,docx|max:10240',
        ]);

        $path = $request->file('contract_file')->store('contracts', 'public');

        Contract::create([
            'user_id' => $validated['user_id'],
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'file_path' => $path,
        ]);

        return redirect()->route('contracts.index')
            ->with('success', 'Contract uploaded successfully');
    }

    public function show(Contract $contract): Response
    {
        $contract->load('user');

        return Inertia::render('Contracts/Show', [
            'contract' => $contract,
        ]);
    }

    public function download(Contract $contract)
    {
        return Storage::disk('public')->download($contract->file_path,
            str_replace(' ', '_', $contract->title) . '_' . $contract->user->last_name . '.pdf');
    }

    public function destroy(Contract $contract)
    {
        Storage::disk('public')->delete($contract->file_path);

        $contract->delete();

        return redirect()->route('contracts.index')
            ->with('success', 'Contract deleted successfully');
    }
}
