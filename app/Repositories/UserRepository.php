<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class UserRepository implements UserRepositoryInterface
{
    /**
     * Get paginated users.
     */
    public function paginate(array $filters): LengthAwarePaginator
    {
        return User::query()

            ->with('roles')

            ->when(
                $filters['search'] ?? null,
                function ($query, $search) {

                    $query->where(function ($query) use ($search) {

                        $query->where('name', 'LIKE', "%{$search}%")
                              ->orWhere('email', 'LIKE', "%{$search}%")
                              ->orWhereHas('roles',function($query) use($search){
                                    $query->where('name','LIKE',"%{$search}%");
                                });

                    });

                }
            )

            ->orderBy(
                $filters['sort'] ?? 'created_at',
                $filters['direction'] ?? 'desc'
            )

            ->paginate(
                $filters['per_page'] ?? 2
            );
    }

    /**
     * Find single user.
     */
    public function find(User $user): User
    {
        return $user->load('roles');
    }

    /**
     * Create user.
     */
    public function create(array $data): User
    {
        return User::create($data);
    }

    /**
     * Update user.
     */
    public function update(
        User $user,
        array $data
    ): User {

        $user->update($data);

        return $user->refresh();
    }

    /**
     * Delete user.
     */
    public function delete(User $user): bool
    {
        return (bool) $user->delete();
    }
}