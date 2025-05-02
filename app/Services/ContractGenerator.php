<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\View;
use Barryvdh\DomPDF\Facade\Pdf;

class ContractGenerator
{
    /**
     * Generate a simple contract PDF for a user
     *
     * @param User $user
     * @return \Barryvdh\DomPDF\PDF
     */
    public function generateContract(User $user)
    {
        $data = [
            'user' => $user,
            'date' => now()->format('F d, Y'),
            'contract_id' => 'C-' . $user->id . '-' . now()->format('YmdHis'),
        ];

        $pdf = PDF::loadView('pdfs.user_contract', $data);
        return $pdf;
    }

    /**
     * Get the filename for the contract
     *
     * @param User $user
     * @return string
     */
    public function getFilename(User $user)
    {
        return 'user_contract_' . $user->id . '_' . now()->format('Ymd') . '.pdf';
    }
}
