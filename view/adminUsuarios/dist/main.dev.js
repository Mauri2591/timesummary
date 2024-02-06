"use strict";

function init() {}

$(document).ready(function () {
  $("#nuevo_usuario").on("click", function () {
    //abre modal
    $("#usu_email").val('');
    $.post("../../controller/ctrRoles.php?combo_rol=get_roles", function (data, textStatus, jqXHR) {
      $("#select_rol").html(data);
    }, "json");
    $.post("../../controller/ctrSectores.php?combo_sector=get_sectores", function (data, textStatus, jqXHR) {
      $("#select_sector").html(data);
    }, "json");
    $("#modalUsuario").modal("show");
  });
  $.post("../../controller/ctrMantUser.php?op=get_datos_usuarios", function (data, textStatus, jqXHR) {
    var htmlTable = '';
    data.forEach(function (elem) {
      var textTruncado = elem.usu_pass;

      if (elem.usu_pass.length > 10) {
        textTruncado = elem.usu_pass.substring(0, 10);
      }

      if (elem.usu_pass == 'admin') {
        htmlTable += "\n            <tr>\n                <td style=\"padding-left: 10px; padding-right: 10px;\">".concat(elem.usu_nom, "</td>\n                <td style=\"padding-left: 10px; padding-right: 10px;\">").concat(elem.usu_ape, "</td>\n                <td style=\"padding-left: 10px; padding-right: 10px;\">").concat(elem.usu_dni == undefined ? "" : "", "</td>\n                <td style=\"padding-left: 10px; padding-right: 10px;\">").concat(elem.usu_email, "</td>\n                <td style=\"padding-left: 10px; padding-right: 10px;\">").concat(elem.sector_nom, "</td>\n                <td style=\"padding-left: 10px; padding-right: 10px;\">").concat(elem.rol_nom, "</td>\n                <td style=\"padding-left: 10px; padding-right: 10px; color:orange; font-weight:bold;\">admin</td>\n                <td style=\"padding-left:20px;\"><a onClick=\"editar_usuario_panel_admin(").concat(elem.usu_id, ")\"; type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Editar Usuario\" style=\"padding-left:5px\"><i style=\"font-size: 18px;\" class=\"ri-user-unfollow-fill text-info\"></i></a>\n                <td style=\"padding-left:20px;\"><a onClick=\"inhabilitar_usuario_panel_admin(").concat(elem.usu_id, ")\"; type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Inhabilitar Usuario\" style=\"padding-left:5px\"><i style=\"font-size: 18px;\" class=\"ri-user-unfollow-fill text-muted\"></i></a>\n                <td style=\"padding-left:20px;\"><a onClick=\"delete_usuario_panel_admin(").concat(elem.usu_id, ")\"; type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Eliminar Usuario\" style=\"padding-left:5px\"><i style=\"font-size: 18px;\" class=\"ri-user-unfollow-fill text-danger\"></i></a>\n                </td>\n            </tr>;\n            ");
        $("#tbody_table_mnt_Usuarios").html(htmlTable); // <a onClick="update_usuario(${elem.usu_id})"; data-toggle="tooltip" data-placement="top" title="Editar usuario" style="color:#00A717" type="button"><i style="font-size: 18px;" class="ri-user-search-fill"></i></a>
      } else {
        htmlTable += "\n                    <tr>\n                        <td style=\"padding-left: 10px; padding-right: 10px; margin: 0 3px\">".concat(elem.usu_nom, "</td>\n                        <td style=\"padding-left: 10px; padding-right: 10px; margin: 0 3px\">").concat(elem.usu_ape, "</td>\n                        <td style=\"padding-left: 10px; padding-right: 10px; color:#777\">").concat(elem.usu_dni == undefined ? "" : "***********", "</td>\n                        <td style=\"padding-left: 10px; padding-right: 10px; margin: 0 3px\">").concat(elem.usu_email, "</td>\n                        <td style=\"padding-left: 10px; padding-right: 10px; margin: 0 3px\">").concat(elem.sector_nom, "</td>\n                        <td style=\"padding-left: 10px; padding-right: 10px; margin: 0 3px\">").concat(elem.rol_nom, "</td>\n                        <td style=\"padding-left: 10px; padding-right: 10px; margin: 0 3px;\">Se cambi\xF3</td>\n                        <td style=\"padding-left:20px;\"><a onClick=\"editar_usuario_panel_admin(").concat(elem.usu_id, ")\"; type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Editar Usuario\" style=\"padding-left:5px\"><i style=\"font-size: 18px;\" class=\"ri-user-unfollow-fill text-info\"></i></a>\n                        <td style=\"padding-left:20px;\"><a onClick=\"inhabilitar_usuario_panel_admin(").concat(elem.usu_id, ")\"; type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Inhabilitar Usuario\" style=\"padding-left:5px\"><i style=\"font-size: 18px;\" class=\"ri-user-unfollow-fill text-muted\"></i></a>\n                        <td style=\"padding-left:20px;\"><a onClick=\"delete_usuario_panel_admin(").concat(elem.usu_id, ")\"; type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Eliminar Usuario\" style=\"padding-left:5px\"><i style=\"font-size: 18px;\" class=\"ri-user-unfollow-fill text-danger\"></i></a>\n                        </td>\n                    </tr>;\n                    "); // <a onClick="update_usuario(${elem.usu_id})"; data-toggle="tooltip" data-placement="top" title="Editar usuario" style="color:#00A717" type="button"><i style="font-size: 18px;" class="ri-user-search-fill"></i></a>

        $("#tbody_table_mnt_Usuarios").html(htmlTable);
      }
    });
  }, "json");
});

function editar_usuario_panel_admin(usu_id) {
  $.post("../../controller/ctrMantUser.php?op=get_datos_usuario_para_crud", {
    usu_id: usu_id
  }, function (data, textStatus, jqXHR) {
  }, "json");
}

function inhabilitar_usuario_panel_admin(usu_id) {
}

function delete_usuario_panel_admin(usu_id) {
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