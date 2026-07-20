<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class RequestLog extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'request_logs';

    protected $guarded = [];
}