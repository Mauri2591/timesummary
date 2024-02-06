function init() {
}
$(document).ready(function () {
    var usu_id = $("#usu_id").val();

    $("#nuevo_usuario").on("click", function () { //abre modal
        $("#usu_email").val('');

        $.post("../../controller/ctrRoles.php?combo_rol=get_roles",
            function (data, textStatus, jqXHR) {
                $("#select_rol").html(data)
                var select_rol = document.getElementById("select_rol");
                var option = select_rol.getElementsByTagName("option");
                for (var i = 0; i < option.length; i++) {
                    if (option[i].value === valorASeleccionar) {
                        option[i].selected = true;
                        break; // Salir del bucle una vez que se ha encontrado y seleccionado la opción
                    }
                }
            },
            "json"
        );

        $.post("../../controller/ctrSectores.php?combo_sector=get_sectores",
            function (data, textStatus, jqXHR) {
                $("#select_sector").html(data)
            },
            "json"
        );

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
        let htmlTable = '';
        data.forEach(elem => {
            let textTruncado = elem.usu_pass;
            if (elem.usu_pass.length > 10) {
                textTruncado = elem.usu_pass.substring(0, 10)
            }
            if (elem.usu_pass == 'admin') {
                htmlTable += `
            <tr>
                <td style="padding-left: 10px; padding-right: 10px;">${elem.usu_nom}</td>
                <td style="padding-left: 10px; padding-right: 10px;">${elem.usu_ape}</td>
                <td style="padding-left: 10px; padding-right: 10px;">${elem.usu_dni == undefined ? "" : ""}</td>
                <td style="padding-left: 10px; padding-right: 10px;">${elem.usu_email}</td>
                <td style="padding-left: 10px; padding-right: 10px;">${elem.sector_nom}</td>
                <td style="padding-left: 10px; padding-right: 10px;">${elem.rol_nom}</td>
                <td style="padding-left: 10px; padding-right: 10px; color:orange; font-weight:bold;">admin</td>
                <td style="padding-left: 10px; padding-right: 10px; margin: 0 3px;">${elem.estado == 1 ? '<span class="badge rounded-pill badge-soft-success">Activo</span>' : '<span class="badge badge-soft-dark">Inctivo</span>'}</td>
                <td style="padding-left:20px;"><a onClick="editar_usuario_panel_admin(${elem.usu_id})"; type="button" data-toggle="tooltip" data-placement="top" title="Cambiar rol y sector" style="padding-left:5px"><i style="font-size: 21px;" class="ri-user-search-fill text-primary"></i></a>
                <td style="padding-left:20px;"><a onClick="cambiar_estado_usuario(${elem.usu_id})"; type="button" data-toggle="tooltip" data-placement="top" title="Cambiar estado" style="padding-left:5px"><i style="font-size: 21px;" class="ri-user-shared-2-fill text-muted"></i></a>
                <td style="padding-left:20px;"><a onClick="delete_usuario_panel_admin(${elem.usu_id})"; type="button" data-toggle="tooltip" data-placement="top" title="Eliminar Usuario" style="padding-left:5px"><i style="font-size: 18px;" class="ri-user-unfollow-fill text-danger"></i></a>
                </td>
            </tr>;
            `;
            // <td style="padding-left:20px;"><a onClick="delete_usuario_panel_admin(${elem.usu_id})"; type="button" data-toggle="tooltip" data-placement="top" title="Eliminar Usuario" style="padding-left:5px"><i style="font-size: 18px;" class="ri-user-unfollow-fill text-danger"></i></a>
                $("#tbody_table_mnt_Usuarios").html(htmlTable)
            } else {
                htmlTable += `
                    <tr>
                        <td style="padding-left: 10px; padding-right: 10px; margin: 0 3px">${elem.usu_nom}</td>
                        <td style="padding-left: 10px; padding-right: 10px; margin: 0 3px">${elem.usu_ape}</td>
                        <td style="padding-left: 10px; padding-right: 10px; color:#777">${elem.usu_dni == undefined ? "" : "***********"}</td>
                        <td style="padding-left: 10px; padding-right: 10px; margin: 0 3px">${elem.usu_email}</td>
                        <td style="padding-left: 10px; padding-right: 10px; margin: 0 3px">${elem.sector_nom}</td>
                        <td style="padding-left: 10px; padding-right: 10px; margin: 0 3px">${elem.rol_nom}</td>
                        <td style="padding-left: 10px; padding-right: 10px; margin: 0 3px;">Se cambió</td>
                        <td style="padding-left: 10px; padding-right: 10px; margin: 0 3px;">${elem.estado == 1 ? '<span class="badge rounded-pill badge-soft-success">Activo</span>' : '<span class="badge badge-soft-dark">Inctivo</span>'}</td>
                        <td style="padding-left:20px;"><a onClick="editar_usuario_panel_admin(${elem.usu_id})"; type="button" data-toggle="tooltip" data-placement="top" title="Cambiar rol y sector" style="padding-left:5px"><i style="font-size: 21px;" class="ri-user-search-fill text-primary"></i></a>
                        <td style="padding-left:20px;"><a onClick="cambiar_estado_usuario(${elem.usu_id})"; type="button" data-toggle="tooltip" data-placement="top" title="Cambiar estado" style="padding-left:5px"><i style="font-size: 21px;" class="ri-user-shared-2-fill text-muted"></i></a>
                        <td style="padding-left:20px;"><a onClick="delete_usuario_panel_admin(${elem.usu_id})"; type="button" data-toggle="tooltip" data-placement="top" title="Eliminar Usuario" style="padding-left:5px"><i style="font-size: 18px;" class="ri-user-unfollow-fill text-danger"></i></a>
                        </td>
                    </tr>;
                    `;
                    // <td style="padding-left:20px;"><a onClick="delete_usuario_panel_admin(${elem.usu_id})"; type="button" data-toggle="tooltip" data-placement="top" title="Eliminar Usuario" style="padding-left:5px"><i style="font-size: 18px;" class="ri-user-unfollow-fill text-danger"></i></a>
                    $("#tbody_table_mnt_Usuarios").html(htmlTable)
            }
        });
    },
        "json"
    );
});

