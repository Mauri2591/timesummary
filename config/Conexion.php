<?php
session_start();
define("URL","http://localhost/timesummary");

class Conexion{
    protected $conexion;
    protected function conectar(){
        try {
            $conn= $this->conexion=new PDO("mysql:host=localhost;dbname=timesummary","root","",array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));
            return $conn;
        } catch (\ErrorException $e) {
            echo "Error de conexion ".$e->getMessage();
            die();
        }
    }

    public function ruta_proy(){
        return "http://localhost/timesummary";
    }
}

class ConexionTasking{
    protected $conexion_tasking;
    protected function conectar_tasking(){
        try {
            $conn_tasking=$this->conexion_tasking=new PDO("mysql:host=localhost;dbname=tasking","root","",array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));
            return $conn_tasking;
        } catch (\ErrorException $e) {
            echo "Error de conexión ".$e->getMessage();
            die();
        }
    }
}