<!-- Modal Editar Usuario-->
<div class="modal fade" id="modalConfigUsu" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="titModalConfig"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3 row" id="cont_usu_nom">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Nombre</label>
                    <div class="col-sm-10">
                        <input class="form-control form-control-sm" id="modal_usu_nom" type="text" readonly placeholder="Ingrese su nuevo nombre">
                    </div>
                </div>
                <div class="mb-3 row" id="cont_usu_ape">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Apellido</label>
                    <div class="col-sm-10">
                        <input class="form-control form-control-sm" id="modal_usu_ape" type="text" readonly placeholder="Ingrese su nuevo apellido" aria-label=".form-control-sm example">
                    </div>
                </div>
                <div class="mb-3 row" id="cont_usu_email">
                    <label for="inputPassword" class="col-sm-2 col-form-label">E-mail</label>
                    <div class="col-sm-10">
                        <input class="form-control form-control-sm" id="modal_usu_email" type="text" readonly aria-label=".form-control-sm example">
                    </div>
                </div>
                <!-- <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                    <div class="col-sm-10">
                        <input class="form-control form-control-sm" id="modal_usu_pass" type="text" placeholder="Ingrese su nueva password" aria-label=".form-control-sm example">
                    </div>
                </div> -->
                <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Celular</label>
                    <div class="col-sm-10">
                        <input class="form-control form-control-sm" id="modal_usu_celular" type="text" placeholder="Ingrese su nuevo n° de celular" aria-label=".form-control-sm example">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Dirección</label>
                    <div class="col-sm-10">
                        <input class="form-control form-control-sm" id="modal_usu_direccion" type="text" placeholder="Ingrese su nueva dirección" aria-label=".form-control-sm example">
                    </div>
                </div>
                <div class="mb-3 row" id="cont_usu_nacimiento">
                    <label for="inputPassword" style="padding-left: 4px !important;" class="col-sm-2 col-form-label">Nacimiento</label>
                    <div class="col-sm-10">
                        <input class="form-control form-control-sm" id="modal_usu_nacimiento" type="text" readonly placeholder="Ingrese su nueva fecha de nacimiento" aria-label=".form-control-sm example">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" id="BotonModificar" style="width:85px; height:30px;" class="btn btn-sm btn-success"><i class="ri-edit-box-fill"></i> Guardar</button>
                <button type="button" id="BotonAgregar" style="width:85px; height:30px;" class="btn btn-sm btn-light" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal certificaciones, habilidades, portfolio-->
<div class="modal fade" id="modalCertificado" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <input type="hidden" hidden id="usu_id" value="<?php echo $_SESSION['usu_id'] ?>">
    <div class="modal-dialog">
        <div class="modal-content p-1">
            <div class="modal-header">
                <h5 class="modal-title" id="titModalConfig"input_certificacion></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="mb-2 row">
                <div class="col-sm-10 ml-3 mt-2">
                    <select id="selec_certificacion" style='font-size:14px' class="form-select form-select-sm" aria-label=".form-select-sm example">

                    </select>
                </div>
            </div>

            <div class="mb-2 row">
                <div class="col-sm-10 ml-3 mt-2">
                    <input id="input_certificacion" class="form-control form-control-sm" type="text" placeholder="Ingrese su nueva certificación" aria-label=".form-control-sm example">
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" id="btnGuardarCertificacion" class="btn btn-sm btn-success">Guardar</button>
                <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">cerrar</button>
            </div>
        </div>
    </div>
</div>


<!-- Modal certificaciones, habilidades, portfolio-->
<div class="modal fade" id="modalHabilidades" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <input type="hidden" hidden id="usu_id" value="<?php echo $_SESSION['usu_id'] ?>">
    <div class="modal-dialog">
        <div class="modal-content p-1">
            <div class="modal-header">
                <h5 class="modal-title" id="titModalConfig"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="mb-2 row">
                <div class="col-sm-10 ml-3 mt-2">
                    <select id="select_hab" style='font-size:14px' class="form-select form-select-sm" aria-label=".form-select-sm example">

                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" id="btnGuardarHabilidad" class="btn btn-sm btn-success">Guardar</button>
                <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">cerrar</button>
            </div>
        </div>
    </div>
</div>