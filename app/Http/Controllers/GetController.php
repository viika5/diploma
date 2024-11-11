<?php

namespace App\Http\Controllers;


use App\Models\RequestProduct;
use Illuminate\Support\Facades\Auth;

class GetController extends Controller
{


    public function __invoke()
    {
        return Auth::user();
    }
}
