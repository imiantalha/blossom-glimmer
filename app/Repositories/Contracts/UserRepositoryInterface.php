<?php

namespace App\Repositories\Contracts;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface UserRepositoryInterface
{
    /**
     * Get paginated users.
     */
    public function paginate(array $filters): LengthAwarePaginator;

    /**
     * Find user by model.
     */
    public function find(User $user): User;

    /**
     * Create user.
     */
    public function create(array $data): User;

    /**
     * Update user.
     */
    public function update(User $user, array $data): User;

    /**
     * Delete user.
     */
    public function delete(User $user): bool;
}