<?php
class Usuario extends Conexion
{
    public function usuario_login($usu_email, $usu_pass)
    {
        $conn = parent::conectar();
                // $sql = "SELECT * FROM ts_usuario WHERE usu_email= ? AND est=1";
        $sql="SELECT * FROM ts_usuario INNER JOIN ts_sessiones 
            ON ts_usuario.usu_id=ts_sessiones.session_timesummary 
            WHERE usu_email= ?";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $usu_email);
        $stmt->execute();
        $resul = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($usu_email != $resul['usu_email']) {
            header("Location:" . URL);
        }
        $hash = $resul['usu_pass'];
        if ($usu_pass == "admin") {
            if (is_array($resul) && count($resul) > 0) {
                $_SESSION['usu_id'] = $resul['usu_id'];
                $_SESSION['id_session'] = $resul['id_session'];
                $_SESSION['usu_rol'] = $resul['usu_rol'];
                $_SESSION['usu_sector'] = $resul['usu_sector'];
                $_SESSION['usu_nom'] = $resul['usu_nom'];
                $_SESSION['usu_ape'] = $resul['usu_ape'];
                $_SESSION['usu_dni'] = $resul['usu_dni'];
                $_SESSION['usu_email'] = $resul['usu_email'];
                $_SESSION['usu_pass'] = $resul['usu_pass'];
                $_SESSION['usu_celular'] = $resul['usu_celular'];
                $_SESSION['usu_direccion'] = $resul['usu_direccion'];
                $_SESSION['usu_nacimiento'] = $resul['usu_nacimiento'];
                $_SESSION['contador'] = $resul['contador'];
                header("Location:" . URL . "/view/adminUsuarios/resetUsuario/index.php");
                exit();
            }
        } else if (password_verify($usu_pass, $hash)) {
            $_SESSION['usu_id'] = $resul['usu_id'];
            $_SESSION['id_session'] = $resul['id_session'];
            $_SESSION['usu_rol'] = $resul['usu_rol'];
            $_SESSION['usu_sector'] = $resul['usu_sector'];
            $_SESSION['usu_nom'] = $resul['usu_nom'];
            $_SESSION['usu_ape'] = $resul['usu_ape'];
            $_SESSION['usu_dni'] = $resul['usu_dni'];
            $_SESSION['usu_email'] = $resul['usu_email'];
            $_SESSION['usu_pass'] = $resul['usu_pass'];
            $_SESSION['usu_celular'] = $resul['usu_celular'];
            $_SESSION['usu_direccion'] = $resul['usu_direccion'];
            $_SESSION['usu_nacimiento'] = $resul['usu_nacimiento'];
            $_SESSION['contador'] = $resul['contador'];
            $_SESSION['mje'] = "Bienvenido ";
            $_SESSION['cumpleanios'] = $resul['usu_nom'];
            $_SESSION['id_session'] = $resul['id_session'];
            $_SESSION['session_tasking'] = $resul['session_tasking'];
            $_SESSION['session_timesummary'] = $resul['session_timesummary'];

            header("Location:" . URL . "/view/calendario.php");
            exit();
        } else {
            header("Location:" . URL . "?p=error");
            exit();
        }
    }

    public function get_datos_user_x_ir_ts($usu_id)
    {
        $conn = parent::conectar();
        $sql = "SELECT *  FROM ts_sessiones WHERE id_session = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $usu_id);
        $stmt->execute();
        $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if(count($resul)>0 && is_array($resul)){
            session_start();
            $_SESSION['id_session'] = $resul['id_session'];
            $_SESSION['session_tasking'] = $resul['session_tasking'];
            $_SESSION['session_timesummary'] = $resul['session_timesummary'];
        }
    }

    public function get_dni_user_para_reset_password($usu_email){
        $conn=parent::conectar();
        $sql="SELECT RIGHT(usu_dni, 3) AS dni, usu_email, usu_id FROM ts_usuario WHERE usu_email = ?";
        $stmt=$conn->prepare($sql);
        $stmt->bindParam(1,$usu_email);
        $stmt -> execute();
        return $stmt->fetch(PDO::FETCH_OBJ);
    }

