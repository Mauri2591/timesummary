<?php
require_once '../config/Conexion.php';
require_once '../model/Roles.php';

$rol=new Roles();

switch ($_GET['combo_rol']) {
    case 'get_roles':
        $datos=$rol->get_roles();
        $html="";
        foreach ($datos as $key => $row) {
            $html.='<option value='.$row['id'].'>'.$row['rol_nom'].'</option>';
        }
        echo json_encode($html);
        break;
    
    default:
        # code...
        break;
}