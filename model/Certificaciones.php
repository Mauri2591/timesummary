<?php
class Certificaciones extends Conexion{
    public function combo_certificacion(){
        $conn=parent::conectar();
        $sql="SELECT * FROM ts_certificaciones_combo WHERE est=1";
        $stmt=$conn->prepare($sql);
        $stmt->execute();
        return $resul=$stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function insert($id_combo_cert,$usu_id,$cert_nom){
        $conn=parent::conectar();
        $sql="INSERT INTO ts_certificaciones (id_combo_cert,usu_id,cert_nom,est) VALUES (?,?,?,1)";
        $stmt=$conn->prepare($sql);
        $stmt->bindValue(1,$id_combo_cert);
        $stmt->bindValue(2,$usu_id);
        $stmt->bindValue(3,$cert_nom);
        $stmt->execute();
        return $resul = $stmt->fetchAll();
    }

    public function get_certificacion_x_usu($usu_id){
        $conn=parent::conectar();
        $sql="SELECT * FROM ts_certificaciones WHERE usu_id=? AND est=1";
        $stmt=$conn->prepare($sql);
        $stmt->bindValue(1,$usu_id);
        $stmt->execute();
        return $resul=$stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}