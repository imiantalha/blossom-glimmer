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
        array $attachements = [],
    ): EmailLog {
        $emailLog = EmailLog::create([
            'to' => $to,
            'subject' => $subject,
            'body' => $body,
            'status' => 'queued',
        ]);

        foreach ($attachements as $attachement) {
            $path = $attachement->store('email-attachemnets');

            $emailLog->attachments()->create([
                'disk' => config('filesystems.default'),
                'path' => $path,
                'original_name' => $attachment->getClientOriginalName(),
                'mime_type' => $attachment->getMimeType(),
                'size' => $attachment->getSize(),
            ]);
        }

        SendEmailJob::dispatch($emailLog->id);

        return $emailLog->load('attachments');
    }
}
