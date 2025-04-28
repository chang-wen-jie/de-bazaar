<?php

namespace App\Http\Controllers;

use App\Models\Advertisement;
use Illuminate\Http\Request;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class QrCodeController extends Controller
{
    public function show($id)
    {
        $advertisement = Advertisement::findOrFail($id);
        $url = route('advertisements.show', $advertisement->id);

        return response(
            QrCode::size(200)
                ->format('svg')
                ->generate($url)
        )->header('Content-Type', 'image/svg+xml');
    }
}
