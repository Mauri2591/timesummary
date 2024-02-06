function init() {
}

$(document).ready(function () {
    var usu_id = $("#usu_id").val();
    var contador = document.getElementById("contador");
    var url = "http://localhost/timesummary";

    $.post("../../../controller/ctrMantUser.php?op=get_datos_usuario", { usu_id: usu_id }, function (data, textStatus, jqXHR) {
        data = JSON.parse(data)
        if (data.contador == 0) { //si el usuario está dado de alta solo por el desarrollador con pass admin

            $("#modalResetUsu").modal("show");

            if (data.usu_sector == 1) {
                $("#usu_sector").val("Ethical Hacking").attr('disabled', 'disabled')
            } else if (data.usu_sector == 2) {
                $("#usu_sector").val("Calidad y Procesos").attr('disabled', 'disabled')
            } else if (data.usu_sector == 3) {
                $("#usu_sector").val("SOC").attr('disabled', 'disabled')
            } else if (data.usu_sector == 4) {
                $("#usu_sector").val("SASE").attr('disabled', 'disabled')
            } else if (data.usu_sector == 5) {
                $("#usu_sector").val("MSSP").attr('disabled', 'disabled')
            }

            if (data.usu_rol == 1) {
                $("#usu_rol").val("Usuario").attr('disabled', 'disabled')
            } else if (data.usu_rol == 2) {
                $("#usu_rol").val("Administrador").attr('disabled', 'disabled')
            } else if (data.usu_rol == 3) {
                $("#usu_rol").val("Desarrollador").attr('disabled', 'disabled')
            }

            $("#btnGuardarUsuarioLogin").on("click", function () { // Es la primera vez que un usuario ingresa al sistema
                var usu_dni = $("#usu_dni").val()

                function validarDNI(usu_dni) {

                    return /^\d{2}\.\d{3}\.\d{3}$/.test(usu_dni); // Expresión regular para validar un DNI con al menos 6 dígitos y 2 puntos
                }

                var dia = $("#usu_nacimiento").val().split("-")[2];
                var mes = $("#usu_nacimiento").val().split("-")[1];
                var anio = $("#usu_nacimiento").val().split("-")[0];
                var nueva_fecha = dia + '/' + mes + '/' + anio;

                if ($("#usu_nom").val() == '' || $("#usu_ape").val() == '' ||
                    $("#usu_dni").val() == '' || $("#usu_pass").val() == '' || $("#usu_celular").val() == '' ||
                    $("#usu_direccion").val() == '' || $("#usu_nacimiento").val() == '') {
                    mje_campos_vacios();
                } else if (!validarDNI(usu_dni)) {
                    mje_error_dni();
                }
                else {
                    registro = {
                        usu_id: data.usu_id,
                        usu_nom: $("#usu_nom").val(),
                        usu_ape: $("#usu_ape").val(),
                        usu_dni: $("#usu_dni").val(),
                        usu_pass: $("#usu_pass").val(),
                        usu_celular: $("#usu_celular").val(),
                        usu_direccion: $("#usu_direccion").val(),
                        usu_nacimiento: nueva_fecha,
                        usu_email: $("#usu_email").val(),
                        contador: $("#contador").val()
                    }

                    $.ajax({
                        type: "POST",
                        url: "../../../controller/ctrMantUser.php?op=update_datos_usuario_login_primera_vez",
                        data: registro,
                        dataType: "json",
                        success: function (response) {
                        }
                    });
                    mje_usuario_actualizado()
                    setTimeout(() => {
                        window.location.href = url + "?p=updateUser";
                    }, 1200)

                    $("#btnRecargarPagina").on("click", function () {
                        window.location.reload(url)
                    });
                }

            });
        }
    });

    $.post("../../../controller/ctrMantUser.php?op=get_datos_usuario", { usu_id: usu_id }, function (data, textStatus, jqXHR) {
        data = JSON.parse(data)
        if (data.contador == 1) { //si el usuario está dado de alta solo por el desarrollador con pass admin

            $("#modalResetUsu").modal("show");
            $("#exampleModalLabel").html("Actualice su password")
            $("#conta_usu_nom").remove();
            $("#conta_usu_ape").remove();
            $("#conta_usu_dni").val(data.usu_dni);
            $("#conta_usu_sector").remove();
            $("#conta_usu_rol").remove();
            $("#conta_usu_celular").remove();
            $("#conta_usu_direccion").remove();
            $("#cont_usu_nacimiento").remove();
            $("#modal_usu_email").val(data.usu_email)
            $("#modal_usu_pass").val(data.usu_pass)

            let usu_email_reset_password = $("#usu_email").val();

            $.post("../../../controller/ctrMantUser.php?op=get_dni_user_para_reset_password", { usu_email: usu_email_reset_password },
                function (data, textStatus, jqXHR) {
                    $("#btnGuardarUsuarioLogin").on("click", function () {
                        if ($("#usu_pass").val() == '' || $("#usu_pass") == null) {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Password vacía',
                                text: 'Debe ingresar un password',
                                timer: 1500,
                                showCancelButton: false,
                                showConfirmButton: false
                            });
                        } else if ($("#usu_pass").val().toLowerCase() === 'admin') {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Error de password',
                                text: 'Debe ingresar un password distinto a "admin"',
                                showCancelButton: false,
                                showConfirmButton: true
                            });
                            $("#usu_pass").val('');
                        } else if ($("#usu_dni").val() == '' || $("#usu_dni").val() == null) {
                            Swal.fire({
                                icon: "warning",
                                title: "DNI vacío",
                                text: "Debe ingresar los últimos 3 dígitos de su dni",
                                timer: 1300
                            });
                        } else if ($("#usu_dni").val() != data.dni) {
                            Swal.fire({
                                icon: "warning",
                                title: "Error de DNI",
                                text: "Ingrese los últimos 3 dígitos de su dni correctamente",
                                showConfirmButton: true
                            });
                            $("#usu_dni").val('');
                        }
                        else {
                            let registro1 = {
                                usu_id: data.usu_id,
                                usu_email: data.usu_email,
                                usu_pass: $("#usu_pass").val(),
                                contador: 1
                            }
                            $.ajax({
                                type: "POST",
                                url: "../../../controller/ctrMantUser.php?op=reset_password",
                                data: registro1,
                                dataType: "json",
                                success: function (response) {
                                }
                            });
                            mje_usuario_actualizado()
                            setTimeout(() => {
                                window.location.href = url + "?p=updateUser";
                            }, 1200)
                            $("#btnRecargarPagina").on("click", function () {
                                window.location.reload(url)
                            });
                        }
                    });



                },
                "json"
            );
        }
    });

    //*** recargar página al dar click en boton cancelar del modal ****
    function btnRecargarPagina() {
        document.getElementById("btnRecargarPagina").addEventListener("click", function () {
            window.location.href = url;
        });
    }
    btnRecargarPagina();
    //************************************************************ */

    //*** recargar página al dar click fuera del modal ****
    function clickFueraDeModal() {
        let modal = document.getElementById("modalResetUsu");
        document.addEventListener("click", function (event) {
            if (event.target === modal) {
                window.location.href = url;
            }
        });
    }
    clickFueraDeModal();
    //************************************************************ */

    //*** mje success que lleva devuelta al inicio ****
    function mje_usuario_actualizado() {
        var h5 = document.getElementById("h5");
        h5.style.textAlign = "center";
        h5.style.paddingLeft = "10px";
        h5.style.paddingRight = "10px";
        h5.style.paddingTop = "5px";
        h5.style.paddingBottom = "5px";
        h5.style.backgroundColor = "#006c00";
        h5.style.color = "#fff";
        h5.style.marginBottom = "15px";
        h5.innerText = "Actualizado Correctamente!";
    }
    function mje_error_dni() {
        var h5 = document.getElementById("h5");
        h5.style.textAlign = "center";
        h5.style.paddingLeft = "10px";
        h5.style.paddingRight = "10px";
        h5.style.paddingTop = "5px";
        h5.style.paddingBottom = "5px";
        h5.style.backgroundColor = "red";
        h5.style.color = "#fff";
        h5.style.marginBottom = "15px";
        h5.innerText = "Debe ingresar un dni válido ej: 11.222.333";
    }
    function mje_campos_vacios() {
        var h5 = document.getElementById("h5");
        h5.style.textAlign = "center";
        h5.style.paddingLeft = "10px";
        h5.style.paddingRight = "10px";
        h5.style.paddingTop = "5px";
        h5.style.paddingBottom = "5px";
        h5.style.backgroundColor = "red";
        h5.style.color = "#fff";
        h5.style.marginBottom = "15px";
        h5.innerText = "Hay campos vacíos!";
    }
});
init();