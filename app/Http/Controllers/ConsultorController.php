<?php

namespace sisProyecto\Http\Controllers;

use Illuminate\Http\Request;
use sisProyecto\Consultor;
use Illuminate\Support\Facades\Redirect;
use DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Eloquent\Builder;

class ConsultorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function listing()
    {

            $Consultores = DB::table('cao_usuario')
            ->join('permissao_sistema', 'cao_usuario.co_usuario', '=', 'permissao_sistema.co_usuario')
            ->join('tipo_usuario', 'permissao_sistema.co_tipo_usuario', '=', 'tipo_usuario.co_tipo_usuario')
            ->whereColumn('permissao_sistema.co_sistema', '=', 'tipo_usuario.co_sistema')
            ->where('permissao_sistema.co_sistema', '=', 1)
            ->where('permissao_sistema.in_ativo', '=', 's')
            ->whereIn('permissao_sistema.co_tipo_usuario', [1, 2, 0])
            ->select('cao_usuario.no_usuario', 'cao_usuario.no_email', 'cao_usuario.nu_telefone','tipo_usuario.ds_tipo_usuario','cao_usuario.co_usuario')
            ->get();



            return response()->json(
                $Consultores->toArray()
            );
    }

    public function ganaciasNetas($co_usuario,$fechaDesde,$fechaHasta)
    {
        $fechaDesde =  str_replace('-', '/', $fechaDesde);
        $fechaHasta= str_replace('-', '/', $fechaHasta);


            $Consultores = DB::table('cao_os')
            ->join('cao_fatura', 'cao_os.co_os', '=', 'cao_fatura.co_os')
            ->whereColumn('cao_os.co_sistema', '=', 'cao_fatura.co_sistema')
            ->where('cao_os.co_usuario', '=', $co_usuario)
            ->whereDate('cao_fatura.data_emissao', '>=',$fechaDesde)
            ->whereDate('cao_fatura.data_emissao', '<=',$fechaHasta)
            ->select(DB::raw("(SUM(cao_fatura.valor)-SUM((cao_fatura.total_imp_inc*cao_fatura.total)/100)) as valorT"))
            ->first();

            $costoFijo = DB::table('cao_salario')
            ->join('cao_usuario', 'cao_salario.co_usuario', '=', 'cao_usuario.co_usuario')
            ->where('cao_salario.co_usuario', '=', $co_usuario)
            ->select('cao_salario.brut_salario','cao_usuario.no_usuario')
            ->first();

            $comision = DB::table('cao_os')
            ->join('cao_fatura', 'cao_os.co_os', '=', 'cao_fatura.co_os')
            ->whereColumn('cao_os.co_sistema', '=', 'cao_fatura.co_sistema')
            ->where('cao_os.co_usuario', '=', $co_usuario)
            ->whereDate('cao_fatura.data_emissao', '>=',$fechaDesde)
            ->whereDate('cao_fatura.data_emissao', '<=',$fechaHasta)
            ->select(DB::raw("SUM(((cao_fatura.valor-((cao_fatura.valor*cao_fatura.total_imp_inc)/100)) * cao_fatura.comissao_cn)/100) as comision"))
            ->first();

           

            if (is_object($costoFijo)) {
               $no_usuario= $costoFijo->no_usuario;
               $brut_salario= $costoFijo->brut_salario;
            }else{
                $no_usuario=0;
                $brut_salario=0;
            }


            if (is_object($Consultores)) {
                $valorT=$Consultores->valorT;
            }else{
                 $valorT=0;
            }


            if (is_object($comision)) {
                $comision= $comision->comision;
            }else{
                $comision=0;
            }

           return response()->json([
                'no_usuario' =>  $no_usuario,
                'valorT' =>  $valorT,
                'costoFijo'=> $brut_salario,
                'comision' => $comision
            ]);                 
    }

    public function ganaciasNetasGrafico(Request $request)
    {

        $datos = $request->get('datos');
        $periodos = $request->get('periodos');
        $var1= array();
           
        foreach ($datos as $dato) {
                foreach ($periodos as $periodo) {
                    $fechaDesde =  '2007/'.$periodo.'01';
                    $fechaHasta= '2007/'.$periodo.'/31';
                    $fechaDesde =  str_replace('-', '/', $fechaDesde);
                    $fechaHasta= str_replace('-', '/', $fechaHasta);

                    $Consultores = DB::table('cao_os')
                    ->join('cao_fatura', 'cao_os.co_os', '=', 'cao_fatura.co_os')
                    ->whereColumn('cao_os.co_sistema', '=', 'cao_fatura.co_sistema')
                    ->where('cao_os.co_usuario', '=', $dato["usuario"])
                    ->whereDate('cao_fatura.data_emissao', '>=',$fechaDesde)
                    ->whereDate('cao_fatura.data_emissao', '<=',$fechaHasta)
                    ->select(DB::raw("(SUM(cao_fatura.valor)-SUM((cao_fatura.total_imp_inc*cao_fatura.total)/100)) as valorT"))
                    ->first();

                    if (is_object($Consultores)) {
                    $valorT=$Consultores->valorT;
                    }else{
                         $valorT=0;
                    }



                     
                    array_push($var1, ['Usuario'=> $dato["usuario"],'valorT'=>$valorT,'periodo'=>$periodo]);
                }
        }  
  
            return response()->json(
                $var1
            );
    }

    public function ganaciasNetasRelatorio(Request $request)
    {
        $datos = $request->get('datos');
        $periodos = $request->get('periodos');
        $var1= array();
           
        foreach ($datos as $dato) {
                foreach ($periodos as $periodo) {
                    $fechaDesde =  '2007/'.$periodo.'01';
                    $fechaHasta= '2007/'.$periodo.'/31';
                    $fechaDesde =  str_replace('-', '/', $fechaDesde);
                    $fechaHasta= str_replace('-', '/', $fechaHasta);

                    $Consultores = DB::table('cao_os')
                    ->join('cao_fatura', 'cao_os.co_os', '=', 'cao_fatura.co_os')
                    ->whereColumn('cao_os.co_sistema', '=', 'cao_fatura.co_sistema')
                    ->where('cao_os.co_usuario', '=', $dato["co_usuario"])
                    ->whereDate('cao_fatura.data_emissao', '>=',$fechaDesde)
                    ->whereDate('cao_fatura.data_emissao', '<=',$fechaHasta)
                    ->select(DB::raw("(SUM(cao_fatura.valor)-SUM((cao_fatura.total_imp_inc*cao_fatura.total)/100)) as valorT"))
                    ->first();

                    $costoFijo = DB::table('cao_salario')
                    ->join('cao_usuario', 'cao_salario.co_usuario', '=', 'cao_usuario.co_usuario')
                    ->where('cao_salario.co_usuario', '=', $dato["co_usuario"])
                    ->select('cao_salario.brut_salario','cao_usuario.no_usuario')
                    ->first();

                    $comision = DB::table('cao_os')
                    ->join('cao_fatura', 'cao_os.co_os', '=', 'cao_fatura.co_os')
                    ->whereColumn('cao_os.co_sistema', '=', 'cao_fatura.co_sistema')
                    ->where('cao_os.co_usuario', '=', $dato["co_usuario"])
                    ->whereDate('cao_fatura.data_emissao', '>=',$fechaDesde)
                    ->whereDate('cao_fatura.data_emissao', '<=',$fechaHasta)
                    ->select(DB::raw("SUM(((cao_fatura.valor-((cao_fatura.valor*cao_fatura.total_imp_inc)/100)) * cao_fatura.comissao_cn)/100) as comision"))
                    ->first();

                   

                    if (is_object($costoFijo)) {
                       $no_usuario= $costoFijo->no_usuario;
                       $brut_salario= $costoFijo->brut_salario;
                    }else{
                        $no_usuario=0;
                        $brut_salario=0;
                    }

                    if (is_object($comision)) {
                        $comision= $comision->comision;
                    }else{
                        $comision=0;
                    }



                    if (is_object($Consultores)) {
                    $valorT=$Consultores->valorT;
                    }else{
                         $valorT=0;
                    }
  
                    array_push($var1, ['periodo'=>$periodo,'Usuario'=> $dato["co_usuario"],'valorT'=>$valorT,'brut_salario'=>$brut_salario,'comision'=>$comision,'nombre'=> $no_usuario]);
                }
        }
         return response()->json(
                $var1
            );
    }

    public function index()
    {
        return view('consultor.index');
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
            $var1= array();
            $datos = $request->get('datos');
            

            $fechaDesde =  str_replace('-', '/', $request->get('fechaDesde'));
            $fechaHasta= str_replace('-', '/',$request->get('fechaHasta') );
        foreach ($datos as $dato) {

                $Consultores = DB::table('cao_os')
                ->join('cao_fatura', 'cao_os.co_os', '=', 'cao_fatura.co_os')
                ->whereColumn('cao_os.co_sistema', '=', 'cao_fatura.co_sistema')
                ->where('cao_os.co_usuario', '=', $dato["co_usuario"])
                ->whereDate('cao_fatura.data_emissao', '>=',$fechaDesde)
                ->whereDate('cao_fatura.data_emissao', '<=',$fechaHasta)
                ->select(DB::raw("(SUM(cao_fatura.valor)-SUM((cao_fatura.total_imp_inc*cao_fatura.total)/100)) as valorT"))
                ->first();
                if (is_object($Consultores)) {
                $valorT=$Consultores->valorT;
                }else{
                     $valorT=0;
                }

                array_push($var1, ['Usuario'=> $dato["co_usuario"],'valorT'=>$valorT]);

        }    
        
          return response()->json(
                $var1
            );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
