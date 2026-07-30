<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\UserRepository;
use App\Repositories\RoleRepository;
use App\Repositories\DashboardRepository;
use App\Repositories\PermissionRepository;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Repositories\Contracts\RoleRepositoryInterface;
use App\Repositories\Contracts\DashboardRepositoryInterface;
use App\Repositories\Contracts\PermissionRepositoryInterface;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(
            DashboardRepositoryInterface::class,
            DashboardRepository::class
        );

        $this->app->bind(
            UserRepositoryInterface::class,
            UserRepository::class
        );

        $this->app->bind(
            RoleRepositoryInterface::class,
            RoleRepository::class
        );

        // $this->app->bind(
        //     PermissionRepositoryInterface::class,
        //     PermissionRepository::class
        // );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
