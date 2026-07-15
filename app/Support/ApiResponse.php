<?php

namespace App\Support;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ApiResponse
{
    public static function successResponse(mixed $data = null, string $message = 'Success', int $code = Response::HTTP_OK): JsonResponse {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
        ], $code);
    }

    public static function createdResponse(mixed $data = null, string $message = 'Resource created successfully.'): JsonResponse {
        return self::successResponse($data, $message, Response::HTTP_CREATED);
    }

    public static function errorResponse(string $message = 'Something went wrong.', mixed $errors = null, int $status = Response::HTTP_BAD_REQUEST): JsonResponse {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors,
        ], $status);
    }

    public static function notFoundResponse(string $message = 'Resource not found.'): JsonResponse {
        return self::errorResponse($message, null, Response::HTTP_NOT_FOUND);
    }

    public static function unauthorizedResponse(string $message = 'Unauthorized.'): JsonResponse {
        return self::errorResponse($message, null, Response::HTTP_UNAUTHORIZED);
    }

    public static function forbiddenResponse(string $message = 'Forbidden.'): JsonResponse {
        return self::errorResponse($message, null, Response::HTTP_FORBIDDEN);
    }

    public static function validationErrorResponse(mixed $errors, string $message = 'Validation failed.'): JsonResponse {
        return self::errorResponse($message, $errors, Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public static function serverErrorResponse(string $message = 'Internal server error.'): JsonResponse {
        return self::errorResponse($message, null, Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public static function deletedResponse(string $message = 'Resource deleted successfully.'): JsonResponse {
        return self::successResponse(null, $message);
    }

    public static function loginResponse(mixed $user, string $token, string $message = 'Login successful'): JsonResponse {
        return response()->json([
            'success' => true,
            'message' => $message,
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], Response::HTTP_OK);
    }

    public static function methodNotAllowedResponse(string $message = 'Method not allowed.'): JsonResponse {
        return self::errorResponse(
            $message,
            null,
            Response::HTTP_METHOD_NOT_ALLOWED
        );
    }

    public static function tooManyRequestsResponse(string $message = 'Too many requests. Please try again later.'): JsonResponse {
        return self::errorResponse(
            $message,
            null,
            Response::HTTP_TOO_MANY_REQUESTS
        );
    }
}