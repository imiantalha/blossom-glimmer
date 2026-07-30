<?php

namespace App\Repositories;

use Spatie\Permission\Models\Permission;
use App\Repositories\Contracts\PermissionRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class PermissionRepository implements PermissionRepositoryInterface
{
    /**
     * Get paginated permissions.
     */
    public function paginate(array $filters): LengthAwarePaginator
    {
        return Permission::query()

            ->with('roles')
            ->withCount('roles')

            ->when(
                $filters['search'] ?? null,
                function ($query, $search) {

                    $query->where(function ($query) use ($search) {

                        $query->where('name', 'LIKE', "%{$search}%")
                            ->orWhereHas('roles', function ($query) use ($search) {
                                $query->where('name', 'LIKE', "%{$search}%");
                            });

                    });

                }
            )

            ->orderBy(
                $filters['sort'] ?? 'created_at',
                $filters['direction'] ?? 'desc'
            )

            ->paginate(
                $filters['per_page'] ?? 10
            );
    }

    /**
     * Find a permission.
     */
    public function find(Permission $permission): Permission
    {
        return $permission
            ->load('roles')
            ->loadCount('roles');
    }

    /**
     * Create a permission.
     */
    public function create(array $data): Permission
    {
        return Permission::create($data);
    }

    /**
     * Update a permission.
     */
    public function update(
        Permission $permission,
        array $data
    ): Permission {

        $permission->update($data);

        return $permission->refresh()
            ->load('roles')
            ->loadCount('roles');
    }

    /**
     * Delete a permission.
     */
    public function delete(Permission $permission): bool
    {
        return (bool) $permission->delete();
    }

    /**
     * Get permissions for dropdown.
     */
    public function options(): Collection
    {
        return Permission::query()
            ->select('id', 'name')
            ->orderBy('name')
            ->get();
    }
}