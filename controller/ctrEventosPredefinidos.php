<?php
// header('Content-Type: application/json');
require_once '../config/Conexion.php';
require_once '../model/EventosPredefinidos.php';
$eventPredefinido=new EventosPredefinidos();

switch ($_GET['evento']) {
    case 'get_eventos_predefinidos':
        $datos=$eventPredefinido->get_eventos_predefinidos();
        foreach ($datos as $key => $row) {
            echo "<div class='fc-event' data-titulo='$row[titulo]' data-horafin='$row[horafin]' data-horainicio='$row[horainicio]' data-colorfondo='$row[colorfondo]' data-colortexto='$row[colortexto]'
            style='border-color:$row[colorfondo] color:$row[colortexto]; background-color:$row[colorfondo];margin:10px'>
            $row[titulo] [" . substr($row['horainicio'],0,5) . "a" . substr($row['horafin'],0,5) ."]</div>";
        }
        break;
    
    default:
        # code...
        break;
}