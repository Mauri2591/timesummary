<?php
require_once '../config/Conexion.php';
require_once '../model/Sectores.php';

$sector=new Sectores();

switch ($_GET['combo_sector']) {
    case 'get_sectores':
        $datos=$sector->get_sectores();
        $html="";
        foreach ($datos as $key => $row) {
            $html.='<option value='.$row['id'].'>'.$row['sector_nom'].'</option>';
        }
        echo json_encode($html);
        break;
    
    default:
        break;
}