<?php
header('CONtent-Type: applicatiON/jsON');

class Eventos extends Conexion
{
    public function get_total_eventos($usu_id)
    {
        $conn = parent::conectar();
        $sql = "SELECT ts_eventoContiguo.id as id_eventoContiguo, ts_eventoContiguo.tick_id,event_id, ts_usuario.usu_nom, 
                ts_eventoContiguo.horas_total, ts_eventoContiguo.horas_restantes,
                ts_eventoContiguo.horas_consumidas, ts_eventoContiguo.fech_ini, 
                ts_eventoContiguo.fech_fin, ts_eventoContiguo.hora_ini, 
                ts_eventoContiguo.hora_fin, CONCAT(ts_eventoContiguo.fech_ini, ' ',
                ts_eventoContiguo.hora_ini) AS start, CONCAT(ts_eventoContiguo.fech_fin, ' ',
                ts_eventoContiguo.hora_fin) AS end, ts_eventoContiguo.tick_titulo title, 
                ts_eventoContiguo.prod_id, ts_eventoContiguo.event_descrip, 
                ts_eventoContiguo.tarea_id, ts_eventoContiguo.client_id, ts_eventocontiguo.evento_activo
                FROM ts_eventoContiguo INNER JOIN ts_usuario ON ts_usuario.usu_id = ts_eventoContiguo.usu_id 
                WHERE ts_usuario.usu_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $usu_id);
        $stmt->execute();
        $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $resul;
    }

    public function agregar_primer_evento(
        $usu_id,
        $tick_id,
        $client_id,
        $prod_id,
        $tarea_id,
        $tick_titulo,
        $horas_total,
        $horas_restantes,
        $horas_consumidas,
        $event_descrip,
        $fech_ini,
        $fech_fin,
        $hora_ini,
        $hora_fin,
        $evento_activo,
        $contador,
        $creacion_evento,
        $est
    ) {
        $conn = parent::conectar();
        $sql = "INSERT INTO ts_evento(usu_id,tick_id, client_id, prod_id, tarea_id,tick_titulo, horas_total,
   horas_restantes,horas_consumidas,event_descrip, fech_ini, fech_fin, hora_ini, hora_fin, evento_activo,contador,creacion_evento,est) 
   VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $usu_id);
        $stmt->bindValue(2, $tick_id);
        $stmt->bindValue(3, $client_id);
        $stmt->bindValue(4, $prod_id);
        $stmt->bindValue(5, $tarea_id);
        $stmt->bindValue(6, $tick_titulo);
        $stmt->bindValue(7, $horas_total);
        $stmt->bindValue(8, $horas_restantes);
        $stmt->bindValue(9, $horas_consumidas);
        $stmt->bindValue(10, $event_descrip);
        $stmt->bindValue(11, $fech_ini);
        $stmt->bindValue(12, $fech_fin);
        $stmt->bindValue(13, $hora_ini);
        $stmt->bindValue(14, $hora_fin);
        $stmt->bindValue(15, $evento_activo);
        $stmt->bindValue(16, $contador);
        $stmt->bindValue(17, $creacion_evento);
        $stmt->bindValue(18, $est);
        $stmt->execute();
        return $resul = $stmt->fetchAll();
    }

    public function traer_id_event_para_agregar($usu_id,$client_id){
        $conn=parent::conectar();
        $sql="SELECT * from ts_eventocontiguo where usu_id=? and client_id=? and 
        horas_restantes > 0 and evento_activo='si' and est = 1";
        $stmt=$conn->prepare($sql);
        $stmt->bindValue(1,$usu_id);
        $stmt->bindValue(2,$client_id);
        $stmt->execute();
        return $resul = $stmt->fetchAll();
        // return $stmt->fetch();
    }

    public function agregar(
        $event_id,
        $usu_id,
        $tick_id,
        $client_id,
        $prod_id,
        $tarea_id,
        $tick_titulo,
        $horas_total,
        $horas_restantes,
        $horas_consumidas,
        $event_descrip,
        $fech_ini,
        $fech_fin,
        $hora_ini,
        $hora_fin,
        $evento_activo,
        $contador,
        $creacion_evento,
        $fecha_finalizacion,
        $est
    ) {
        $conn = parent::conectar();
        $sql = "INSERT INTO ts_eventoContiguo(event_id,usu_id,tick_id, client_id, prod_id, tarea_id,tick_titulo, horas_total,
                            horas_restantes,horas_consumidas,event_descrip, fech_ini, fech_fin, hora_ini, hora_fin, evento_activo,contador,creacion_evento,fecha_finalizacion,est) 
                            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1,$event_id);
        $stmt->bindValue(2, $usu_id);
        $stmt->bindValue(3, $tick_id);
        $stmt->bindValue(4, $client_id);
        $stmt->bindValue(5, $prod_id);
        $stmt->bindValue(6, $tarea_id);
        $stmt->bindValue(7, $tick_titulo);
        $stmt->bindValue(8, $horas_total);
        $stmt->bindValue(9, $horas_restantes);
        $stmt->bindValue(10, $horas_consumidas);
        $stmt->bindValue(11, $event_descrip);
        $stmt->bindValue(12, $fech_ini);
        $stmt->bindValue(13, $fech_fin);
        $stmt->bindValue(14, $hora_ini);
        $stmt->bindValue(15, $hora_fin);
        $stmt->bindValue(16, $evento_activo);
        $stmt->bindValue(17, $contador);
        $stmt->bindValue(18, $creacion_evento);
        $stmt->bindValue(19, $fecha_finalizacion);
        $stmt->bindValue(20, $est);
        $stmt->execute();
        return $resul = $stmt->fetchAll();
    }

    public function get_select_tarea()
    {
        $conn = parent::conectar();
        $sql = "SELECT * FROM ts_tareas ORDER BY tarea_nombre ASC";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        return $resul = $stmt->fetchAll();
    }

    public function get_select_producto()
    {
        $conn = parent::conectar();
        $sql = "SELECT * FROM ts_productos ORDER BY prod_nombre ASC";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        return $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_datos_x_ref($cliente_ref, $usu_id)
    {
        $conn = parent::conectar();
        $sql = "SELECT ts_cliente.cliente_ref,ts_cliente.cliente_nom,tm_ticket.usu_id, tm_ticket.id_ticket 
                FROM tm_ticket INNER join ts_cliente on ts_cliente.cliente_id=tm_ticket.cliente_id 
                where ts_cliente.cliente_ref=? and tm_ticket.usu_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $cliente_ref);
        $stmt->bindValue(2, $usu_id);
        $stmt->execute();
        return $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getDatosPor_id_ticket_y_ref($id_ticket, $usu_id)
    {
        $conn = parent::conectar();
        $sql = "SELECT id_ticket,ts_cliente.cliente_ref, ts_cliente.cliente_id,ts_cliente.cliente_nom 
                AS nombre_cliente,ts_productos.prod_nombre AS nombre_producto,ts_productos.prod_id,
                ts_tareas.tarea_id, ts_usuario.usu_nom AS nombre_usuario, ts_usuario.usu_id FROM tm_ticket 
                INNER JOIN ts_cliente ON ts_cliente.cliente_ref=tm_ticket.cliente_ref INNER JOIN ts_productos 
                ON ts_productos.prod_id=tm_ticket.prod_id INNER JOIN ts_tareas 
                ON ts_tareas.tarea_id=tm_ticket.tarea_id INNER JOIN ts_usuario 
                ON ts_usuario.usu_id=tm_ticket.usu_id where tm_ticket.id_ticket= ? AND tm_ticket.usu_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $id_ticket);
        $stmt->bindValue(2, $usu_id);
        $stmt->execute();
        return $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_tareas_x_usu_table($usu_id)
    {
        $conn = parent::conectar();
        $sql = "SELECT id_ticket, ts_cliente.cliente_nom, ts_cliente.cliente_ref,ts_productos.prod_nombre 
                FROM tm_ticket INNER JOIN ts_cliente ON ts_cliente.cliente_ref=tm_ticket.cliente_ref 
                INNER JOIN ts_tareas ON ts_tareas.tarea_id=tm_ticket.tarea_id INNER JOIN ts_productos 
                ON ts_productos.prod_id=tm_ticket.prod_id WHERE tm_ticket.usu_id=? AND tm_ticket.est=1";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $usu_id);
        $stmt->execute();
        return $resul = $stmt->fetchAll();
    }

    public function get_datos_para_copy($usu_id, $id_ticket)
    {
        $conn = parent::conectar();
        $sql = "SELECT ts_cliente.cliente_ref, ts_cliente.cliente_nom,ts_cliente.cliente_id,
                        ts_productos.prod_id,ts_productos.prod_nombre, ts_usuario.usu_nom, 
                        tm_ticket.id_ticket from tm_ticket inner join ts_cliente 
                        on ts_cliente.cliente_ref=tm_ticket.cliente_ref inner join ts_usuario 
                        on ts_usuario.usu_id=tm_ticket.usu_id inner join ts_productos 
                        on ts_productos.prod_id=tm_ticket.prod_id where ts_usuario.usu_id=? and 
                        tm_ticket.id_ticket=? and tm_ticket.est=1";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $usu_id);
        $stmt->bindValue(2, $id_ticket);
        $stmt->execute();
        return $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update_evento($id, $usu_id, $tarea_id, $event_descrip)
    {
        $conn = parent::conectar();
        $sql = "UPDATE ts_eventoContiguo SET tarea_id = ?, event_descrip = ?
                WHERE id=? AND usu_id = ? AND est= 1";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(1, $tarea_id);
        $stmt->bindParam(2, $event_descrip);
        $stmt->bindParam(3, $id);
        $stmt->bindParam(4, $usu_id);
        $stmt->execute();
        return $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function delete_evento($id, $usu_id)
    {
        $conn = parent::conectar();
        $sql = "DELETE FROM ts_eventoContiguo WHERE id = ? AND usu_id = ? AND est = 1";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $id);
        $stmt->bindValue(2, $usu_id);
        $stmt->execute();
        return $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_event_id_mas_alto_de_evento_x_usu($usu_id, $client_id,$event_id)
    { //Este maneja para setear el valor de total hs
        $conn = parent::conectar();
        $sql = "SELECT * FROM ts_eventoContiguo WHERE usu_id= ? AND client_id=? 
                AND event_id=? ORDER BY id DESC LIMIT 1";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $usu_id);
        $stmt->bindValue(2, $client_id);
        $stmt->bindValue(3, $event_id);
        $stmt->execute();
        return $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function setear_event_inactivo($usu_id, $event_id)
    { //Este maneja para setear el valor de total hs
        $conn = parent::conectar();
        $sql = "UPDATE ts_eventoContiguo SET evento_activo='no' WHERE usu_id= ? AND event_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $usu_id);
        $stmt->bindValue(2, $event_id);
        $stmt->execute();
        return $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_primer_id_eventoContiguo($event_id,$usu_id){ //Para no eliminar el primer evento creado el cual contiene el total de hs
        $conn=parent::conectar();
        $sql="SELECT * FROM ts_eventocontiguo WHERE event_id=? AND usu_id=? ORDER BY id ASC LIMIT 1";
        $stmt=$conn->prepare($sql);
        $stmt->bindValue(1,$event_id);
        $stmt->bindValue(2,$usu_id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_OBJ);
    }

    public function get_total_actividades_x_event_id($event_id,$usu_id){
        $conn=parent::conectar();
        $sql="SELECT * FROM ts_eventocontiguo WHERE event_id=? AND evento_activo='no' AND usu_id=? ORDER BY id ASC";
        $stmt=$conn->prepare($sql);
        $stmt->bindValue(1,$event_id);
        $stmt->bindValue(2,$usu_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_event_id_mas_alto_de_eventoiContiguo($usu_id,$event_id)
    { //Esta función solo permite borrar de la vista la última actividad creada
        $conn = parent::conectar();
        $sql = "SELECT * FROM ts_eventoContiguo WHERE usu_id= ? AND event_id=? ORDER BY id DESC LIMIT 1";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $usu_id);
        $stmt->bindValue(2, $event_id);
        $stmt->execute();
        return $resul = $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function validar_si_existe_un_primer_evento_en_ts_evento($tick_id)
    { //Esta función es para saber si existe un primer evento en ts_evento para luego usarlo como evento inicial
        $conn = parent::conectar();
        $sql = "SELECT * FROM ts_evento WHERE tick_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $tick_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}
