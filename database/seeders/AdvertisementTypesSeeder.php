<?php

namespace Database\Seeders;

use App\Enums\AdvertisementTypeEnum;
use App\Models\AdvertisementType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdvertisementTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AdvertisementType::firstOrCreate(['name' => AdvertisementTypeEnum::SALE->value]);
        AdvertisementType::firstOrCreate(['name' => AdvertisementTypeEnum::AUCTION->value]);
        AdvertisementType::firstOrCreate(['name' => AdvertisementTypeEnum::RENTAL->value]);
    }
}
