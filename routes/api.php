<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
//    return ["res"];
//});

Route::group(['middleware' => 'auth:sanctum'], function (){
    Route::get('/me', 'CarController@me');
});

Route::group([], function() {
    Route::get('item/items', 'ItemController@all');
    Route::put('item/items', 'ItemController@massEdit');
    Route::post('item/export', 'ItemController@export');
    Route::get('item/export', 'ItemController@export');
    Route::get('item/dict', 'ItemController@dict');

    Route::resource('item', 'ItemController');
    Route::resource('initiator', 'InitiatorController');
});

//Route::group(['prefix' => 'cars'], function () {
//    Route::get('/', 'CarController@get');
//    Route::post('/delete-all', 'CarController@deleteAll');
//    Route::delete('/{product}', 'CarController@delete');
//    Route::post('/import', 'CarController@import');
////    Route::get('/export', 'CarController@export');
//    Route::get('/test', 'CarController@test');
//    Route::put('/{product}', 'CarController@update');
//
////    Route::get('/me', 'CarController@me')->middleware('auth:sanctum');
//});

