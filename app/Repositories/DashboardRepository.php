<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Contracts\DashboardRepositoryInterface;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\RequestLog;

class DashboardRepository implements DashboardRepositoryInterface
{
    public function getStatistics(): array
    {
        return [
            'users' => User::count(),
            'roles' => Role::count(),
            'permissions' => Permission::count(),
            // 'request_logs' => RequestLog::count(),
        ];
    }
}