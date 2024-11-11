<?php

namespace App\Imports;

use App\Models\Item;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\OnEachRow;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithCalculatedFormulas;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Row;

class ItemsImport implements ToModel, WithHeadingRow, OnEachRow, WithMultipleSheets, WithCalculatedFormulas
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        ini_set("max_execution_time", "3600");

        if (!isset($row['pp']) ) {
            return null;
        }
//        dd(var_dump($row));

        return new Item([
            'pp' => $row['pp'],
            'name' => $row['naimenovanie'],
            'measure' => $row['edizm'],
            'count' => $row['kolicestvo'],
            'plan_price' => $row['cena_bez_nds_plan'],
            'plan_cost' => $row['stoimost_bez_nds_plan'],
//            'plan_cost' => (double)$row['kolicestvo'] * (double)$row['cena_bez_nds_plan'],
            'type' => $row['vid_zayavki_godovayamesyacnayavneplanovaya'],
            'number_material' => $row['nomer_materiala_em'],
            'ttu' => $row['nalicie_ttu_danet'],
            'month' => $row['neobxodimyi_mesyac_postavki'],
            'year' => $row['god_zayavki'],
            'cost_type' => $row['statya_zatrat'],
            'initiator' => $row['iniciator_zayavki_iz'],
            'department' => $row['podrazdelenie_iz'],
            'storage' => $row['sklad_dostavki_tmc'],
            'fio' => $row['fio_ispolnitelya_iz'],
            'fio_ispolnilya_ss' => $row['fio_ispolnilya_ss'],
            'vid_zakupki_em_tzp_modns' => $row['vid_zakupki_em_tzp_modns'],
            'stoimost_bez_nds_fakt' => $row['stoimost_bez_nds_fakt'],
//            'invoice_type' => "-", //забаланс
            'user_moderate_id' => Auth::id(),
            'status' => '1'
        ]);
    }

    public function headingRow()
    {
        return 3;
    }

    public function onRow(Row $row)
    {
        //dd($row);
    }

    public function sheets(): array
    {
        return  [
            0 => $this
        ];
    }
}
