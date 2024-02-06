"use strict";

function init() {}

$(document).ready(function () {
  toastr.options = {
    "positionClass": "toast-top-center"
  }; //posición de toas global

  var usu_id = $("#usu_id").val();
  $.post("../../controller/ctrMantUser.php?op=get_datos_usuario", {
    usu_id: usu_id,
    contador: 1
  }, function (data, textStatus, jqXHR) {
    data = JSON.parse(data);
    $("#usu_nom").html(data.usu_nom);
    $("#usu_ape").html(data.usu_ape);
    $("#usu_dni").html(data.usu_dni);
    $("#usu_email").html(data.usu_email);
    $("#usu_pass").html("***********************************");
    $("#usu_celular").html(data.usu_celular);
    $("#usu_direccion").html(data.usu_direccion);
    $("#usu_nacimiento").html(data.usu_nacimiento);
  });
  var tabla = $("#tabla_usuarios");
  $("#btnEditarInfo").click(function () {
    document.getElementById("titModalConfig").innerText = "Editar Información del Usuario";
    $("#modal_usu_email").remove();
    $("#cont_usu_ape").remove();
    $("#cont_usu_email").remove();
    $("#cont_usu_nom").remove();
    $("#cont_usu_nom").remove();
    $("#cont_usu_nacimiento").remove();
    $.post("../../controller/ctrMantUser.php?op=get_datos_usuario", {
      usu_id: usu_id,
      contador: 1
    }, function (data, textStatus, jqXHR) {
      data = JSON.parse(data);
      $('#modal_usu_celular').val(data.usu_celular), $('#modal_usu_direccion').val(data.usu_direccion);
    });

    function recuperarDatosAjax() {
      //recuperar datos para actualizar desde la vista config.php
      var registro = {
        usu_id: $('#usu_id').val(),
        usu_celular: $('#modal_usu_celular').val(),
        usu_direccion: $('#modal_usu_direccion').val(),
        contador: 1
      };
      return registro;
    }

    $("#BotonModificar").click(function () {
      var registro = recuperarDatosAjax();
      update_usuario(registro);
      $("#modalConfigUsu").modal("hide");
    });

    function update_usuario(registro) {
      //actualizar desde la vista config.php
      $.ajax({
        type: "POST",
        url: "../../controller/ctrMantUser.php?op=update_usuario",
        data: registro,
        dataType: "json",
        success: function success(response) {
        },
        error: function error() {
          alert("Error");
        }
      });

      if ($("#BotonModificar").click(function () {})) {
        if ($("#modal_usu_celular").val() == '' || $("#modal_usu_direccion").val() == '') {
          alert("campos vacíos");
        } else if (confirm("¿Desea actualizar estos datos?")) {
          Toastify({
            text: "¡Datos actualizados correctamente!",
            duration: 1200,
            gravity: "top",
            position: "left",
            style: {
              "margin-left": "120px"
            },
            backgroundColor: "#28a745"
          }).showToast();
          setTimeout(function () {
            window.location.reload();
          }, 1200);
        }
      }
    }

    $("#modalConfigUsu").modal("show");
  }); //Inicio Certificaciones general

  $.post("../../controller/ctrCertificaciones.php?combo_certificacion=get_certificacion_x_usu", {
    usu_id: usu_id
  }, function (data, textStatus, jqXHR) {
    // let htmlTemplate = '';
    // data.forEach(elem => {
    //     htmlTemplate += `
    //     <a style="font-size:12px" class="text-info badge badge-soft-primary">${elem.cert_nom}<input class="ml-1" type="checkbox" value="${elem.id}"></a>`;
    //     return htmlTemplate;
    // });
    document.getElementById("cont_certificaciones").innerHTML = data;
  }, "json");
  $("#btnAgregarCertificacion").click(function () {
    $.post("../../controller/ctrCertificaciones.php?combo_certificacion=combo_certificacion", function (data, textStatus, jqXHR) {
      $("#selec_certificacion").html(data);
    }, "json");
    $("#modalCertificado").modal("show");
    $("#input_certificacion").val('');
    $("#btnGuardarCertificacion").on("click", function () {
      var registro = {
        id_combo_cert: $('#selec_certificacion').val(),
        usu_id: $("#usu_id").val(),
        cert_nom: $("#input_certificacion").val()
      };
      $.ajax({
        type: "POST",
        url: "../../controller/ctrCertificaciones.php?combo_certificacion=insert",
        data: registro,
        dataType: "json"
      });
      Toastify({
        text: "¡Certificación agregada correctamente!",
        duration: 1200,
        gravity: "top",
        position: "left",
        style: {
          "margin-left": "120px"
        },
        backgroundColor: "#28a745"
      }).showToast();
      setTimeout(function () {
        document.location.reload();
      }, 1200);
      $("#modalConfig").modal("hide");
    });
  });
  $("#btnEliminarCertificacion").click(function () {
    document.getElementById("titModalConfig").innerText = "Eliminar Certificación";
    $("#modalCertificado").modal("show");
  }); //Inicio de servicio habilidades
  //Inicio Certificaciones general

  $.post("../../controller/ctrHabilidad.php?combo_habilidad=get_habilidad_x_usu", {
    usu_id: usu_id
  }, function (data, textStatus, jqXHR) {
    document.getElementById("cont_habilidades").innerHTML = data;
  }, "json");
  $("#btnAgregarHabilidad").click(function () {
    $.post("../../controller/ctrHabilidad.php?combo_habilidad=combo_habilidad", function (data, textStatus, jqXHR) {
      document.getElementById("select_hab").innerHTML = data;
    }, 'json');
    $("#modalHabilidades").modal("show");
    $("#btnGuardarHabilidad").on("click", function () {
      var registro = {
        usu_id: $('#usu_id').val(),
        combo_hab_id: $("#select_hab").val()
      };
      $.ajax({
        type: "POST",
        url: "../../controller/ctrHabilidad.php?combo_habilidad=insert",
        data: registro,
        dataType: "json"
      });
      Toastify({
        text: "¡Habilidad agregada correctamente!",
        duration: 1200,
        gravity: "top",
        position: "left",
        style: {
          "margin-left": "120px"
        },
        backgroundColor: "#28a745"
      }).showToast();
      setTimeout(function () {
        document.location.reload();
      }, 1200);
      $("#modalHabilidades").modal("hide");
    });
  });
  $("#btnEditarHabilidad").click(function () {
    document.getElementById("titModalConfig").innerText = "Editar Habilidad";
    $("#modalHabilidades").modal("show");
  });
  $("#btnEliminarHabilidad").click(function () {
    document.getElementById("titModalConfig").innerText = "Eliminar Habilidad";
    $("#modalHabilidades").modal("show");
  }); //Final de servicio habilidades
});
init();