<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Storage;

class GenericEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(
        public string $emailSubject,
        public string $body,
        public Collection $emailAttachments,
    )
    {}

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->emailSubject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.generic',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return $this->emailAttachments
            ->map(function ($attachment) {
                $disk = $attachment->disk ?: config('filesystems.default');

                if (! Storage::disk($disk)->exists($attachment->path)) {
                    throw new \RuntimeException(
                        "Attachment not found: {$attachment->path} on disk {$disk}"
                    );
                }

                return Attachment::fromStorageDisk(
                    $disk,
                    $attachment->path
                )->as(
                    $attachment->original_name
                );
            })
            ->toArray();
    }
}
