<?php

namespace App\Http\Controllers;

use App\Enums\AdvertisementStatusEnum;
use App\Enums\AdvertisementTypeEnum;
use App\Models\Advertisement;
use App\Models\Purchase;
use App\Models\Rental;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AdvertisementPurchaseController extends Controller
{
    public function purchase(Advertisement $advertisement)
    {
        if (!Auth::check()) {
            return response()->json([
                'message' => 'You must be logged in to perform this action',
            ], 403);
        }

        if ($advertisement->user_id === Auth::id()) {
            return response()->json([
                'message' => 'You cannot purchase your own advertisement',
            ], 403);
        }

        if ($advertisement->status->name !== AdvertisementStatusEnum::ACTIVE) {
            return response()->json([
                'message' => 'This advertisement is no longer available',
            ], 400);
        }

        try {
            DB::beginTransaction();

            $advertisement->load(['type']);

            $inactiveStatusId = DB::table('advertisement_statuses')
                ->where('name', 'inactive')
                ->value('id');

            if (!$inactiveStatusId) {
                throw new \Exception('Could not find inactive status');
            }

            $advertisement->status_id = $inactiveStatusId;
            $advertisement->save();

            $type = $advertisement->type->name;

            if ($advertisement->type->name === AdvertisementTypeEnum::RENTAL) {
                Rental::create([
                    'advertisement_id' => $advertisement->id,
                    'user_id' => Auth::id(),
                    'start_date' => now(),
                    'end_date' => now()->addDays(30),
                    'return_photo' => null,
                    'wear_and_tear' => null,
                ]);
            } elseif (in_array($type, [AdvertisementTypeEnum::SALE, AdvertisementTypeEnum::AUCTION])) {
                Purchase::create([
                    'advertisement_id' => $advertisement->id,
                    'user_id' => Auth::id(),
                ]);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => $advertisement->type->name === 'rental'
                    ? 'Item rented successfully'
                    : 'Item purchased successfully',
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'An error occurred: ' . $e->getMessage(),
            ], 500);
        }
    }
}
