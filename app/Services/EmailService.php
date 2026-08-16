<?php

namespace App\Services;

use Illuminate\Support\Facades\Mail;
use App\Models\EmailLog;
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
    ): EmailLog {
        $emailLog = EmailLog::create([
            'to' => $to,
            'subject' => $subject,
            'body' => $body,
            'status' => 'queued',
        ]);

        SendEmailJob::dispatch($emailLog->id);

        return $emailLog;
    }
}
