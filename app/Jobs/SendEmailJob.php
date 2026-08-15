<?php

namespace App\Jobs;

use Illuminate\Support\Facades\Mail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SendEmailJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public string $to,
        public string $subject,
        public string $body,
    )
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Mail::to($this->to)->send(
            new GenericEmail(
                $this->subject, 
                $this->body
            )
        );

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