function editar_usuario_panel_admin(usu_id) {

    $("#modalUsuario").modal("show");
    $("#exampleModalLabel").html("Editar Usuario");
    $("#btnEditarUsu").show();
    $("#btnGuardarUsu").hide();
    $("#cont_usu_email").hide();
    $("#cont_usu_pass").hide();

    $.post("../../controller/ctrRoles.php?combo_rol=get_roles",
        function (data, textStatus, jqXHR) {
            $("#select_rol").html(data);
        },
        "json"
    );

    $.post("../../controller/ctrSectores.php?combo_sector=get_sectores",
        function (data, textStatus, jqXHR) {
            $("#select_sector").html(data);
        },
        "json"
    );

    // Mover la obtención de valores dentro del evento de clic
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
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Bien",
                    text: "Usuario actualizado correctamente",
                    icon: "success",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 1300,
                });
                $.post("../../controller/ctrMantUser.php?op=update_usuario_rol_y_sector", { usu_id: usu_id, usu_rol: select_rol, usu_sector: select_sector },
                    function (data, textStatus, jqXHR) {
                    },
                    "json"
                );
                $("#modalUsuario").modal("hide");
                setTimeout(() => {
                    window.location.reload();
                }, 1300);
            }
        });
    });
}

function cambiar_estado_usuario(usu_id) {
var usu_tareas=usu_id;

    $.post("../../controller/ctrMantUser.php?op=get_datos_usuario_para_update", { usu_id: usu_id },
        function (data, textStatus, jqXHR) {

            if (data.est == 1) {


                $.post("../../controller/ctrMantUser.php?op=get_eventoContiguo_activos_contador_1_x_usu", {usu_id: usu_tareas},
                    function (data, textStatus, jqXHR) {
                        if(data.length > 0){
                            Swal.fire({
                                title: 'Atención!',
                                text: `Este proyecto tiene ${data.length == 1 ? data.length+" tarea activa" : data.length+" tareas activas"}. Si continúa deberá reasignar las tareas a otro usuario. Desea continuar?`,
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                cancelButtonText: 'No',
                                confirmButtonText: 'Si'
                            }).then((result) =>{
                                if(result.isConfirmed){
                                    $("#asignarTarea").modal("show")
                                    $.post("../../controller/ctrMantUser.php?op=get_datos_usuarios_select_asignar_tareas",
                                        function (data, textStatus, jqXHR) {
                                            let htmlOption='<option value="0">Seleccione</option>';
                                            data.forEach(elem => {
                                                htmlOption+=`
                                                <option value="${elem.usu_id}">${elem.usu_nom}</option>
                                                `;
                                            });
                                            document.getElementById("select_usuario_para_asignar_tarea").innerHTML=htmlOption;
                                        },
                                        "json"
                                    );
                                }
                            });
                        }else{
    
                        }
                    },
                    "json"
                );


                Swal.fire({
                    title: '¿Desea inhabilitar Usuario?',
                    text: "Se desactivará al usuario.",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Inhabilitar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.post("../../controller/ctrMantUser.php?op=cambiar_estado_usuario", { usu_id: usu_id, est: 0 },
                            function (data, textStatus, jqXHR) {
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
                            },
                            "json"
                        );
                        $("#modalUsuario").modal("hide");
                        setTimeout(() => {
                            window.location.reload();
                        }, 300);
                    }
                })
            } else {
                Swal.fire({
                    title: '¿Desea habilitar este Usuario?',
                    text: "Se habilitará nuevamente este usuario",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Habilitar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.post("../../controller/ctrMantUser.php?op=cambiar_estado_usuario", { usu_id: usu_id, est: 1 },
                            function (data, textStatus, jqXHR) {
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
                            },
                            "json"
                        );
                        $("#modalUsuario").modal("hide");
                        setTimeout(() => {
                            window.location.reload();
                        }, 300);
                    }
                })
            }
        },
        "json"
    );


    Swal.fire({
        title: '¿Desea inhabilitar Usuario?',
        text: "Se desactivará al usuario.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Inhabilitar!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.post("../../controller/ctrMantUser.php?op=inhabilitar_usuario", { usu_id: usu_id },
                function (data, textStatus, jqXHR) {
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
                },
                "json"
            );
            $("#modalUsuario").modal("hide");
            setTimeout(() => {
                window.location.reload();
            }, 300);
        }
    })

}

