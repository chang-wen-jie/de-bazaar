<?php

namespace Database\Seeders;

use App\Enums\RentalStatusEnum;
use App\Models\RentalStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RentalStatusesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RentalStatus::firstOrCreate(['name' => RentalStatusEnum::ACTIVE->value]);
        RentalStatus::firstOrCreate(['name' => RentalStatusEnum::COMPLETED->value]);
        RentalStatus::firstOrCreate(['name' => RentalStatusEnum::CANCELLED->value]);
    }
}
