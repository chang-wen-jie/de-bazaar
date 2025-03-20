<?php

namespace App\Models;

use App\Enums\AdvertisementStatusEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AdvertisementStatus extends Model
{
    protected $fillable = [
        'name',
    ];

    protected $casts = [
        'name' => AdvertisementStatusEnum::class,
    ];

    public function advertisements(): HasMany
    {
        return $this->hasMany(Advertisement::class);
    }
}
