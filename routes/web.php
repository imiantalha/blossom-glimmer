<?php

use Illuminate\Support\Facades\Route;
use App\Services\EmailService;

Route::get('/test-email', function (EmailService $emailService) {
    $emailService->send(
        'wareriy481@neplis.com',
        'Blossom Glimmer Test',
        '<h1>Hello!</h1>
         <p>This is a test email from Laravel.</p>'
    );

    return response()->json([
        'success' => true,
        'message' => 'Email sent successfully.',
    ]);
});

/** Catch all */
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');