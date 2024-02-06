<?php
class Evento_Tasking extends ConexionTasking{

    public function get_total_clientes_tasking(){
        $conn=parent::conectar_tasking();
        $sql="SELECT * FROM clientes WHERE est=1";
        $stmt=$conn->prepare($sql);
        $stmt->execute();
        return $resul=$stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_cliente_x_palabra($valor_cliente){
        $conn=parent::conectar_tasking();
        $sql="SELECT * FROM clientes WHERE client_rs LIKE CONCAT('%' , ? , '%') AND est=1";
        $stmt=$conn->prepare($sql);
        $stmt->bindValue(1,$valor_cliente,PDO::PARAM_STR);
        $stmt->execute();
        return $resul=$stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}