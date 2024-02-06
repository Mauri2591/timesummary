<?php
require_once '../../config/Conexion.php';
if (isset($_SESSION['usu_id']) && isset($_SERVER) && $_SERVER['REQUEST_URI'] == "/timesummary/view/HorasExtras/index.php") {
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


    <div class="page-content"><!-- Inicio de contenedores para el contenido -->
        <div class="container-fluid">

            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box d-sm-flex pl-3 pt-0 pr-0 pb-2 align-items-center justify-content-between">
                        <h3 id="tit" class="mb-sm-0">Horas Extras</h3>
                    </div>
                    <div class="container">
                        <div class="container-fluid">



                            <div class="card-body pb-0 px-4">
                                <div class="row mb-3">
                                    <div class="col-md">
                                        <div class="row align-items-center g-3">
                                            
                                            <div class="col-md">
                                                <div>
                                                    <h5 class="fw-bold mb-3"><i class="bx bxs-badge-dollar text-danger" style="font-size: 35px;"></i> Desde aquí puede ver las horas extras consumidas en el mes actual o en el histórico</h5>
                                                    <div class="hstack gap-3 flex-wrap">
                                                        <div class="vr"></div>
                                                        <div class="badge badge-outline-secondary p-1 fs-14">Desde : <span class="fw-medium"><?php $fechaActual_inicio=new DateTime(); $fechaActual_inicio->modify('first day of this month'); $primer_dia_del_mes=$fechaActual_inicio->format('Y-m-d'); echo $primer_dia_del_mes;?></span></div>
                                                        <div class="vr"></div>
                                                        <div class="badge badge-outline-secondary p-1 fs-14">Hasta : <span class="fw-medium"><?php $fechaActual_fin=new DateTime(); $fechaActual_fin->modify('last day of this month'); $ultimo_dia_del_mes=$fechaActual_fin->format('Y-m-d'); echo $ultimo_dia_del_mes;?></span></div>
                                                        <div class="vr"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <ul class="nav nav-tabs-custom border-bottom-0" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link fw-semibold active" data-bs-toggle="tab" href="#horas_extras_eh" role="tab" aria-selected="true">
                                            EH
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link fw-semibold" data-bs-toggle="tab" href="#horas_extras_soc" role="tab" aria-selected="false">
                                            SOC
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link fw-semibold" data-bs-toggle="tab" href="#horas_extras_sase" role="tab" aria-selected="false">
                                            SASE
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link fw-semibold" data-bs-toggle="tab" href="#horas_extras_calidad" role="tab" aria-selected="false">
                                            CALIDAD
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div class="row">
                                <div class="col-xl-9 col-lg-8">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="text-muted">
                                                <h6 class="mb-3 fw-semibold text-uppercase">Summary</h6>
                                                <p>It will be as simple as occidental in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their pronunciation and their most common words.</p>

                                                <ul class="ps-4 vstack gap-2">
                                                    <li>Product Design, Figma (Software), Prototype</li>
                                                    <li>Four Dashboards : Ecommerce, Analytics, Project,etc.</li>
                                                    <li>Create calendar, chat and email app pages.</li>
                                                    <li>Add authentication pages.</li>
                                                    <li>Content listing.</li>
                                                </ul>

                                                <div>
                                                    <button type="button" class="btn btn-link link-success p-0">Read more</button>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- end card body -->
                                    </div>
                                    <!-- end card -->
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

    <script src="horas_extras.js"></script>

<?php
} else if ($_SERVER['REQUEST_REQUEST_URI'] != "/timesummary/view/HorasExtras/index.php") {
    header("Location:" . URL . "/404.php");
} else {
    header("Location:" . URL);
}
?>