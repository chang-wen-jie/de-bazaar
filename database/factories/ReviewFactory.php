<?php

namespace Database\Factories;

use App\Models\Advertisement;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        if ($this->faker->boolean(50)) {
            $reviewable = User::whereIn('role_id', [2, 3])->inRandomOrder()->first();
            $reviewableType = User::class;
        } else {
            $reviewable = Advertisement::where('type_id', 3)->inRandomOrder()->first();
            $reviewableType = Advertisement::class;
        }

        return [
            'reviewer_id' => User::inRandomOrder()->first()->id,
            'reviewable_id' => $reviewable->id,
            'reviewable_type' => $reviewableType,
            'rating' => $this->faker->numberBetween(1, 5),
            'comment' => $this->faker->sentence(),
        ];
    }
}
