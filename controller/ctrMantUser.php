<?php

require_once '../config/Conexion.php';
require_once '../model/Usuario.php';
$user = new Usuario();


switch ($_GET['op']) {
    case 'get_datos_usuario': //usuarios x id
        $datos = $user->get_datos_usuario_primera_vez($_SESSION['usu_id']);
        echo json_encode($datos);
        break;

    case 'update_usuario':
        $datos = $user->update_usuario($_SESSION['usu_id'], $_POST['usu_celular'], $_POST['usu_direccion']);
        echo json_encode($datos);
        break;

    case 'get_dni_user_para_reset_password':
        echo json_encode($user->get_dni_user_para_reset_password($_POST['usu_email']));
    break;

    case 'update_usuario_desde_inicio':
        $datos = $user->update_usuario_desde_inicio($_POST['usu_email'], $_POST['usu_pass'], $_POST['contador']);
        echo json_encode($datos);
        break;

    case 'update_datos_usuario_login_primera_vez':
        echo json_encode($user->update_datos_usuario_login_primera_vez(
            $_SESSION['usu_id'],
            $_POST['usu_email'],
            $_POST['usu_nom'],
            $_POST['usu_ape'],
            $_POST['usu_dni'],
            password_hash($_POST['usu_pass'],PASSWORD_DEFAULT),
            $_POST['usu_celular'],
            $_POST['usu_direccion'],
            $_POST['usu_nacimiento']
        ));
        break;

    case 'reset_password':
        $datos = $user->reset_password($_POST['usu_id'], $_POST['usu_email'], password_hash($_POST['usu_pass'], PASSWORD_DEFAULT), $_POST['contador']);
        echo json_encode($datos);
        break;

    case 'get_datos_usuarios':
        $datos = $user->get_datos_usuarios();
        echo json_encode($datos);
        break;

    case 'get_datos_usuarios_select_asignar_tareas':
        echo json_encode($user->get_datos_usuarios_select_asignar_tareas());
        break;

    case 'inser_usuarios':
        $user->inser_usuarios($_POST['usu_rol'], $_POST['usu_sector'], $_POST['usu_dni'], $_POST['usu_email'], $_POST['usu_pass']);
        break;

    case 'delete_usuario_panel_admin':
        echo json_encode($user->delete_usuario_panel_admin($_POST['usu_id']));
        break;

    case 'update_usuario_panel_admin':
        $user->update_usuario_panel_admin($_POST['usu_rol'], $_POST['usu_id'], $_POST['usu_sector']);
        break;

    case 'get_datos_usuario_para_update':
        echo json_encode($user->get_datos_usuario_para_update($_POST['usu_id']));
    break;

    case 'get_dato_rol':
        echo json_encode($user->get_dato_rol($_POST['usu_id']));
        break;

    case 'get_dato_sector':
        echo json_encode($user->get_dato_sector($_POST['usu_id']));
    break;

    case 'update_usuario_rol_y_sector':
        $user->update_usuario_rol_y_sector($_POST['usu_sector'],$_POST['usu_rol'],$_POST['usu_id']);
    break;

    case 'cambiar_estado_usuario':
        $user->cambiar_estado_usuario($_POST['est'],$_POST['usu_id']);
    break;

    case 'get_datos_usuario_para_controlar_privilegios_usuario':
        echo json_encode($user->get_datos_usuario_para_controlar_privilegios_usuario($_POST['usu_id']));
    break;

    case 'get_usuarios_x_rol_x_sector_para_organigrama':
        echo json_encode($user->get_usuarios_x_rol_x_sector_para_organigrama());
    break;

    case 'get_eventoContiguo_activos_contador_1_x_usu':
        echo json_encode($user->get_eventoContiguo_activos_contador_1_x_usu($_POST['usu_id']));
    break;

    case 'update_eventoContiguo_reasignar_a_otros_usuarios':
        $user->update_eventoContiguo_reasignar_a_otros_usuarios($_POST['usu_id'],$_POST['event_id']);
        break;

    default:
    break;
}
