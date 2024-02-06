<?php
require_once '../../config/Conexion.php';
if (isset($_SESSION['usu_id']) && isset($_SERVER) && $_SERVER["REQUEST_URI"] == "/timesummary/view/Config/config.php") {
    require_once '../header/index.php';
?>


    <!-- fullcalendar css -->
    <script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.9/index.global.min.js'></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <!--datatable css-->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap5.min.css" />
    <!--datatable responsive css-->
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.9/css/responsive.bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.2.2/css/buttons.dataTables.min.css">


    <div class="page-content">
        <div class="container-fluid">

            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h3 id="tit" class="mb-sm-0">Panel de Usuario <a style="color: #007bff; font-size: 22px;"><i class="ri-tools-fill"></i></a> </h3>
                    </div>

                    En desarrollo...
                    <input type="hidden" hidden id="usu_id" value="<?php echo $_SESSION['usu_id'];?>">
                    <input type="hidden" hidden id="usu_sector" value="<?php echo $_SESSION['usu_sector'];?>
">
                    <div class="row">
                        <div class="col-md-6 border" id="contUsuario">
                            <div class="card-body">
                                <h4 class="card-title mb-3">Información del Usuario 
                                <!-- <a data-toggle="tooltip" data-placement="top" title="  agregar información" style="color:#007bff" type="button" id="btnAgregarInfo"  on="agregarInfo()"><i class="ri-add-box-fill"></i></a> -->
                                <a data-toggle="tooltip" data-placement="top" title="  editar esta información" style="color:#28a745;" type="button" id="btnEditarInfo"><i style="font-size: 19px;" class="ri-file-edit-fill"></i></a>
                                </h4>
                                <div class="table-responsive">
                                    <table id="tabla_usuarios" class="table table-borderless mb-0">
                                        <tbody>
                                            <tr>
                                                <th class="p-2" scope="row">Nombre:</th>
                                                <td class="text-muted p-2" id="usu_nom"></td>
                                            </tr>
                                            <tr>
                                                <th class="p-2" scope="row">Apellido:</th>
                                                <td class="text-muted p-2" id="usu_ape"></td>
                                            </tr>
                                            <tr>
                                                <th class="p-2" scope="row">Dni:</th>
                                                <td class="text-muted p-2" id="usu_dni"></td>
                                            </tr>
                                            <tr>
                                                <th class="p-2" scope="row">E-mail :</th>
                                                <td class="text-muted p-2" id="usu_email"></td>
                                            </tr>
                                            <tr>
                                                <th class="p-2" scope="row">Password :</th>
                                                <td class="text-muted p-2" id="usu_pass"></td>
                                            </tr>
                                            <tr>
                                                <th class="p-2" scope="row">Celular :</th>
                                                <td class="text-muted p-2" id="usu_celular"></td>
                                            </tr>
                                            <tr>
                                                <th class="p-2" scope="row">Dirección :</th>
                                                <td class="text-muted p-2" id="usu_direccion"></td>
                                            </tr>
                                            <tr>
                                                <th class="p-2 mb-5" scope="row">Nacimiento:</th>
                                                <td class="text-muted p-2 mb-5" id="usu_nacimiento"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <!-- <div class="col-md-3 text-center">
                            <div class="card-body">
                                <h4 class="card-title mb-4 text-center">Certificaciones
                                <a data-toggle="tooltip" data-placement="top" title="  Agregar nueva certificación" style="color:#007bff" type="button"  id="btnAgregarCertificacion"><i style="font-size: 19px;" class="ri-add-box-fill"></i></a>
                                <a data-toggle="tooltip" data-placement="top" title="  Editar Certificación" style="color:#28a745" type="button" id="btnEditarCertificacion"><i style="font-size: 19px;" class="ri-file-edit-fill"></i></a>                                
                                <a data-toggle="tooltip" data-placement="top" title="  Eliminar una Certificación" style="color:#ff0000" type="button"  id="btnEliminarCertificacion"><i style="font-size: 19px;" class="ri-delete-bin-5-fill"></i></a>                                
                            </h4>
                                <div class="d-flex flex-wrap gap-2 fs-15" id="cont_certificaciones">
                                    <a href="javascript:void(0);" class="badge badge-soft-primary">Photoshop</a>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3 text-center">
                            <div class="card-body">
                                <h4 class="card-title mb-4">Habilidades
                                <a data-toggle="tooltip" data-placement="top" title="Agregar nueva habilidad" style="color:#007bff" type="button" id="btnAgregarHabilidad"><i style="font-size: 19px;" class="ri-add-box-fill"></i></a>
                                <a data-toggle="tooltip" data-placement="top" title="Editar habilidad" style="color:#28a745" type="button" id="btnEditarHabilidad"><i style="font-size: 19px;" class="ri-file-edit-fill"></i></a>                                
                                <a data-toggle="tooltip" data-placement="top" title="Eliminar una habilidad" style="color:#ff0000" type="button" id="btnEliminarHabilidad"><i style="font-size: 19px;" class="ri-delete-bin-5-fill"></i></a>
                                </h4>                                
                                <div class="d-flex flex-wrap gap-2 fs-15" id="cont_habilidades">
                                    <a href="javascript:void(0);" class="badge badge-soft-primary">Photoshop</a>
                                </div>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>

    </div>
    <!-- container-fluid -->
    </div>

    <?php 
    include_once '../body/index.php'; 
    require_once 'modalConfig.php';
    ?>

    <script src="main.js"></script>

<?php
}else if($_SERVER['REQUEST_REQUEST_URI'] != "/timesummary/view/Config/config.php"){
    header("Location:".URL."/404.php");
} else {
    header("Location:" . URL);
}
?>