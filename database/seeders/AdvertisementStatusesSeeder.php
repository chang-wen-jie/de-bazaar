<?php

namespace Database\Seeders;

use App\Enums\AdvertisementStatusEnum;
use App\Models\AdvertisementStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdvertisementStatusesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AdvertisementStatus::firstOrCreate(['name' => AdvertisementStatusEnum::ACTIVE->value]);
        AdvertisementStatus::firstOrCreate(['name' => AdvertisementStatusEnum::INACTIVE->value]);
        AdvertisementStatus::firstOrCreate(['name' => AdvertisementStatusEnum::EXPIRED->value]);
    }
}
