"use strict";

function init() {}

$(document).ready(function () {
  var usu_id = $("#usu_id").val();
  $("#nuevo_usuario").on("click", function () {
    //abre modal
    $("#usu_email").val('');
    $.post("../../controller/ctrRoles.php?combo_rol=get_roles", function (data, textStatus, jqXHR) {
      $("#select_rol").html(data);
      var select_rol = document.getElementById("select_rol");
      var option = select_rol.getElementsByTagName("option");

      for (var i = 0; i < option.length; i++) {
        if (option[i].value === valorASeleccionar) {
          option[i].selected = true;
          break; // Salir del bucle una vez que se ha encontrado y seleccionado la opción
        }
      }
    }, "json");
    $.post("../../controller/ctrSectores.php?combo_sector=get_sectores", function (data, textStatus, jqXHR) {
      $("#select_sector").html(data);
    }, "json");
    $("#modalUsuario").modal("show");
    $("#exampleModalLabel").html("Nuevo Usuario");
    $("#cont_usu_email").show();
    $("#cont_usu_pass").show();
    $("#select_rol").show();
    $("#select_sector").show();
    $("#btnGuardarUsu").show();
    $("#btnEditarUsu").hide();
  });
  $.post("../../controller/ctrMantUser.php?op=get_datos_usuarios", function (data, textStatus, jqXHR) {
    var htmlTable = '';
    data.forEach(function (elem) {
      var textTruncado = elem.usu_pass;

      if (elem.usu_pass.length > 10) {
        textTruncado = elem.usu_pass.substring(0, 10);
      }

      if (elem.usu_pass == 'admin') {
        htmlTable += "\n            <tr>\n                <td style=\"padding-left: 10px; padding-right: 10px;\">".concat(elem.usu_nom, "</td>\n                <td style=\"padding-left: 10px; padding-right: 10px;\">").concat(elem.usu_ape, "</td>\n                <td style=\"padding-left: 10px; padding-right: 10px;\">").concat(elem.usu_dni == undefined ? "" : "", "</td>\n                <td style=\"padding-left: 10px; padding-right: 10px;\">").concat(elem.usu_email, "</td>\n                <td style=\"padding-left: 10px; padding-right: 10px;\">").concat(elem.sector_nom, "</td>\n                <td style=\"padding-left: 10px; padding-right: 10px;\">").concat(elem.rol_nom, "</td>\n                <td style=\"padding-left: 10px; padding-right: 10px; color:orange; font-weight:bold;\">admin</td>\n                <td style=\"padding-left: 10px; padding-right: 10px; margin: 0 3px;\">").concat(elem.estado == 1 ? '<span class="badge rounded-pill badge-soft-success">Activo</span>' : '<span class="badge badge-soft-dark">Inctivo</span>', "</td>\n                <td style=\"padding-left:20px;\"><a onClick=\"editar_usuario_panel_admin(").concat(elem.usu_id, ")\"; type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Cambiar rol y sector\" style=\"padding-left:5px\"><i style=\"font-size: 18px;\" class=\"ri-user-unfollow-fill text-info\"></i></a>\n                <td style=\"padding-left:20px;\"><a onClick=\"cambiar_estado_usuario(").concat(elem.usu_id, ")\"; type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Cambiar estado\" style=\"padding-left:5px\"><i style=\"font-size: 18px;\" class=\"ri-user-unfollow-fill text-muted\"></i></a>\n                <td style=\"padding-left:20px;\"><a onClick=\"delete_usuario_panel_admin(").concat(elem.usu_id, ")\"; type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Eliminar Usuario\" style=\"padding-left:5px\"><i style=\"font-size: 18px;\" class=\"ri-user-unfollow-fill text-danger\"></i></a>\n                </td>\n            </tr>;\n            ");
        $("#tbody_table_mnt_Usuarios").html(htmlTable); // <a onClick="update_usuario(${elem.usu_id})"; data-toggle="tooltip" data-placement="top" title="Editar usuario" style="color:#00A717" type="button"><i style="font-size: 18px;" class="ri-user-search-fill"></i></a>
      } else {
        htmlTable += "\n                    <tr>\n                        <td style=\"padding-left: 10px; padding-right: 10px; margin: 0 3px\">".concat(elem.usu_nom, "</td>\n                        <td style=\"padding-left: 10px; padding-right: 10px; margin: 0 3px\">").concat(elem.usu_ape, "</td>\n                        <td style=\"padding-left: 10px; padding-right: 10px; color:#777\">").concat(elem.usu_dni == undefined ? "" : "***********", "</td>\n                        <td style=\"padding-left: 10px; padding-right: 10px; margin: 0 3px\">").concat(elem.usu_email, "</td>\n                        <td style=\"padding-left: 10px; padding-right: 10px; margin: 0 3px\">").concat(elem.sector_nom, "</td>\n                        <td style=\"padding-left: 10px; padding-right: 10px; margin: 0 3px\">").concat(elem.rol_nom, "</td>\n                        <td style=\"padding-left: 10px; padding-right: 10px; margin: 0 3px;\">Se cambi\xF3</td>\n                        <td style=\"padding-left: 10px; padding-right: 10px; margin: 0 3px;\">").concat(elem.estado == 1 ? '<span class="badge rounded-pill badge-soft-success">Activo</span>' : '<span class="badge badge-soft-dark">Inctivo</span>', "</td>\n                        <td style=\"padding-left:20px;\"><a onClick=\"editar_usuario_panel_admin(").concat(elem.usu_id, ")\"; type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Cambiar rol y sector\" style=\"padding-left:5px\"><i style=\"font-size: 18px;\" class=\"ri-user-unfollow-fill text-info\"></i></a>\n                        <td style=\"padding-left:20px;\"><a onClick=\"cambiar_estado_usuario(").concat(elem.usu_id, ")\"; type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Cambiar estado\" style=\"padding-left:5px\"><i style=\"font-size: 18px;\" class=\"ri-user-unfollow-fill text-muted\"></i></a>\n                        <td style=\"padding-left:20px;\"><a onClick=\"delete_usuario_panel_admin(").concat(elem.usu_id, ")\"; type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Eliminar Usuario\" style=\"padding-left:5px\"><i style=\"font-size: 18px;\" class=\"ri-user-unfollow-fill text-danger\"></i></a>\n                        </td>\n                    </tr>;\n                    "); // <a onClick="update_usuario(${elem.usu_id})"; data-toggle="tooltip" data-placement="top" title="Editar usuario" style="color:#00A717" type="button"><i style="font-size: 18px;" class="ri-user-search-fill"></i></a>

        $("#tbody_table_mnt_Usuarios").html(htmlTable);
      }
    });
  }, "json");
});

