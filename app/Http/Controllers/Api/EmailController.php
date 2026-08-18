<?php

namespace App\Http\Controllers\Api;

use App\Support\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\SendEmailRequest;
use App\Services\EmailService;

class EmailController extends Controller
{
    public function __construct(private readonly EmailService $emailService)
    {
    }
    public function send(SendEmailRequest $request)
    {
        $emailLog = $this->emailService->send(
            to: $request->string('to')->toString(),
            subject: $request->string('subject')->toString(),
            body: $request->string('body')->toString(),
            attachments: $request->file('attachments', []),
        );

        return ApiResponse::successResponse(
            $emailLog,
            'Email queued successfully.'
        );
    }
}
