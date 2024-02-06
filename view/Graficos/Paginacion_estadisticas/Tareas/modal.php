<!-- Modal -->
<div class="modal fade" id="modal_grafico_tareas" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog custom-modal-width" style="max-width: 85%;">
        <div class="modal-content">
            <div class="modal-header">
                <!-- <h5 class="modal-title" id="exampleModalLabel">Consulte la tarea activa</h5> -->
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

                <div class="row">
                    <div class="col-md-12">

                            <div class="card-body pt-0">

                                <h6 class="text-uppercase fw-semibold mt-0 mb-2 text-muted text-center">HISTORIAL DE TAREAS</h6>
                                <p class="mb-0 text-center">Cliente: <span id="id_cliente_tarea"></span></p>
                                <p class="mb-0 text-center">Total de horas asignadas: <span id="id_horas_asignadas"></span></p>
                                <p class="mb-0 text-center">Analista: <span id="id_analista_tarea"></p>
                                <div class="text-center"><span class="badge badge-soft-primary text-uppercase">En progreso</span></div>
                                
                                <div class="progress mb-3 mt-2" id="barra_progreso">

                                </div>

                                <div class="card-body pt-0" id="cont_datos_tarea">

                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</div>