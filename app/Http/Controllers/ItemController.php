<?php

namespace App\Http\Controllers;


use App\Exports\ItemExport;
use App\Exports\RequestExport;
use App\Http\Requests\Item\UpdateRequest;
use App\Imports\ItemsImport;
use App\Models\BuyMethod;
use App\Models\Department;
use App\Models\Initiator;
use App\Models\Item;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Schema;
use App\Exports\ItemsExport;
use Maatwebsite\Excel\Facades\Excel;

class ItemController extends Controller
{
    public function all()
    {
        return ["Все"];
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = auth()->user();

        $query = Item::orderBy($request->sort_field, $request->sort_type);

//        dd($request->filter);

        //поиск везде!!!
        $query->where(function ($q) use ($request) {
            foreach (Item::getColumns() as $column){
                $q->orWhere($column, 'LIKE', '%' . $request->search . '%');
            }
        })->when(!empty($request->filter), function($q) use ($request) {
            foreach ($request->filter as $column => $value){
                $q->where($column, 'LIKE', '%' . $value . '%');
            }
        })->when($request->status > 0, function ($q) use ($request) {
            return $q->whereStatus($request->status);
        })->when(auth()->user()->role == "USER", function ($q) use ($user) {
            return $q->where("access", 'LIKE', $user->access);
        });

        return $query->paginate();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Excel::import(new ItemsImport, $request->file('excel'));


        return response()->json(["status" => "created"], 201);
    }

    public function export()
    {
        return Excel::download(new ItemsExport, 'items.xlsx');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function show(Item $item)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function edit(Item $item)
    {
        //
    }


    public function massEdit(Request $request)
    {
        $data = collect($request->data)->collapse()->toArray();
        return Item::whereIn('id', $request->ids)->update($data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRequest $request, Item $item)
    {
        $data = $request->validated();
        $request->hasFile('admission_path') ? $data['admission_path'] = $data['admission_path']->store('files', 'public') : true;
        $request->hasFile('photo_path') ? $data['photo_path'] = $data['photo_path']->store('files', 'public') : true;
        $request->hasFile('serial_path') ? $data['serial_path'] = $data['serial_path']->store('files', 'public') : true;
        $request->hasFile('transfer_path') ? $data['transfer_path'] = $data['transfer_path']->store('files', 'public') : true;
        $request->hasFile('write_off_path') ? $data['write_off_path'] = $data['write_off_path']->store('files', 'public') : true;

        $item->fill($data);
        $item->save();

        return $item;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Item[]  $item
     * @return \Illuminate\Http\Response
     */
    public function destroy($item)
    {
        $ids = explode(",", $item);
        Item::whereIn('id', $ids)->delete();
        return  response()->json(['message' => 'Записи успешно удалены', 'data' => $ids]);
    }

    public function dict()
    {
        return [
            "department" => Department::select('name')->distinct()->pluck('name'),
            "initiator" => Initiator::select('name')->distinct()->pluck('name'),
            "vid_zakupki_em_tzp_modns" => BuyMethod::select('name')->distinct()->pluck('name'),
        ];
    }
}
