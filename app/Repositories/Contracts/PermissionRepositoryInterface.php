<?php

namespace App\Repositories\Contracts;

use Spatie\Permission\Models\Permission;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface PermissionRepositoryInterface
{
    /**
     * Get paginated permissions.
     */
    public function paginate(array $filters): LengthAwarePaginator;

    /**
     * Find a permission.
     */
    public function find(Permission $permission): Permission;

    /**
     * Create a permission.
     */
    public function create(array $data): Permission;

    /**
     * Update a permission.
     */
    public function update(
        Permission $permission,
        array $data
    ): Permission;

    /**
     * Delete a permission.
     */
    public function delete(Permission $permission): bool;

    /**
     * Get permissions for dropdown.
     */
    public function options(): Collection;
}