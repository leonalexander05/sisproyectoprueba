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
    var datos =[];
    var datosUsuario =[];
    var periodos =[];
    var periodosMeses = [];
    var token = $("#token").val();
    var mes='';
    var TotalvalorT=0
    var TotalcostoFijo=0;
    var Totalcomision=0;
    var Totallucro=0;

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
            $("#abrirModar").click();
            $("input:checkbox:checked").each(function() {
                  datosUsuario.push({
                    co_usuario: $(this).val(),
                  });
            });

            var route = $("#posicion").val() + "/ganaciasNetasRelatorio";
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
                            var TotalvalorT=0
                            var TotalcostoFijo=0;
                            var Totalcomision=0;
                            var Totallucro=0;
                            html ="<table class='table'";
                            html+="<thead><tr ><th colspan='3' id='nombreusuario"+j+"'></th></tr></thead>";
                            html+="<tbody>";
                            html+= "<tr id='trCabecera'><td>Periodo</td><td>Ganancias Netas</td><td>Costo Fijo</td><td>Comision</td><td>Beneficio</td></tr>";
                            for (var i = 0; i <= datos.length-1; i++) {
                                if (datos[i]['Usuario']==datosUsuario[j]['co_usuario'] ) {
                                    valorT=(datos[i]['valorT']>0)?datos[i]['valorT']:0;
                                    brut_salario=(datos[i]['brut_salario']>0)?datos[i]['brut_salario']:0;
                                    comision=(datos[i]['comision']>0)?datos[i]['comision']:0;
                                    switch(datos[i]['periodo']){
                                        case '01': mes= 'Enero';break;
                                        case '02': mes='Febrero';break;
                                        case '03': mes='Marzo';break;
                                        case '04': mes='Abril';break;
                                        case '05': mes='Mayo';break;
                                        case '06': mes='Junio';break;
                                        case '07': mes='Julio';break;
                                        case '08': mes='Agosto';break;
                                        case '09': mes='Septiembre';break;
                                        case '10': mes='Octubre';break;
                                        case  '11': mes='Noviembre';break;
                                        case  '12': mes='Diciembre';break;
                                    }
                                    valorT = Number.parseFloat(valorT).toFixed(2);
                                    costoFijo=Number.parseFloat(brut_salario).toFixed(2);
                                    comision = Number.parseFloat(comision).toFixed(2);
                                    lucro = parseFloat(valorT)-(parseFloat(costoFijo)+parseFloat(comision));
                                    TotalvalorT+=  parseFloat(valorT);
                                    TotalcostoFijo+= parseFloat(costoFijo);
                                    Totalcomision+= parseFloat(comision);
                                    Totallucro+= parseFloat(lucro.toFixed(2));
                           
                                            html+="<tr><td>"+mes+"</td>";
                                            html+="<td>R$:"+valorT+"</td>";
                                            html+="<td>R$:"+costoFijo+"</td>";
                                            html+="<td>R$:"+comision+"</td>";
                                            html+="<td>R$:"+lucro.toFixed(2)+"</td>";
                                            html+="</tr>";
                                            if (datos[i]['nombre']=='') {
                                                 html2= "<h4>"+ datosUsuario[j]['co_usuario'] +" <small> (EL usuario no posee datos enel rango de fecha seleccionado!)</small></h4>";
                                            } else{
                                                 html2= "<h4>"+ datos[i]['nombre']+"</h4>";
                                            }
                                           

                                }
                                var idcampo = "#nombreusuario"+j;   
                            }


                           html+=  "</tbody>";
                           html+="<tfoot>";
                           html+="<tr><td>Totales:</td>";
                           html+="<td>R$:"+Number.parseFloat(TotalvalorT).toFixed(2)+"</td>";
                           html+="<td>R$:"+Number.parseFloat(TotalcostoFijo).toFixed(2)+"</td>";
                           html+="<td>R$:"+Number.parseFloat(Totalcomision).toFixed(2)+"</td>";
                           html+="<td>R$:"+Number.parseFloat(Totallucro).toFixed(2)+"</td>";
                           html+="</tr></tfoot>";
                           html+=  "</table>";
                           $("#tablaGanancia").append(html);
                           $(idcampo).append(html2);
                          }   
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

