"use strict";

function init() {}

$(document).ready(function () {
  tabla = $("#tabla_detalle").dataTable({
    "aProcessing": true,
    "aServerSide": true,
    dom: 'Bfrtip',
    "searching": true,
    lenghtChange: false,
    colReorder: true,
    buttons: ['copyHtml5', 'excelHtml5', 'csvHtml5', 'pdfHtml5'],
    "ajax": {
      url: "../../controller/ctrGraficos.php?op_grafico=get_detalle_total_tareas",
      type: "post",
      dataType: "json",
      data: {// est: 1
      },
      error: function error(e) {
      }
    },
    "order": [[0, "desc"]],
    //Ordenar descendentemente
    "bDestroy": true,
    "responsive": true,
    "bInfo": true,
    "iDisplayLength": 8,
    //cantidad de tuplas o filas a mostrar
    "autoWith": false,
    "language": {
      "sProcessing": "Procesando..",
      "sLengthMenu": "Mostrar _MENU_ registros",
      "sZeroRecords": "No se encontraron resultados..",
      "sEmptyTable": "Ningún dato disponible en esta tabla",
      "sInfo": "Mostrando un total de _TOTAL_ registros",
      "sInfoEmpty": "Mostrando un total de 0 registros",
      "sInfoFiltered": "(Filtrado de un total de _MAX_ registros)",
      "sInfoPostFix": "",
      "sSearch": "Buscar: ",
      "sUrl": "",
      "sInfoThousands": ",",
      "sLoadingRecords": "Cargando",
      "oPaginate": {
        "sFirst": "Primero",
        "sLast": "Ùltimo",
        "sNext": "Siguiente",
        "sPrevious": "Anterior"
      },
      "oAria": {
        "sSortAscending": ":Activar para ordenar la columna de manera ascendiente",
        "sSortDescending": ":Activar para ordenar la columna de manera descendiente"
      }
    }
  }).DataTable();
  $.post("../../controller/ctrGraficos.php?op_grafico=get_total_max_ts_evento_x_cada_servicio", function (data, textStatus, jqXHR) {
    prod_nombre = data.map(function (elem) {
      return [elem.prod_nombre];
    });
    total = data.map(function (elem) {
      return [elem.total];
    });
    var chartDoughProd = document.getElementById('chartDoughProductos'); //----------------Inicio gráfico de dona

    var data = {
      labels: prod_nombre,
      datasets: [{
        label: 'Total',
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(150, 206, 200, 0.5)', 'rgba(100, 100, 200, 0.5)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(150, 206, 200, 1)', 'rgba(100, 100, 200, 1)'],
        borderWidth: 1,
        data: total
      }]
    }; // Configurar opciones del gráfico

    var options = {
      responsive: true,
      maintainAspectRatio: false
    }; // Crear el gráfico

    var chartDoughProductos = new Chart(chartDoughProd, {
      type: 'doughnut',
      data: data,
      options: options
    }); //--------------------Finaliza gráfico de dona
  }, "json");
});

function btnVerDetalleTarea(event_id) {
  $("#modal_tareas_datatables_detalle").modal("show");
  tabla = $("#datatables_detalle_tareas_finalizadas").dataTable({
    "aProcessing": true,
    "aServerSide": true,
    dom: 'Bfrtip',
    "searching": true,
    lenghtChange: false,
    colReorder: true,
    buttons: ['copyHtml5', 'excelHtml5', 'csvHtml5', 'pdfHtml5'],
    "ajax": {
      url: "../../controller/ctrGraficos.php?op_grafico=get_datos_tareas_datatables_detalle",
      type: "post",
      dataType: "json",
      data: {
        event_id: event_id
      },
      error: function error(e) {
      }
    },
    "order": [[0, "desc"]],
    //Ordenar descendentemente
    "bDestroy": true,
    "responsive": true,
    "bInfo": true,
    "iDisplayLength": 8,
    //cantidad de tuplas o filas a mostrar
    "autoWith": false,
    "language": {
      "sProcessing": "Procesando..",
      "sLengthMenu": "Mostrar _MENU_ tareas",
      "sZeroRecords": "No se encontraron resultados..",
      "sEmptyTable": "Ningún dato disponible en esta tabla",
      "sInfo": "Mostrando un total de _TOTAL_ tareas",
      "sInfoEmpty": "Mostrando un total de 0 tareas",
      "sInfoFiltered": "(Filtrado de un total de _MAX_ tareas)",
      "sInfoPostFix": "",
      "sSearch": "Buscar: ",
      "sUrl": "",
      "sInfoThousands": ",",
      "sLoadingRecords": "Cargando",
      "oPaginate": {
        "sFirst": "Primero",
        "sLast": "Ùltimo",
        "sNext": "Siguiente",
        "sPrevious": "Anterior"
      },
      "oAria": {
        "sSortAscending": ":Activar para ordenar la columna de manera ascendiente",
        "sSortDescending": ":Activar para ordenar la columna de manera descendiente"
      }
    }
  }).DataTable();
}

init();