<?php

namespace Database\Factories;

use App\Models\AdvertisementStatus;
use App\Models\AdvertisementType;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Advertisement>
 */
class AdvertisementFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::whereIn('role_id', [2, 3])->inRandomOrder()->first()->id,
            'type_id' => AdvertisementType::inRandomOrder()->first()->id,
            'status_id' => AdvertisementStatus::inRandomOrder()->first()->id,
            'title' => fake()->sentence(5),
            'description' => fake()->paragraph(3),
            'price' => fake()->randomFloat(2, 10, 1000),
            'start_date' => fake()->dateTimeBetween('-1 month', '+1 month')->format('Y-m-d'),
            'end_date' => fake()->dateTimeBetween('+2 months', '+6 months')->format('Y-m-d'),
        ];
    }
}
