<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Permission\IndexPermissionRequest;
use App\Http\Requests\Permission\StorePermissionRequest;
use App\Http\Requests\Permission\UpdatePermissionRequest;
use App\Http\Resources\PermissionResource;
use Spatie\Permission\Models\Permission;
use App\Services\PermissionService;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;

class PermissionController extends Controller
{
    public function __construct(
        protected PermissionService $permissionService
    ) {
    }

    /**
     * Display a listing of permissions.
     */
    public function index(IndexPermissionRequest $request): JsonResponse
    {
        $this->authorize('viewAny', Permission::class);

        $permissions = $this->permissionService->paginate(
            $request->validated()
        );

        return ApiResponse::paginatedResponse(
            PermissionResource::collection($permissions),
            'Permissions retrieved successfully.'
        );
    }

    /**
     * Store a newly created permission.
     */
    public function store(StorePermissionRequest $request): JsonResponse
    {
        $this->authorize('create', Permission::class);

        $permission = $this->permissionService->create(
            $request->validated()
        );

        return ApiResponse::createdResponse(
            new PermissionResource($permission),
            'Permission created successfully.'
        );
    }

    /**
     * Display the specified permission.
     */
    public function show(Permission $permission): JsonResponse
    {
        $this->authorize('view', $permission);

        $permission = $this->permissionService->find($permission);

        return ApiResponse::successResponse(
            new PermissionResource($permission),
            'Permission retrieved successfully.'
        );
    }

    /**
     * Update the specified permission.
     */
    public function update(
        UpdatePermissionRequest $request,
        Permission $permission
    ): JsonResponse {

        $this->authorize('update', $permission);

        $permission = $this->permissionService->update(
            $permission,
            $request->validated()
        );

        return ApiResponse::successResponse(
            new PermissionResource($permission),
            'Permission updated successfully.'
        );
    }

    /**
     * Remove the specified permission.
     */
    public function destroy(
        Permission $permission
    ): JsonResponse {

        $this->authorize('delete', $permission);

        $this->permissionService->delete($permission);

        return ApiResponse::deletedResponse(
            'Permission deleted successfully.'
        );
    }

    /**
     * Get permissions for dropdown/select.
     */
    public function options(): JsonResponse
    {
        $permissions = $this->permissionService->options();

        return ApiResponse::successResponse(
            $permissions,
            'Permissions retrieved successfully.'
        );
    }
}