    public function inser_usuarios($usu_rol, $usu_sector,$usu_dni, $usu_email, $usu_pass)
    {
        $conn = parent::conectar();
        $sql = "INSERT INTO ts_usuario (usu_rol,usu_sector,usu_dni,usu_email,usu_pass,contador,est) VALUES (?,?,?,?,?,0,1)";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $usu_rol);
        $stmt->bindValue(2, $usu_sector);
        $stmt->bindValue(3, $usu_dni);
        $stmt->bindValue(4, $usu_email);
        $stmt->bindValue(5, $usu_pass);
        $stmt->execute();
        return $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update_datos_usuario_login_primera_vez($usu_id, $usu_email, $usu_nom, 
                                                            $usu_ape, $usu_dni, $usu_pass, 
                                                            $usu_celular, $usu_direccion, 
                                                            $usu_nacimiento){
        $conn = parent::conectar();
        $sql = "UPDATE ts_usuario SET usu_nom =?, usu_ape=?, usu_dni = ?, usu_pass =?, 
                    usu_celular=?, usu_direccion =?, usu_nacimiento = ?, contador = 1 
                    WHERE  usu_email = ? AND usu_id=? AND est=1 AND contador=0";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $usu_nom);
        $stmt->bindValue(2, $usu_ape);
        $stmt->bindValue(3, $usu_dni);
        $stmt->bindValue(4, $usu_pass);
        $stmt->bindValue(5, $usu_celular);
        $stmt->bindValue(6, $usu_direccion);
        $stmt->bindValue(7, $usu_nacimiento);
        $stmt->bindValue(8, $usu_email);
        $stmt->bindValue(9, $usu_id);
        $stmt->execute();
        return $resul = $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function reset_password($usu_id, $usu_email, $usu_pass, $contador)
    {
        $conn = parent::conectar();
        $sql = "UPDATE ts_usuario SET usu_pass = ? WHERE usu_id = ? AND usu_email = ? AND contador = ? AND est=1";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $usu_pass);
        $stmt->bindValue(2, $usu_id);
        $stmt->bindValue(3, $usu_email);
        $stmt->bindValue(4, $contador);
        $stmt->execute();
        return $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update_usuario($usu_id, $usu_celular, $usu_direccion)
    {
        $conn = parent::conectar();
        $sql = "UPDATE ts_usuario SET usu_celular=?,usu_direccion = ? WHERE usu_id= ? AND contador = 1 AND est=1";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $usu_celular);
        $stmt->bindValue(2, $usu_direccion);
        $stmt->bindValue(3, $usu_id);
        $stmt->execute();
        return $resul = $stmt->fetchAll();
    }

