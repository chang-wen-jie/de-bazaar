<?php

namespace Tests\Browser;

use App\Enums\AdvertisementStatusEnum;
use App\Enums\AdvertisementTypeEnum;
use App\Models\Advertisement;
use App\Models\AdvertisementStatus;
use App\Models\AdvertisementType;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class CreateAdvertisementTest extends DuskTestCase
{
    use DatabaseMigrations;

    public function setUp(): void
    {
        parent::setUp();

        $statuses = [
            AdvertisementStatusEnum::ACTIVE,
            AdvertisementStatusEnum::INACTIVE,
            AdvertisementStatusEnum::EXPIRED,
        ];

        foreach ($statuses as $status) {
            AdvertisementStatus::create([
                'name' => $status
            ]);
        }

        $types = [
            AdvertisementTypeEnum::SALE,
            AdvertisementTypeEnum::AUCTION,
            AdvertisementTypeEnum::RENTAL,
        ];

        foreach ($types as $type) {
            AdvertisementType::create([
                'name' => $type
            ]);
        }
    }

    public function test_create_advertisement_form(): void
    {
        $user = User::factory()->create([
            'role_id' => Role::first()->id
        ]);

        $this->browse(function (Browser $browser) use ($user) {
            $browser->loginAs($user)
                ->visit('/advertisements/create/new')
                ->assertSee(trans('messages.create_advertisement_header'))
                ->assertVisible('form')
                ->assertVisible('#title')
                ->assertVisible('#description')
                ->assertVisible('#price')
                ->assertVisible('#type_id')
                ->assertVisible('#start_date')
                ->assertVisible('#end_date');
        });
    }

    public function test_can_create_advertisement(): void
    {
        $user = User::factory()->create([
            'role_id' => Role::first()->id
        ]);
        $type = AdvertisementType::first();

        $tomorrow = now()->addDay()->format('d-m-Y');
        $nextWeek = now()->addWeek()->format('d-m-Y');

        $this->browse(function (Browser $browser) use ($user, $type, $tomorrow, $nextWeek) {
            $browser->loginAs($user)
                ->visit('/advertisements/create/new')
                ->type('#title', 'Test Advertisement')
                ->type('#description', 'This is a test advertisement description')
                ->type('#price', '99.99')
                ->select('#type_id', $type->id)
                ->type('#start_date', $tomorrow)
                ->type('#end_date', $nextWeek)
                ->press(trans('messages.create_advertisement_button'))
                ->assertPathBeginsWith('/advertisements/')
                ->pause(1000)
                ->assertSee('Advertisement created successfully!');
        });
    }

    public function test_validation_errors(): void
    {
        $user = User::factory()->create([
            'role_id' => Role::first()->id
        ]);

        $this->browse(function (Browser $browser) use ($user) {
            $browser->loginAs($user)
                ->visit('/advertisements/create/new')
                // Disable HTML5 validation using JavaScript before submitting
                ->script('document.querySelector("form").setAttribute("novalidate", "novalidate");');

            // Submit the form
            $browser->press(trans('messages.create_advertisement_button'))
                ->pause(500)
                ->assertSee('The title field is required')
                ->assertSee('The description field is required')
                ->assertSee('The price field is required')
                ->assertSee('The type id field is required')
                ->assertPathIs('/advertisements/create/new');
        });
    }

    public function test_advertisement_limit_restriction(): void
    {
        $user = User::factory()->create([
            'role_id' => Role::first()->id
        ]);
        $type = AdvertisementType::first();

        for ($i = 0; $i < 4; $i++) {
            $this->createAdvertisement($user->id, $type->id);
        }

        $tomorrow = now()->addDay()->format('d-m-Y');
        $nextWeek = now()->addWeek()->format('d-m-Y');

        $this->browse(function (Browser $browser) use ($user, $type, $tomorrow, $nextWeek) {
            $browser->loginAs($user)
                ->visit('/advertisements/create/new')
                ->type('#title', 'One Too Many')
                ->type('#description', 'This should exceed the limit')
                ->type('#price', '50.00')
                ->select('#type_id', $type->id)
                ->type('#start_date', $tomorrow)
                ->type('#end_date', $nextWeek)
                ->press(trans('messages.create_advertisement_button'))
                ->waitFor('.text-red-700', 10)
                ->assertSee('You can only have 4 active advertisements')
                ->assertPathIs('/advertisements/create/new');
        });
    }

    private function createAdvertisement($userId, $typeId)
    {
        $statusId = AdvertisementStatus::where('name', AdvertisementStatusEnum::ACTIVE)->first()->id;

        return Advertisement::create([
            'user_id' => $userId,
            'type_id' => $typeId,
            'status_id' => $statusId,
            'title' => 'Existing Advertisement',
            'description' => 'This is an existing advertisement',
            'price' => 25.00,
            'start_date' => now(),
            'end_date' => now()->addDays(7),
        ]);
    }
}
