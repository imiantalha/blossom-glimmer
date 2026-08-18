<?php

namespace App\Jobs;

use Illuminate\Support\Facades\Mail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Throwable;
use App\Mail\GenericEmail;
use App\Models\EmailLog;
use Illuminate\Support\Facades\Storage;

class SendEmailJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public int $emailLogId
    )
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $emailLog = EmailLog::with('attachements')
            ->findOrFail($this->emailLogId);

        Mail::to($emailLog->to)->send(
            new GenericEmail(
                $emailLog->subject,
                $emailLog->body,
                $emailLog->attachements,
            )
        );

        $emailLog->update([
            'status' => 'sent',
            'sent_at' => now(),
        ]);

        foreach ($emailLog->attachments as $attachment) {
            Storage::disk($attachment->disk)->delete(
                $attachment->path
            );
        }
    }

    public function failed(Throwable $exception): void
    {
        $emailLog = EmailLog::with('attachments')
            ->find($this->emailLogId);

        if (! $emailLog) {
            return;
        }

        $emailLog->update([
            'status' => 'failed',
            'error_message' => $exception->getMessage(),
            'failed_at' => now(),
        ]);

        foreach ($emailLog->attachments as $attachment) {
            Storage::disk($attachment->disk)->delete(
                $attachment->path
            );
        }
    }
}
