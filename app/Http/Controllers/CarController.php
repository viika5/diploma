<?php

namespace App\Http\Controllers;

use App\Exports\RequestExport;
use App\Http\Resources\CarResource;
use App\Imports\RequestProductImport;
use App\Models\RequestProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;


class CarController extends Controller
{
    public function get(Request $request)
    {
        return RequestProduct::paginate(null);
    }

    public function update(Request $request, RequestProduct $product)
    {
        $this->authorize('update', $product);

        $attr = $request->all();
        $product->fill($attr);
        $product->save();

        return response()->json(["message" => "success"]);
    }

    public function delete(Request $request, RequestProduct $product)
    {
        return $product->delete();
    }

    public function deleteAll(Request $request)
    {
        $ids = $request->ids;
        $ids = explode(",",$ids);
        RequestProduct::whereIn('id', $ids)->delete();
        return response()->json(["message" => "Строки успешно удалены"], 201);
    }

    public function import(Request $request)
    {
        Excel::import(new RequestProductImport, $request->file('excel'));
        return response()->json(["status" => "created"], 201);
    }

    public function export(Request $request)
    {
        return Excel::download(new RequestExport, 'cars.xlsx');
    }

    public function me(Request $request)
    {
        return $request->user();
    }

    public function test()
    {
        //scGu51VW
//        $start = microtime(true);
//        $data = DB::connection('odbc')->table('evento_float')->get();
//        return $data;
//        try {
//            $dbh = new \PDO('mysql:host=10.2.9.210;dbname=test', 'tn', '123qweASD');
//            $query = $dbh->query("SELECT f.*, c.*, te.evnt from evento_float f LEFT JOIN  type_event te ON te.id_evnt = f.id_evnt
//													 LEFT JOIN contrill_in c ON c.id_opis = f.id_opis")->fetchAll();
//            var_dump($query);
//        }  catch (PDOException $e) {
//            print "Error!: " . $e->getMessage() . "<br/>";
//        }

//        echo 'Время выполнения скрипта: '.round(microtime(true) - $start, 4).' сек.';
        //$user = RequestProduct::factory()->count(5)->make();
//       return $user;
//
    }
}
