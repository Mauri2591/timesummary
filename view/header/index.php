<!doctype html>
<html lang="es" data-layout="vertical" data-topbar="light" data-sidebar="dark" data-sidebar-size="sm" data-sidebar-image="none">

<head>

    <meta charset="utf-8" />
    <title>Starter | Velzon - Admin & Dashboard Template</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="Premium Multipurpose Admin & Dashboard Template" name="description" />
    <meta content="Themesbrand" name="author" />

    <!-- Bootstrap Css -->
    <link href="<?php echo URL; ?>/public/velzon/assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />

    <link rel="stylesheet" href="<?php echo URL; ?>/public/css/dataTables.css">

    <link rel="stylesheet" href="<?php echo URL; ?>/public/clockpicker/dist/bootstrap-clockpicker.min.css">

    <!-- Icons Css -->
    <link href="<?php echo URL; ?>/public/velzon/assets/css/icons.min.css" rel="stylesheet" type="text/css" />

    <!-- App Css-->
    <link href="<?php echo URL; ?>/public/velzon/assets/css/app.min.css" rel="stylesheet" type="text/css" />

    <!-- custom Css-->
    <link href="<?php echo URL; ?>/public/velzon/assets/css/custom.min.css" rel="stylesheet" type="text/css" />

    <!-- Sweet Alert css-->
    <link href="<?php echo URL; ?>/public/velzon/assets/libs/sweetalert2/sweetalert2.min.css" rel="stylesheet" type="text/css" />

    <!-- App favicon -->
    <link rel="shortcut icon" href="<?php echo URL; ?>/public/velzon/assets/images/favicon.ico">

    <!-- jsvectormap css -->
    <link href="<?php echo URL; ?>/public/velzon/assets/libs/jsvectormap/css/jsvectormap.min.css" rel="stylesheet" type="text/css" />

    <!--Swiper slider css-->
    <link href="<?php echo URL; ?>/public/velzon/assets/libs/swiper/swiper-bundle.min.css" rel="stylesheet" type="text/css" />

    <!--Toastr css-->
    <link href="<?php echo URL; ?>/public/toastr/toastr.min.css" rel="stylesheet" type="text/css" />






</head>

