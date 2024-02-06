
<?php
require_once '../../config/Conexion.php';
if (
    isset($_SESSION['usu_id']) && isset($_SERVER) &&
    $_SERVER["REQUEST_URI"] == "/timesummary/view/Graficos/graficos.php"
) {
    require_once '../header/index.php';
?>

    <!--datatable css-->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap5.min.css" />
    <!--datatable responsive css-->
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.9/css/responsive.bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.2.2/css/buttons.dataTables.min.css">


    <!-- fullcalendar css -->
    <script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.9/index.global.min.js'></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    

    <div class="page-content"><!-- Inicio de contenedores para el contenido -->
        <div class="container-fluid">
            <div class="page-title-box d-sm-flex pl-3 pt-0 pr-0 pb-0 align-items-center justify-content-between">
                <h3 id="tit" class="mb-sm-0">Estadística</h3>
            </div>
            <!-- start page title -->
            <div class="row">
                <div class="col-md-12 d-flex">

                    <div class="card-body">
                        <ul class="nav nav-tabs nav-justified mb-3" role="tablist">
                            <li class="nav-item active" id="clickBtnPaginaProductos">
                                <a class="nav-link" data-bs-toggle="tab" href="#pagina_productos" role="tab" aria-selected="false">
                                    Tareas <i class="ri-bar-chart-2-fill ml-1 text-primary" style="font-size: 20px;"></i>
                                </a>
                            </li>
                            <li class="nav-item active" id="clickBtnPaginaTareas">
                                <a class="nav-link" data-bs-toggle="tab" href="#pagina_tareas" role="tab" aria-selected="false">
                                    Actividades <i class=" ri-edit-box-fill ml-1" style="color: #52639c; font-size: 20px;"></i>
                                </a>
                            </li>
                            <li class="nav-item active" id="clickBtnPaginaDetalle">
                                <a class="nav-link" data-bs-toggle="tab" href="#pagina_detalle" role="tab" aria-selected="false">
                                    Detalle<i class="ri-file-copy-2-fill text-success ml-1" style="font-size: 20px;"></i>
                                </a>
                            </li>
                        </ul>

                        <!-- Tab panes -->
                        <div class="tab-content text-muted">

                            <div class="tab-pane active" id="pagina_productos" role="tabpanel">
                                <?php include '../Graficos/Paginacion_estadisticas/Productos/index.php'; ?>
                            </div>

                            <div class="tab-pane active" id="pagina_tareas" role="tabpanel">
                                <?php include '../Graficos/Paginacion_estadisticas/Tareas/index.php'; ?>
                            </div>

                            <div class="tab-pane active" id="pagina_detalle" role="tabpanel">
                                <?php include '../Graficos/Paginacion_estadisticas/Detalle/index.php'; ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </div>
    <!-- container-fluid -->
    </div>

    <?php include_once '../body/index.php'; ?>

    <script src="../../public/velzon/assets/js/pages/datatables.init.js"></script>

    <!--datatable js-->
    <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/dataTables.bootstrap5.min.js"></script>
    <script src="https://cdn.datatables.net/responsive/2.2.9/js/dataTables.responsive.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.2.2/js/dataTables.buttons.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.2.2/js/buttons.print.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.2.2/js/buttons.html5.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>


    <script src="grafico.js"></script>

    <script src="Paginacion_estadisticas/Productos/productos.js"></script>
    <script src="Paginacion_estadisticas/Tareas/tareas.js"></script>
    <script src="Paginacion_estadisticas/Detalle/detalle.js"></script>


<?php
} else if ($_SERVER['REQUEST_URI'] != "/timesummary/view/Graficos/graficos.php") {
    header("Location:" . URL . "/404.php");
} else {
    header("Location:" . URL);
}
?>