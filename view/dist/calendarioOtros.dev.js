"use strict";

document.getElementById("valor_cliente").addEventListener("input", function () {
  var valor_cliente = $("#valor_cliente").val();
  $.post("../controller/ctrTasking/ctrEvento.php?op_evento_tasking=get_cliente_x_palabra", {
    valor_cliente: valor_cliente
  }, function (data, textStatus, jqXHR) {
    data.forEach(function (elem) {
      if ($("#valor_cliente").val() == '') {
        $("#tick_titulo").val('');
        $("#client_id").val('');
      } else {
        $("#tick_titulo").val(elem.client_rs);
        $("#client_id").val(elem.client_id);
      }
    });
  }, "json");
});
$.post("../controller/ctrEventos.php?accion=get_select_producto", function (data, textStatus, jqXHR) {
  data = JSON.parse(data);
  var htmlTemplate = '';
  data.forEach(function (elem) {
    htmlTemplate += "\n                <option value=\"".concat(elem.prod_id, "\">").concat(elem.prod_nombre, "</option>\n            ");
    document.getElementById('prod_id').innerHTML = htmlTemplate;
  });
});
$.post("../controller/ctrEventos.php?accion=get_select_tarea", function (data, textStatus, jqXHR) {
  data = JSON.parse(data);
  var htmlTemplate = '';
  data.forEach(function (elem) {
    htmlTemplate += "\n                <option id=prod_id value=\"".concat(elem.tarea_id, "\">").concat(elem.tarea_nombre, "</option>\n            ");
    document.getElementById('tarea_id').innerHTML = htmlTemplate;
  });
});

function agregarRegistroUsuarioDistintoEh(registro) {
  $.ajax({
    type: "POST",
    url: "../controller/ctrEventos.php?accion=agregar_event_UsuarioDistintoEh",
    data: registro,
    dataType: "json",
    success: function success(data) {
    },
    error: function error(xhr, status, _error, data) {
    }
  });
  Toastify({
    text: '[' + $("#client_nom").val() + "] Agregado correctamente",
    duration: 1200,
    gravity: "top",
    position: "left",
    style: {
      "margin-left": "120px"
    },
    backgroundColor: "#689dff"
  }).showToast();
  calendario1.refetchEvents();
}

function recuperarDatosFormularioUsuarioDistintoEh() {
  var registro = {
    client_id: $("#client_id"),
    prod_id_id: $("#prod_id"),
    tarea_id: $("#tarea_id"),
    horas_total: $("#horas_total"),
    horas_restantes: calcular_horas_restantes(),
    horas_consumidas: calcular_horas_consumidas(),
    fech_ini: $("#fech_ini"),
    fech_fin: $("#fech_fin"),
    hora_ini: $("#hora_ini"),
    hora_fin: $("#hora_fin"),
    event_descrip: $("#event_descrip")
  };
  return registro;
}

$('#BotonAgregarSectoresDiferentesaEh').click(function (event) {
  hora_ini = $('#hora_ini').val();
  hora_fin = $('#hora_fin').val();
  var horaInicialValue = parseInt(hora_ini.split(':')[0], 10);
  var horaFinalValue = parseInt(hora_fin.split(':')[0], 10);

  if ($('#client_id').val() == '' || $('#tick_titulo').val() == '' || $('#prod_id').val() == '' || $('#tarea_id').val() == '' || $('#horas_total').val() == '' || $('#horas_restantes').val() == '' || $('#horas_consumidas').val() == '' || $('#fech_ini').val() == '' || $('#hora_ini').val() == '' || $('#fech_fin').val() == '' || $('#hora_fin').val() == '' || $("#event_descrip").val() == '') {
    Swal.fire({
      title: "¡Hay datos vacíos!",
      text: "Debe llenar todos los campos",
      timer: 1300,
      showCancelButton: false,
      showConfirmButton: false
    });
  } else if (hora_ini >= hora_fin) {
    Swal.fire({
      title: "¡Las horas ingresadas no corresponden",
      timer: 1300,
      showCancelButton: false,
      showConfirmButton: false
    });
    $('#hora_fin').val('');
  } else {
    var registro = recuperarDatosFormularioUsuarioDistintoEh();
    agregarRegistroUsuarioDistintoEh(registro);
    $('#FormularioEventosSectoresDiferentesaEh').modal('hide');
  }
});