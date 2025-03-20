<?php

namespace Database\Seeders;

use App\Models\Advertisement;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RolesSeeder::class,
            AdvertisementTypesSeeder::class,
            AdvertisementStatusesSeeder::class,
            RentalStatusesSeeder::class,
        ]);

        User::factory(20)->create();
        Advertisement::factory(20)->create();
    }
}
