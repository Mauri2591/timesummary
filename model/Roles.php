<?php
class Roles extends Conexion
{
    public function get_roles(){
        $conn = parent::conectar();
        $sql = "SELECT * FROM ts_roles WHERE est = 1";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        return $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
