<?php

namespace App\Imports;

use App\Models\RequestProduct;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class RequestProductImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new RequestProduct([
            'name' => $row[1],
            'value' => $row[2],
            'amount' => $row[3],
        ]);
    }


}
