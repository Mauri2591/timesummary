<?php
require_once '../config/Conexion.php';
require_once '../model/Usuario.php';
$user = new Usuario();

if (isset($_SERVER) && $_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST) && $_POST['ingresar'] == "Login") {
        if (empty($_POST['usu_email']) || empty($_POST['usu_pass'])) {
            header("Location:" . URL . "?p=vacios");
            exit();
        } else {
            $usu_email=str_replace(' ', '',$_POST['usu_email']);
            $usu_pass=str_replace(' ', '',$_POST['usu_pass']);

            $user->usuario_login($usu_email, $usu_pass);
        }
    }
} else {
    header("Location:" . URL);
    exit();
}


