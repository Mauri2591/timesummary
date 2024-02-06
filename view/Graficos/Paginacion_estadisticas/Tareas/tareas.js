function init() {
}
$(document).ready(function () {
  //  grafico_total_tareas_x_event_id
  // Para que cuando cargue aparezca en la mitad de la pantalla

  $.post("../../controller/ctrGraficos.php?op_grafico=get_total_tareas_creadas",
    function (data, textStatus, jqXHR) {
      document.getElementById("total_tareas_creadas").innerText = data[0].total
    },
    "json"
  );

  $.post("../../controller/ctrGraficos.php?op_grafico=get_total_tareas_activas",
    function (data, textStatus, jqXHR) {
      document.getElementById("total_tareas_activas").innerText = data[0].total
      document.getElementById("total_tareas_activas_en_detalle").innerText = data[0].total
    },
    "json"
  );

  $.post("../../controller/ctrGraficos.php?op_grafico=get_total_tarea_max",
    function (data, textStatus, jqXHR) {
      document.getElementById("nombre_total_tarea_mas_realiada").innerText = data[0].tarea
      document.getElementById("total_tarea_mas_realiada").innerText = data[0].total
    },
    "json"
  );

  $.post("../../controller/ctrGraficos.php?op_grafico=get_datos_tareas", function (data, textStatus, jqXHR) {
    htmlTemplate = '';
    data.forEach(elem => {
      htmlTemplate += `
      <tr>
        <td style="font-size: 16px">${elem.total}</td>
        <td style="font-size: 16px">${elem.tick_titulo}</td>
        <td style="font-size: 16px">${elem.nom_usuario}</td>
        <td style="font-size: 16px">${elem.sector_nom == 'Calidad Y Procesos' ? 'Calidad' : elem.sector_nom}</td>
        <td style="font-size: 16px">${elem.horas_total_inicial}</td>
        <td style="font-size: 16px">${elem.horas_consumidas}</td>
        <td style="font-size: 16px">${elem.horas_restantes}</td>
        <th style="width: 70px; padding:5px; text-align:center;"><a type="button" data-toggle="tooltip" data-placement="top" title="Ver Detalle" onclick="ver_estadistica_tarea(${elem.event_id})"><i class="ri-git-branch-line" style="color:#6559cc; font-size:20px"></i></a></th>                                     
      </tr>
      `;
      document.getElementById("tbody_table_tareas").innerHTML = htmlTemplate;
    });
  },
    "json"
  );
});

function ver_estadistica_tarea(event_id) {
  $("#modal_grafico_tareas").modal('show');

  $.post("../../controller/ctrGraficos.php?op_grafico=get_datos_tareas_x_event_id", { event_id: event_id }, function (data, textStatus, jqXHR) {
    console.log(data);

    $.post("../../controller/ctrGraficos.php?op_grafico=get_horas_consumidas_ultimo_valor", { event_id: event_id },
      function (data, textStatus, jqXHR) {
        let htmlTemplaBarraProgress = '';
        let formula = 0;
        let hs_consumidas = parseFloat(data[0].suma_horas_consumidas);
        formula = (hs_consumidas / data[0].horas_total) * 100;
        htmlTemplaBarraProgress += `
        <div class="progress-bar" role="progressbar" style="width:${formula.toFixed(1)}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${formula.toFixed(1)}%</div>
        `;
        document.getElementById("barra_progreso").innerHTML = htmlTemplaBarraProgress;
      },
      "json"
    );

    document.getElementById("id_cliente_tarea").innerText = data[0].tick_titulo;
    document.getElementById("id_analista_tarea").innerText = data[0].usuario;
    document.getElementById("id_horas_asignadas").innerText = data[0].horas_total + 'hs';

    var htmlTemplate = '';
    for (let i = 0; i < data.length; i++) {
      htmlTemplate += `
      <div class="mini-stats-wid d-flex align-items-center mt-0">
          <div class="flex-shrink-0 avatar-sm">
              <span class="mini-stat-icon avatar-title rounded-circle text-success bg-soft-success fs-4">
                  ${i + 1}
              </span>
          </div>
          <div class="flex-grow-1 ms-3">
              <h6 class="mb-1">Se realizó ${data[i].tarea} y el producto fue ${data[i].producto}</h6>
              <p class="text-muted mb-0">Descripción: ${data[i].event_descrip}</p>
          </div>
          <div class="flex-grow-1 ms-3">
              <h6 class="mb-1 text-center"><span class="badge badge-soft-warning text-uppercase">Horas consumidas: ${data[i].horas_consumidas}</span></h6>
          </div>
          <div class="flex-grow-1 ms-3 mr-3" >
              <h6 class="mb-1 text-center"><span class="badge badge-soft-success text-uppercase">Horas restantes:  ${data[i].horas_restantes}</span></h6>
          </div>
          <div class="flex-shrink-0">
              <p class="text-muted mb-0 text-center">Período de tarea<span class="text-uppercase"></span></p>
              <p class="text-muted mb-0">${data[i].fech_ini} ${data[i].hora_ini}<span class="text-uppercase"></span></p>
              <p class="text-muted mb-0">${data[i].fech_fin} ${data[i].hora_fin}<span class="text-uppercase"></span></p>
          </div>
          <div class="flex-shrink-0 ml-3">
              <p class="text-muted mb-0 text-center">Analista<span class="text-uppercase"></span></p>
              <p class="text-muted mb-0">${data[i].usuario}<span class="text-uppercase"></span></p>
          </div>
      </div>
      <hr>
      `;
      document.getElementById("cont_datos_tarea").innerHTML = htmlTemplate;
    }
  },
    "json"
  );
}
ver_estadistica_tarea();

init();