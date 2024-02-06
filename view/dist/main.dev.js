"use strict";

document.addEventListener("DOMContentLoaded", function () {
  $('.clockpicker').clockpicker();
  var calendario1 = new FullCalendar.Calendar(document.getElementById('calendar'), {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next,today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: '../controller/ctrEventos.php?accion=get_total_eventos',
    locale: 'es',
    dateClick: function dateClick(info) {
      limpiarFormulario(); //función que limpia el formulario

      $("#BotonAgregar").show(); //mostrar el boton agregar

      $("#BotonAgregar").addClass('btn btn-sm btn-success'); //cambio el estilo del boton agregar

      $("#BotonModificar").hide(); //ocultar el boton modificar

      $("#BotonBorrar").hide(); //ocultar el boton borrar

      if (info.allDay) {
        //Obtener fecha de hoy
        $("#fech_ini").val(info.dateStr);
        $("#fech_fin").val(info.dateStr);
      }

      $('#FormularioEventos').modal('show');
    }
  });
  calendario1.render(); //funciones que interactúan con el formulario eventos

  function limpiarFormulario() {
    $("#cliente_ref").val('');
    $("#prod_id").val(1);
    $("#client_nom").val('');
    $("#fech_ini").val('');
    $("#fech_fin").val('');
    $("#hora_ini").val('');
    $("#hora_fin").val('');
    $("#event_descrip").val('');
    $("#text_color").val('#3577f1');
    $("#background_color").val('#FFFFFF');
  }

  $('#BotonAgregar').click(function () {
    var registro = recuperarDatosFormulario();
    agregarRegistro(registro);
    $('#FormularioEventos').modal('hide');
  });

  function llenar_campos() {
    document.getElementById('cliente_ref').addEventListener('change', function () {
      var cliente_ref = $('#cliente_ref').val();
      var usu_id = $('#usu_id').val();
      $.post("../controller/ctrEventos.php?accion=getDatosPor_tick_id_y_ref", {
        cliente_ref: cliente_ref,
        usu_id: usu_id
      }, function (data, textStatus, jqXHR) {
        data = JSON.parse(data);
        try {
          data[0].cliente_ref == cliente_ref;
          $('#client_nom').val(data[0].cliente_nom);
          $('#client_nom').attr('disabled', 'disabled');
          $('#prod_id').attr('disabled', 'disabled');
          $('#prod_id').val(data[0].prod_id);
          $('#tarea_id').attr('disabled', 'disabled');
          $('#tarea_id').val(data[0].tarea_id);
        } catch (error) {
          limpiarFormulario();
          $('#prod_id').removeAttr('disabled');
          $('#tarea_id').removeAttr('disabled');
          $('#client_nom').removeAttr('disabled');
        }
      });
    });
  }

  llenar_campos(); // función llenar campos formulario

  function agregarRegistro(registro) {
    $.ajax({
      type: "POST",
      url: "../controller/ctrEventos.php?accion=agregar",
      data: registro,
      dataType: "json",
      success: function (msj) {
      },
      error: function (xhr, status, error) {
      }

    });
    calendario1.refetchEvents();
  }

  function recuperarDatosFormulario() {
    var registro = {
      usu_id: $('#usu_id').val(),
      cliente_ref: $("#cliente_ref").val(),
      prod_id: $('#prod_id').val(),
      tarea_id: $('#tarea_id').val(),
      descripcion: $('#Descripcion').val(),
      fech_ini: $('#fech_ini').val(),
      hora_ini: $('#hora_ini').val(),
      fech_fin: $('#fech_fin').val(),
      hora_fin: $('#hora_fin').val(),
      text_color: $('#text_color').val(),
      background_color: $('#background_color').val(),
      id_producto: $("#id_producto").val(),
      id_tarea: $("#id_tarea").val()
    };
    return registro;
  }

  ; // $.get("../controller/ctrEventosPredefinidos.php?evento=get_eventos_predefinidos",
  //     function (data, textStatus, jqXHR) {
  //         document.getElementById('evento_agregar').innerHTML = data;
  //     },
  // );

  $.get("../controller/ctrEventos.php?accion=get_select_producto", function (data, textStatus, jqXHR) {
    data = JSON.parse(data);
    var htmlTemplate = '';
    data.forEach(function (elem) {
      htmlTemplate += "\n                    <option value=\"".concat(elem.prod_id, "\">").concat(elem.prod_nombre, "</option>\n                ");
      document.getElementById('prod_id').innerHTML = htmlTemplate;
    });
  });
  $.get("../controller/ctrEventos.php?accion=get_select_tarea", function (data, textStatus, jqXHR) {
    data = JSON.parse(data);
    var htmlTemplate = '';
    data.forEach(function (elem) {
      htmlTemplate += "\n                    <option value=\"".concat(elem.tarea_id, "\">").concat(elem.tarea_nombre, "</option>\n                ");
      document.getElementById('tarea_id').innerHTML = htmlTemplate;
    });
  });
});