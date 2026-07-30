<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Constants\Role;
use App\Support\ApiResponse;
use Illuminate\Http\Request;
use App\Services\UserService;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\UserResource;
use App\Http\Requests\User\IndexUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Requests\User\UserRegisterRequest;

class UserController extends Controller
{
    public function __construct(
        protected UserService $service
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(IndexUserRequest $request)
    {
        $this->authorize('viewAny', User::class);

        $users = $this->service->paginate(
            $request->validated()
        );

        return ApiResponse::paginatedResponse(
            UserResource::collection($users),
            'Users retrieved successfully'
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRegisterRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($request->password);


        $user = User::create($data);
        $user->assignRole(Role::CUSTOMER);

        return ApiResponse::successResponse(
            new UserResource($user),
            'User created successfully'
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return ApiResponse::successResponse(
            new UserResource($user),
            'User fetched successfully'
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $this->authorize('update', $user);
        
        $data = $request->validated();

        if (isset($data['password'])) {
            $data['password'] = Hash::make($request->password);
        }
        $user->update($data);

        return ApiResponse::successResponse(
            new UserResource($user),
            'User updated successfully'
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return ApiResponse::successResponse(
            null,
            'User deleted successfully'
        );
    }
}
