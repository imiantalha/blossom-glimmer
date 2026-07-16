<?php

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AuthController;

Route::get('/user', function (Request $request) {
    return new UserResource($request->user());
})->middleware('auth:sanctum');


Route::middleware('throttle:10,1')->group(function () {
    
    Route::post('/login', [AuthController::class, 'login']);
 
    Route::middleware('auth:sanctum')->group(function () {
        Route::resource('/users', UserController::class);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});