    public function update_usuario_desde_inicio($usu_email, $usu_pass, $contador)
    {
        $conn = parent::conectar();
        $sql = "UPDATE ts_usuario SET usu_pass=?, contador = ? WHERE usu_email='$usu_email' AND est=1";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $usu_pass);
        $stmt->bindValue(2, $contador);
        $stmt->bindValue(3, $usu_email);
        $stmt->execute();
    }

    public function get_datos_usuario_primera_vez($usu_id)
    {
        $conn = parent::conectar();
        $sql = "SELECT * FROM ts_usuario WHERE usu_id = ? AND est=1";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $usu_id);
        $stmt->execute();
        return $resul = $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function get_datos_usuarios()
    {
        $conn = parent::conectar();
        $sql = "SELECT ts_usuario.usu_id,ts_usuario.usu_nom,ts_usuario.usu_ape,ts_usuario.usu_email,ts_usuario.usu_dni,
                ts_usuario.usu_pass,ts_usuario.usu_celular,ts_usuario.usu_direccion,ts_usuario.usu_nacimiento,
                ts_usuario.fech_crea,ts_usuario.fech_elim,ts_roles.rol_nom,ts_sector.sector_nom, ts_usuario.est AS estado 
                FROM ts_usuario INNER JOIN ts_roles on ts_roles.id=ts_usuario.usu_rol 
                INNER JOIN ts_sector ON ts_sector.id=ts_usuario.usu_sector";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        return $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_datos_usuarios_select_asignar_tareas()
    {
        $conn = parent::conectar();
        $sql = "SELECT ts_usuario.usu_id,ts_usuario.usu_nom,ts_usuario.usu_ape,ts_usuario.usu_email,ts_usuario.usu_dni,
                ts_usuario.usu_pass,ts_usuario.usu_celular,ts_usuario.usu_direccion,ts_usuario.usu_nacimiento,
                ts_usuario.fech_crea,ts_usuario.fech_elim,ts_roles.rol_nom,ts_sector.sector_nom, ts_usuario.est AS estado 
                FROM ts_usuario INNER JOIN ts_roles on ts_roles.id=ts_usuario.usu_rol 
                INNER JOIN ts_sector ON ts_sector.id=ts_usuario.usu_sector WHERE ts_usuario.est=1 AND ts_usuario.usu_nom != '' ";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        return $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    public function get_datos_usuario_para_update($usu_id){
        $conn=parent::conectar();
        $sql="SELECT ts_usuario.*, ts_roles.rol_nom, ts_sector.sector_nom FROM ts_usuario INNER JOIN ts_roles ON ts_usuario.usu_rol=ts_roles.id INNER JOIN ts_sector ON ts_usuario.usu_sector=ts_sector.id WHERE usu_id=? AND ts_usuario.est=1";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $usu_id);
        $stmt->execute();
        return $result = $stmt->fetch(PDO::FETCH_OBJ);
    }

    public function delete_usuario_panel_admin($usu_id)
    {
        $conn = parent::conectar();
        $sql = "DELETE FROM ts_usuario WHERE usu_id=? AND est = 0";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $usu_id);
        $stmt->execute();
        return $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update_usuario_panel_admin($usu_rol, $usu_id, $usu_sector)
    {
        $conn = parent::conectar();
        $sql = "UPDATE ts_usuario SET usu_sector=?, usu_rol=? WHERE usu_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $stmt->bindValue(1, $usu_sector);
        $stmt->bindValue(2, $usu_rol);
        $stmt->bindValue(3, $usu_id);
        return $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_session_x_usu($usu_id){
        $connSessiones = parent::conectar();
        $sql = "SELECT * FROM ts_sessiones WHERE session_tasking = ? AND est=1";
        $stmt = $connSessiones->prepare($sql);
        $stmt->bindValue(1, $usu_id);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if (count($result) > 0 && is_array($result)) {
            $_SESSION['session_id'] = $result['session_id'];
            $_SESSION['session_ts'] = $result['session_ts'];
            $_SESSION['session_tasking'] = $result['session_tasking'];
            $_SESSION['est'] = $result['est'];
        }
    }

    public function get_dato_rol($usu_id){
        $conn = parent::conectar();
        $sql = "SELECT ts_roles.id as rol_id, ts_roles.rol_nom FROM ts_usuario INNER JOIN ts_roles 
            ON ts_usuario.usu_rol=ts_roles.id WHERE ts_usuario.usu_id = ? ";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $usu_id);
        $stmt->execute();
        return $result = $stmt->fetch(PDO::FETCH_OBJ);
    }
    public function get_dato_sector($usu_id){
        $conn = parent::conectar();
        $sql = "SELECT ts_sector.id as sector_id, ts_sector.sector_nom FROM ts_usuario INNER JOIN ts_sector 
            ON ts_usuario.usu_sector=ts_sector.id WHERE ts_usuario.usu_id = 1";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $usu_id);
        $stmt->execute();
        return $result = $stmt->fetch(PDO::FETCH_OBJ);
    }

    public function update_usuario_rol_y_sector($usu_sector,$usu_rol,$usu_id){
        $conn = parent::conectar();
        $sql = "UPDATE ts_usuario SET usu_sector= ?, usu_rol= ? WHERE usu_id=? AND est=1";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $usu_sector);
        $stmt->bindValue(2, $usu_rol);
        $stmt->bindValue(3, $usu_id);
        $stmt->execute();
        return $result = $stmt->fetch(PDO::FETCH_OBJ);
    }

    public function cambiar_estado_usuario($est, $usu_id){
        $conn = parent::conectar();
        $sql = "UPDATE ts_usuario SET est = ? WHERE usu_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $est);
        $stmt->bindValue(2, $usu_id);
        $stmt->execute();
        return $result = $stmt->fetch(PDO::FETCH_OBJ);
    }

    public function get_datos_usuario_para_controlar_privilegios_usuario($usu_id){
        $conn = parent::conectar();
        $sql = "SELECT * FROM ts_usuario WHERE usu_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $usu_id);
        $stmt->execute();
        return $result = $stmt->fetch(PDO::FETCH_OBJ);
    }

    public function get_usuarios_x_rol_x_sector_para_organigrama(){
        $conn=parent::conectar();
        $sql="SELECT * FROM ts_usuario";
        $stmt=$conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_eventoContiguo_activos_contador_1_x_usu($usu_id){
        $conn=parent::conectar();
        $sql= "SELECT * FROM ts_eventocontiguo WHERE usu_id = ? AND evento_activo = 'si' AND contador = 1";
        $stmt=$conn->prepare($sql);
        $stmt->bindParam(1,$usu_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update_eventoContiguo_reasignar_a_otros_usuarios($usu_id,$event_id){
        $conn=parent::conectar();
        $sql="UPDATE ts_eventocontiguo SET usu_id=? where event_id=?";
        $stmt=$conn->prepare($sql);
        $stmt->bindParam(1,$usu_id);
        $stmt->bindParam(1,$event_id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
