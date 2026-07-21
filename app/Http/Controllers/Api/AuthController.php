<?php

namespace App\Http\Controllers\Api;

use App\Constants\Role;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Support\ApiResponse;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    protected $user;
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (! Auth::attempt($credentials)) {
            return ApiResponse::unauthorizedResponse('Invalid credentials');
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();

        $token = $user->createToken('auth_token')->plainTextToken;

        $data = [
            'user' => new UserResource($user),
            'access_token' => $token,
            'token_type' => 'Bearer',
        ];

        return ApiResponse::successResponse(
            $data,
            'Login successful'
        );
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return ApiResponse::successResponse( null, 'Logout successful');
    }

    public function register(UserRegisterRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($request->password);

        $user = $this->user->create($data);
        $user->assignRole(Role::CUSTOMER);

        return ApiResponse::createdResponse(
            new UserResource($user),
            'Registration successful'
        );
    }
}
