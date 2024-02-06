<?php
require_once '../config/Conexion.php';
require_once '../model/Certificaciones.php';
$cert = new Certificaciones();
switch ($_GET['combo_certificacion']) {
    
    case 'combo_certificacion':
        $html = '';
        $datos = $cert->combo_certificacion();
        foreach ($datos as $key => $row) {
            $html .= "<option style='font-size:14px' value='" . $row['id'] . "'>" . $row['nom_combo'] . "</option>";
        }
        echo json_encode($html);
        break;

    case 'insert':
        $datos = $cert->insert($_POST['id_combo_cert'], $_POST['usu_id'], $_POST['cert_nom']);
        break;

    case 'get_certificacion_x_usu':
        $datos = $cert->get_certificacion_x_usu($_POST['usu_id']);
        $html = '';
        foreach ($datos as $key => $row) {
            $html = $html . "<a style='font-size:12px' class='text-info badge badge-soft-primary'>" . $row['cert_nom'] . "<input class='ml-1' type='checkbox' value='" . $row['id'] . "'></a>";
        }
        echo json_encode($html);
    break;

    default:
        # code...
        break;
}
