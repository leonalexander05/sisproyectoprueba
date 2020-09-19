$(document).ready(function() {

		Carga();
});

//FUNCION PARA CARGAR LA TABLA  Y ACTIVAR DATATABLES
function Carga(){

	var tablaDatos = $("#tbodyconsultor");
	var route = $("#posicion").val() + "/consultores";

	$.ajax({
        url: (route),
        type: 'GET',
        dataType: 'json',
        })
        .always(function(registro) {
        html= "";
        var consultor =eval(registro);
        $("#consultors").dataTable().fnDestroy();
        $("#tbodyconsultor").empty();
	        for (var i in consultor) {
	            html+="<tr>"+
	                "<td>"+consultor[i]['no_usuario']+"</td>"+
                  "<td>"+consultor[i]['co_usuario']+"</td>"+
                  "<td>"+consultor[i]['ds_tipo_usuario']+
	                "<td>"+consultor[i]['no_email']+"</td>"+
                  "<td class='checkbox'><input onclick='borrarTabla()' class='consultoresCheck' type='checkbox' id='opciones_"+i+"' value='"+consultor[i]['co_usuario']+"' ></td></tr>";
	        }


        $("#tbodyconsultor").append(html);
         $('#consultores').DataTable({
              "language": {
                            "sProcessing":     "Procesando...",
                            "sLengthMenu":     "Mostrar _MENU_ registros",
                            "sZeroRecords":    "No se encontraron resultados",
                            "sEmptyTable":     "Ningún dato disponible en esta tabla",
                            "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
                            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                            "sInfoPostFix":    "",
                            "sSearch":         "Buscar:",
                            "sUrl":            "",
                            "sInfoThousands":  ",",
                            "sLoadingRecords": "Cargando...",
                            "oPaginate": {
                                "sFirst":    "Primero",
                                "sLast":     "Último",
                                "sNext":     "Siguiente",
                                "sPrevious": "Anterior"
                            },
                            "oAria": {
                                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                            }
                        }
        });
	
	});
}

