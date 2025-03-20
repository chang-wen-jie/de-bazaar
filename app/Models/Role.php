<?php

namespace App\Models;

use App\Enums\RoleEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @method static where(string $string, RoleEnum $BUSINESS_ADVERTISER)
 */
class Role extends Model
{
    protected $fillable = [
      'name',
    ];

    protected $casts = [
        'name' => RoleEnum::class,
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
