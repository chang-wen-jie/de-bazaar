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

    public function purchases(): HasMany
    {
        return $this->hasMany(Purchase::class);
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

    public static function hasReachedTypeLimit($userId, $typeId, $maxAllowed = 4): bool
    {
        $count = self::where('user_id', $userId)
            ->where('type_id', $typeId)
            ->whereHas('status', function($query) {
                $query->where('name', 'active');
            })
            ->count();

        return $count >= $maxAllowed;
    }

    public static function getCountsByTypeForUser($userId): array
    {
        $counts = [];

        $results = self::where('user_id', $userId)
            ->whereHas('status', function($query) {
                $query->where('name', 'active');
            })
            ->select('type_id', \DB::raw('count(*) as count'))
            ->groupBy('type_id')
            ->get();

        foreach ($results as $result) {
            $counts[$result->type_id] = $result->count;
        }

        return $counts;
    }
}
