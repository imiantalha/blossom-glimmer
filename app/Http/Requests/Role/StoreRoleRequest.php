<?php

namespace App\Http\Requests\Role;

use Illuminate\Foundation\Http\FormRequest;

class StoreRoleRequest extends FormRequest
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
            'name' => [
                'required',
                'string',
                'max:255',
                'unique:roles,name',
            ],

            'permissions' => [
                'nullable',
                'array',
            ],

            'permissions.*' => [
                'exists:permissions,name',
            ],
        ];
    }

    /**
     * Custom validation messages.
     */
    public function messages(): array
    {
        return [
            'name.unique' => 'A role with this name already exists.',
            'permissions.*.exists' => 'One or more selected permissions are invalid.',
        ];
    }

    /**
     * Prepare data before validation.
     */
    protected function prepareForValidation(): void
    {
        if ($this->has('name')) {
            $this->merge([
                'name' => trim($this->name),
            ]);
        }
    }
}