function editar_usuario_panel_admin(usu_id) {
  $("#modalUsuario").modal("show");
  $("#exampleModalLabel").html("Editar Usuario");
  $("#btnEditarUsu").show();
  $("#btnGuardarUsu").hide();
  $("#cont_usu_email").hide();
  $("#cont_usu_pass").hide();
  $.post("../../controller/ctrRoles.php?combo_rol=get_roles", function (data, textStatus, jqXHR) {
    $("#select_rol").html(data);
  }, "json");
  $.post("../../controller/ctrSectores.php?combo_sector=get_sectores", function (data, textStatus, jqXHR) {
    $("#select_sector").html(data);
  }, "json"); // Mover la obtención de valores dentro del evento de clic

  $("#btnEditarUsu").on("click", function () {
    usu_id = usu_id;
    select_rol = $("#select_rol").val();
    select_sector = $("#select_sector").val();
    Swal.fire({
      title: '¿Desea modificar el rol y sector de este usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#258934',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then(function (result) {
      if (result.isConfirmed) {
        $.post("../../controller/ctrMantUser.php?op=update_usuario_rol_y_sector", {
          usu_id: usu_id,
          usu_rol: select_rol,
          usu_sector: select_sector
        }, function (data, textStatus, jqXHR) {
          Toastify({
            text: "Usuario actualizado correctamente",
            duration: 1000,
            gravity: "top",
            position: "left",
            style: {
              "margin-left": "120px"
            },
            backgroundColor: "#689dff"
          }).showToast();
        }, "json");
        $("#modalUsuario").modal("hide");
        setTimeout(function () {
          window.location.reload();
        }, 1000);
      }
    });
  });
}

function cambiar_estado_usuario(usu_id) {
  $.post("../../controller/ctrMantUser.php?op=get_datos_usuario_para_update", {
    usu_id: usu_id
  }, function (data, textStatus, jqXHR) {
    if (data.est == 1) {
      Swal.fire({
        title: '¿Desea inhabilitar Usuario?',
        text: "Se desactivará al usuario.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Inhabilitar!'
      }).then(function (result) {
        if (result.isConfirmed) {
          $.post("../../controller/ctrMantUser.php?op=cambiar_estado_usuario", {
            usu_id: usu_id,
            est: 0
          }, function (data, textStatus, jqXHR) {
            Toastify({
              text: "Usuario desabilitado correctamente",
              duration: 1000,
              gravity: "top",
              position: "left",
              style: {
                "margin-left": "120px"
              },
              backgroundColor: "#689dff"
            }).showToast();
          }, "json");
          $("#modalUsuario").modal("hide");
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        }
      });
    } else {
      Swal.fire({
        title: '¿Desea habilitar este Usuario?',
        text: "Se habilitará nuevamente este usuario",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Habilitar!'
      }).then(function (result) {
        if (result.isConfirmed) {
          $.post("../../controller/ctrMantUser.php?op=cambiar_estado_usuario", {
            usu_id: usu_id,
            est: 1
          }, function (data, textStatus, jqXHR) {
            Toastify({
              text: "Usuario habilitado correctamente",
              duration: 1000,
              gravity: "top",
              position: "left",
              style: {
                "margin-left": "120px"
              },
              backgroundColor: "#689dff"
            }).showToast();
          }, "json");
          $("#modalUsuario").modal("hide");
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        }
      });
    }
  }, "json");
  Swal.fire({
    title: '¿Desea inhabilitar Usuario?',
    text: "Se desactivará al usuario.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Inhabilitar!'
  }).then(function (result) {
    if (result.isConfirmed) {
      $.post("../../controller/ctrMantUser.php?op=inhabilitar_usuario", {
        usu_id: usu_id
      }, function (data, textStatus, jqXHR) {
        Toastify({
          text: "Usuario actualizado correctamente",
          duration: 1000,
          gravity: "top",
          position: "left",
          style: {
            "margin-left": "120px"
          },
          backgroundColor: "#689dff"
        }).showToast();
      }, "json");
      $("#modalUsuario").modal("hide");
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    }
  });
}

function delete_usuario_panel_admin(usu_id) {
  $.post("../../controller/ctrMantUser.php?op=get_datos_usuario_para_update", {
    usu_id: usu_id
  }, function (data, textStatus, jqXHR) {
    if (data.est == 1) {
      Swal.fire({
        icon: 'error',
        title: 'No se puede eliminar a un usuario Activo',
        text: 'Primero desactive el perfil del usuario y luego podrá eliminarlo'
      });
    } else {
      Swal.fire({
        title: "¿Desea eliminar este usuario?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "No"
      }).then(function (result) {
        if (result.isConfirmed) {
          $.post("../../controller/ctrMantUser.php?op=delete_usuario_panel_admin", {
            usu_id: usu_id
          }, function (data, textStatus, jqXHR) {
            Toastify({
              text: "Usuario eliminado correctamente",
              duration: 1000,
              gravity: "top",
              position: "left",
              style: {
                "margin-left": "120px"
              },
              backgroundColor: "#689dff"
            }).showToast();
            setTimeout(function () {
              window.location.reload();
            }, 1200);
          }, "json");
        }
      });
    }
  }, "json");
}

function validar_email(param) {
  //función para validar input de e-mail
  var expresionRegular = /^[a-zA-Z0-9._%+-]+@teco\.com\.ar$/;
  return expresionRegular.test(param);
}

function guardar_usuario() {
  $("#btnGuardarUsu").on("click", function () {
    if (validar_email($("#usu_email").val()) == true) {
      var registro = {
        usu_rol: $("#select_rol").val(),
        usu_sector: $("#select_sector").val(),
        usu_email: $("#usu_email").val(),
        usu_pass: $("#usu_pass").val()
      };
      $.ajax({
        type: "POST",
        url: "../../controller/ctrMantUser.php?op=inser_usuarios",
        data: registro,
        dataType: "json",
        success: function success(response) {}
      });
      Toastify({
        text: "Usuario Creado correctamente",
        duration: 1200,
        gravity: "top",
        position: "left",
        style: {
          "margin-left": "120px"
        },
        backgroundColor: "#689dff"
      }).showToast();
      setTimeout(function () {
        $("#modalUsuario").modal("hide");
        location.reload();
      }, 1200);
    } else {
      Toastify({
        text: "Error, debe ingresar un correo válido por ej: ********@teco.com.ar",
        gravity: "top",
        position: "center",
        style: {
          "margin-left": "120px"
        },
        backgroundColor: "orange"
      }).showToast();
      $("#usu_email").val("");
    }
  });
}

guardar_usuario();
init();