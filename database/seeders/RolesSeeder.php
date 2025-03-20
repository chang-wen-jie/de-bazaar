<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::firstOrCreate(['name' => RoleEnum::GUEST->value]);
        Role::firstOrCreate(['name' => RoleEnum::PRIVATE_ADVERTISER->value]);
        Role::firstOrCreate(['name' => RoleEnum::BUSINESS_ADVERTISER->value]);
    }
}
