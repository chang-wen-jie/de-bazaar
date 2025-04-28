<?php

namespace Database\Seeders;

use App\Enums\AdvertisementTypeEnum;
use App\Models\Advertisement;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        // Get all users to be reviewed (excluding the reviewer)
        $usersToReview = $users->toArray();

        // Get only rental advertisements to review (based on validation logic in controller)
        $rentalAds = Advertisement::whereRelation('type', 'name', AdvertisementTypeEnum::RENTAL)->get();

        // Generate random reviews for users
        foreach ($users as $reviewer) {
            // Randomly select some users to review (excluding self)
            $randomUserCount = rand(1, min(5, count($users) - 1));
            $userIdsToReview = $users->reject(function ($user) use ($reviewer) {
                return $user->id === $reviewer->id;
            })->random($randomUserCount)->pluck('id');

            foreach ($userIdsToReview as $userIdToReview) {
                Review::create([
                    'reviewer_id' => $reviewer->id,
                    'reviewable_id' => $userIdToReview,
                    'reviewable_type' => User::class,
                    'rating' => rand(1, 5),
                    'comment' => $this->generateRandomComment(),
                ]);
            }

            // Randomly select some rental advertisements to review
            if ($rentalAds->count() > 0) {
                $randomAdCount = rand(1, min(3, $rentalAds->count()));
                $adIdsToReview = $rentalAds->random($randomAdCount)->pluck('id');

                foreach ($adIdsToReview as $adIdToReview) {
                    Review::create([
                        'reviewer_id' => $reviewer->id,
                        'reviewable_id' => $adIdToReview,
                        'reviewable_type' => Advertisement::class,
                        'rating' => rand(1, 5),
                        'comment' => $this->generateRandomComment(),
                    ]);
                }
            }
        }
    }
}
