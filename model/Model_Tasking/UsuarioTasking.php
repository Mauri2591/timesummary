<?php
class Usuario_Tasking extends ConexionTasking{
    public function get_datos_session_tasking($session_tasking)
    {
        $conn = parent::conectar_tasking($session_tasking);
        $sql = "SELECT * FROM tm_usuario WHERE usu_id = ? AND est=1";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $session_tasking);
        $stmt->execute();
        $resul = $stmt->fetch(PDO::FETCH_ASSOC);
        if(is_array($resul) && count($resul) > 0 ){
            $_SESSION['usu_id_tasking'] = $resul['usu_id'];
            $_SESSION['usu_nom_tasking'] = $resul['usu_nom'];
            $_SESSION['usu_ape_tasking'] = $resul['usu_ape'];
            $_SESSION['usu_correo_tasking'] = $resul['usu_correo'];
            $_SESSION['rol_id_tasking'] = $resul['rol_id'];
            $_SESSION['ts_session'] = $resul['usu_id'];
            $_SESSION['est_tasking'] = $resul['est'];
        }
    }

    public function get_datos_ticket_x_usu($usu_id) //Trae todos los ticket en estado Abierto que se están trabajando x usu
    {
        $conn = parent::conectar_tasking($usu_id);
        $sql="SELECT usuasignados.*, tm_ticket.tick_id, tm_ticket.tick_titulo, tm_ticket.tick_descrip, 
        tm_ticket.tick_estado, tm_ticket.estados_id, proyectos.proy_id, proyectos.client_id, 
        clientes.client_id, clientes.client_rs, tm_categoria.cat_nom FROM usuasignados INNER JOIN tm_ticket 
        ON usuasignados.tick_id = tm_ticket.tick_id INNER JOIN proyectos 
        ON tm_ticket.proy_id = proyectos.proy_id INNER JOIN clientes 
        ON proyectos.client_id = clientes.client_id INNER JOIN tm_estados 
        ON tm_ticket.estados_id=tm_estados.estados_id INNER JOIN tm_categoria 
        ON tm_ticket.cat_id=tm_categoria.cat_id WHERE usuasignados.est = 1 AND tm_ticket.estados_id = 2 
        AND fecha_baja IS NULL AND tm_ticket.usu_id = ? ORDER BY usuasignados.tick_id DESC";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $usu_id);
        $stmt->execute();
        return $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_datos_para_copy($usu_id_tasking, $tick_id)
    {
        $conn = parent::conectar_tasking();
        $sql="SELECT tm_ticket.*, tm_usuario.usu_nom FROM tm_ticket INNER JOIN tm_usuario 
        ON tm_ticket.usu_id=tm_usuario.usu_id WHERE tm_ticket.estados_id=2 AND tm_ticket.usu_id=? 
        AND tm_ticket.tick_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $usu_id_tasking);
        $stmt->bindValue(2, $tick_id);
        $stmt->execute();
        return $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getDatosPor_tick_id_y_usu($usu_id, $tick_id)
    {
        $conn = parent::conectar_tasking();
        $sql="SELECT tm_ticket.*, proyectos.client_id FROM tm_ticket INNER JOIN proyectos 
            ON proyectos.proy_id=tm_ticket.proy_id WHERE tm_ticket.usu_id = ? AND tm_ticket.tick_id = ? 
            AND tm_ticket.est = 1";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $usu_id);
        $stmt->bindValue(2, $tick_id);
        $stmt->execute();
        return $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}