function abrirFlortante(e){
    var html;

    $("#tablaGanancia").empty();
    $("#consultorModalLongTitle").empty();
    $("#consultorModalLongTitle").append('Relatorio');
    if ($("#mesDesde").val() == 'default' || $("#anoDesde").val() == 'default' 
        || $("#meshasta").val() == 'default' || $("#anoHasta").val() == 'default') {
           validacion();
           alert("Por favor complete las fechas!")         
    }else{
        var fechaDesde = $("#anoDesde").val()+'-'+$("#mesDesde").val()+'-01';
        var fechaHasta = $("#anoHasta").val()+'-'+$("#mesHasta").val()+'-31';
        var fechaDesde2 = '01/'+$("#mesDesde").val()+'/'+$("#anoDesde").val();
        var fechaHasta2 = '31/'+$("#mesHasta").val()+'/'+$("#anoHasta").val();
        if ($("input:checkbox:checked").is(':checked')) {
            $("#abrirModar").click();
            $("input:checkbox:checked").each(function() {
                        var co_usuario= $(this).val();
                        var route = $("#posicion").val() + "/ganaciasnetas/"+co_usuario+"/"+fechaDesde+"/"+fechaHasta;
                        $.get(route, function(res){

                            mensaje = res.no_usuario== null || res.no_usuario== 0 ? co_usuario : res.no_usuario; 

                            if (res['valorT'] >0 && res['costoFijo']>0 && res['comision']>0) {
                                    var valorT = res['valorT'].toFixed(2);
                                    var costoFijo=res['costoFijo'].toFixed(2);
                                    var comision = res['comision'].toFixed(2);
                                    var lucro = parseFloat(valorT)-(parseFloat(costoFijo)+parseFloat(comision));
                                        html ="<table class='table'"+
                                            "<thead><tr ><th colspan='3'><h4>"+ mensaje+"</h4></th></tr></thead>"+
                                            "<tbody>"+
                                                "<tr id='trCabecera'><td>Period</td><td>Ganancias Netas</td><td>Costo Fijo</td><td>Comision</td><td>Beneficio</td></tr>"+
                                                "<tr><td>Desde "+fechaDesde2+", hasta "+fechaHasta2+"</td>"+
                                                    "<td>R$:"+valorT+"</td>"+
                                                    "<td>R$:"+costoFijo+"</td>"+
                                                    "<td>R$:"+comision+"</td>"+
                                                    "<td>R$:"+lucro.toFixed(2)+"</td>"+
                                                "</tr>"+

                                            "</tbody>"+
                                            
                                        "</table>";
                                        $("#tablaGanancia").append(html);
                            }else{
                                $("#tablaGanancia").append('<div class="alert alert-danger" role="alert"><caption>'
                                    +'No se encontraron Datos de '+mensaje+' en los rangos seleccionados!'+
                                    '</caption><button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                    '<span aria-hidden="true">&times;</span> </button></div>');
                            } 
                        });          
            });
        }else{
            alert("Por Favor Seleccionar un Consultor en la lista");
        }      
    }      
}
    
function borrarTabla() {
  $("#tablaGanancia").empty();
}

function validacion() {
        if ($("#mesDesde").val() == 'default') {
            $("#mesDesde").addClass('validarFechasError');
        }else{
            $("#mesDesde").removeClass('validarFechasError');
        }
         if ($("#mesHasta").val() == 'default') {
            $("#mesHasta").addClass('validarFechasError');
        }else{
            $("#mesHasta").removeClass('validarFechasError');
        }
         if ($("#anoDesde").val() == 'default') {
            $("#anoDesde").addClass('validarFechasError');
        }else{
            $("#anoDesde").removeClass('validarFechasError');
        }
         if ($("#anoHasta").val() == 'default') {
            $("#anoHasta").addClass('validarFechasError');
        }else{
            $("#anoHasta").removeClass('validarFechasError');
        }
}
   
function abrirFlortanteGarafico(argument) {
   
        if ($("#mesDesde").val() == 'default' || $("#anoDesde").val() == 'default' 
        || $("#meshasta").val() == 'default' || $("#anoHasta").val() == 'default') {
           validacion();
           alert("Por favor complete las fechas!")         
        }else{
            if (argument==1) {
                graficotorta();
            }else{

                graficobarra();

            }
        } 
}

function explodePie (e) {
    if(typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
        e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
    } else {
        e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
    }
    e.chart.render();

}

function graficotorta () {
    html = "";
    datos = [];
    var datos2 = [];
    var token = $("#token").val();
    $("#graficos").empty();
    $("#graficosModalLongTitle").empty();
    $("#chartContainer").show();
    $("#containerGrafico").hide();

            var fechaDesde = $("#anoDesde").val()+'-'+$("#mesDesde").val()+'-01';
            var fechaHasta = $("#anoHasta").val()+'-'+$("#mesHasta").val()+'-31';
            var fechaDesde2 = '01/'+$("#mesDesde").val()+'/'+$("#anoDesde").val();
            var fechaHasta2 = '31/'+$("#mesHasta").val()+'/'+$("#anoHasta").val();
            if ($("input:checkbox:checked").is(':checked')) {
              $("#abrirModarGrafico").click();
                $("input:checkbox:checked").each(function() {
                  datos.push({
                    co_usuario: $(this).val(),
                  });
                });
                    var route = $("#posicion").val() + "/consultor";
                    $.ajax({
                        url: route,
                        headers: {'X-CSRF-TOKEN':token},
                        type: 'POST',
                        dataType: 'json',
                        data:  {fechaDesde: fechaDesde,
                               fechaHasta: fechaHasta,
                               datos:datos
                        },
                    })
                    .done(function(res) {
                          datos = res; 
                          for (var i = 0; i <= datos.length-1; i++) {
                                if (datos[i]['valorT']>0) {
                                    valorT= datos[i]['valorT'];
                                }else{
                                    valorT= 0;
                                }
                                datos2.push({y: datos[i]['valorT'], label:datos[i]['Usuario']});
                    }
                          chart.render();     
                    });

                    chart = new CanvasJS.Chart("chartContainer", {
                                animationEnabled: true,
                                exportEnabled: true,
                                exploded: true,
                                title: {
                                    text: "Ganancias Netas"
                                },
                                legend:{
                                    cursor: "pointer",
                                    itemclick: explodePie
                                },
                                data: [{
                                    type: "pie",
                                    startAngle: 240,
                                    showInLegend: true,
                                    yValueFormatString: "##0.00",
                                    indexLabel: "{label} {y}",
                                    dataPoints: datos2
                                            
                                }]

                    });
        
            }else{
                alert("Por Favor Seleccionar un Consultor en la lista");
            } 
}

function graficobarra(argument) {
    html = "";
    datos = [];
    datosUsuario = [];
    periodos = [];
    periodosMeses = [];
    series = [];
    var mes;
    var datos2 = [];
    var token = $("#token").val();
    var numero;
    $("#chartContainer").hide();
    $("#containerGrafico").show();
    $("#graficos").empty();
    $("#graficosModalLongTitle").empty();
    $("#graficosModalLongTitle").append('Ganancias Netas');

    var fechaDesde = $("#anoDesde").val()+'-'+$("#mesDesde").val()+'-01';
    var fechaHasta = $("#anoHasta").val()+'-'+$("#mesHasta").val()+'-31';
    var fechaDesde2 = '01/'+$("#mesDesde").val()+'/'+$("#anoDesde").val();
    var fechaHasta2 = '31/'+$("#mesHasta").val()+'/'+$("#anoHasta").val();

    for (var i = $("#mesDesde").val(); i <= $("#mesHasta").val(); i++) {
        if (i>=10) {
            numero= i;
        }else{
            numero=(i== $("#mesDesde").val())?  i  :'0' + i;
        }
        periodos.push(numero) 
        switch(numero){
            case '01': mes= 'Enero';break;
            case '02': mes='Febrero';break;
            case '03': mes='Marzo';break;
            case '04': mes='Abril';break;
            case '05': mes='Mayo';break;
            case '06': mes='Junio';break;
            case '07': mes='Julio';break;
            case '08': mes='Agosto';break;
            case '09': mes='Septiembre';break;
            case  10: mes='Octubre';break;
            case  11: mes='Noviembre';break;
            case  12: mes='Diciembre';break;
        }
        periodosMeses.push(mes);                    
    }

            if ($("input:checkbox:checked").is(':checked')) {
                $("#abrirModarGrafico").click();
                $("input:checkbox:checked").each(function() {
                  datosUsuario.push({"usuario":$(this).val()});
                });

                var route = $("#posicion").val() + "/ganaciasNetasGrafico";
                    $.ajax({
                        url: route,
                        headers: {'X-CSRF-TOKEN':token},
                        type: 'POST',
                        dataType: 'json',
                        data:  {datos: datosUsuario,
                               periodos:periodos
                        },
                    })
                    .done(function(res) {
                          datos = res; 
                          usuario ='';
                          for (var j = 0 ;j <= datosUsuario.length-1; j++) {
                  
                            for (var i = 0; i <= datos.length-1; i++) {
                                if (datos[i]['Usuario']==datosUsuario[j]['usuario']) {
                                    valorT=(datos[i]['valorT']>0)?datos[i]['valorT']:0;
                                    datos2.push(valorT) 
                                }
                            }

                            series.push({'name': datosUsuario[j]['usuario'],'data':datos2});
                            datos2 = [];
                          }
                          Highcharts.chart('container', {
                                chart: {
                                    type: 'column'
                                },
                                title: {
                                    text: 'Ganancias Netas'
                                },
                                subtitle: {
                                    text: 'Ganancias netas por usuario'
                                },
                                xAxis: {
                                    categories: periodosMeses,
                                    crosshair: true
                                },
                                yAxis: {
                                    min: 0,
                                    title: {
                                        text: 'Ganancias Netas (R$)'
                                    }
                                },
                                tooltip: {
                                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                        '<td style="padding:0"><b>{point.y:.1f} R$</b></td></tr>',
                                    footerFormat: '</table>',
                                    shared: true,
                                    useHTML: true
                                },
                                plotOptions: {
                                    column: {
                                        pointPadding: 0.5,
                                        borderWidth: 0
                                    }
                                },
                                series: series
                          });         
                    });
                    
            }else{
                alert("Por Favor Seleccionar un Consultor en la lista");
            } 
}

