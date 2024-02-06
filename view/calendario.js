function init() {
}

document.addEventListener("DOMContentLoaded", function () {
    $.post("../controller/ctrEventos.php?accion=get_total_eventos",
        function (data, textStatus, jqXHR) {
        },
        "json"
    );

    toastr.options = { "positionClass": "toast-top-center" } //posición de toas global
    $('.clockpicker').clockpicker() //para el reloj

    let calendario1 = new FullCalendar.Calendar(document.getElementById('calendar'), {

        editable: true,

        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next,today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: '../controller/ctrEventos.php?accion=get_total_eventos',
        locale: 'es',

        dateClick: function (info) { // Abre modal y trae info de la fechas
            if ($("#usu_sector").val() == 1) {  //******* Inicio si el usuario es de EH

                limpiarFormulario();

                $("#horas_total").on("change", function () { //Valida que el tipo de dato de horas_total sea un entero
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
                });

                //*****************Calcula horas que restan*******************


                document.getElementById("hora_ini").addEventListener("change", function () {
                    let regla_hora_ini = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
                    if (!regla_hora_ini.test($("#hora_ini").val())) {
                        Swal.fire({
                            title: "¡Hora no válida!",
                            timer: 1200,
                            showCancelButton: false,
                            showConfirmButton: false
                        });
                        $("#hora_ini").val('')
                        $("#hora_ini").focus();
                    }
                    if (calcular_horas_restantes() < 0) {
                        Swal.fire({
                            title: "¡Error en la carga de horas!",
                            timer: 1200,
                            showCancelButton: false,
                            showConfirmButton: false
                        });
                        $("#hora_fin").val('')
                        $("#hora_fin").focus();
                    }
                    // $("#horas_restantes").val(calcular_horas_restantes())
                });

                //*******************Calcula horas consumidas*******************
                document.getElementById("hora_fin").addEventListener("change", function () {
                    let regla_hora_fin = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
                    if (!regla_hora_fin.test($("#hora_fin").val()) || $("#hora_fin").val() < $("#hora_ini").val()) {
                        Swal.fire({
                            title: "¡Hora no válida!",
                            timer: 1200,
                            showCancelButton: false,
                            showConfirmButton: false
                        });
                        $("#hora_fin").val('')
                        $("#hora_fin").focus();
                    }
                    $("#horas_restantes").val(calcular_horas_restantes())

                    if ($("#horas_restantes").val() < 0) {
                        $("#btnGuardar").prop("disabled", true);
                        Swal.fire({
                            icon: 'error',
                            text: `Las horas ingresadas superan las horas disponibles.`,
                            timer: 1300,
                            showCancelButton: false,
                            showConfirmButton: false
                        });
                        $("#hora_fin").val('');
                        $("#hora_fin").focus();
                        $("#horas_restantes").val('');
                    } else {
                        $("#horas_consumidas").val(calcular_horas_consumidas())
                        $("#btnGuardar").prop("disabled", false)
                    }
                });

                $("#exampleModalLabel").html("Nueva Tarea");

                $("#validar_si_existe_un_primer_evento_en_ts_evento").val('');

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

                if (info.allDay) { //Obtener fecha de hoy
                    $("#fech_ini").val(info.dateStr);
                    $("#fech_fin").val(info.dateStr);
                    $('#fech_ini').attr('disabled', 'disabled');
                    $("#client_nom").attr('disabled', 'disabled');
                    $("#client_id").attr('disabled', 'disabled');
                }
                $('#FormularioEventos').modal('show');
            } else { // Abre modal y trae info de la fechas solo si es usuario de otro sector
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
                        });

                        // Limpiar el campo y enfocarse en él
                        $(this).val('');
                        $(this).focus();
                    }
                });

                limpiarFormulario();

                input_valor_cliente(); //Con esta función ingreso una palabra y me filtra desde la DB

                $("#hora_ini").prop('disabled', false);
                $("#hora_fin").prop('disabled', false);

                $("#event_id_eventos_continuos").val('');

                $("#prod_id").removeAttr('disabled')

                $("#tick_titulo").prop('readonly', true);

                $("#client_id").val('');
                $("#client_id").attr('disabled', 'disabled');

                document.getElementById("hora_fin").addEventListener("change", function () {
                    $("#horas_restantes").val(calcular_horas_restantes())
                });

                document.getElementById("hora_fin").addEventListener("change", function () {
                    $("#horas_consumidas").val(calcular_horas_consumidas())
                });

                $('#tarea_id').val(15);

                $("#exampleModalLabel").html("Nueva Tarea");

                $('#horas_total').removeAttr('disabled');

                $("#BotonAgregarUserDiferentesEh").show(); //mostrar el boton agregar
                $("#BotonAgregarUserDiferentesEh").addClass('btn btn-sm btn-success'); //cambio el estilo del boton agregar
                $("#BotonModificarUserDiferentesEh").hide(); //ocultar el boton modificar
                $("#BotonBorrarUserDiferentesEh").hide(); //ocultar el boton borrar

                if (info.allDay) { //Obtener fecha de hoy
                    $("#fech_ini").val(info.dateStr);
                    $("#fech_fin").val(info.dateStr);
                    $('#fech_ini').attr('disabled', 'disabled');
                }

                //*****************Calcula horas que restan*******************
                document.getElementById("hora_ini").addEventListener("change", function () {
                    let regla_hora_ini = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
                    if (!regla_hora_ini.test($("#hora_ini").val())) {
                        Swal.fire({
                            title: "¡Hora no válida!",
                            timer: 1200,
                            showCancelButton: false,
                            showConfirmButton: false
                        });
                        $("#hora_ini").val('')
                        $("#hora_ini").focus();
                    }
                    if (calcular_horas_restantes() < 0) {
                        Swal.fire({
                            title: "¡Error en la carga de horas!",
                            timer: 1200,
                            showCancelButton: false,
                            showConfirmButton: false
                        });
                        $("#hora_fin").val('')
                        $("#hora_fin").focus();
                    }
                });

                //*******************Calcula horas consumidas*******************
                document.getElementById("hora_fin").addEventListener("change", function () {
                    let regla_hora_fin = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
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
                    $("#horas_restantes").val(calcular_horas_restantes())
                    if ($("#horas_restantes").val() < 0) {
                        $("#btnGuardar").prop("disabled", true);
                        Swal.fire({
                            icon: 'error',
                            text: `Las horas ingresadas superan las horas disponibles.`,
                            timer: 1300,
                            showCancelButton: false,
                            showConfirmButton: false
                        });
                        $("#hora_fin").val('');
                        $("#hora_fin").focus();
                        $("#horas_restantes").val('');
                    } else {
                        $("#horas_consumidas").val(calcular_horas_consumidas())
                        $("#btnGuardar").prop("disabled", false)
                    }
                });
                $('#FormularioEventos').modal('show');
            }
        },

        eventClick: function (info) { // Abre modal y trae info de los datos guardados
            if ($("#usu_sector").val() == 1 || $("#usu_sector").val() == 2 || $("#usu_sector").val() == 3 || $("#usu_sector").val() == 4 || $("#usu_sector").val() == 5) {  //******* Inicio si el usuario es de EH


                $("#id").val(info.event._def.extendedProps.id_eventoContiguo);

                $("#event_id").val(info.event._def.extendedProps.event_id);

                $("#exampleModalLabel").html("Editar Tarea");
                $("#title_pegar").html("Id ticket")

                $("#event_id").val(info.event._def.extendedProps.event_id)
                $("#horas_total").attr('disabled', 'disabled')

                if (info.event._def.extendedProps.evento_activo == "no") {
                    $("#BotonModificar").hide(); //ocultar el boton agregar
                    $("#exampleModalLabel").html("Tarea finalizada")
                } else {
                    $("#BotonModificar").show(); //mostrar el boton agregar
                }

                $("#BotonBorrar").show(); //mostrar1 el boton borrar
                $("#BotonAgregar").hide(); //ocultar el boton modificar

                $("#id_ticket").val(info.event._def.extendedProps.tick_id)

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

                $("#horas_total").val(info.event._def.extendedProps.horas_total)

                $("#horas_restantes").val(info.event._def.extendedProps.horas_restantes);

                $("#horas_consumidas").val(info.event._def.extendedProps.horas_consumidas);

                $("#FormularioEventos").modal("show");

            } else { //trae info de los datos guardados de usuarios != EH

                $("#valor_cliente").attr('disabled', 'disabled');
                $("#valor_cliente").val('#####');

                $("#event_id").val(info.event._def.extendedProps.event_id)

                $("#id").val(info.event._def.extendedProps.id_eventoContiguo);

                $("#tick_titulo").val(info.event._def.title)

                $("#exampleModalLabel").html("Editar Tarea");
                $("#title_pegar").html("Total hs")

                $("#horas_total").attr('disabled', 'disabled')

                $("#id_ticket").val(info.event._def.extendedProps.tick_id)

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

                $("#horas_total").val(info.event._def.extendedProps.horas_total)

                $("#horas_restantes").val(info.event._def.extendedProps.horas_restantes);

                $("#horas_consumidas").val(info.event._def.extendedProps.horas_consumidas);

                $("#BotonModificarUserDiferentesEh").show(); //mostrar el boton agregar
                $("#BotonAgregarUserDiferentesEh").hide(); //ocultar el boton modificar
                $("#BotonBorrarUserDiferentesEh").show(); //ocultar el boton borrar

                $("#FormularioEventos").modal("show");
            }
        },
        eventDrop: function (info) {
        }
    });
    calendario1.render();

    //---------------------------------------------------------------

    function get_select_producto() {
        $.post("../controller/ctrEventos.php?accion=get_select_producto",
            function (data, textStatus, jqXHR) {
                data = JSON.parse(data)
                var htmlTemplate = '';
                data.forEach(elem => {
                    htmlTemplate += `
                    <option value="${elem.prod_id}">${elem.prod_nombre}</option>
                `;
                    document.getElementById('prod_id').innerHTML = htmlTemplate;
                });
            },
        );
    }
    get_select_producto();

    function get_select_tarea() {
        $.post("../controller/ctrEventos.php?accion=get_select_tarea",
            function (data, textStatus, jqXHR) {
                data = JSON.parse(data)
                var htmlTemplate = '';
                data.forEach(elem => {
                    htmlTemplate += `
                    <option id=prod_id value="${elem.tarea_id}">${elem.tarea_nombre}</option>
                `;
                    document.getElementById('tarea_id').innerHTML = htmlTemplate;
                });
            },
        );
    }
    get_select_tarea();


    function calcular_horas_restantes() {
        var horas_total = $("#horas_total").val();
        var hora_ini = $("#hora_ini").val();
        var hora_fin = $("#hora_fin").val();
        const horaInicial = parseInt(hora_ini.split(':')[0], 10);
        const horaFinal = parseInt(hora_fin.split(':')[0], 10);
        const diferencia = horaFinal - horaInicial;
        var restan = horas_total - diferencia;
        return restan;
    }


    function calcular_horas_consumidas() {
        var horas_total = $("#horas_total").val();
        var hora_ini = $("#hora_ini").val();
        var hora_fin = $("#hora_fin").val();
        const horaInicial = parseInt(hora_ini.split(':')[0], 10);
        const horaFinal = parseInt(hora_fin.split(':')[0], 10);
        const diferencia = horaFinal - horaInicial;
        return diferencia;
    }

    //funciones que interactúan con el formulario eventos
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
        let hora_ini = document.getElementById('hora_ini').value;
        let hora_fin = document.getElementById('hora_fin').value;
        let horaInicialValue = parseInt(hora_ini.split(':')[0], 10);
        let horaFinalValue = parseInt(hora_fin.split(':')[0], 10);
        // $("#event_descrip").val()
        if ($("#horas_restantes").val() === "NaN" || $("#horas_consumidas").val() === "NaN" || $("#hora_ini").val() == $("#hora_fin").val()) {
            Swal.fire({
                title: "Error",
                text: "Verifique que las horas no coincidan",
                icon: "error",
                showCancelButton: false,
                showConfirmButton: true
            });
            $("#horas_restantes").val('');
            $("#horas_consumidas").val('');
            $("#hora_fin").val('');

        } else if ($('#usu_id').val() == '' || $('#client_id').val() == ''
            || $('#prod_id').val() == '' || $('#tarea_id').val() == '' || $('#client_nom').val() == ''
            || $('#fech_ini').val() == '' || $('#fech_fin').val() == '' || $('#horas_total').val() == '' || $('#client_nom').val() == ''
            || $('#hora_ini').val() == '' || $('#hora_fin').val() == '' || $("#event_descrip").val() == '') {
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
                let registro = recuperarDatosFormulario();
                agregarRegistro(registro);
                $('#FormularioEventos').modal('hide');
            } else {
                let registro = recuperarDatosFormulario();
                agregarRegistro(registro);
                $('#FormularioEventos').modal('hide');
            }
        }
    });

    // input y traer datos de Usuarios de EH
    function llenar_campos() {
        document.getElementById('id_ticket').addEventListener('input', function () {
            var tick_id = $('#id_ticket').val();

            $.post("../controller/ctrEventos.php?accion=validar_si_existe_un_primer_evento_en_ts_evento", {tick_id:tick_id},
            function (data, textStatus, jqXHR) {
                if(data.length > 0){
                    document.getElementById("validar_si_existe_un_primer_evento_en_ts_evento").value="si_existe";
                }else{
                    document.getElementById("validar_si_existe_un_primer_evento_en_ts_evento").value="no_existe";
                }
            },
            "json"
        );

            $("#hora_ini").focus();
            $('#id_ticket').attr('disabled', 'disabled');

            $.post("../controller/ctrTasking/ctrUsuario.php?op_tasking=getDatosPor_tick_id_y_usu", {tick_id: tick_id },
                function (data, textStatus, jqXHR) {
                    let id_cliente = '';

                    data.forEach(elem => {
                        return id_cliente = elem.client_id
                    });

                    $.post("../controller/ctrEventos.php?accion=traer_id_event_para_agregar", { client_id: id_cliente },
                        function (data, textStatus, jqXHR) {
                            
                            document.getElementById("event_id_eventos_continuos").value = data[0].event_id;
                            let ultimo_event_id=document.getElementById("event_id_eventos_continuos").value = data[0].event_id;
                            console.log("event_id: "+ultimo_event_id);

                            $.post("../controller/ctrEventos.php?accion=get_event_id_mas_alto_de_evento_x_usu", { client_id: id_cliente, event_id: data[0].event_id },
                                function (data, textStatus, jqXHR) {
                                    if (data[0].event_id > 0 && data[0].horas_restantes > 0) {
                                        $("#horas_total").val(data[0].horas_restantes)
                                        $("#horas_total").attr('disabled', 'disabled');
                                    }
                                    else {
                                        $("#horas_total").prop('disabled', false);
                                        $("#horas_total").val('');
                                    }
                                },
                                "json"
                            );
                        },
                        "json"
                    );
                    try {
                        data[0].tick_id == tick_id
                        $("#horas_total").val(data[0].HsDimensionadas);
                        $("#horas_total").attr('disabled','disabled');
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
                },
                "json"
            );
        });
    }

    // **************   Sanitizar event_descrip   ******************
    function escapeHTML(text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    // ************* Inicio Usuario distinto a EH  *******************

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
            }
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
            }
            return registro;
        }
        else if ($("#horas_restantes").val() == 0) {
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
            }
            return registro

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
            }
            return registro;
        }
    }

    $('#BotonAgregarUserDiferentesEh').click(function () {
        hora_ini = $('#hora_ini').val();
        hora_fin = $('#hora_fin').val();

        let horaInicialValue = parseInt(hora_ini.split(':')[0], 10);
        let horaFinalValue = parseInt(hora_fin.split(':')[0], 10);

        if ($('#valor_cliente').val() == '' || $('#tick_titulo').val() == ''
            || $('#prod_id').val() == '' || $('#tarea_id').val() == '' || $('#horas_total').val() == ''
            || $('#horas_restantes').val() == '' || $('#horas_consumidas').val() == '' || $('#fech_ini').val() == '' || $('#hora_ini').val() == ''
            || $('#fech_fin').val() == '' || $('#hora_fin').val() == '' || $("#event_descrip").val() == '') {
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
            let registro = recuperarDatosFormularioUsuarioDistintoEh();
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
                success: function (data) {
                },
                error: function (xhr, status, error, data) {
                }
            });
        } else {
            if ($("#horas_restantes").val() == 0) {
                $.ajax({
                    type: "POST",
                    url: "../controller/ctrEventos.php?accion=setear_event_inactivo",
                    data: registro,
                    dataType: "json",
                    success: function (data) {
                    },
                    error: function (xhr, status, error, data) {
                    }
                });
            }
            $.ajax({
                type: "POST",
                url: "../controller/ctrEventos.php?accion=agregar",
                data: registro,
                dataType: "json",
                success: function (data) {
                },
                error: function (xhr, status, error, data) {
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
        let registro = recuperarDatosFormularioParaUpdate();
        modificarRegistro(registro);
        $('#FormularioEventos').modal('hide');
    });

    $("#BotonBorrarUserDiferentesEh").click(function () {
        if (confirm("¿Desea eliminar esta tarea?")) {
            let registro = recuperarDatosEliminar();
            eliminarDatos(registro);
            $('#FormularioEventos').modal('hide');
        }
    })

    // ************* Fin Usuario distinto a EH  *******************

    llenar_campos(); // función llenar campos formulario

    function agregarRegistro(registro) {
        if ($("#validar_si_existe_un_primer_evento_en_ts_evento").val() == "no_existe") {
            $.ajax({
                type: "POST",
                url: "../controller/ctrEventos.php?accion=agregar_primer_evento",
                data: registro,
                dataType: "json",
                success: function (data) {
                },
                error: function (xhr, status, error, data) {
                }
            });
        } else {
            if ($("#horas_restantes").val() == 0) {
                $.ajax({
                    type: "POST",
                    url: "../controller/ctrEventos.php?accion=setear_event_inactivo",
                    data: registro,
                    dataType: "json",
                    success: function (data) {
                    },
                    error: function (xhr, status, error, data) {
                    }
                });
            }
            $.ajax({
                type: "POST",
                url: "../controller/ctrEventos.php?accion=agregar",
                data: registro,
                dataType: "json",
                success: function (data) {
                },
                error: function (xhr, status, error, data) {
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
        if ($("#validar_si_existe_un_primer_evento_en_ts_evento").val() == "no_existe" && $("#horas_restantes").val() == 0) {
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
                est: 1,
            }
            return registro;
        } else if ($("#validar_si_existe_un_primer_evento_en_ts_evento").val() == "no_existe" && $("#horas_restantes").val() > 0) {
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
            }
            return registro;
        }
        else if ($("#horas_restantes").val() == 0) {
            let fecha_fin = new Date;
            let anio = fecha_fin.getFullYear();
            let mes = fecha_fin.getMonth() + 1;
            let mesFormateado = mes < 10 ? '0' + mes : mes;
            let dia = fecha_fin.getDate();
            let fecha_final = anio + '' + mesFormateado + '' + dia;

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
                fecha_finalizacion : fecha_final,
                est: 0
            }
            return registro

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
            }
            return registro;
        }
    }

    //-----************  Inicio servicio Update  ********** ------------------->
    function recuperarDatosFormularioParaUpdate() {
        var eventDescrip = escapeHTML($('#event_descrip').val());
        var registro = {
            id: $("#id").val(),
            usu_id: $("#usu_id").val(),
            tarea_id: $("#tarea_id").val(),
            hora_ini: $("#hora_ini").val(),
            hora_fin: $("#hora_fin").val(),
            event_descrip: eventDescrip
        }
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
        let registro = recuperarDatosFormularioParaUpdate();
        modificarRegistro(registro);
        $('#FormularioEventos').modal('hide');
    });

    //-----************  Fin servicio Update  ********** ------------------->

    //-----************  Inicio servicio Borrar  ********** ------------------->
    function recuperarDatosEliminar() {
        var registro = {
            id: $('#id').val(),
            usu_id: $("#usu_id").val(),
        }
        return registro;
    }

    function eliminarDatos(registro) {
        $.ajax({
            type: "POST",
            url: "../controller/ctrEventos.php?accion=borrar",
            data: registro,
            dataType: "json",
            success: function (response) {
            }, error: function () {
                alert("Error");
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
        horas_consumidas = $("#horas_consumidas").val();
        id = $("#id").val();
        event_id = $("#event_id").val();

        $.post("../controller/ctrEventos.php?accion=get_primer_id_eventoContiguo", { event_id: event_id },
            function (data, textStatus, jqXHR) {
                if (data.evento_activo == "no") {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Error',
                        text: 'No se puede eliminar esta actividad ya que se encuentra finalizada',
                        showCancelButton: false,
                        showConfirmButton: false,
                        timer: 1300
                    });
                    $('#FormularioEventos').modal('hide');
                } else if (data.id == id) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Error',
                        text: 'No se puede eliminar la primer actvidad ya que cuenta con el total de horas asignadas',
                        showCancelButton: false,
                        showConfirmButton: false,
                        timer: 1300
                    });
                } else if ($("#horas_restantes").val() == 0) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Error',
                        text: 'No puede eliminar la primer actvidad ya que cuenta con el total de horas',
                        showCancelButton: false,
                        showConfirmButton: false,
                        timer: 1300
                    });
                } else {
                    $.post("../controller/ctrEventos.php?accion=get_event_id_mas_alto_de_eventoiContiguo", { event_id: event_id },
                        function (data, textStatus, jqXHR) {
                            if (id == data.id) {
                                Swal.fire({
                                    icon: 'warning',
                                    title: '¿Desea borrar esta actvidad?',
                                    text: 'Si la elimina se le reintegrarán las horas al total de la actividad',
                                    showCancelButton: true,
                                    showConfirmButton: true
                                }).then((resul) => {
                                    if (resul.isConfirmed) {
                                        let registro = recuperarDatosEliminar();
                                        eliminarDatos(registro);
                                        $('#FormularioEventos').modal('hide');
                                    }
                                });
                            } else {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Error',
                                    text: 'Sólo puede eliminar la última actividad creada',
                                    showConfirmButton: true,
                                });
                            }
                        },
                        "json"
                    );
                }
            },
            "json"
        );
    });

    //-----************  Fin servicio Borrar  ********** ------------------->

    // $.get("../controller/ctrEventosPredefinidos.php?evento=get_eventos_predefinidos",
    //     function (data, textStatus, jqXHR) {
    //         document.getElementById('evento_agregar').innerHTML = data;
    //     },
    // );


});

