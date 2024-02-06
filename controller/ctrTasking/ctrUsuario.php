<?php
require_once '../../config/Conexion.php';
require_once '../../model/Model_Tasking/UsuarioTasking.php';
$user_tasking=new Usuario_Tasking();

switch ($_GET['op_tasking']) {
    case 'get_datos_session_tasking':
        $user_tasking->get_datos_session_tasking($_SESSION['session_tasking']);
    break;

    case 'get_datos_ticket_x_usu':
        echo json_encode($user_tasking->get_datos_ticket_x_usu($_SESSION['usu_id_tasking']));
        break;

    case 'get_datos_ticket_x_usu':
        $datos=$user_tasking->get_datos_ticket_x_usu($_SESSION['usu_id_tasking']);
        echo json_encode($datos);

    case 'get_datos_para_copy':
        echo json_encode($user_tasking->get_datos_para_copy($_SESSION['usu_id_tasking'],$_POST['tick_id']));
    break;

    case 'getDatosPor_tick_id_y_usu':
        echo json_encode($user_tasking->getDatosPor_tick_id_y_usu($_SESSION['usu_id_tasking'],$_POST['tick_id']));
    break;

    case 'get_datos_ticket_x_usu':
        echo json_encode($user_tasking->get_datos_ticket_x_usu($_SESSION['usu_id_tasking']));
    break;
    
    default:
        # code...
        break;
}