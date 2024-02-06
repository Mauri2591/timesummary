<?php
require_once '../../config/Conexion.php';
if (isset($_SESSION['usu_id']) && isset($_SERVER) && $_SERVER['REQUEST_URI'] == "/timesummary/view/Organigrama/organigrama.php") {
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
                        <h3 id="tit" class="mb-sm-0">Organigrama</h3>
                    </div>

                    <div class="card">
                        <div class="card-body">
                            <div class="sitemap-content">
                                <figure class="sitemap-horizontal">
                                    <ul class="administration">
                                        <li>
                                            <ul class="director">
                                                <li>
                                                    <a href="javascript:void(0);" class="text-center fw-semibold"><span>Gerente<span style="display: block;">Mauricio Chiabrando</span></span></a>
                                                    <ul class="subdirector">
                                                        <!-- <li><a href="javascript:void(0);" class="fw-semibold"><span>Contact Us</span></a><ul></ul></li> -->
                                                    </ul>
                                                    <ul class="departments">
                                                        <li><a href="javascript:void(0);" class="text-center fw-semibold"><span>Referente <span style="display: block;">Ariana</span></span></a></li>

                                                        <li class="department">
                                                            <a href="javascript:void(0);" class="text-center fw-semibold"><span>Etickal Hacking</span></a>
                                                            <ul>
                                                                <li><a href="javascript:void(0);"><span>Sign Up</span></a></li>
                                                                <li><a href="javascript:void(0);"><span>Login</span></a></li>
                                                                <li><a href="javascript:void(0);"><span>Profile Settings</span></a></li>
                                                                <li><a href="javascript:void(0);"><span>Modify Reservation</span></a></li>
                                                                <li><a href="javascript:void(0);"><span>Cancel Reservation</span></a></li>
                                                                <li><a href="javascript:void(0);"><span>Write Reviews</span></a></li>
                                                            </ul>
                                                        </li>

                                                        <li class="department">
                                                            <a href="javascript:void(0);" class="text-center fw-semibold"><span>SOC</span></a>
                                                            <ul>
                                                                <li><a href="javascript:void(0);"><span>Overview</span></a></li>
                                                                <li><a href="javascript:void(0);"><span>Connect Via Social Media</span></a></li>
                                                                <li><a href="javascript:void(0);"><span>Careers</span></a></li>
                                                                <li><a href="javascript:void(0);"><span>Team Members</span></a></li>
                                                                <li><a href="javascript:void(0);"><span>Policies</span></a></li>
                                                            </ul>
                                                        </li>
                                                        <li class="department">
                                                            <a href="javascript:void(0);" class="text-center fw-semibold"><span>SASE</span></a>
                                                            <ul>
                                                                <li><a href="javascript:void(0);"><span>Travel Details</span></a></li>
                                                                <li><a href="javascript:void(0);"><span>Reservation Process</span></a></li>
                                                                <li><a href="javascript:void(0);"><span>Payment Option</span></a></li>
                                                                <li><a href="javascript:void(0);"><span>Comfirmation</span></a></li>
                                                            </ul>
                                                        </li>
                                                        <li class="department">
                                                            <a href="javascript:void(0);" class="text-center fw-semibold"><span>Calidad y Procesos</span></a>
                                                            <ul>
                                                                <li><a href="javascript:void(0);"><span>Architecture</span></a></li>
                                                                <li><a href="javascript:void(0);"><span>Art</span></a></li>
                                                                <li><a href="javascript:void(0);"><span>Entertainment</span></a></li>
                                                                <li>
                                                                    <a href="javascript:void(0);"><span>History</span></a>
                                                                </li>
                                                                <li>
                                                                    <a href="javascript:void(0);"><span>Science</span></a>
                                                                </li>
                                                                <li>
                                                                    <a href="javascript:void(0);"><span>Sports</span></a>
                                                                </li>
                                                                <li>
                                                                    <a href="javascript:void(0);"><span>Music</span></a>
                                                                </li>
                                                                <li><a href="javascript:void(0);"><span>Tracking Camp</span></a></li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </figure>
                            </div>
                            <!--end sitemap-content-->
                        </div>
                        <!--end card-body-->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- container-fluid -->
    </div>

    <?php include_once '../body/index.php'; ?>

    <script src="organigrama.js"></script>

<?php
} else if ($_SERVER['REQUEST_REQUEST_URI'] != "/timesummary/view/Organigrama/organigrama.php") {
    header("Location:" . URL . "/404.php");
} else {
    header("Location:" . URL);
}
?>