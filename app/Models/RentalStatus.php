<?php

namespace App\Models;

use App\Enums\RentalStatusEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RentalStatus extends Model
{
    protected $fillable = [
        'name',
    ];

    protected $casts = [
        'name' => RentalStatusEnum::class,
    ];

    public function rentals(): HasMany
    {
        return $this->hasMany(Rental::class);
    }
}
