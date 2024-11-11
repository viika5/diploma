<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;

class Item extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $perPage = 200;

    protected $table = 'items_all';


    public static function getColumns()
    {
        return Schema::getColumnListing('items');
    }



}
