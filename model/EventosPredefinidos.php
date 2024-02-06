<?php
class EventosPredefinidos extends Conexion{
    public function get_eventos_predefinidos(){
        $conn=parent::conectar();
        $sql="SELECT * FROM ts_eventoContiguo_predefinido";
        $stmt=$conn->prepare($sql);
        $stmt->execute();
        return $resul=$stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}