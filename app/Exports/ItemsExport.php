<?php

namespace App\Exports;

use App\Models\Item;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithHeadings;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;

class ItemsExport implements FromCollection, WithHeadings, WithColumnFormatting
{
    use Exportable;
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $columns = Item::getColumns();
        unset($columns[26], $columns[27], $columns[28], $columns[29], $columns[30], $columns[31], $columns[32]);
        return Item::select($columns)->get();
    }

    public function headings(): array
    {

        return [
            '№ п/п',
            'Наименование ТМЦ',
            'Ед.Изм',
            'Количество',
            'Цена без НДС (план)',
            'Стоимость без НДС (план)',
            'Вид заявки (годовая/месячная/внеплановая)',
            'Номер материала ЭМ	',
            'Наличие ТТУ (да/нет)',
            'Необходимый месяц поставки',
            'Год заявки',
            'Статья затрат	',
            'Инициатор заявки (ИЗ)',
            'Подразделение ИЗ',
            'Склад доставки ТМЦ',
            'ФИО исполнителя ИЗ',
            'Баланс/ Забаланс'
        ];
    }


    public function columnFormats(): array
    {
        return [
            'H' => NumberFormat::FORMAT_TEXT,
        ];
    }
}
