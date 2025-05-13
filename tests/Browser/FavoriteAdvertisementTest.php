<?php

namespace Tests\Browser;

use App\Models\Advertisement;
use App\Models\AdvertisementStatus;
use App\Models\AdvertisementType;
use App\Models\User;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class FavoriteAdvertisementTest extends DuskTestCase
{
    use DatabaseMigrations;

    public function setUp(): void
    {
        parent::setUp();
        $this->artisan('db:seed');
    }

    public function testUserCanToggleFavoriteStatus()
    {
        $seller = User::factory()->create();

        $activeStatus = AdvertisementStatus::where('name', 'active')->first() ??
            AdvertisementStatus::create(['name' => 'active']);

        $type = AdvertisementType::first() ??
            AdvertisementType::create(['name' => 'sale']);

        $advertisement = Advertisement::factory()->create([
            'user_id' => $seller->id,
            'status_id' => $activeStatus->id,
            'type_id' => $type->id,
            'title' => 'Test Advertisement',
            'description' => 'This is a test advertisement',
            'price' => 100.00,
            'start_date' => now(),
            'end_date' => now()->addDays(30),
        ]);

        $buyer = User::factory()->create();

        $this->browse(function (Browser $browser) use ($buyer, $advertisement) {
            $browser->loginAs($buyer)
                ->visit('/advertisements/' . $advertisement->id)
                ->assertSee($advertisement->title)
                ->assertSee('€ ' . $advertisement->price)
                ->assertVisible('button.bg-gray-100, button.bg-red-100')
                ->click('button.bg-gray-100, button.bg-red-100')
                ->waitUntilMissing('button.bg-gray-100')
                ->assertVisible('button.bg-red-100');

            $this->assertTrue($buyer->favorites()->where('advertisement_id', $advertisement->id)->exists());

            $browser->click('button.bg-red-100')
                ->waitUntilMissing('button.bg-red-100')
                ->assertVisible('button.bg-gray-100');

            $this->assertFalse($buyer->favorites()->where('advertisement_id', $advertisement->id)->exists());
        });
    }

    public function testFavoritedAdvertisementsAppearInFavoritesPage()
    {
        $seller = User::factory()->create();

        $activeStatus = AdvertisementStatus::where('name', 'active')->first() ??
            AdvertisementStatus::create(['name' => 'active']);

        $type = AdvertisementType::first() ??
            AdvertisementType::create(['name' => 'sale']);

        $advertisement = Advertisement::factory()->create([
            'user_id' => $seller->id,
            'status_id' => $activeStatus->id,
            'type_id' => $type->id,
            'title' => 'Unique Test Advertisement',
            'description' => 'This is a unique test advertisement',
            'price' => 150.00,
            'start_date' => now(),
            'end_date' => now()->addDays(30),
        ]);

        $buyer = User::factory()->create();

        $buyer->favorites()->create([
            'advertisement_id' => $advertisement->id
        ]);

        $this->browse(function (Browser $browser) use ($buyer, $advertisement) {
            $browser->loginAs($buyer)
                ->visit('/favorites')
                ->assertSee($advertisement->title)
                ->assertSee('€ ' . $advertisement->price);
        });
    }

    public function testOwnerCannotFavoriteOwnAdvertisement()
    {
        $seller = User::factory()->create();

        $activeStatus = AdvertisementStatus::where('name', 'active')->first() ??
            AdvertisementStatus::create(['name' => 'active']);

        $type = AdvertisementType::first() ??
            AdvertisementType::create(['name' => 'sale']);

        $advertisement = Advertisement::factory()->create([
            'user_id' => $seller->id,
            'status_id' => $activeStatus->id,
            'type_id' => $type->id,
            'title' => 'Owner Test Advertisement',
            'description' => 'This is an owner test advertisement',
            'price' => 200.00,
            'start_date' => now(),
            'end_date' => now()->addDays(30),
        ]);

        $this->browse(function (Browser $browser) use ($seller, $advertisement) {
            $browser->loginAs($seller)
                ->visit('/advertisements/' . $advertisement->id)
                ->assertSee($advertisement->title)
                ->assertSee('You own this');

            $this->assertFalse(
                $browser->element('button.bg-gray-100, button.bg-red-100') !== null,
                'Favorite button should not be visible to the owner'
            );
        });
    }
}
