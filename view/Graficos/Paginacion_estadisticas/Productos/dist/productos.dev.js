"use strict";

function init() {}

$(document).ready(function () {
  //  grafico_total_tareas_x_event_id
  // Para que cuando cargue aparezca en la mitad de la pantalla
  var middleOfScreen = window.innerHeight / 3;
  window.scrollTo(0, middleOfScreen);
});
$.post("../../controller/ctrGraficos.php?op_grafico=get_total_horas_por_proy", function (data, textStatus, jqXHR) {
  var tick_titulo = data.map(function (elem) {
    return elem.tick_titulo.length > 25 ? elem.tick_titulo.substring(0, 25) + "..." : elem.tick_titulo;
  });
  var horas_total = data.map(function (elem) {
    return elem.horas_total;
  });
  var usuario = data.map(function (elem) {
    return elem.usuario;
  });
  var producto = data.map(function (elem) {
    return elem.producto;
  });
  var tarea = data.map(function (elem) {
    return elem.tarea;
  });
  var sector = data.map(function (elem) {
    return elem.sector;
  });
  var horasAsignadasaClientes = document.getElementById('horasAsignadasaClientes');
  new Chart(horasAsignadasaClientes, {
    type: 'bar',
    data: {
      labels: tick_titulo,
      datasets: [{
        label: 'Total de horas asignadas',
        data: horas_total,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: function label(context) {
              var dataIndex = context.dataIndex;
              return '\n[ Total Horas : ' + context.parsed.y + " ] " + '\n[ Producto : ' + producto[dataIndex] + " ] " + ' [ Analista : ' + usuario[dataIndex] + " ] " + '\n [ Sector : ' + sector[dataIndex] + " ] ";
            }
          }
        }
      }
    }
  });
}, "json");
$.post("../../controller/ctrGraficos.php?op_grafico=get_total_proyectos_creados", function (data, textStatus, jqXHR) {
  document.getElementById("total_proyectos_creados").innerText = data[0].total;
}, "json");
$.post("../../controller/ctrGraficos.php?op_grafico=get_tota_eventos_activos", function (data, textStatus, jqXHR) {
  document.getElementById("proyectos_activos").innerText = data[0].total;
}, "json");
$.post("../../controller/ctrGraficos.php?op_grafico=get_tota_tareas_finalizadas", function (data, textStatus, jqXHR) {
  document.getElementById("tareas_finalizadas").innerText = data[0].total;
}, "json");
$.post("../../controller/ctrGraficos.php?op_grafico=get_total_max_x_cada_servicio", function (data, textStatus, jqXHR) {
  document.getElementById("total_max_prod").innerText = data[0].maximo_total;
  document.getElementById("nom_total_max_prod").innerText = data[0].prod_nombre_maximo;
}, "json");
$.post("../../controller/ctrGraficos.php?op_grafico=get_total_eventos_activos", function (data, textStatus, jqXHR) {
  document.getElementById("proyectos_activos").innerText = data[0].total;
  document.getElementById("proyectos_nuevos").innerText = data[0].total;
}, "json");
init();