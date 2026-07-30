<?php

namespace App\Repositories;


use Illuminate\Support\Collection;
use Spatie\Permission\Models\Role;
use App\Repositories\Contracts\RoleRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class RoleRepository implements RoleRepositoryInterface
{
    /**
     * Get paginated roles.
     */
    public function paginate(array $filters): LengthAwarePaginator
    {
        return Role::query()
            ->with('permissions')
            ->withCount('permissions')

            ->when(
                $filters['search'] ?? null,
                function ($query, $search) {

                    $query->where(function ($query) use ($search) {

                        $query->where('name', 'LIKE', "%{$search}%")
                            ->orWhereHas('permissions', function ($query) use ($search) {
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
     * Find a role.
     */
    public function find(Role $role): Role
    {
        return $role->load('permissions')
            ->loadCount('permissions');
    }

    /**
     * Create a role.
     */
    public function create(array $data): Role
    {
        return Role::create($data);
    }

    /**
     * Update a role.
     */
    public function update(
        Role $role,
        array $data
    ): Role {

        $role->update($data);

        return $role->refresh();
    }

    /**
     * Delete a role.
     */
    public function delete(Role $role): bool
    {
        return (bool) $role->delete();
    }

    /**
     * Get roles for dropdown.
     */
    public function options(): Collection
    {
        return Role::query()
            ->select('id', 'name')
            ->orderBy('name')
            ->get();
    }
}