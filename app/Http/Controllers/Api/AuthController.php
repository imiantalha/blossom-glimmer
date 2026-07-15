<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Traits\BaseApiResponse;
use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    use BaseApiResponse;
    public function login(LoginRequest $request)
    {
        try {

            $credentials = $request->only('email', 'password');

            if (Auth::Attempt($credentials)) {
                
                /** @var \App\Models\User $user */
                $user = Auth::user();
                $token = $user->createToken('auth_token')->plainTextToken;

                $user = new UserResource($user);
                return $this->loginResponse($user, $token, 'Login successful');
            }

            return $this->unauthorizedResponse('Invalid credentials');
        } catch (\Exception $e) {
            return $this->serverErrorResponse($e->getMessage());
        }
    }

    public function logout(Request $request) 
    {
        try {
            $request->user()->currentAccessToken()->delete();

            return $this->successResponse(null, 'Logout successful');
        } catch (\Exception $e) {
            return $this->serverErrorResponse($e->getMessage());
        }
    }
}
