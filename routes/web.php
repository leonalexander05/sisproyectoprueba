<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});



Route::resource('consultor','ConsultorController');
Route::get('consultores','ConsultorController@listing');
Route::get('ganaciasnetas/{co_usuario}/{fechaDesde}/{fechaHasta}','ConsultorController@ganaciasNetas');
Route::post('ganaciasNetasGrafico','ConsultorController@ganaciasNetasGrafico');
Route::post('ganaciasNetasRelatorio','ConsultorController@ganaciasNetasRelatorio');