var usu_id_tasking = $("#usu_id_tasking").val();
$(document).ready(function () { //Eventos de Tasking
    var htmlTemplate = '';
    $.post("../controller/ctrTasking/ctrUsuario.php?op_tasking=get_datos_ticket_x_usu",function (data, textStatus, jqXHR) {
        data = JSON.parse(data);
        htmlTemplate = '';

        data.forEach(elem => {
            htmlTemplate += `
            <tr>
                <td style="font-size:13px;">${elem.client_rs.toUpperCase()}</td>
                <td style="font-size:13px;">${elem.tick_titulo.toUpperCase()}</td>
                <td style="font-size:13px;">${elem.cat_nom.toUpperCase()}</td>
                <td><a style="color:orange;" data-toggle="tooltip" data-placement="top" title="Copiar Tarea" onclick="click_btn(${elem.tick_id})" type="button" value="${elem.tick_id}"><i class="ri-file-copy-fill"></a></td>
             </tr>`;
            $("#tbody_table").html(htmlTemplate);
        });
        "json"
    });
});

function click_btn(tick_id) { //Boton para copiar y pegar datos
    var btn_aux = document.createElement("input"); //Inicio evento para btn copiar
    btn_aux.setAttribute('value', tick_id);
    document.body.appendChild(btn_aux);
    btn_aux.select();
    document.execCommand("copy")
    document.body.removeChild(btn_aux); //Fin evento para btn copiar

    $.post("../controller/ctrTasking/ctrUsuario.php?op_tasking=get_datos_para_copy", {tick_id: tick_id }, function (data, textStatus, jqXHR) {
        data = JSON.parse(data);

        Toastify({
            text:  data[0].tick_titulo.toUpperCase() + ' copiado correctamente',
            duration: 1300,
            gravity: "top",
            position: "left",
            style: {
                "margin-left": "120px"
            },
            backgroundColor: "#f9a100"
        }).showToast();
    },
    );
    "json"
} click_btn();

