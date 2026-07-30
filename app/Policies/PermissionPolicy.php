<?php

namespace App\Policies;

use Spatie\Permission\Models\Permission;
use App\Models\User;

class PermissionPolicy
{
    /**
     * Determine whether the user can view any permissions.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('permissions.view');
    }

    /**
     * Determine whether the user can view the permission.
     */
    public function view(User $user, Permission $permission): bool
    {
        return $user->can('permissions.view');
    }

    /**
     * Determine whether the user can create permissions.
     */
    public function create(User $user): bool
    {
        return $user->can('permissions.create');
    }

    /**
     * Determine whether the user can update the permission.
     */
    public function update(
        User $user,
        Permission $permission
    ): bool {

        return $user->can('permissions.update');
    }

    /**
     * Determine whether the user can delete the permission.
     */
    public function delete(
        User $user,
        Permission $permission
    ): bool {

        // Prevent deleting core permissions
        $protectedPermissions = [
            'users.view',
            'roles.view',
            'permissions.view',
        ];

        if (in_array($permission->name, $protectedPermissions)) {
            return false;
        }

        return $user->can('permissions.delete');
    }
}