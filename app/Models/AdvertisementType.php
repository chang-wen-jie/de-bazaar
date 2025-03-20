<?php

namespace App\Models;

use App\Enums\AdvertisementTypeEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AdvertisementType extends Model
{
    protected $fillable = [
        'name',
    ];

    protected $casts = [
        'name' => AdvertisementTypeEnum::class,
    ];

    public function advertisements(): HasMany
    {
        return $this->hasMany(Advertisement::class);
    }
}
