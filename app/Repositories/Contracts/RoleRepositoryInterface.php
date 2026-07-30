<?php

namespace App\Repositories\Contracts;

use Illuminate\Support\Collection;
use Spatie\Permission\Models\Role;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface RoleRepositoryInterface
{
    /**
     * Get paginated roles.
     */
    public function paginate(array $filters): LengthAwarePaginator;

    /**
     * Find a role.
     */
    public function find(Role $role): Role;

    /**
     * Create a role.
     */
    public function create(array $data): Role;

    /**
     * Update a role.
     */
    public function update(Role $role, array $data): Role;

    /**
     * Delete a role.
     */
    public function delete(Role $role): bool;

    /**
     * Get roles for dropdown/select.
     */
    public function options(): Collection;
}