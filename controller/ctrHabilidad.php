<?php
require_once '../config/Conexion.php';
require_once '../model/Habilidades.php';
$hab = new Habilidades();

switch ($_GET["combo_habilidad"]) {

    case 'combo_habilidad':
        $html = '';
        $datos=$hab->combo_habilidad();
        foreach ($datos as $key => $row) {
            $html.="<option value='".$row['id']."'>".$row['nom_combo']."</option>";
        }
        echo json_encode($html);
    break;

    case 'insert':
        $hab->insert_habilidad($_POST['usu_id'], $_POST['combo_hab_id']);
        break;

    case 'get_habilidad_x_usu':
        $datos = $hab->get_habilidad_x_usu($_POST['usu_id']);
        $html = '';
        foreach ($datos as $key => $row) {
            $html = $html . "<a style='font-size:12px' class='text-info badge badge-soft-primary'>" . $row['nom_combo'] . "<input class='ml-1' type='checkbox' value='" . $row['id'] . "'></a>";
        }
        echo json_encode($html);
        break;

    default:
        # code...
        break;
}
