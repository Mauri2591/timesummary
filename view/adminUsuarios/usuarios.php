<?php
require_once '../../config/Conexion.php';
require_once '../../model/Usuario.php';
require_once '../../model/Model_Tasking/UsuarioTasking.php';
$user_tasking = new Usuario_Tasking();
$user_tasking->get_datos_session_tasking($_SESSION['session_tasking']);
if (
    isset($_SESSION['usu_id']) && isset($_SESSION['usu_rol']) && $_SESSION['usu_rol'] == 2 || $_SESSION['usu_rol'] == 3
    && (isset($_SESSION['usu_sector']) && $_SESSION['usu_sector'] == 1 || $_SESSION['usu_sector'] == 2 && 
    isset($_SERVER) && $_SERVER["REQUEST_URI"] == "/timesummary/view/adminUsuarios/usuarios.php")) {
    require_once '../../view/header/index.php';
?>
    <style>
        /* Agrega un scroll vertical a la tabla */
        #container_table_usuarios {
            max-height: 400px;
            max-width: 100%;
            overflow-y: auto;
            overflow-x: auto;
        }
    </style>


    <!-- fullcalendar css -->
    <script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.9/index.global.min.js'></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <!--datatable css-->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap5.min.css" />
    <!--datatable responsive css-->
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.9/css/responsive.bootstrap.min.css" />

    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.2.2/css/buttons.dataTables.min.css">

    <div class="page-content" style="padding-bottom: 10px !important;">
        <div class="container-fluid">

            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box d-sm-flex pl-3 pt-0 pr-0 pb-2 align-items-center justify-content-between">
                        <h3 id="tit" class="mb-sm-0">Ver Usuarios <a style="color: #007bff; font-size: 24px;"><i class="ri-folder-user-line"></i></a> </h3>
                        <input id="usu_id" type="hidden" hidden value="<?php echo $_SESSION['usu_id'] ?>">
                    </div>
                </div>
            </div>

            <?php include_once '../../view/body/index.php';
            require_once 'modalUsuario.php';
            ?>
            <!-- end page title -->
            <div class="row">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-10 border p-1">
                            <div id="table" style="text-align: center;"><!-- id etiqueta del calendario -->
                                <div id="container_table_usuarios">
                                    <table id="table_usuarios" style="margin-left: 50px;">
                                        <h5 class="pb-2" style="text-align: center;">Lista de Usuarios</h5>
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Apellido</th>
                                                <th>Dni</th>
                                                <th>Email</th>
                                                <th>Sector</th>
                                                <th>Rol</th>
                                                <th>Password</th>
                                                <th>Activo</th>
                                                <!-- <th style="padding-left:20px">Accion</th> -->
                                                <!-- <th>Eliminar</th> -->
                                            </tr>
                                        </thead>
                                        <tbody id="tbody_table_mnt_Usuarios">

                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>

                        <div class="col-md-2">
                            <div class="card card-animate" style="background-color: #eff7ff;">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between">
                                        <div>
                                            <p class="fw-medium text-muted mb-0" style="font-size: 18px;">Crear Usuario</p>
                                            <!-- <p class="fw-medium text-muted mb-0">Desde aquí puedes crear nuevos Usuarios</p> -->
                                            <!-- <a data-toggle="tooltip" data-placement="top" title="  Agregar Usuario" href="#"><i style="font-size: 20px;" class=" bx bx-user-plus"></i></a> -->
                                        </div>
                                        <div>
                                            <div class="avatar-sm flex-shrink-0">
                                                <span class="avatar-title bg-soft-info rounded-circle fs-2">
                                                    <a id="nuevo_usuario" data-toggle="tooltip" data-placement="top" title="Agregar Nuevo Usuario" href="#"><i style="font-size: 20px; margin-top: 9px;" class=" bx bx-user-plus"></i></a>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div><!-- end card body -->
                            </div>
                        </div>

                        <?php
                        echo "<pre>";
                        var_dump($_SESSION);
                        echo "</pre>";
                        ?>

                    </div>
                </div>
            </div>
        </div>
        <!-- container-fluid -->
    </div>

    <script src="usuarios.js"></script>
    <script>
        $(document).ready(function() {
            var fechaActual = new Date();
            var dia = fechaActual.getDate();
            var mes = fechaActual.getMonth() + 1;
            var anio = fechaActual.getFullYear();
            var fecha = dia + '/' + mes + '/' + anio;
        })
    </script>

<?php
} else if ($_SERVER['REQUEST_URI'] != "/timesummary/view/adminUsuarios/usuarios.php") {
    ?>
    <script>alert("error")</script>
    <?php
    header("Location:" . URL . "/404.php");
} else {
    header("Location:" . URL);
}
?>