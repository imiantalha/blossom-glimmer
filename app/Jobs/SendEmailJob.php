<?php

namespace App\Jobs;

use Illuminate\Support\Facades\Mail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Throwable;
use App\Mail\GenericEmail;
use App\Models\EmailLog;

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
        $emailLog = EmailLog::findOrFail($this->emailLogId);

        Mail::to($emailLog->to)->send(
            new GenericEmail(
                $emailLog->subject,
                $emailLog->body
            )
        );

        $emailLog->update([
            'status' => 'sent',
            'sent_at' => now(),
        ]);
    }

    public function failed(Throwable $exception): void
    {
        EmailLog::whereKey($this->emailLogId)->update([
            'status' => 'failed',
            'error_message' => $exception->getMessage(),
            'failed_at' => now(),
        ]);
    }
}
