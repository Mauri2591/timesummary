<?php
class Habilidades extends Conexion{
    public function combo_habilidad(){
        $conn=parent::conectar();
        $sql="SELECT * FROM ts_habilidades_combo WHERE est=1";
        $stmt=$conn->prepare($sql);
        $stmt->execute();
        return $resul=$stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function insert_habilidad($usu_id,$combo_hab_id){
        $conn=parent::conectar();
        $sql="INSERT INTO ts_habilidades (usu_id,combo_hab_id,est) VALUES (?,?,1)";
        $stmt=$conn->prepare($sql);
        $stmt->bindValue(1,$usu_id);
        $stmt->bindValue(2,$combo_hab_id);
        $stmt->execute();
        return $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function get_habilidad_x_usu($usu_id){
        $conn=parent::conectar();
        $sql="SELECT ts_habilidades.id,ts_habilidades.usu_id,ts_habilidades.combo_hab_id,ts_habilidades.fech_crea,
                ts_habilidades.fech_elim,ts_habilidades.est, ts_habilidades_combo.nom_combo FROM ts_habilidades 
                INNER JOIN ts_habilidades_combo on ts_habilidades_combo.id=ts_habilidades.combo_hab_id WHERE ts_habilidades.usu_id=? AND ts_habilidades.est=1";
        $stmt=$conn->prepare($sql);
        $stmt->bindValue(1,$usu_id);
        $stmt->execute();
        return $resul=$stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}