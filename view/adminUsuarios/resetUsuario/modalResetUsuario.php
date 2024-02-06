<style>
    input{
      padding: 3px !important;
      text-align: center;
    }
  </style>
  <!-- Modal -->
  <div class="modal fade" id="modalResetUsu" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">

    <div class="modal-dialog">
      <div class="modal-content p-2">
        <div class="modal-header">
          <h5 class="modal-title " id="exampleModalLabel">Registro de Usuario</h5>
          <button type="button" id="btnRecargarPagina" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">

          <div class="mb-3 row" id="conta_usu_nom">
            <label for="inputPassword" class="col-sm-2 col-form-label">Nombre</label>
            <div class="col-sm-10">
              <input type="text" placeholder="Ingrese su nombre" required class="form-control" id="usu_nom">
            </div>
          </div>

          <div class="mb-3 row"  id="conta_usu_ape">
            <label for="inputPassword" class="col-sm-2 col-form-label">Apellido</label>
            <div class="col-sm-10">
              <input type="text" placeholder="Ingrese su Apellido" required class="form-control" id="usu_ape">
            </div>
          </div>

          <div class="mb-3 row"  id="conta_usu_dni">
            <label for="inputPassword" class="col-sm-2 col-form-label">DNI</label>
            <div class="col-sm-10">
              <input type="text" placeholder="Ingrese su dni" required class="form-control" id="usu_dni">
            </div>
          </div>

          <div class="mb-3 row">
            <label for="inputPassword" class="col-sm-2 col-form-label">E-mail</label>
            <div class="col-sm-10">
              <input type="text" value="<?php echo $_SESSION['usu_email']; ?>" disabled required class="form-control" id="usu_email">
            </div>
          </div>

          <div class="mb-3 row"  id="conta_usu_pass">
            <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
            <div class="col-sm-10">
              <input type="text" placeholder="Ingrese su nueva password" required class="form-control" id="usu_pass">
            </div>
          </div>

          <div class="mb-3 row" id="conta_usu_sector">
            <label for="usu_sector" class="col-sm-2 col-form-label">Sector</label>
            <div class="col-sm-10">
              <input type="text" required class="form-control" id="usu_sector" value="">
            </div>
          </div>

          <div class="mb-3 row"  id="conta_usu_rol">
            <label for="inputPassword" class="col-sm-2 col-form-label">Rol</label>
            <div class="col-sm-10">
              <input type="text" required class="form-control" id="usu_rol" value="">
            </div>
          </div>

          <div class="mb-3 row"  id="conta_usu_celular">
            <label for="inputPassword" class="col-sm-2 col-form-label">Celular</label>
            <div class="col-sm-10">
              <input type="text" placeholder="Ingrese su n° de celular" required class="form-control" id="usu_celular">
            </div>
          </div>

          <div class="row"  id="conta_usu_direccion">
            <label for="inputPassword" class="col-sm-2 col-form-label">Dirección</label>
            <div class="col-sm-10">
              <input type="text" placeholder="Ingrese su Dirección" required class="form-control" id="usu_direccion">
            </div>
          </div>
        </div>

        <div id="cont_usu_nacimiento" class="row">
          <label for="usu_nacimiento" class="col-sm-3 col-form-label">Fecha de Nacimiento</label>
          <div class="col-sm-9">
            <input type="date" class="form-control" required id="usu_nacimiento">
          </div>
        </div>

        <h5 id="h5"></h5>
        <div class="d-flex justify-content-end">
          <button type="button" id="btnGuardarUsuarioLogin" class="btn btn-sm btn-primary">Guardar</button>
          <a href="<?php echo URL; ?>" id="btnCloseUsuarioLogin" class="btn btn-sm btn-secondary">Volver</a>
          <!-- <button type="button" id="btnCloseUsuarioLogin" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Volver</button> -->
        </div>

      </div>

    </div>
  </div>
  </div>