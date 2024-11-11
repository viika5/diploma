<?php

namespace App\Exports;

use App\Models\RequestProduct;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class RequestExport implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return RequestProduct::all();
    }

    public function headings(): array
    {
        return [
            '#',
            'Name',
            'Value',
            'Amount',
        ];
    }
}
