<!-- Modal -->
<div class="modal fade" id="modalUsuario" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Nuevo Usuario</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

        <div class="row">
          <div class="col-md-12" id="container_modal_usuario">

            <div class="mb-3 row" id="cont_usu_email">
              <label for="inputPassword" class="col-sm-2 col-form-label">Email:</label>
              <div class="col-sm-10">
                <input id="usu_email" class="form-control form-control-sm" type="email" required placeholder="Ingrese el email" aria-label=".form-control-sm example">
              </div>
            </div>

            <div class="mb-3 row" id="cont_usu_pass">
              <label for="inputPassword" class="col-sm-2 col-form-label">Password:</label>
              <div class="col-sm-10">
                <input id="usu_pass" class="form-control form-control-sm" type="text" value="admin" disabled aria-label=".form-control-sm example">
              </div>
            </div>

            <div class="mb-3 row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Rol:</label>
              <div class="col-sm-10">
                <select id="select_rol" style="font-size: 14px;" class="form-select form-select-sm" aria-label=".form-select-sm example">

                </select>
              </div>
            </div>

            <div class="mb-3 row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Sector:</label>
              <div class="col-sm-10">
                <select id="select_sector" style="font-size: 14px;" class="form-select form-select-sm" aria-label=".form-select-sm example">

                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" id="btnGuardarUsu" class="btn btn-sm btn-info mt-3">Guardar</button>
        <button type="button" id="btnEditarUsu" class="btn btn-sm btn-info mt-3">Editar</button>
        <button type="button" class="btn btn-sm btn-light mt-3" data-bs-dismiss="modal">cerrar</button>
      </div>
    </div>
  </div>
</div>




<!-- Modal Asignar tareas a otros usuarios -->
<div class="modal fade" id="asignarTarea" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-lg-8" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Asignar tareas</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <!-- Contenido del modal -->
          <table id="table_reasignarTarea">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Reasignar</th>
                <th>Acción</th>
              </tr>
            </thead>
          </table>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Guardar</button>
      </div>
    </div>
  </div>
</div>