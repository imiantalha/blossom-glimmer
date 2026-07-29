<?php

namespace App\Services;

use App\Repositories\Contracts\DashboardRepositoryInterface;

class DashboardService
{
    public function __construct(
        protected DashboardRepositoryInterface $dashboardRepository
    ) {
    }

    public function statistics(): array
    {
        return $this->dashboardRepository->getStatistics();
    }
}