<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class UserRepository implements UserRepositoryInterface
{
    public function paginate(array $filters): LengthAwarePaginator
    {
        return User::query()
            ->with('roles')
            ->when(
                $filters['search'] ?? null,
                fn ($query, $search) =>
                    $query->where(function ($query) use ($search) {
                        $query->where('name', 'like', "%{$search}%")
                              ->orWhere('email', 'like', "%{$search}%");
                    })
            )
            ->orderBy(
                $filters['sort'] ?? 'created_at',
                $filters['direction'] ?? 'desc'
            )
            ->paginate(
                $filters['per_page'] ?? 10
            );
    }
}