//******************************************************************** */
//      Comienza funciones sobre usuarios de sectores distintos a EH
//******************************************************************** */
function input_valor_cliente() {
    document.getElementById("valor_cliente").addEventListener("input", function () {
        var valor_cliente = $("#valor_cliente").val();
        $.post("../controller/ctrTasking/ctrEvento.php?op_evento_tasking=get_cliente_x_palabra", { valor_cliente: valor_cliente }, function (data, textStatus, jqXHR) {
            let id_cliente = '';

            $("#horas_total").prop('disabled', false);
            $("#horas_total").val('');

            data.forEach(elem => {

                if ($("#valor_cliente").val() == '') {
                    $("#tick_titulo").val('');
                    $("#client_id").val('');
                } else {
                    $("#tick_titulo").val(elem.client_rs);
                    $("#client_id").val(elem.client_id);
                }
                return id_cliente = elem.client_id;
            });

            $.post("../controller/ctrEventos.php?accion=traer_id_event_para_agregar", { client_id: id_cliente },
                function (data, textStatus, jqXHR) {
                    console.log(data);
                    document.getElementById("event_id_eventos_continuos").value = data[0].event_id;
                    $.post("../controller/ctrEventos.php?accion=get_event_id_mas_alto_de_evento_x_usu", { client_id: id_cliente, event_id: data[0].event_id },
                        function (data, textStatus, jqXHR) {
                            if (data[0].event_id > 0 && data[0].horas_restantes > 0) {
                                $("#horas_total").val(data[0].horas_restantes)
                                $("#horas_total").attr('disabled', 'disabled');
                                $('#prod_id').attr('disabled', 'disabled');
                            }
                            else {
                                $("#horas_total").prop('disabled', false);
                                $("#horas_total").val('');
                            }
                        },
                        "json"
                    );
                },
                "json"
            );
        },
            "json"
        );
    });
}

init();