function delete_usuario_panel_admin(usu_id) {
    $.post("../../controller/ctrMantUser.php?op=get_datos_usuario_para_update", { usu_id: usu_id },
        function (data, textStatus, jqXHR) {
            if (data.est == 1) {
                Swal.fire({
                    icon: 'error',
                    title: 'No se puede eliminar a un usuario Activo',
                    text: 'Primero desactive el perfil del usuario y luego podrá eliminarlo',
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
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.post("../../controller/ctrMantUser.php?op=delete_usuario_panel_admin", { usu_id: usu_id },
                            function (data, textStatus, jqXHR) {
                                Swal.fire({
                                    title: "Bien",
                                    text: "Usuario eliminado correctamente",
                                    icon: "success",
                                    showCancelButton: false,
                                    showConfirmButton: false,
                                    timer: 1300,
                                });

                                setTimeout(() => {
                                    window.location.reload();
                                }, 1300);
                            },
                            "json"
                        );
                    }
                });
            }
        },
        "json"
    );
}



function validar_email(param) { //función para validar input de e-mail
    var expresionRegular = /^[a-zA-Z0-9._%+-]+@teco\.com\.ar$/;
    return expresionRegular.test(param)
}

function guardar_usuario() {
    $("#btnGuardarUsu").on("click", function () {

        if (validar_email($("#usu_email").val()) == true) {
            let registro = {
                usu_rol: $("#select_rol").val(),
                usu_sector: $("#select_sector").val(),
                usu_email: $("#usu_email").val(),
                usu_pass: $("#usu_pass").val()
            }
            $.ajax({
                type: "POST",
                url: "../../controller/ctrMantUser.php?op=inser_usuarios",
                data: registro,
                dataType: "json",
                success: function (response) {
                }
            });
            Swal.fire({
                title: "Bien",
                text: "Usuario creado correctamente",
                icon: "success",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 1300,
            });

            setTimeout(() => {
                $("#modalUsuario").modal("hide");
                location.reload();
            }, 1300);

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
guardar_usuario()

init();