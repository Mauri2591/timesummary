<?php

require_once '../config/Conexion.php';
require_once '../model/Eventos.php';

$event = new Eventos;

switch ($_GET['accion']) {
    case 'get_total_eventos':
        echo json_encode($event->get_total_eventos($_SESSION['usu_id']));
        break;

    case 'agregar_primer_evento':
        $event->agregar_primer_evento(
            $_SESSION['usu_id'],
            $_POST['tick_id'],
            $_POST['client_id'],
            $_POST['prod_id'],
            $_POST['tarea_id'],
            $_POST['tick_titulo'],
            $_POST['horas_total'],
            $_POST['horas_restantes'],
            $_POST['horas_consumidas'],
            $_POST['event_descrip'],
            $_POST['fech_ini'],
            $_POST['fech_fin'],
            $_POST['hora_ini'],
            $_POST['hora_fin'],
            $_POST['evento_activo'],
            $_POST['contador'],
            $_POST['creacion_evento'],
            $_POST['est']
        );
        break;

    case 'traer_id_event_para_agregar':
        echo json_encode($event->traer_id_event_para_agregar($_SESSION['usu_id'], $_POST['client_id']));
        break;

    case 'agregar':
        $event->agregar(
            $_POST['event_id'],
            $_SESSION['usu_id'],
            $_POST['tick_id'],
            $_POST['client_id'],
            $_POST['prod_id'],
            $_POST['tarea_id'],
            $_POST['tick_titulo'],
            $_POST['horas_total'],
            $_POST['horas_restantes'],
            $_POST['horas_consumidas'],
            htmlspecialchars($_POST['event_descrip'], ENT_QUOTES, 'UTF-8'),
            $_POST['fech_ini'],
            $_POST['fech_fin'],
            $_POST['hora_ini'],
            $_POST['hora_fin'],
            $_POST['evento_activo'],
            $_POST['contador'],
            $_POST['creacion_evento'],
            $_POST['fecha_finalizacion'],
            $_POST['est']
        );
        break;

    case 'agregar_event_UsuarioDistintoEh': //Insert evento de usuarios != a EH
        $event->agregar(
            $_POST['event_id'],
            $_SESSION['usu_id'],
            $_POST['tick_id'],
            $_POST['client_id'],
            $_POST['prod_id'],
            $_POST['tarea_id'],
            $_POST['tick_titulo'],
            $_POST['horas_total'],
            $_POST['horas_restantes'],
            $_POST['horas_consumidas'],
            htmlspecialchars($_POST['event_descrip'], ENT_QUOTES, 'UTF-8'),
            $_POST['fech_ini'],
            $_POST['fech_fin'],
            $_POST['hora_ini'],
            $_POST['hora_fin'],
            $_POST['evento_activo'],
            $_POST['contador'],
            $_POST['creacion_evento'],
            $_POST['fecha_finalizacion'],
            $_POST['est']
        );
        break;

    case "get_select_tarea":
        $datos = $event->get_select_tarea();
        echo json_encode($datos);
        break;

    case 'get_select_producto':
        $datos = $event->get_select_producto();
        echo json_encode($datos);
        break;

    case 'getDatosPor_id_ticket_y_ref':
        $datos = $event->getDatosPor_id_ticket_y_ref($_POST['id_ticket'], $_SESSION['usu_id']);
        echo json_encode($datos);
        break;

    case 'borrar':
        $datos = $event->delete_evento($_POST['id'], $_SESSION['usu_id']);
        echo json_encode($datos);
        break;

    case 'modificar':
        $datos = $event->update_evento($_POST['id'], $_POST['usu_id'], $_POST['tarea_id'], $_POST['event_descrip']);
        echo json_encode($datos);
        break;

    case 'get_tareas_x_usu_table':
        $datos = $event->get_tareas_x_usu_table($_SESSION['usu_id']);
        if (is_array($datos) && count($datos) > 0) {
            foreach ($datos as $key => $row) {
                $output['cliente_nom'] = $row['cliente_nom'];
                $output['prod_nombre'] = $row['prod_nombre'];
                $output['id_ticket'] =  $row['id_ticket'];
                // $output['cliente_ref'] =  $row['cliente_ref'];
            }
            echo json_encode($datos);
        }
        break;

    case 'get_datos_para_copy':
        echo json_encode($event->get_datos_para_copy($_SESSION['usu_id'], $_POST['id_ticket']));
        break;

    case 'get_event_id_mas_alto_de_evento_x_usu':
        echo json_encode($event->get_event_id_mas_alto_de_evento_x_usu($_SESSION['usu_id'], $_POST['client_id'], $_POST['event_id']));
        break;

    case 'setear_event_inactivo': //Cuando las horas llegan a cero
        $event->setear_event_inactivo($_SESSION['usu_id'], $_POST['event_id']);
        break;

    case 'get_primer_id_eventoContiguo':
        echo json_encode($event->get_primer_id_eventoContiguo($_POST['event_id'], $_SESSION['usu_id']));
        break;

    case 'get_total_actividades_x_event_id':
        echo json_encode($event->get_total_actividades_x_event_id($_POST['event_id'], $_SESSION['usu_id']));
        break;

    case 'get_event_id_mas_alto_de_eventoiContiguo':
        echo json_encode($event->get_event_id_mas_alto_de_eventoiContiguo($_SESSION['usu_id'],$_POST['event_id']));
        break;

    case 'validar_si_existe_un_primer_evento_en_ts_evento':
            echo json_encode($event->validar_si_existe_un_primer_evento_en_ts_evento($_POST['tick_id']));
        break;

        default:
        break;
    }
