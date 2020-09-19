@extends('layouts.admin')
@section('css')
		<link rel="stylesheet" href="{{asset('css/consultor.css')}}">
@endsection
@section('contenido')


<input type="hidden" name="_token" value="{{ csrf_token() }}" id="token">
<div id='foo'></div>
	
		<div class="table-responsive">
			<h3>Listado de Consultor</h3>
			<table id="tablaFiltro">
				<form id="formFiltro">
					<tr>
						<td><table id="tablaFiltro2" >
							<tr >
								<td><label>Periodo:</label></td>
								<td>
									<select onchange="validacion()" class="form-control required" id="mesDesde" title="colaca la fechas">
										<option value="default">Seleccione</option>
										<option value='01' selected="selected">Enero</option>
										<option value='02'>Febrero</option>
										<option value='03'>Marzo</option>
										<option value='04'>Abril</option>
										<option value='05'>Mayo</option>
										<option value='06'>Junio</option>
										<option value='07' >Julio</option>
										<option value='08'>Agosto</option>
										<option value='09'>Septiembre</option>
										<option value='10'>Octubre</option>
										<option value='11'>Noviembre</option>
										<option value='12'>Diciembre</option>
									</select>
								</td>
								<td>
									<select onchange="validacion()" class="form-control" id="anoDesde">
										<option value="default">Seleccione</option>
										<option value='2007' selected="selected">2007</option>
									</select>
								</td>
								<td><label> A </label></td>
								<td>
									<select onchange="validacion()" class="form-control" id="mesHasta">
										<option value="default">Seleccione</option>
										<option value='01'>Enero</option>
										<option value='02'>Febrero</option>
										<option value='03'>Marzo</option>
										<option value='04'>Abril</option>
										<option value='05'>Mayo</option>
										<option value='06'>Junio</option>
										<option value='07'>Julio</option>
										<option value='08'>Agosto</option>
										<option value='09'>Septiembre</option>
										<option value='10'>Octubre</option>
										<option value='11' selected="selected">Noviembre</option>
										<option value='12'>Diciembre</option>
									</select>
								</td>
								<td>
									<select onchange="validacion()" class="form-control" id="anoHasta">
										<option value="default">Seleccione</option>
										<option value='2007' selected="selected">2007</option>

									</select>
								</td>
							</tr></table>
						</td>
						<td>   </td>
						<td><a  type="submit"  href="#" onclick="abrirFlortante(this)" id="btnRelatorio" class="btn btn-primary"><i class="fa fa-file-o" aria-hidden="true"></i> Relatório</a>

						<a  data-toggle='modal' data-target='#myModaConsultor' href="#"  id="abrirModar"></a>
						<a  data-toggle='modal' data-target='#myModaGrafico' href="#"  id="abrirModarGrafico"></a>

						<td><a  type="submit"  href="#" onclick="abrirFlortanteGarafico(1)" id="btnGraficoPizza"  class="btn btn-primary"  ><i class="fa  fa-pie-chart" aria-hidden="true"></i> Pizza</a></td>

						<td><a  type="submit"  href="#" onclick="abrirFlortanteGarafico(2)" id="btnGraficoPizza"  class="btn btn-primary"  ><i class="fa fa-bar-chart"></i> Grafico</a></td>

					</tr>
				</form>
			</table>
			<input type="hidden" name="posicion" id="posicion" value="{{Request::root()}}">
		</div>
	
	<br>
	<div class="table-responsive " >
			
			<table id="consultores" class="table table-responsive table-striped" >
		        <thead>
		            <tr>
		                <th>Nombre</th>
		                <th>Usuario</th>
		                <th>Tipo de Usuario</th>
		                <th>Email</th>
		                <th>Opciones</th>
		            </tr>
		        </thead>
		        <tbody id="tbodyconsultor">
		 
		        </tbody>
		        <tfoot>
		            <tr>
		                <th>Nombre</th>
		                <th>Usuario</th>
		                <th>Tipo de Usuario</th>
		                <th>Email</th>
		                <th>Opciones</th>
		                
		            </tr>
		        </tfoot>
		    </table>
	</div>



	<div class="modal fade" id="myModaConsultor" tabindex="-1" role="dialog" aria-labelledby="consultorModalLongTitle">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h2 class="modal-title" id="consultorModalLongTitle"></h2>
	      </div>
	      <div class="modal-body">
	      
	        <div id="tablaGanancia"></div>
	        
	      </div>
	      
	      <div class="modal-footer">
	      	<button type="button" id="cancelar" class="btn btn-warning" data-dismiss="modal" aria-label="Close">Cancelar!</button>
	      </div>
	    </div>
	  </div>
	</div>


	<div class="modal fade" id="myModaGrafico" tabindex="-1" role="dialog" aria-labelledby="graficosModalLongTitle">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h2 class="modal-title" id="graficosModalLongTitle"></h2>
	      </div>
	      <div class="modal-body" >
	      <div id="chartContainer" style="height: 370px; max-width: 920px; margin: 0px auto;"></div>  
	      <figure class="highcharts-figure" id="containerGrafico">
		    <div id="container"></div>
		  </figure>   
	      		  
	      <div class="modal-footer">
	      
	      </div>
	    </div>
	  </div>
	</div>

@endsection

@section('scripts')
		{!!Html::script('js/highcharts.js')!!}
		{!!Html::script('js/exporting.js')!!}
		{!!Html::script('js/export-data.js')!!}
		{!!Html::script('js/accessibility.js')!!}

		{!!Html::script('js/camvasjs.js')!!}
		{!!Html::script('js/consultor2.js')!!}
		
@endsection