<body>

    <!-- Begin page -->
    <div id="layout-wrapper">

        <header id="page-topbar">
            <div class="layout-width">
                <div class="navbar-header">
                    <div class="d-flex">
                        <!-- LOGO -->
                        <div class="navbar-brand-box horizontal-logo">
                            <a href="<?php echo URL; ?>/view/calendario.php" class="logo logo-dark">
                                <span class="logo-sm">
                                    <img src="<?php echo URL; ?>/public/velzon/assets/images/logo-sm.png" alt="" height="22">
                                </span>
                                <span class="logo-lg">
                                    <img src="<?php echo URL; ?>/public/velzon/assets/images/logo-dark.png" alt="" height="17">
                                </span>
                            </a>

                            <a href="<?php echo URL; ?>/view/calendario.php" class="logo logo-light">
                                <span class="logo-sm">
                                    <img src="<?php echo URL; ?>/public/velzon/assets/images/logo-sm.png" alt="" height="22">
                                </span>
                                <span class="logo-lg">
                                    <img src="<?php echo URL; ?>/public/velzon/assets/images/logo-light.png" alt="" height="17">
                                </span>
                            </a>
                        </div>

                        <button type="button" class="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger" id="topnav-hamburger-icon">
                            <span class="hamburger-icon">
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </button>
                    </div>

                    <div class="d-flex align-items-center">

                        <div class="dropdown d-md-none topbar-head-dropdown header-item">
                            <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" id="page-header-search-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="bx bx-search fs-22"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-search-dropdown">
                                <form class="p-3">
                                    <div class="form-group m-0">
                                        <div class="input-group">
                                            <input type="text" class="form-control" placeholder="Search ..." aria-label="Recipient's username">
                                            <button class="btn btn-primary" type="submit"><i class="mdi mdi-magnify"></i></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div class="dropdown ms-sm-3 header-item topbar-user">
                            <button type="button" class="btn" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="d-flex align-items-center">
                                    <img class="rounded-circle header-profile-user" src="<?php echo URL; ?>/public/img/users.png" alt="Header Avatar">
                                    <span class="text-start ms-xl-2">
                                        <span class="d-none d-xl-inline-block ms-1 fw-medium user-name-text"><?php echo $_SESSION['usu_nom'] . " " . $_SESSION['usu_ape']; ?></span>
                                    </span>
                                </span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end">
                                <!-- item-->
                                <a class="dropdown-item" href="<?php echo URL; ?>/view/Config/config.php"><i class="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i> <span class="align-middle">Config</span></a>
                                <a class="dropdown-item" href="<?php echo URL; ?>/view/logout/"><i class="mdi mdi-exit-to-app text-muted fs-16 align-middle me-1"></i> <span class="align-middle">Salir</span></a>
                                <div class="dropdown-divider">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <!-- ========== App Menu ========== -->
        <div class="app-menu navbar-menu">
            <!-- LOGO -->
            <div class="navbar-brand-box mt-3">
                <!-- Dark Logo-->
                <a href="<?php echo URL; ?>/view/calendario.php" class="logo logo-dark">
                    <span class="logo-sm">
                        <img src="<?php echo URL; ?>/public/img/ubiquo_foco.jpg" alt="" height="50">
                    </span>
                    <span class="logo-lg">
                        <img src="<?php echo URL; ?>/public/img/ubiquo_foco.jpg" alt="" height="100">
                    </span>
                </a>
                <!-- Light Logo-->
                <a href="<?php echo URL; ?>/view/calendario.php" class="logo logo-light">
                    <span class="logo-sm">
                        <img src="<?php echo URL; ?>/public/img/ubiquo_foco.jpg" alt="" height="50">
                    </span>
                    <span class="logo-lg">
                        <img src="<?php echo URL; ?>/public/img/ubiquo_foco.jpg" alt="" height="100">
                    </span>
                </a>
                <button type="button" class="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover">
                    <i class="ri-record-circle-line"></i>
                </button>
            </div>

            <div id="scrollbar">
                <div class="container-fluid mt-5">

                    <div id="two-column-menu">
                    </div>
                    <ul class="navbar-nav" id="navbar-nav">

                        <li class="nav-item">
                            <a class="nav-link menu-link" href="#sidebarApps" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarApps">
                                <i class="ri-layout-3-line"></i> <span data-key="t-apps">Apps</span>
                            </a>
                            <div class="collapse menu-dropdown" id="sidebarApps">
                                <ul class="nav nav-sm flex-column">
                                    <li class="nav-item">
                                        <a href="<?php echo URL; ?>/view/calendario.php" class="nav-link" data-key="t-chat"> Calendario </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="<?php echo URL; ?>/view/Graficos/graficos.php" class="nav-link" data-key="t-chat"> Estadística </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="<?php echo URL; ?>/view/Organigrama/organigrama.php" class="nav-link" data-key="t-calendar"> Organigrama </a>
                                    </li>
                                    <?php if(isset($_SESSION) && $_SESSION['usu_sector'] == 2){?>
                                    <li class="nav-item">
                                        <a href="<?php echo URL; ?>/view/HorasExtras/index.php" class="nav-link" data-key="t-calendar"> Horas Extras </a>
                                    </li>
                                    <?php } ?>
                                </ul>
                            </div>
                        </li>
                        <?php if (
                            isset($_SESSION['usu_rol']) && $_SESSION['usu_rol'] == 2 || $_SESSION['usu_rol'] == 3
                            && (isset($_SESSION['usu_sector']) && $_SESSION['usu_sector'] == 1 || $_SESSION['usu_sector'] == 2)) 
                            { ?>
                            <li class="nav-item">
                                <a class="nav-link menu-link" href="#sidebarApps" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarApps">
                                    <i class=" ri-admin-fill"></i> <span data-key="t-apps">Administrar Usuarios</span>
                                </a>
                                <div class="collapse menu-dropdown" id="sidebarApps">
                                    <ul class="nav nav-sm flex-column">
                                    <li class="nav-item">
                                            <a href="<?php echo URL; ?>/view/adminUsuarios/usuarios.php" class="nav-link" data-key="t-calendar">CRUD Usuarios</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        <?php } ?>
                    </ul>
                </div>
                <!-- Sidebar -->
            </div>
            <div class="sidebar-background"></div>
        </div>
        <!-- Left Sidebar End -->
        <!-- Vertical Overlay-->
        <div class="vertical-overlay"></div>

        <!-- ============================================================== -->
        <!-- Start right Content here -->
        <!-- ============================================================== -->
        <div class="main-content">