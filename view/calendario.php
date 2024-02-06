<?php
require_once '../config/Conexion.php';
require_once '../model/Usuario.php';
if (isset($_SESSION['usu_id']) && isset($_SERVER) && $_SERVER["REQUEST_URI"] == "/timesummary/view/calendario.php") {

    require_once '../model/Model_Tasking/UsuarioTasking.php';
    $user_tasking = new Usuario_Tasking();
    $user_tasking->get_datos_session_tasking($_SESSION['session_tasking']);
    require_once 'header/index.php';
?>


    <!-- fullcalendar css -->
    <script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.9/index.global.min.js'></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <!--datatable css-->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap5.min.css" />
    <!--datatable responsive css-->
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.9/css/responsive.bootstrap.min.css" />

    <link rel="stylesheet" href="../public/css/styleCalendario.css">

    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.2.2/css/buttons.dataTables.min.css">

    <style>

    </style>

    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php if (isset($_SESSION['ts_session'])) { ?>
                <input type="hidden" id="usu_id_tasking" hidden value="<?php echo $_SESSION['usu_id_tasking']; ?>">

                <div class="row">
                    <div class="col-12">
                        <div class="page-title-box d-sm-flex pl-3 pt-0 pr-0 pb-2 align-items-center justify-content-between">
                            <h3 id="tit" class="mb-sm-0">Calendario</h3>
                            <div id="listaeventospredefinidos">

                            </div>
                        </div>
                    </div>
                </div>
                <!-- end page title -->
                <div class="row">
                    <div class="col-md-9">
                        <div id="calendar"><!-- id etiqueta del calendario -->
                        </div>
                    </div>

                    <div class="col-md-3" style="margin-top: 63px;">
                        <div class="card table_tareas">

                            <input id="usu_id" type="hidden" hidden value="<?php echo $_SESSION['usu_id'] ?>">
                            <input type="hidden" hidden id="usu_id_tasking" value="<?php echo $_SESSION['usu_id_tasking'] ?>">

                            <table id="table_tareas" class="display" style="text-align: center;">
                                <thead style="background-color: #e9ecef; height: 42px;">
                                    <tr>
                                        <th class="tr_table">Cliente</th>
                                        <th class="tr_table">Título</th>
                                        <th class="tr_table">Producto</th>
                                        <th class="tr_table"></th>
                                    </tr>
                                </thead>
                                <tbody id="tbody_table">
                                </tbody>
                            </table>
                        </div>
                    </div>
                <?php } else {
                ?>
                    <!-- <input type="hidden" id="usu_id_tasking" hidden value="0"> -->
                    <!-- <input type="text" id="usu_id_tasking" value="<?php echo $_SESSION['usu_id_tasking'] ?>"> -->
                    <input id="usu_id" type="hidden" hidden value="<?php echo $_SESSION['usu_id'] ?>">

                    <div class="row">
                        <div class="col-12">
                            <div class="page-title-box d-sm-flex pl-3 pt-0 pr-0 pb-2 align-items-center justify-content-between">
                                <h3 id="tit" class="mb-sm-0">Calendario</h3>
                                <div id="listaeventospredefinidos">

                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- end page title -->
                    <div class="row">
                        <div class="col-md-12">
                            <div id="calendar"><!-- id etiqueta del calendario -->

                            </div>
                        </div>
                    <?php
                } ?>
                    <input type="hidden" hidden id="usu_sector" value="<?php echo $_SESSION['usu_sector'] ?>">

                    <?php
                    echo "<pre>";
                    var_dump($_SESSION);
                    echo "</pre>";
                    ?>
                    <input type="hidden" hidden value="<?php echo $_SESSION['usu_nacimiento'] ?>" id="usu_nacimiento">

                    </div>

                </div>
                <!-- container-fluid -->
        </div>

        <?php include_once 'body/index.php'; ?>
        <?php if ($_SESSION['usu_sector'] == 1 || $_SESSION['usu_sector'] == 2 || $_SESSION['usu_sector'] == 3 || $_SESSION['usu_sector'] == 4 || $_SESSION['usu_sector'] == 5) { ?>

            <!-- Modal (Agregar, Modificar,Eliminar)-->
            <div class="modal fade" id="FormularioEventos" tabindex="-1" aria-labelledby="exampleModalLabel" role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header" id="modal_principal">
                            <h5 class="modal-title" id="exampleModalLabel">Agregar Tarea</h5>
                            <input type="hidden" hidden id="validar_si_existe_un_primer_evento_en_ts_evento">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div id="descripEvent">
                                <div class="row">
                                    <div class="col-md-12 mb-3">

                                        <input type="hidden" id="event_id" value="" hidden>
                                        <input type="hidden" id="id" value="" hidden>
                                        <input type="hidden" hidden id="event_id_eventos_continuos">


                                        <div class="row align-items-center">
                                            <div class="col-2" style="padding-left: 10px; padding-right: 0;">
                                                <label for="title" id="title_pegar" class="col-form-label">Pegar</label>
                                            </div>
                                            <div class="col-3" style="padding: 0 !important">
                                                <input type="text" style="height: 30px; margin-bottom: 5px;" required id="id_ticket" placeholder="#######" name="id_ticket" class="form-control input-sm">
                                                <div class="invalid-feedback">Ingrese n° de servicio</div>
                                            </div>

                                            <div class="col-2">
                                                <label for="title" class="col-form-label">Cliente</label>
                                            </div>
                                            <div class="col-5">
                                                <input type="text" style="height: 30px; margin-bottom: 5px;" id="client_id" name="client_id" class="form-control input-sm">
                                            </div>
                                        </div>

                                        <div class="row align-items-center mb-2"><!--Combo option Producto -->
                                            <div class="col-6">
                                                <label for="basic-url">Producto</label>
                                                <select id="prod_id" style="font-size: 13px;" name="prod_id" class="form-select form-select-sm" aria-label=".form-select-sm example">

                                                </select>
                                            </div>
                                            <div class="col-6">
                                                <label for="basic-url">Tarea</label><!-- Combo option Tarea -->
                                                <select id="tarea_id" style="font-size: 13px;" name="tarea_id" class="form-select form-select-sm" aria-label=".form-select-sm example">

                                                </select>
                                            </div>
                                        </div>

                                        <div class="row align-items-center mb-2">
                                            <div class="col-3">
                                                <label for="title" class="col-form-label">Cliente</label>
                                            </div>
                                            <div class="col-9">
                                                <input type="text" style="height: 30px;" id="client_nom" required name="client_nom" class="form-control" aria-describedby="passwordHelpInline">
                                                <!-- <div class="invalid-feedback">Ingrese título</div> -->

                                            </div>
                                        </div>

                                        <div class="row align-items-center">
                                            <div class="col-2" style="padding-left: 10px; padding-right: 0;">
                                                <label for="title" id="title_pegar" class="col-form-label">Total hs</label>
                                            </div>
                                            <div class="col-2" style="padding: 0 !important">
                                                <input type="text" style="height: 30px; margin-bottom: 5px;" required id="horas_total" name="horas_total" class="form-control input-sm">
                                            </div>

                                            <div class="col-2 pr-2" style="text-align: right;">
                                                <label for="title" class="col-form-label">Restan</label>
                                            </div>
                                            <div class="col-2 pl-0 pr-0">
                                                <input type="text" style="height: 30px; margin-bottom: 5px;" readonly id="horas_restantes" class="form-control input-sm">
                                            </div>

                                            <div class="col-2 pl-1" style="text-align: right;">
                                                <label for="title" class="col-form-label">Consumidas</label>
                                            </div>
                                            <div class="col-2">
                                                <input type="text" style="height: 30px; margin-bottom: 5px;" readonly id="horas_consumidas" class="form-control input-sm">
                                            </div>
                                        </div>

                                        <div class="row align-items-center mb-1">
                                            <div class="col-3">
                                                <label for="start" class="col-form-label">Fecha Inicio</label>
                                            </div>
                                            <div class="col-9">
                                                <input type="date" style="height: 30px; margin-bottom: 5px;" id="fech_ini" name="fech_ini" class="form-control" aria-describedby="passwordHelpInline">
                                            </div>
                                        </div>

                                        <div class="row align-items-center mb-1" id="TituloHoraInicio">
                                            <div class="col-3">
                                                <label for="start" class="col-form-label">Hora inicio</label>
                                            </div>
                                            <div class="col-9 clockpicker" data-autoclose="true">
                                                <input type="text" style="height: 30px; margin-bottom: 5px;" required name="hora_ini" id="hora_ini" autocomplete="off" class="form-control" aria-describedby="passwordHelpInline">
                                            </div>
                                        </div>

                                        <div class="row align-items-center mb-1">
                                            <div class="col-3">
                                                <label for="start" class="col-form-label">Fecha fin</label>
                                            </div>
                                            <div class="col-9">
                                                <input type="date" style="height: 30px; margin-bottom: 5px;" id="fech_fin" class="form-control" aria-describedby="passwordHelpInline">
                                            </div>
                                        </div>

                                        <div class="row align-items-center mb-1" id="TituloHoraFin">
                                            <div class="col-3">
                                                <label for="start" class="col-form-label">Hora fin</label>
                                            </div>
                                            <div class="col-9 clockpicker" data-autoclose="true">
                                                <input type="text" style="height: 30px; margin-bottom: 5px;" required id="hora_fin" name="fech_ini" class="form-control" aria-describedby="passwordHelpInline">
                                            </div>
                                        </div>

                                        <div class="form-row">
                                            <label for="Descripción:">Descipción:</label>
                                            <textarea class="form-control" id="event_descrip" name="event_descrip" id="Descripcion" rows=""></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-end">
                                <div class="btn-group">
                                    <button type="button" id="BotonAgregar" style="width:85px; height:30px; background-color:#405189 !important; border:#405189 !important" class="btn btn-primary btn-sm"><i class="ri-add-box-fill"></i> Agregar</button>
                                    <button type="button" id="BotonModificar" style="width:85px; height:30px;" class="btn btn-sm btn-success"><i class="ri-edit-box-fill"></i> Guardar</button>
                                    <button type="button" id="BotonBorrar" style="width:85px; height:30px;" class="btn btn-sm btn-danger"><i class="ri-file-excel-2-fill"></i> Borrar</button>
                                    <button type="button" id="BotonAgregar" style="width:85px; height:30px;" class="btn btn-sm btn-light" data-bs-dismiss="modal">Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> <!-- Final Modal (Agregar, Modificar,Eliminar)-->

        <?php } else { ?>

            <input type="hidden" id="event_id" value="" hidden>
            <input type="hidden" id="id" value="" hidden>

            <input type="hidden" id="usu_id_tasking" hidden value="0">

            <!-- Inicio Modal para sectores diferentes a EH -->
            <div class="modal fade" id="FormularioEventos" tabindex="-1" aria-labelledby="exampleModalLabel" role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header" id="modal_principal">
                            <h5 class="modal-title" id="exampleModalLabel">Agregar Tarea</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div id="descripEvent">
                                <div class="row">
                                    <div class="col-md-12 mb-3">

                                        <input type="text" id="event_id_eventos_continuos">


                                        <div class="row align-items-center">
                                            <div class="col-4 ml-3" style="padding: 0 !important">
                                                <input type="text" style="height: 30px; margin-bottom: 5px;" required id="valor_cliente" placeholder="Ingrese Cliente" class="form-control input-sm">
                                            </div>

                                            <input type="hidden" hidden style="height: 30px; margin-bottom: 5px;" id="client_id" name="client_id" class="form-control input-sm">

                                            <div class="col-7">
                                                <input type="text" style="height: 30px; margin-bottom: 5px;" id="tick_titulo" readonly name="tick_titulo" class="form-control input-sm">
                                            </div>
                                        </div>

                                        <div class="row align-items-center mb-2"><!--Combo option Producto -->
                                            <div class="col-6">
                                                <label for="basic-url">Producto</label>
                                                <select id="prod_id" style="font-size: 13px;" name="prod_id" class="form-select form-select-sm" aria-label=".form-select-sm example">

                                                </select>
                                            </div>
                                            <div class="col-6">
                                                <label for="basic-url">Tarea</label><!-- Combo option Tarea -->
                                                <select id="tarea_id" style="font-size: 13px;" name="tarea_id" class="form-select form-select-sm" aria-label=".form-select-sm example">

                                                </select>
                                            </div>
                                        </div>

                                        <div class="row align-items-center">
                                            <div class="col-2" style="padding-left: 10px; padding-right: 0;">
                                                <label for="title" id="title_pegar" class="col-form-label">Total hs</label>
                                            </div>
                                            <div class="col-2" style="padding: 0 !important">
                                                <input type="text" style="height: 30px; margin-bottom: 5px;" required id="horas_total" name="horas_total" class="form-control input-sm">
                                            </div>

                                            <div class="col-2 pr-2" style="text-align: right;">
                                                <label for="title" class="col-form-label">Restan</label>
                                            </div>
                                            <div class="col-2 pl-0 pr-0">
                                                <input type="text" style="height: 30px; margin-bottom: 5px;" disabled id="horas_restantes" name="horas_restantes" class="form-control input-sm">
                                            </div>

                                            <div class="col-2 pl-1" style="text-align: right;">
                                                <label for="title" class="col-form-label">Consumidas</label>
                                            </div>
                                            <div class="col-2">
                                                <input type="text" style="height: 30px; margin-bottom: 5px;" disabled id="horas_consumidas" name="horas_consumidas" class="form-control input-sm">
                                            </div>
                                        </div>

                                        <div class="row align-items-center mb-1">
                                            <div class="col-3">
                                                <label for="start" class="col-form-label">Fecha Inicio</label>
                                            </div>
                                            <div class="col-9">
                                                <input type="date" style="height: 30px; margin-bottom: 5px;" id="fech_ini" name="fech_ini" class="form-control" aria-describedby="passwordHelpInline">
                                            </div>
                                        </div>

                                        <div class="row align-items-center mb-1" id="TituloHoraInicio">
                                            <div class="col-3">
                                                <label for="start" class="col-form-label">Hora inicio</label>
                                            </div>
                                            <div class="col-9 clockpicker" data-autoclose="true">
                                                <input type="text" style="height: 30px; margin-bottom: 5px;" required id="hora_ini" autocomplete="off" class="form-control" aria-describedby="passwordHelpInline">
                                            </div>
                                        </div>

                                        <div class="row align-items-center mb-1">
                                            <div class="col-3">
                                                <label for="start" class="col-form-label">Fecha fin</label>
                                            </div>
                                            <div class="col-9">
                                                <input type="date" style="height: 30px; margin-bottom: 5px;" id="fech_fin" class="form-control" aria-describedby="passwordHelpInline">
                                            </div>
                                        </div>

                                        <div class="row align-items-center mb-1" id="TituloHoraFin">
                                            <div class="col-3">
                                                <label for="start" class="col-form-label">Hora fin</label>
                                            </div>
                                            <div class="col-9 clockpicker" data-autoclose="true">
                                                <input type="text" style="height: 30px; margin-bottom: 5px;" required id="hora_fin" class="form-control" aria-describedby="passwordHelpInline">
                                            </div>
                                        </div>

                                        <div class="form-row">
                                            <label for="Descripción:">Descipción:</label>
                                            <textarea class="form-control" id="event_descrip" name="event_descrip" id="Descripcion" rows=""></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-end">
                                <div class="btn-group">
                                    <button type="button" id="BotonAgregarUserDiferentesEh" style="width:85px; height:30px; background-color:#405189 !important; border:#405189 !important" class="btn btn-primary btn-sm"><i class="ri-add-box-fill"></i> Agregar</button>
                                    <button type="button" id="BotonModificarUserDiferentesEh" style="width:85px; height:30px;" class="btn btn-sm btn-success"><i class="ri-edit-box-fill"></i> Guardar</button>
                                    <button type="button" id="BotonBorrarUserDiferentesEh" style="width:85px; height:30px;" class="btn btn-sm btn-danger"><i class="ri-file-excel-2-fill"></i> Borrar</button>
                                    <button type="button" id="BotonAgregarUserDiferentesEh" style="width:85px; height:30px;" class="btn btn-sm btn-light" data-bs-dismiss="modal">Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> <!-- Final Modal para sectores diferentes a EH (Agregar, Modificar,Eliminar)-->

        <?php }; ?>

        <script src="calendario.js"></script>

        <script>
            var fechaActual = new Date();
            var dia = fechaActual.getDate().toString().padStart(2, '0');
            var mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
            var fecha_cumpleaños = dia + '/' + mes;

            if ($("#usu_nacimiento").val().split('/')[0] == fecha_cumpleaños.split('/')[0] && $("#usu_nacimiento").val().split('/')[1] == fecha_cumpleaños.split('/')[1]) {
                setTimeout(() => {
                    Swal.fire({
                        title: "¡Feliz cumpleaños <?php echo $_SESSION['cumpleanios']; ?>!",
                        text: "Te desea todo Teco",
                        timer: 1500,
                        showCancelButton: false,
                        showConfirmButton: false
                    });
                }, 1500);
            }

            Toastify({
                text: '<?php echo ($_SESSION['mje']) . " " . $_SESSION['usu_nom'] ?>',
                duration: 1500,
                gravity: "top",
                position: "center",
                stopOnFocus: true,
                style: {
                    "margin-top": "10px",
                    "font-size": "20px",
                    "box-shadow": "0px 10px 23px 4px rgba(0,0,0,0.66)"
                },
                backgroundColor: "#689dff"
            }).showToast();
        </script>



    <?php
    unset($_SESSION['mje']);
} else if ($_SERVER['REQUEST_URI'] != "/timesummary/view/calendario.php") {
    header("Location:" . URL . "/404.php");
} else {
    header("Location:" . URL);
}
    ?>