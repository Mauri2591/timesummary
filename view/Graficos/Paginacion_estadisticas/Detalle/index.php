<div class="row">
    <div class="col-xl-12">
        <div class="card crm-widget">
            <div class="card-body m-0 p-0">
                <div class="row row-cols-xxl-5 row-cols-md-3 row-cols-1 g-0">

                    <div class="col">
                        <div class="mt-3 mt-md-0 py-2 px-1">
                            <h5 class="text-muted text-uppercase fs-13">Total tareas creadas<i class="ri-space-ship-line text-success float-end align-middle" style="font-size: 20px;"></i></h5>
                            <div class="d-flex align-items-center">
                                <div class="flex-shrink-0">
                                    <i class="ri-database-2-fill display-6 text-muted"></i>
                                </div>
                                <div class="flex-grow-1 ms-3">
                                    <h2 class="mb-0"><span id="total_proyectos_creados" class="counter-value"></span></h2>
                                </div>
                            </div>
                        </div>
                    </div><!-- end col -->

                    <div class="col">
                        <div class="mt-3 mt-lg-0 py-2 px-1">
                            <h5 class="text-muted text-uppercase fs-13">tareas activas <i class="ri-signal-tower-fill text-success float-end align-middle" style="font-size: 20px;"></i></h5>
                            <div class="d-flex align-items-center">
                                <div class="flex-shrink-0">
                                    <i class="ri-pulse-line display-6 text-muted"></i>
                                </div>
                                <div class="flex-grow-1 ms-3">
                                    <h2 class="mb-0"><span class="counter-value" id="proyectos_activos"></span></h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col">
                        <div class="py-2 px-1">
                            <h5 class="text-muted text-uppercase fs-13">tareas finalizadas<i class=" ri-checkbox-fill text-success float-end align-middle" style="font-size: 20px;"></i></h5>
                            <div class="d-flex align-items-center">
                                <div class="flex-shrink-0">
                                    <i class=" ri-file-cloud-line display-6 text-muted"></i>
                                </div>
                                <div class="flex-grow-1 ms-3">
                                    <h2 class="mb-0"><span id="tareas_finalizadas" class="counter-value"></span></h2>
                                </div>
                            </div>
                        </div>
                    </div><!-- end col -->

                    <div class="col">
                        <div class="py-2 px-1">
                            <h5 class="text-muted text-uppercase fs-13">TOTAL DE Actividades en curso <i class="ri-signal-tower-fill text-success float-end align-middle" style="font-size: 20px;"></i></h5>
                            <div class="d-flex align-items-center">
                                <div class="flex-shrink-0">
                                    <i class="ri-file-history-line display-6 text-muted"></i>
                                </div>
                                <div class="flex-grow-1 ms-3">
                                    <h2 class="mb-0"><span id="total_tareas_activas_en_detalle" class="counter-value"></span></h2>
                                </div>
                            </div>
                        </div>
                    </div><!-- end col -->

                    <div class="col">
                        <div class="mt-3 mt-md-0 py-2 px-1">
                            <h5 class="text-muted text-uppercase fs-13">Total actividades creadas<i class="ri-space-ship-line text-success float-end align-middle" style="font-size: 20px;"></i></h5>
                            <div class="d-flex align-items-center">
                                <div class="flex-shrink-0">
                                    <i class="ri-folder-open-line display-6 text-muted"></i>
                                </div>
                                <div class="flex-grow-1 ms-3">
                                    <h2 class="mb-0"><span id="total_tareas_creadas" class="counter-value"></span></h2>
                                </div>
                            </div>
                        </div>
                    </div><!-- end col -->
                    <div class="col">
                        <div class="mt-3 mt-lg-0 py-2 px-1">
                            <h5 class="text-muted text-uppercase fs-13">Tarea más realizada: <span id="nombre_total_tarea_mas_realiada"></span><i class=" ri-star-half-fill text-warning float-end align-middle" style="font-size: 20px;"></i></h5>
                            <div class="d-flex align-items-center">
                                <div class="flex-shrink-0">
                                    <i class="ri-trophy-line display-6 text-muted"></i>
                                </div>
                                <div class="flex-grow-1 ms-3">
                                    <h2 class="mb-0"><span class="counter-value" id="total_tarea_mas_realiada"></span></h2>
                                </div>
                            </div>
                        </div>
                    </div><!-- end col -->
                    <div class="col">
                        <div class="mt-3 mt-lg-0 py-2 px-1">
                            <h5 class="text-muted text-uppercase fs-13">Producto más vendido: <span id="nom_total_max_prod"></span><i class=" ri-star-half-fill text-warning float-end align-middle" style="font-size: 20px;"></i></h5>
                            <div class="d-flex align-items-center">
                                <div class="flex-shrink-0">
                                    <i class="ri-trophy-line display-6 text-muted"></i>
                                </div>
                                <div class="flex-grow-1 ms-3">
                                    <h2 class="mb-0"><span class="counter-value" id="total_max_prod"></span></h2>
                                </div>
                            </div>
                        </div>
                    </div><!-- end col -->
                </div><!-- end row -->
            </div><!-- end card body -->
        </div><!-- end card -->
    </div>

    <div class="col-lg-12">
        <div class="card">
            <div class="card-header" style="padding: 3px 0; background-color: #fdfdfd;">
                <h5 class="card-title mb-0 text-center p-0" style="font-size: 16px;">CONSULTE TODAS LAS TAREAS CREADAS A LA FECHA</h5>
            </div>
            <div class="card-body">
                <table id="tabla_detalle" class="table table-bordered dt-responsive nowrap table-striped align-middle dataTable no-footer dtr-inline collapsed" style="width:100%">
                    <thead>
                        <tr>
                            <th style="width: 150px; text-align: center;">Cliente</th>
                            <th style="width: 1px; text-align: center;">Hs Total</th>
                            <th style="width: 1px; text-align: center;">Hs Consumidas</th>
                            <th style="width: 1px; text-align: center;">Hs Restantes</th>
                            <th style="width: 1px; text-align: center;">Sector</th>
                            <th style="width: 1px; text-align: center;">Tarea</th>
                            <th style="width: 1px; text-align: center;">Producto</th>
                            <th style="width: 1px; text-align: center;">Estado</th>
                        </tr>
                    </thead>
                    <tbody style="text-align: center;">
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                </table>
            </div>
        </div>
    </div>
    <?php require_once 'modalDetalle.php'; ?>
</div><!--end row-->
</div>