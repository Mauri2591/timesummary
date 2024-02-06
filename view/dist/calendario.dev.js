"use strict";

function init() { }

document.addEventListener("DOMContentLoaded", function () {
  $.post("../controller/ctrEventos.php?accion=get_total_eventos", function (data, textStatus, jqXHR) { }, "json");
  toastr.options = {
    "positionClass": "toast-top-center"
  }; //posición de toas global

  $('.clockpicker').clockpicker(); //para el reloj

  var calendario1 = new FullCalendar.Calendar(document.getElementById('calendar'), {
    editable: true,
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next,today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: '../controller/ctrEventos.php?accion=get_total_eventos',
    locale: 'es',
    dateClick: function dateClick(info) {
      // Abre modal y trae info de la fechas
      if ($("#usu_sector").val() == 1) {
        //******* Inicio si el usuario es de EH
        limpiarFormulario();
        $("#horas_total").on("change", function () {
          //Valida que el tipo de dato de horas_total sea un entero
          var regex = /^\d+$/;
          var horasTotal = $(this).val();

          if (!regex.test(horasTotal)) {
            Swal.fire({
              icon: 'warning',
              title: 'Error...',
              text: 'Las horas totales deben ser un número entero',
              timer: 1300,
              showCancelButton: false,
              showConfirmButton: false
            });
            $(this).val('');
            $(this).focus();
          }
        }); //*****************Calcula horas que restan*******************

        document.getElementById("hora_ini").addEventListener("change", function () {
          var regla_hora_ini = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

          if (!regla_hora_ini.test($("#hora_ini").val())) {
            Swal.fire({
              title: "¡Hora no válida!",
              timer: 1200,
              showCancelButton: false,
              showConfirmButton: false
            });
            $("#hora_ini").val('');
            $("#hora_ini").focus();
          }

          if (calcular_horas_restantes() < 0) {
            Swal.fire({
              title: "¡Error en la carga de horas!",
              timer: 1200,
              showCancelButton: false,
              showConfirmButton: false
            });
            $("#hora_fin").val('');
            $("#hora_fin").focus();
          } // $("#horas_restantes").val(calcular_horas_restantes())

        }); //*******************Calcula horas consumidas*******************

        document.getElementById("hora_fin").addEventListener("change", function () {
          var regla_hora_fin = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

          if (!regla_hora_fin.test($("#hora_fin").val()) || $("#hora_fin").val() < $("#hora_ini").val()) {
            Swal.fire({
              title: "¡Hora no válida!",
              timer: 1200,
              showCancelButton: false,
              showConfirmButton: false
            });
            $("#hora_fin").val('');
            $("#hora_fin").focus();
          }

          $("#horas_restantes").val(calcular_horas_restantes());

          if ($("#horas_restantes").val() < 0) {
            $("#btnGuardar").prop("disabled", true);
            Swal.fire({
              icon: 'error',
              text: "Las horas ingresadas superan las horas disponibles.",
              timer: 1300,
              showCancelButton: false,
              showConfirmButton: false
            });
            $("#hora_fin").val('');
            $("#hora_fin").focus();
            $("#horas_restantes").val('');
          } else {
            $("#horas_consumidas").val(calcular_horas_consumidas());
            $("#btnGuardar").prop("disabled", false);
          }
        });
        $("#exampleModalLabel").html("Nueva Tarea"); // $("#client_nom").val("Telecom");
        // $("#client_id").val(209);

        $('#id_ticket').removeAttr('disabled');
        $('#horas_total').removeAttr('disabled');
        $("#BotonAgregar").show(); //mostrar el boton agregar

        $("#BotonModificar").hide(); //ocultar el boton modificar

        $("#BotonBorrar").hide(); //ocultar el boton borrar

        $("#hora_ini").prop('disabled', false);
        $("#hora_fin").prop('disabled', false);
        $("#event_id_eventos_continuos").val('');
        $('#prod_id').removeAttr('disabled');
        $('#tarea_id').val(15);
        $('#client_nom').removeAttr('disabled');
        $('#client_id').removeAttr('disabled');
        $('#tick_id').removeAttr('disabled');

        if (info.allDay) {
          //Obtener fecha de hoy
          $("#fech_ini").val(info.dateStr);
          $("#fech_fin").val(info.dateStr);
          $('#fech_ini').attr('disabled', 'disabled');
          $("#client_nom").attr('disabled', 'disabled');
          $("#client_id").attr('disabled', 'disabled');
        }

        $('#FormularioEventos').modal('show');
      } else {
        // Abre modal y trae info de la fechas solo si es usuario de otro sector
        $("#valor_cliente").removeAttr('disabled');
        $("#horas_total").on("change", function () {
          var regex = /^\d+$/;
          var horasTotal = $(this).val();

          if (!regex.test(horasTotal)) {
            Swal.fire({
              icon: 'warning',
              title: 'Error...',
              text: 'Las horas totales deben ser un número entero',
              timer: 1300,
              showCancelButton: false,
              showConfirmButton: false
            }); // Limpiar el campo y enfocarse en él

            $(this).val('');
            $(this).focus();
          }
        });
        limpiarFormulario();
        input_valor_cliente(); //Con esta función ingreso una palabra y me filtra desde la DB

        $("#hora_ini").prop('disabled', false);
        $("#hora_fin").prop('disabled', false);
        $("#event_id_eventos_continuos").val('');
        $("#prod_id").removeAttr('disabled');
        $("#tick_titulo").prop('readonly', true);
        $("#client_id").val('');
        $("#client_id").attr('disabled', 'disabled');
        document.getElementById("hora_fin").addEventListener("change", function () {
          $("#horas_restantes").val(calcular_horas_restantes());
        });
        document.getElementById("hora_fin").addEventListener("change", function () {
          $("#horas_consumidas").val(calcular_horas_consumidas());
        });
        $('#tarea_id').val(15);
        $("#exampleModalLabel").html("Nueva Tarea");
        $('#horas_total').removeAttr('disabled');
        $("#BotonAgregarUserDiferentesEh").show(); //mostrar el boton agregar

        $("#BotonAgregarUserDiferentesEh").addClass('btn btn-sm btn-success'); //cambio el estilo del boton agregar

        $("#BotonModificarUserDiferentesEh").hide(); //ocultar el boton modificar

        $("#BotonBorrarUserDiferentesEh").hide(); //ocultar el boton borrar

        if (info.allDay) {
          //Obtener fecha de hoy
          $("#fech_ini").val(info.dateStr);
          $("#fech_fin").val(info.dateStr);
          $('#fech_ini').attr('disabled', 'disabled');
        } //*****************Calcula horas que restan*******************


        document.getElementById("hora_ini").addEventListener("change", function () {
          var regla_hora_ini = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

          if (!regla_hora_ini.test($("#hora_ini").val())) {
            Swal.fire({
              title: "¡Hora no válida!",
              timer: 1200,
              showCancelButton: false,
              showConfirmButton: false
            });
            $("#hora_ini").val('');
            $("#hora_ini").focus();
          }

          if (calcular_horas_restantes() < 0) {
            Swal.fire({
              title: "¡Error en la carga de horas!",
              timer: 1200,
              showCancelButton: false,
              showConfirmButton: false
            });
            $("#hora_fin").val('');
            $("#hora_fin").focus();
          } // $("#horas_restantes").val(calcular_horas_restantes())

        }); //*******************Calcula horas consumidas*******************

        document.getElementById("hora_fin").addEventListener("change", function () {
          var regla_hora_fin = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

          if (!regla_hora_fin.test($("#hora_fin").val()) || $("#hora_fin").val() < $("#hora_ini").val()) {
            Swal.fire({
              title: "¡Hora no válida!",
              timer: 1200,
              showCancelButton: false,
              showConfirmButton: false
            });
            $("#hora_fin").val('');
            $("#hora_fin").focus();
          }

          $("#horas_restantes").val(calcular_horas_restantes());

          if ($("#horas_restantes").val() < 0) {
            $("#btnGuardar").prop("disabled", true);
            Swal.fire({
              icon: 'error',
              text: "Las horas ingresadas superan las horas disponibles.",
              timer: 1300,
              showCancelButton: false,
              showConfirmButton: false
            });
            $("#hora_fin").val('');
            $("#hora_fin").focus();
            $("#horas_restantes").val('');
          } else {
            $("#horas_consumidas").val(calcular_horas_consumidas());
            $("#btnGuardar").prop("disabled", false);
          }
        });
        $('#FormularioEventos').modal('show');
      }
    },
    eventClick: function eventClick(info) {
      // Abre modal y trae info de los datos guardados
      if ($("#usu_sector").val() == 1) {
        //******* Inicio si el usuario es de EH
        $("#event_id").val(info.event._def.extendedProps.event_id);
        $("#exampleModalLabel").html("Editar Tarea");
        $("#title_pegar").html("Id ticket");
        $("#event_id").val(info.event._def.extendedProps.event_id);
        $("#horas_total").attr('disabled', 'disabled');
        $("#BotonModificar").show(); //mostrar el boton agregar

        $("#BotonBorrar").show(); //ocultar el boton borrar

        $("#BotonAgregar").hide(); //ocultar el boton modificar
        // $("#BotonBorrar").hide(); //ocultar el boton borrar

        $("#id_ticket").val(info.event._def.extendedProps.tick_id); // $('#tick_id').val(info.event._def.extendedProps.tick_id);

        $("#client_id").val(info.event._def.extendedProps.client_id);
        $('#client_id').attr('disabled', 'disabled');
        $('#id_ticket').attr('disabled', 'disabled');
        $("#prod_id").val(info.event._def.extendedProps.prod_id);
        $("#prod_id").attr('disabled', 'disabled');
        $("#tarea_id").val(info.event._def.extendedProps.tarea_id);
        $("#client_nom").val(info.event.title);
        $("#client_nom").attr('disabled', 'disabled');
        $("#fech_ini").val(info.event._def.extendedProps.fech_ini);
        $("#fech_ini").attr('disabled', 'disabled');
        $("#fech_fin").val(info.event._def.extendedProps.fech_fin);
        $("#hora_ini").val(info.event._def.extendedProps.hora_ini);
        $("#hora_fin").val(info.event._def.extendedProps.hora_fin);
        $("#hora_ini").attr('disabled', 'disabled');
        $("#hora_fin").attr('disabled', 'disabled');
        $("#fech_fin").attr('disabled', 'disabled');
        $("#event_descrip").val(info.event._def.extendedProps.event_descrip);
        $("#horas_total").val(info.event._def.extendedProps.horas_total);
        $("#horas_restantes").val(info.event._def.extendedProps.horas_restantes);
        $("#horas_consumidas").val(info.event._def.extendedProps.horas_consumidas);
        $("#FormularioEventos").modal("show");
      } else {
        //trae info de los datos guardados de usuarios != EH
        $("#valor_cliente").attr('disabled', 'disabled');
        $("#valor_cliente").val('#####');
        $("#event_id").val(info.event._def.extendedProps.event_id);
        $("#tick_titulo").val(info.event._def.title);
        $("#event_id").val(info.event._def.extendedProps.event_id);
        $("#exampleModalLabel").html("Editar Tarea");
        $("#title_pegar").html("Total hs");
        $("#event_id").val(info.event._def.extendedProps.event_id);
        $("#horas_total").attr('disabled', 'disabled');
        $("#id_ticket").val(info.event._def.extendedProps.tick_id);
        $("#client_id").val(info.event._def.extendedProps.client_id);
        $('#client_id').attr('disabled', 'disabled');
        $('#id_ticket').attr('disabled', 'disabled');
        $("#prod_id").val(info.event._def.extendedProps.prod_id);
        $("#prod_id").attr('disabled', 'disabled');
        $("#tarea_id").val(info.event._def.extendedProps.tarea_id);
        $("#client_nom").val(info.event.title);
        $("#client_nom").attr('disabled', 'disabled');
        $("#fech_ini").val(info.event._def.extendedProps.fech_ini);
        $("#fech_ini").attr('disabled', 'disabled');
        $("#fech_fin").val(info.event._def.extendedProps.fech_fin);
        $("#hora_ini").val(info.event._def.extendedProps.hora_ini);
        $("#hora_fin").val(info.event._def.extendedProps.hora_fin);
        $("#hora_ini").attr('disabled', 'disabled');
        $("#hora_fin").attr('disabled', 'disabled');
        $("#fech_fin").attr('disabled', 'disabled');
        $("#event_descrip").val(info.event._def.extendedProps.event_descrip);
        $("#horas_total").val(info.event._def.extendedProps.horas_total);
        $("#horas_restantes").val(info.event._def.extendedProps.horas_restantes);
        $("#horas_consumidas").val(info.event._def.extendedProps.horas_consumidas);
        $("#BotonModificarUserDiferentesEh").show(); //mostrar el boton agregar

        $("#BotonAgregarUserDiferentesEh").hide(); //ocultar el boton modificar

        $("#BotonBorrarUserDiferentesEh").show(); //ocultar el boton borrar

        $("#FormularioEventos").modal("show");
      }
    },
    eventDrop: function eventDrop(info) {
    }
  });
  calendario1.render(); //---------------------------------------------------------------

  function get_select_producto() {
    $.post("../controller/ctrEventos.php?accion=get_select_producto", function (data, textStatus, jqXHR) {
      data = JSON.parse(data);
      var htmlTemplate = '';
      data.forEach(function (elem) {
        htmlTemplate += "\n                    <option value=\"".concat(elem.prod_id, "\">").concat(elem.prod_nombre, "</option>\n                ");
        document.getElementById('prod_id').innerHTML = htmlTemplate;
      });
    });
  }

  get_select_producto();

  function get_select_tarea() {
    $.post("../controller/ctrEventos.php?accion=get_select_tarea", function (data, textStatus, jqXHR) {
      data = JSON.parse(data);
      var htmlTemplate = '';
      data.forEach(function (elem) {
        htmlTemplate += "\n                    <option id=prod_id value=\"".concat(elem.tarea_id, "\">").concat(elem.tarea_nombre, "</option>\n                ");
        document.getElementById('tarea_id').innerHTML = htmlTemplate;
      });
    });
  }

  get_select_tarea();

  function calcular_horas_restantes() {
    var horas_total = $("#horas_total").val();
    var hora_ini = $("#hora_ini").val();
    var hora_fin = $("#hora_fin").val();
    var horaInicial = parseInt(hora_ini.split(':')[0], 10);
    var horaFinal = parseInt(hora_fin.split(':')[0], 10);
    var diferencia = horaFinal - horaInicial;
    var restan = horas_total - diferencia;
    return restan;
  }

  function calcular_horas_consumidas() {
    var horas_total = $("#horas_total").val();
    var hora_ini = $("#hora_ini").val();
    var hora_fin = $("#hora_fin").val();
    var horaInicial = parseInt(hora_ini.split(':')[0], 10);
    var horaFinal = parseInt(hora_fin.split(':')[0], 10);
    var diferencia = horaFinal - horaInicial;
    return diferencia;
  } //funciones que interactúan con el formulario eventos


  function limpiarFormulario() {
    $('#id_ticket').val('');
    $('#tick_titulo').val('');
    $('#valor_cliente').val('');
    $('#horas_consumidas').val('');
    $('#horas_restantes').val('');
    $("#prod_id").val(7);
    $('#horas_total').val('');
    $('#horas_restantes').val('');
    $("#tarea_id").val();
    $("#client_nom").val('');
    $("#client_id").val('');
    $("#fech_ini").val('');
    $("#fech_fin").val('');
    $("#hora_ini").val('');
    $("#hora_fin").val('');
    $("#event_descrip").val('');
  }

  $('#BotonAgregar').click(function (event) {
    var hora_ini = document.getElementById('hora_ini').value;
    var hora_fin = document.getElementById('hora_fin').value;
    var horaInicialValue = parseInt(hora_ini.split(':')[0], 10);
    var horaFinalValue = parseInt(hora_fin.split(':')[0], 10); // $("#event_descrip").val()

    if ($('#usu_id').val() == '' || $('#client_id').val() == '' || $('#prod_id').val() == '' || $('#tarea_id').val() == '' || $('#client_nom').val() == '' || $('#fech_ini').val() == '' || $('#fech_fin').val() == '' || $('#horas_total').val() == '' || $('#client_nom').val() == '' || $('#hora_ini').val() == '' || $('#hora_fin').val() == '' || $("#event_descrip").val() == '') {
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
      if ($("#horas_total").val() == '') {
        var registro = recuperarDatosFormulario();
        agregarRegistro(registro);
        $('#FormularioEventos').modal('hide');
      } else {
        var _registro = recuperarDatosFormulario();

        agregarRegistro(_registro);
        $('#FormularioEventos').modal('hide');
      }
    }
  }); // input y traer datos de Usuarios de EH

  function llenar_campos() {
    document.getElementById('id_ticket').addEventListener('input', function () {
      var tick_id = $('#id_ticket').val();
      $("#horas_total").focus();
      $('#id_ticket').attr('disabled', 'disabled');
      $.post("../controller/ctrTasking/ctrUsuario.php?op_tasking=getDatosPor_tick_id_y_usu", {
        usu_id_tasking: usu_id_tasking,
        tick_id: tick_id
      }, function (data, textStatus, jqXHR) {
        var id_cliente = '';
        data.forEach(function (elem) {
          return id_cliente = elem.client_id;
        });
        $.post("../controller/ctrEventos.php?accion=traer_id_event_para_agregar", {
          client_id: id_cliente
        }, function (data, textStatus, jqXHR) {
          document.getElementById("event_id_eventos_continuos").value = data[0].event_id;
          $.post("../controller/ctrEventos.php?accion=get_event_id_mas_alto_de_evento_x_usu", {
            client_id: id_cliente,
            event_id: data[0].event_id
          }, function (data, textStatus, jqXHR) {
            if (data[0].event_id > 0 && data[0].horas_restantes > 0) {
              $("#horas_total").val(data[0].horas_restantes);
              $("#horas_total").attr('disabled', 'disabled');
            } else {
              $("#horas_total").prop('disabled', false);
              $("#horas_total").val('');
              $("#horas_total").val('');
            }
          }, "json");
        }, "json");

        try {
          data[0].tick_id == tick_id;
          $('#client_nom').val(data[0].tick_titulo);
          $('#client_nom').attr('disabled', 'disabled');
          $('#client_id').val(data[0].client_id);
          $('#client_id').attr('disabled', 'disabled');
          $('#prod_id').val(data[0].cat_id);
          $('#prod_id').attr('disabled', 'disabled');
          $('#tarea_id').val();
        } catch (error) {
          $('#prod_id').removeAttr('disabled');
          $('#client_nom').val('');
          $('#client_nom').removeAttr('disabled', 'disabled');
          $('#client_id').val(0);
          $('#client_id').attr('disabled', 'disabled');
          $('#tick_id').val(0);
        }
      }, "json");
    });
  } // **************   Sanitizar event_descrip   ******************


  function escapeHTML(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  } // ************* Inicio Usuario distinto a EH  *******************


  function recuperarDatosFormularioUsuarioDistintoEh() {
    var eventDescrip = escapeHTML($('#event_descrip').val());

    if (!$("#horas_total").prop('disabled') && $("#horas_restantes").val() == 0) {
      var registro = {
        usu_id: $('#usu_id').val(),
        tick_id: $('#id_ticket').val(),
        client_id: $("#client_id").val(),
        prod_id: $('#prod_id').val(),
        tarea_id: $('#tarea_id').val(),
        tick_titulo: $('#tick_titulo').val(),
        horas_total: $('#horas_total').val(),
        horas_restantes: $('#horas_restantes').val(),
        horas_consumidas: $('#horas_consumidas').val(),
        event_descrip: eventDescrip,
        fech_ini: $('#fech_ini').val(),
        fech_fin: $('#fech_fin').val(),
        hora_ini: $('#hora_ini').val(),
        hora_fin: $('#hora_fin').val(),
        evento_activo: "no",
        contador: 1,
        creacion_evento: "si",
        est: 1
      };
      return registro;
    } else if (!$("#horas_total").prop('disabled') && $("#horas_restantes").val() > 0) {
      var registro = {
        usu_id: $('#usu_id').val(),
        tick_id: $('#id_ticket').val(),
        client_id: $("#client_id").val(),
        prod_id: $('#prod_id').val(),
        tarea_id: $('#tarea_id').val(),
        tick_titulo: $('#tick_titulo').val(),
        horas_total: $('#horas_total').val(),
        horas_restantes: $('#horas_restantes').val(),
        horas_consumidas: $('#horas_consumidas').val(),
        event_descrip: eventDescrip,
        fech_ini: $('#fech_ini').val(),
        fech_fin: $('#fech_fin').val(),
        hora_ini: $('#hora_ini').val(),
        hora_fin: $('#hora_fin').val(),
        evento_activo: "si",
        contador: 1,
        creacion_evento: "si",
        est: 1
      };
      return registro;
    } else if ($("#horas_restantes").val() == 0) {
      var registro = {
        event_id: $("#event_id_eventos_continuos").val(),
        usu_id: $('#usu_id').val(),
        tick_id: $('#id_ticket').val(),
        client_id: $("#client_id").val(),
        prod_id: $('#prod_id').val(),
        tarea_id: $('#tarea_id').val(),
        tick_titulo: $('#tick_titulo').val(),
        horas_total: $('#horas_total').val(),
        horas_restantes: $('#horas_restantes').val(),
        horas_consumidas: $('#horas_consumidas').val(),
        event_descrip: eventDescrip,
        fech_ini: $('#fech_ini').val(),
        fech_fin: $('#fech_fin').val(),
        hora_ini: $('#hora_ini').val(),
        hora_fin: $('#hora_fin').val(),
        evento_activo: "no",
        contador: 0,
        creacion_evento: "no",
        est: 0
      };
      return registro;
    } else {
      var registro = {
        event_id: $("#event_id_eventos_continuos").val(),
        usu_id: $('#usu_id').val(),
        tick_id: $('#id_ticket').val(),
        client_id: $("#client_id").val(),
        prod_id: $('#prod_id').val(),
        tarea_id: $('#tarea_id').val(),
        tick_titulo: $('#tick_titulo').val(),
        horas_total: $('#horas_total').val(),
        horas_restantes: $('#horas_restantes').val(),
        horas_consumidas: $('#horas_consumidas').val(),
        event_descrip: eventDescrip,
        fech_ini: $('#fech_ini').val(),
        fech_fin: $('#fech_fin').val(),
        hora_ini: $('#hora_ini').val(),
        hora_fin: $('#hora_fin').val(),
        evento_activo: "si",
        creacion_evento: "no",
        contador: 2,
        est: 1
      };
      return registro;
    }
  }

  $('#BotonAgregarUserDiferentesEh').click(function () {
    hora_ini = $('#hora_ini').val();
    hora_fin = $('#hora_fin').val();
    var horaInicialValue = parseInt(hora_ini.split(':')[0], 10);
    var horaFinalValue = parseInt(hora_fin.split(':')[0], 10);

    if ($('#valor_cliente').val() == '' || $('#tick_titulo').val() == '' || $('#prod_id').val() == '' || $('#tarea_id').val() == '' || $('#horas_total').val() == '' || $('#horas_restantes').val() == '' || $('#horas_consumidas').val() == '' || $('#fech_ini').val() == '' || $('#hora_ini').val() == '' || $('#fech_fin').val() == '' || $('#hora_fin').val() == '' || $("#event_descrip").val() == '') {
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
      $('#FormularioEventos').modal('hide');
    }
  });

  function agregarRegistroUsuarioDistintoEh(registro) {
    if (!$("#horas_total").prop('disabled')) {
      $.ajax({
        type: "POST",
        url: "../controller/ctrEventos.php?accion=agregar_primer_evento",
        data: registro,
        dataType: "json",
        success: function success(data) {
        },
        error: function error(xhr, status, _error, data) {
        }
      });
    } else {
      if ($("#horas_restantes").val() == 0) {
        $.ajax({
          type: "POST",
          url: "../controller/ctrEventos.php?accion=setear_event_inactivo",
          data: registro,
          dataType: "json",
          success: function success(data) {
          },
          error: function error(xhr, status, _error2, data) {
          }
        });
      }

      $.ajax({
        type: "POST",
        url: "../controller/ctrEventos.php?accion=agregar",
        data: registro,
        dataType: "json",
        success: function success(data) {
        },
        error: function error(xhr, status, _error3, data) {
        }
      });
    }

    Toastify({
      text: '[' + $("#tick_titulo").val() + "] Agregado correctamente",
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

  $("#BotonModificarUserDiferentesEh").click(function () {
    var registro = recuperarDatosFormularioParaUpdate();
    modificarRegistro(registro);
    $('#FormularioEventos').modal('hide');
  });
  $("#BotonBorrarUserDiferentesEh").click(function () {
    if (confirm("¿Desea eliminar esta tarea?")) {
      var registro = recuperarDatosEliminar();
      eliminarDatos(registro);
      $('#FormularioEventos').modal('hide');
    }
  }); // ************* Fin Usuario distinto a EH  *******************

  llenar_campos(); // función llenar campos formulario

  function agregarRegistro(registro) {
    if (!$("#horas_total").prop('disabled')) {
      $.ajax({
        type: "POST",
        url: "../controller/ctrEventos.php?accion=agregar_primer_evento",
        data: registro,
        dataType: "json",
        success: function success(data) {
        },
        error: function error(xhr, status, _error4, data) {
        }
      });
    } else {
      if ($("#horas_restantes").val() == 0) {
        $.ajax({
          type: "POST",
          url: "../controller/ctrEventos.php?accion=setear_event_inactivo",
          data: registro,
          dataType: "json",
          success: function success(data) {
          },
          error: function error(xhr, status, _error5, data) {
          }
        });
      }

      $.ajax({
        type: "POST",
        url: "../controller/ctrEventos.php?accion=agregar",
        data: registro,
        dataType: "json",
        success: function success(data) {
        },
        error: function error(xhr, status, _error6, data) {
        }
      });
    }

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

  function recuperarDatosFormulario() {
    var eventDescrip = escapeHTML($('#event_descrip').val());

    if (!$("#horas_total").prop('disabled') && $("#horas_restantes").val() == 0) {
      var registro = {
        usu_id: $('#usu_id').val(),
        tick_id: $('#id_ticket').val(),
        client_id: $("#client_id").val(),
        prod_id: $('#prod_id').val(),
        tarea_id: $('#tarea_id').val(),
        tick_titulo: $('#client_nom').val(),
        horas_total: $('#horas_total').val(),
        horas_restantes: $('#horas_restantes').val(),
        horas_consumidas: $('#horas_consumidas').val(),
        event_descrip: eventDescrip,
        fech_ini: $('#fech_ini').val(),
        fech_fin: $('#fech_fin').val(),
        hora_ini: $('#hora_ini').val(),
        hora_fin: $('#hora_fin').val(),
        evento_activo: "no",
        contador: 1,
        creacion_evento: "si",
        est: 1
      };
      return registro;
    } else if (!$("#horas_total").prop('disabled') && $("#horas_restantes").val() > 0) {
      var registro = {
        usu_id: $('#usu_id').val(),
        tick_id: $('#id_ticket').val(),
        client_id: $("#client_id").val(),
        prod_id: $('#prod_id').val(),
        tarea_id: $('#tarea_id').val(),
        tick_titulo: $('#client_nom').val(),
        horas_total: $('#horas_total').val(),
        horas_restantes: $('#horas_restantes').val(),
        horas_consumidas: $('#horas_consumidas').val(),
        event_descrip: eventDescrip,
        fech_ini: $('#fech_ini').val(),
        fech_fin: $('#fech_fin').val(),
        hora_ini: $('#hora_ini').val(),
        hora_fin: $('#hora_fin').val(),
        evento_activo: "si",
        contador: 1,
        creacion_evento: "si",
        est: 1
      };
      return registro;
    } else if ($("#horas_restantes").val() == 0) {
      var registro = {
        event_id: $("#event_id_eventos_continuos").val(),
        usu_id: $('#usu_id').val(),
        tick_id: $('#id_ticket').val(),
        client_id: $("#client_id").val(),
        prod_id: $('#prod_id').val(),
        tarea_id: $('#tarea_id').val(),
        tick_titulo: $('#client_nom').val(),
        horas_total: $('#horas_total').val(),
        horas_restantes: $('#horas_restantes').val(),
        horas_consumidas: $('#horas_consumidas').val(),
        event_descrip: eventDescrip,
        fech_ini: $('#fech_ini').val(),
        fech_fin: $('#fech_fin').val(),
        hora_ini: $('#hora_ini').val(),
        hora_fin: $('#hora_fin').val(),
        evento_activo: "no",
        contador: 0,
        creacion_evento: "no",
        est: 0
      };
      return registro;
    } else {
      var registro = {
        event_id: $("#event_id_eventos_continuos").val(),
        usu_id: $('#usu_id').val(),
        tick_id: $('#id_ticket').val(),
        client_id: $("#client_id").val(),
        prod_id: $('#prod_id').val(),
        tarea_id: $('#tarea_id').val(),
        tick_titulo: $('#client_nom').val(),
        horas_total: $('#horas_total').val(),
        horas_restantes: $('#horas_restantes').val(),
        horas_consumidas: $('#horas_consumidas').val(),
        event_descrip: eventDescrip,
        fech_ini: $('#fech_ini').val(),
        fech_fin: $('#fech_fin').val(),
        hora_ini: $('#hora_ini').val(),
        hora_fin: $('#hora_fin').val(),
        evento_activo: "si",
        creacion_evento: "no",
        contador: 2,
        est: 1
      };
      return registro;
    }
  } //-----************  Inicio servicio Update  ********** ------------------->


  function recuperarDatosFormularioParaUpdate() {
    var eventDescrip = escapeHTML($('#event_descrip').val());
    var registro = {
      event_id: $("#event_id").val(),
      usu_id: $("#usu_id").val(),
      tarea_id: $("#tarea_id").val(),
      hora_ini: $("#hora_ini").val(),
      hora_fin: $("#hora_fin").val(),
      event_descrip: eventDescrip
    };
    return registro;
  }

  function modificarRegistro(registro) {
    $.ajax({
      type: "POST",
      url: "../controller/ctrEventos.php?accion=modificar",
      data: registro,
      dataType: "json"
    });
    Toastify({
      text: '[' + $("#client_nom").val() + "] Editado correctamente",
      duration: 1200,
      gravity: "top",
      position: "left",
      style: {
        "margin-left": "120px"
      },
      backgroundColor: "#28a745"
    }).showToast();
    calendario1.refetchEvents();
  }

  $("#BotonModificar").click(function () {
    var registro = recuperarDatosFormularioParaUpdate();
    modificarRegistro(registro);
    $('#FormularioEventos').modal('hide');
  }); //-----************  Fin servicio Update  ********** ------------------->
  //-----************  Inicio servicio Borrar  ********** ------------------->

  function recuperarDatosEliminar() {
    var registro = {
      event_id: $('#event_id').val(),
      usu_id: $("#usu_id").val()
    };
    return registro;
  }

  function eliminarDatos(registro) {
    $.ajax({
      type: "POST",
      url: "../controller/ctrEventos.php?accion=borrar",
      data: registro,
      dataType: "json",
      success: function success(response) {
      },
      error: function error() {
      }
    });
    Toastify({
      text: '[' + $("#client_nom").val() + "] Eliminado correctamente",
      duration: 1200,
      gravity: "top",
      position: "left",
      style: {
        "margin-left": "120px"
      },
      backgroundColor: "#dc3545"
    }).showToast();
    calendario1.refetchEvents();
  }

  $("#BotonBorrar").click(function () {
    if (confirm("¿Desea eliminar esta tarea?")) {
      var registro = recuperarDatosEliminar();
      eliminarDatos(registro);
      $('#FormularioEventos').modal('hide');
    }
  }); //-----************  Fin servicio Borrar  ********** ------------------->

  $.get("../controller/ctrEventosPredefinidos.php?evento=get_eventos_predefinidos", function (data, textStatus, jqXHR) {
    document.getElementById('evento_agregar').innerHTML = data;
  });
});
var usu_id_tasking = $("#usu_id_tasking").val();
$(document).ready(function () {
  //Eventos de Tasking
  var htmlTemplate = '';
  $.post("../controller/ctrTasking/ctrUsuario.php?op_tasking=get_datos_ticket_x_usu", {
    usu_id_tasking: usu_id_tasking
  }, function (data, textStatus, jqXHR) {
    data = JSON.parse(data);
    htmlTemplate = '';
    data.forEach(function (elem) {
      htmlTemplate += "\n<tr>\n<td style=\"font-size:13px;\">".concat(elem.tick_titulo, "</td>\n                <td style=\"font-size:13px;\">").concat(elem.cat_nom, "</td>\n                <td><a style=\"color:orange;\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Copiar Ticket\" onclick=\"click_btn(").concat(elem.tick_id, ")\" type=\"button\" value=\"").concat(elem.tick_id, "\"><i class=\"ri-file-copy-fill\"></a></td>\n</tr>");
      $("#tbody_table").html(htmlTemplate);
    });
    "json";
  });
});

function click_btn(tick_id) {
  //Boton para copiar y pegar datos
  var btn_aux = document.createElement("input"); //Inicio evento para btn copiar

  btn_aux.setAttribute('value', tick_id);
  document.body.appendChild(btn_aux);
  btn_aux.select();
  document.execCommand("copy");
  document.body.removeChild(btn_aux); //Fin evento para btn copiar

  $.post("../controller/ctrTasking/ctrUsuario.php?op_tasking=get_datos_para_copy", {
    usu_id_tasking: usu_id_tasking,
    tick_id: tick_id
  }, function (data, textStatus, jqXHR) {
    data = JSON.parse(data);
    Toastify({
      text: '[' + "CLIENTE" + ']  ' + data[0].tick_titulo + ' Copiado correctamente',
      // text: '[' + data[0].tick_titulo + "] Copiado correctamente",
      duration: 1300,
      gravity: "top",
      position: "left",
      style: {
        "margin-left": "120px"
      },
      backgroundColor: "#f9a100"
    }).showToast();
  });
  "json";
}

click_btn(); //******************************************************************** */
//      Comienza funciones sobre usuarios de sectores distintos a EH
//******************************************************************** */

function input_valor_cliente() {
  document.getElementById("valor_cliente").addEventListener("input", function () {
    var valor_cliente = $("#valor_cliente").val();
    $.post("../controller/ctrTasking/ctrEvento.php?op_evento_tasking=get_cliente_x_palabra", {
      valor_cliente: valor_cliente
    }, function (data, textStatus, jqXHR) {
      var id_cliente = '';
      $("#horas_total").prop('disabled', false);
      $("#horas_total").val('');
      data.forEach(function (elem) {
        if ($("#valor_cliente").val() == '') {
          $("#tick_titulo").val('');
          $("#client_id").val('');
        } else {
          $("#tick_titulo").val(elem.client_rs);
          $("#client_id").val(elem.client_id);
        }

        return id_cliente = elem.client_id;
      });
      $.post("../controller/ctrEventos.php?accion=traer_id_event_para_agregar", {
        client_id: id_cliente
      }, function (data, textStatus, jqXHR) {
        document.getElementById("event_id_eventos_continuos").value = data[0].event_id;
        $.post("../controller/ctrEventos.php?accion=get_event_id_mas_alto_de_evento_x_usu", {
          client_id: id_cliente,
          event_id: data[0].event_id
        }, function (data, textStatus, jqXHR) {
          if (data[0].event_id > 0 && data[0].horas_restantes > 0) {
            $("#horas_total").val(data[0].horas_restantes);
            $("#horas_total").attr('disabled', 'disabled');
            $('#prod_id').attr('disabled', 'disabled');
          } else {
            $("#horas_total").prop('disabled', false);
            $("#horas_total").val('');
            $("#horas_total").val('');
          }
        }, "json");
      }, "json");
    }, "json");
  });
}

init();