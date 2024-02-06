<?php
class Sectores extends Conexion{
public function get_sectores(){
    $conn=parent::conectar();
    $sql="SELECT * FROM ts_sector WHERE est = 1";
    $stmt=$conn->prepare($sql);
    $stmt->execute();
    return $resul=$stmt->fetchAll(PDO::FETCH_ASSOC);
}
}