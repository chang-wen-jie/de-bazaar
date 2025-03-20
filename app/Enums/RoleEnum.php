<?php

namespace App\Enums;

enum RoleEnum: string
{
    case GUEST = 'guest';
    case PRIVATE_ADVERTISER = 'private_advertiser';
    case BUSINESS_ADVERTISER = 'business_advertiser';
}
