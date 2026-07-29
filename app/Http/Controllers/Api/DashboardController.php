<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\DashboardService;
use App\Support\ApiResponse;

class DashboardController extends Controller
{
    public function __construct(
        protected DashboardService $dashboardService
    ) {
    }

    public function index()
    {
        $statistics = $this->dashboardService->statistics();

        return ApiResponse::successResponse(
            $statistics,
            'Dashboard statistics retrieved successfully.'
        );
    }
}