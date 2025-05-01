<?php

namespace Database\Seeders;

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
            UserSeeder::class,
            AdvertisementSeeder::class,
            ReviewSeeder::class,
        ]);
    }
}
