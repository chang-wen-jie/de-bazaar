<?php

namespace App\Enums;

enum AdvertisementTypeEnum: string
{
    case SALE = 'sale';
    case AUCTION = 'auction';
    case RENTAL = 'rental';
}
