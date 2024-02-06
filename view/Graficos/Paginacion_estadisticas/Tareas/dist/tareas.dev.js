"use strict";

function init() {}

$(document).ready(function () {
  //  grafico_total_tareas_x_event_id
  // Para que cuando cargue aparezca en la mitad de la pantalla
  $.post("../../controller/ctrGraficos.php?op_grafico=get_total_tareas_creadas", function (data, textStatus, jqXHR) {
    document.getElementById("total_tareas_creadas").innerText = data[0].total;
  }, "json");
  $.post("../../controller/ctrGraficos.php?op_grafico=get_total_tareas_activas", function (data, textStatus, jqXHR) {
    document.getElementById("total_tareas_activas").innerText = data[0].total;
  }, "json");
  $.post("../../controller/ctrGraficos.php?op_grafico=get_total_tareas_inactivas", function (data, textStatus, jqXHR) {
    document.getElementById("total_tareas_inactivas").innerText = data[0].total;
  }, "json");
  $.post("../../controller/ctrGraficos.php?op_grafico=get_total_tarea_max", function (data, textStatus, jqXHR) {
    document.getElementById("nombre_total_tarea_mas_realiada").innerText = data[0].tarea;
    document.getElementById("total_tarea_mas_realiada").innerText = data[0].total;
  }, "json");
  $.post("../../controller/ctrGraficos.php?op_grafico=get_datos_tareas", function (data, textStatus, jqXHR) {
    htmlTemplate = '';
    data.forEach(function (elem) {
      htmlTemplate += "\n      <tr>\n        <td>".concat(elem.total, "</td>\n        <td>").concat(elem.tick_titulo, "</td>\n        <td>").concat(elem.nom_usuario, "</td>\n        <td>").concat(elem.sector_nom == 'Calidad Y Procesos' ? 'Calidad' : elem.sector_nom, "</td>\n        <td>").concat(elem.horas_total_inicial, "</td>\n        <td>").concat(elem.horas_consumidas, "</td>\n        <td>").concat(elem.horas_restantes, "</td>\n        <th style=\"width: 70px; padding:5px; text-align:center;\"><a type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Ver Tareas\" onclick=\"ver_estadistica_tarea(").concat(elem.event_id, ")\"><i class=\"ri-git-branch-line\" style=\"color:#6559cc; font-size:20px\"></i></a></th>                                     \n      </tr>\n      ");
      document.getElementById("tbody_table_tareas").innerHTML = htmlTemplate;
    });
  }, "json");
});

function ver_estadistica_tarea(event_id) {
  $("#modal_grafico_tareas").modal('show');
  $.post("../../controller/ctrGraficos.php?op_grafico=get_datos_tareas_x_event_id", {
    event_id: event_id
  }, function (data, textStatus, jqXHR) {
    $.post("../../controller/ctrGraficos.php?op_grafico=get_horas_consumidas_ultimo_valor", {
      event_id: event_id
    }, function (data, textStatus, jqXHR) {
      var htmlTemplaBarraProgress = '';
      var formula = 0;
      var hs_consumidas = parseFloat(data[0].suma_horas_consumidas);
      formula = hs_consumidas / data[0].horas_total * 100;
      htmlTemplaBarraProgress += "\n        <div class=\"progress-bar\" role=\"progressbar\" style=\"width:".concat(formula.toFixed(1), "%;\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\">").concat(formula.toFixed(1), "%</div>\n        ");
      document.getElementById("barra_progreso").innerHTML = htmlTemplaBarraProgress;
    }, "json");
    document.getElementById("id_cliente_tarea").innerText = data[0].tick_titulo;
    document.getElementById("id_analista_tarea").innerText = data[0].usuario;
    document.getElementById("id_horas_asignadas").innerText = data[0].horas_total + 'hs';
    var htmlTemplate = '';

    for (var i = 0; i < data.length; i++) {
      htmlTemplate += "\n      <div class=\"mini-stats-wid d-flex align-items-center mt-3\">\n          <div class=\"flex-shrink-0 avatar-sm\">\n              <span class=\"mini-stat-icon avatar-title rounded-circle text-success bg-soft-success fs-4\">\n                  ".concat(i + 1, "\n              </span>\n          </div>\n          <div class=\"flex-grow-1 ms-3\">\n              <h6 class=\"mb-1\">Se realiz\xF3 ").concat(data[i].tarea, " y el producto fue ").concat(data[i].producto, "</h6>\n              <p class=\"text-muted mb-0\">Descripci\xF3n: ").concat(data[i].event_descrip, "</p>\n          </div>\n          <div class=\"flex-grow-1 ms-3\">\n              <h6 class=\"mb-1 text-center\"><span class=\"badge badge-soft-warning text-uppercase\">Horas consumidas: ").concat(data[i].horas_consumidas, "</span></h6>\n          </div>\n          <div class=\"flex-grow-1 ms-3 mr-3\" >\n              <h6 class=\"mb-1 text-center\"><span class=\"badge badge-soft-success text-uppercase\">Horas restantes:  ").concat(data[i].horas_restantes, "</span></h6>\n          </div>\n          <div class=\"flex-shrink-0\">\n              <p class=\"text-muted mb-0 text-center\">Per\xEDodo de tarea<span class=\"text-uppercase\"></span></p>\n              <p class=\"text-muted mb-0\">").concat(data[i].fech_ini, " ").concat(data[i].hora_ini, "<span class=\"text-uppercase\">am</span></p>\n              <p class=\"text-muted mb-0\">").concat(data[i].fech_fin, " ").concat(data[i].hora_fin, "<span class=\"text-uppercase\">am</span></p>\n          </div>\n      </div>\n      <hr>\n      ");
      document.getElementById("cont_datos_tarea").innerHTML = htmlTemplate;
    }
  }, "json");
}

ver_estadistica_tarea();
init();