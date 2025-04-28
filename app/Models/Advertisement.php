<?php

namespace App\Models;

use Database\Factories\AdvertisementFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Notifications\Notifiable;

class Advertisement extends Model
{
    /** @use HasFactory<AdvertisementFactory> */
    use HasFactory, Notifiable;

    protected $fillable = [
        'user_id',
        'type_id',
        'status_id',
        'title',
        'description',
        'price',
        'start_date',
        'end_date',
    ];

    public function getQrCodeImage()
    {
        $url = route('advertisements.show', $this->id);
        return \QrCode::size(100)->generate($url);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function type(): BelongsTo
    {
        return $this->belongsTo(AdvertisementType::class);
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(AdvertisementStatus::class);
    }

    public function bids(): HasMany
    {
        return $this->hasMany(Bid::class);
    }

    public function rentals(): HasMany
    {
        return $this->hasMany(Rental::class);
    }

    public function favorites(): HasMany
    {
        return $this->belongsToMany(User::class, 'advertisement_user_favorites', 'advertisement_id', 'user_id')->withTimestamps();
    }

    public function reviews(): MorphMany
    {
        return $this->morphMany(Review::class, 'reviewable');
    }
}
