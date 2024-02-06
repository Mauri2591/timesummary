<style>
#cont_tareas_act_x_cliente {
  width: 300px; /* Puedes ajustar el ancho según tus necesidades */
  height: 500px; /* Puedes ajustar la altura según tus necesidades */
  overflow: auto; /* Agrega un scroll automáticamente cuando sea necesario */
}
</style>
<div class="row">

    <div class="col-xl-12">
        <div class="card crm-widget">
            <div class="card-body p-0">
                <div class="row row-cols-xxl-5 row-cols-md-3 row-cols-1 g-0">

                    <div class="col">
                        <div class="py-2 px-1" style="background-color: #fdfdfd;">
                            <h5 class="text-muted text-uppercase fs-13">TOTAL DE TAREAS EN CURSO <i class="ri-signal-tower-fill text-success float-end align-middle" style="font-size: 20px;"></i></h5>
                            <div class="d-flex align-items-center">
                                <div class="flex-shrink-0">
                                    <i class="ri-file-history-line display-6 text-muted"></i>
                                </div>
                                <div class="flex-grow-1 ms-3">
                                    <h2 class="mb-0"><span id="total_tareas_activas_en_curso" class="counter-value"></span></h2>
                                </div>
                            </div>
                        </div>
                    </div><!-- end col -->
                    <div class="col">
                        <div class="py-2 px-1" style="background-color: #fdfdfd;">
                            <h5 class="text-muted text-uppercase fs-13">TOTAL DE ACTIVIDADES EN CURSO <i class="ri-signal-tower-fill text-success float-end align-middle" style="font-size: 20px;"></i></h5>
                            <div class="d-flex align-items-center">
                                <div class="flex-shrink-0">
                                    <i class="ri-file-history-line display-6 text-muted"></i>
                                </div>
                                <div class="flex-grow-1 ms-3">
                                    <h2 class="mb-0"><span id="total_tareas_activas" class="counter-value"></span></h2>
                                </div>
                            </div>
                        </div>
                    </div><!-- end col -->
                </div><!-- end row -->
            </div><!-- end card body -->
        </div><!-- end card -->
    </div>


    <div class="col-md-12 text-center border p-1" style="background-color: #fdfdfd;" id="cont_tareas_act_x_cliente">
        <h4 class="text-muted fs-20 mb-2">ACTIVIDADES EN CURSO POR TAREA</h4>
        <table id="table_tareas" class="display">
            <thead>
                <tr style="text-align: center;">
                    <th style="width: 70px; padding:5px; text-align:center">Realizadas</th>
                    <th style="width: 600px; padding:5px; text-align:center">Cliente</th>
                    <th style="width: 150px; padding:5px; text-align:center">Analista</th>
                    <th style="width: 150px; padding:5px; text-align:center">Sector</th>
                    <th style="width: 70px; padding:5px; text-align:center">Hs total</th>
                    <th style="width: 70px; padding:5px; text-align:center">Hs consumidas</th>
                    <th style="width: 70px; padding:5px; text-align:center">Hs restantes</th>
                    <th style="width: 30px; padding:5px; text-align: center;"></th>
                </tr>
            </thead>
            <tbody id="tbody_table_tareas" style="text-align: center;">

            </tbody>
        </table>
    </div>
</div>

<?php require_once('modal.php'); ?>