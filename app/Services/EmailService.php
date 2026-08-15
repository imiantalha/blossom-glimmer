<?php

namespace App\Services;

use Illuminate\Support\Facades\Mail;
use App\Mail\GenericEmail;
use App\Jobs\SendEmailJob;

class EmailService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function send(
        string $to,
        string $subject,
        string $body,
    ) {
        SendEmailJob::dispatch($to, $subject, $body);
    }
}
