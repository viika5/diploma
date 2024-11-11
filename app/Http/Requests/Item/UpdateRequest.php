<?php

namespace App\Http\Requests\Item;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [

            'name' => 'nullable|string',
            'measure' => 'nullable|string',
            'count' => 'nullable|string',
            'plan_price' => 'nullable|string',
            'plan_cost' => 'nullable|string',
            'type' => 'nullable|string',
            'number_material' => 'nullable|string',
            'ttu' => 'nullable|string',
            'month' => 'nullable|string',
            'year' => 'nullable|string',
            'cost_type' => 'nullable|string',
            'initiator' => 'nullable|string',
            'department' => 'nullable|string',
            'storage' => 'nullable|string',
            'fio' => 'nullable|string',
            'invoice_type' => 'nullable|string',
            'sed' => 'nullable|string',
            'contract' => 'nullable|string',
            'material' => 'nullable|string',
            'fact_cost' => 'nullable|between:0,9999.9999999999',
            'status' => 'nullable|int',
            'term' => 'nullable|int',
            'description' => 'nullable|string',
            'admission_path' => 'nullable|file',
            'serial_path' => 'nullable|string',
            'photo_path' => 'nullable|file',
            'transfer_path' => 'nullable|file',
            'write_off_path' => 'nullable|file',
        ];
    }
}
