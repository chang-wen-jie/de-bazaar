<?php

namespace Tests\Browser;

use App\Models\Advertisement;
use App\Models\AdvertisementStatus;
use App\Models\AdvertisementType;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class PurchaseAdvertisementTest extends DuskTestCase
{
    use DatabaseMigrations;

    public function setUp(): void
    {
        parent::setUp();

        $this->artisan('db:seed');
    }

    public function testUserCanPurchaseAnAdvertisement()
    {
        $seller = User::factory()->create();
        $buyer = User::factory()->create();

        $saleTypeId = AdvertisementType::where('name', 'sale')->first()->id;
        $activeStatusId = AdvertisementStatus::where('name', 'active')->first()->id;

        $advertisement = Advertisement::factory()->create([
            'user_id' => $seller->id,
            'type_id' => $saleTypeId,
            'status_id' => $activeStatusId,
            'title' => 'Test Product For Sale',
            'description' => 'This is a test product for sale.',
            'price' => 100.00,
            'start_date' => now(),
            'end_date' => now()->addDays(30),
        ]);

        $this->browse(function (Browser $browser) use ($advertisement, $buyer) {
            $browser->loginAs($buyer)
                ->visit('/advertisements/' . $advertisement->id)
                ->assertSee('Test Product For Sale')
                ->assertSee('€ 100')
                ->assertSee('sale')
                ->press('Buy Now')
                ->waitForText('Item purchased successfully')
                ->assertSee('Item purchased successfully');

            $this->assertEquals(
                'inactive',
                $advertisement->fresh()->status->name->value
            );

            $this->assertDatabaseHas('purchases', [
                'advertisement_id' => $advertisement->id,
                'user_id' => $buyer->id,
            ]);
        });
    }

    public function testUserCanRentAnAdvertisement()
    {
        $seller = User::factory()->create();
        $renter = User::factory()->create();

        $rentalTypeId = AdvertisementType::where('name', 'rental')->first()->id;
        $activeStatusId = AdvertisementStatus::where('name', 'active')->first()->id;

        $advertisement = Advertisement::factory()->create([
            'user_id' => $seller->id,
            'type_id' => $rentalTypeId,
            'status_id' => $activeStatusId,
            'title' => 'Test Product For Rent',
            'description' => 'This is a test product for rent.',
            'price' => 20.00,
            'start_date' => now(),
            'end_date' => now()->addDays(30),
        ]);

        $this->browse(function (Browser $browser) use ($advertisement, $renter) {
            $browser->loginAs($renter)
                ->visit('/advertisements/' . $advertisement->id)
                ->assertSee('Test Product For Rent')
                ->assertSee('€ 20')
                ->assertSee('rental')
                ->press('Rent Now')
                ->waitForText('Item purchased successfully')
                ->assertSee('Item purchased successfully');

            $this->assertEquals(
                'inactive',
                $advertisement->fresh()->status->name->value
            );

            $this->assertDatabaseHas('rentals', [
                'advertisement_id' => $advertisement->id,
                'user_id' => $renter->id,
            ]);
        });
    }

    public function testUserCannotPurchaseOwnAdvertisement()
    {
        $owner = User::factory()->create();

        $saleTypeId = AdvertisementType::where('name', 'sale')->first()->id;
        $activeStatusId = AdvertisementStatus::where('name', 'active')->first()->id;

        $advertisement = Advertisement::factory()->create([
            'user_id' => $owner->id,
            'type_id' => $saleTypeId,
            'status_id' => $activeStatusId,
            'title' => 'Test Product',
            'description' => 'This is a test product.',
            'price' => 100.00,
            'start_date' => now(),
            'end_date' => now()->addDays(30),
        ]);

        $this->browse(function (Browser $browser) use ($advertisement, $owner) {
            $browser->loginAs($owner)
                ->visit('/advertisements/' . $advertisement->id)
                ->assertSee('Test Product')
                ->assertSee('You own this')
                ->assertDontSee('Buy Now');

            $this->assertFalse(
                $browser->element('button:contains("Buy Now")') !== null,
                'Purchase button should not be visible to the owner'
            );
        });
    }

    public function testUserCannotPurchaseInactiveAdvertisement()
    {
        $seller = User::factory()->create();
        $buyer = User::factory()->create();

        $saleTypeId = AdvertisementType::where('name', 'sale')->first()->id;
        $inactiveStatusId = AdvertisementStatus::where('name', 'inactive')->first()->id;

        $advertisement = Advertisement::factory()->create([
            'user_id' => $seller->id,
            'type_id' => $saleTypeId,
            'status_id' => $inactiveStatusId,
            'title' => 'Inactive Test Product',
            'description' => 'This is an inactive test product.',
            'price' => 100.00,
            'start_date' => now(),
            'end_date' => now()->addDays(30),
        ]);

        $this->browse(function (Browser $browser) use ($advertisement, $buyer) {
            $browser->loginAs($buyer)
                ->visit('/advertisements/' . $advertisement->id)
                ->assertSee('Inactive Test Product')
                ->press('Buy Now')
                ->waitForText('This advertisement is no longer available')
                ->assertSee('This advertisement is no longer available');
        });
    }

    public function testVisitorCannotPurchaseAdvertisement()
    {
        $seller = User::factory()->create();

        $saleTypeId = AdvertisementType::where('name', 'sale')->first()->id;
        $activeStatusId = AdvertisementStatus::where('name', 'active')->first()->id;

        $advertisement = Advertisement::factory()->create([
            'user_id' => $seller->id,
            'type_id' => $saleTypeId,
            'status_id' => $activeStatusId,
            'title' => 'Test Product',
            'description' => 'This is a test product.',
            'price' => 100.00,
            'start_date' => now(),
            'end_date' => now()->addDays(30),
        ]);

        $this->browse(function (Browser $browser) use ($advertisement) {
            $browser->visit('/advertisements/' . $advertisement->id)
                ->assertPathIs('/login');
        });
    }

    public function testAdvertisementDetailsAreDisplayedCorrectly()
    {
        $seller = User::factory()->create([
            'first_name' => 'John',
            'last_name' => 'Doe',
        ]);
        $buyer = User::factory()->create();

        $saleTypeId = AdvertisementType::where('name', 'sale')->first()->id;
        $activeStatusId = AdvertisementStatus::where('name', 'active')->first()->id;

        $advertisement = Advertisement::factory()->create([
            'user_id' => $seller->id,
            'type_id' => $saleTypeId,
            'status_id' => $activeStatusId,
            'title' => 'Detailed Test Product',
            'description' => 'This is a detailed test product with specific description.',
            'price' => 149.99,
            'start_date' => now(),
            'end_date' => now()->addDays(30),
        ]);

        $this->browse(function (Browser $browser) use ($advertisement, $buyer, $seller) {
            $browser->loginAs($buyer)
                ->visit('/advertisements/' . $advertisement->id)
                ->assertSee('Detailed Test Product')
                ->assertSee('This is a detailed test product with specific description.')
                ->assertSee('€ 149.99')
                ->assertSee('sale')
                ->assertSee($seller->full_name);
        });
    }
}
