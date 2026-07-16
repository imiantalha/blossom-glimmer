<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

trait BaseApiResponse {

    protected function successResponse(mixed $data, string $message = 'Success', int $code = Response::HTTP_OK): JsonResponse {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data'    => $data
        ], $code);
    }

    protected function createdResponse(mixed $data, string $message = 'Resource created successfully'): JsonResponse {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data'    => $data
        ], Response::HTTP_CREATED);
    }

    protected function errorResponse(string $message = 'Something went wrong.', mixed $errors = null, int $status = Response::HTTP_BAD_REQUEST): JsonResponse {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors,
        ], $status);
    }

    protected function notFoundResponse(string $message = 'Resource not found.'): JsonResponse {
        return response()->json([
            'success' => false,
            'message' => $message,
        ], Response::HTTP_NOT_FOUND);
    }

    protected function unauthorizedResponse(string $message = 'Unauthorized.'): JsonResponse {
        return $this->errorResponse(
            $message,
            null,
            Response::HTTP_UNAUTHORIZED
        );
    }

    protected function forbiddenResponse(string $message = 'Forbidden.'): JsonResponse {
        return $this->errorResponse(
            $message,
            null,
            Response::HTTP_FORBIDDEN
        );
    }

    protected function validationErrorResponse(mixed $errors, string $message = 'Validation failed.'): JsonResponse {
        return $this->errorResponse(
            $message,
            $errors,
            Response::HTTP_UNPROCESSABLE_ENTITY
        );
    }

    protected function serverErrorResponse(string $message = 'Internal server error.'): JsonResponse {
        return $this->errorResponse(
            $message,
            null,
            Response::HTTP_INTERNAL_SERVER_ERROR
        );
    }

    protected function deletedResponse(string $message = 'Resource deleted successfully.'): JsonResponse {
        return response()->json([
            'success' => true,
            'message' => $message,
        ], Response::HTTP_OK);
    }

    protected function loginResponse(mixed $user, string $token, string $message = 'Login successful'): JsonResponse {
        return response()->json([
            'success' => true,
            'message' => $message,
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], Response::HTTP_OK);
    }
}