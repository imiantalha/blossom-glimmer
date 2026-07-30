<?php

namespace App\Http\Requests\Permission;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class IndexPermissionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Validation rules.
     */
    public function rules(): array
    {
        return [
            'search' => [
                'nullable',
                'string',
                'max:255',
            ],

            'sort' => [
                'nullable',
                Rule::in([
                    'name',
                    'created_at',
                ]),
            ],

            'direction' => [
                'nullable',
                Rule::in([
                    'asc',
                    'desc',
                ]),
            ],

            'per_page' => [
                'nullable',
                'integer',
                'min:5',
                'max:100',
            ],
        ];
    }

    /**
     * Prepare request before validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'sort' => $this->sort ?? 'created_at',
            'direction' => $this->direction ?? 'desc',
            'per_page' => $this->per_page ?? 10,
        ]);
    }
}