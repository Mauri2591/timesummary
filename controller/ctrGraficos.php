<?php
require_once '../config/Conexion.php';
require_once '../model/Graficos.php';

$grafico= new Graficos();
switch ($_GET['op_grafico']) {
    case 'get_total_productos_brindados':
        echo json_encode($datos=$grafico->get_total_productos_brindados());
        break;
    
    case 'get_total_tareas_en_proceso':
        echo json_encode($grafico->get_total_tareas_en_proceso());
    break;

    case 'get_total_proyectos_creados':
        echo json_encode($grafico->get_total_proyectos_creados());
    break;

    case 'get_tota_eventos_activos':
        echo json_encode($grafico->get_total_proyetos_activos());
    break;

    case 'get_tota_tareas_finalizadas':
        echo json_encode($grafico->get_tota_tareas_finalizadas());
    break;

    case 'get_total_max_x_cada_servicio':
        echo json_encode($grafico->get_total_max_x_cada_servicio());
    break;

    case 'get_total_max_ts_evento_x_cada_servicio':
        echo json_encode($grafico->get_total_max_ts_evento_x_cada_servicio());
    break;

    case 'get_total_eventos_activos':
        echo json_encode($grafico->get_total_eventos_activos());
    break;

    case 'get_total_horas_por_proy':
        echo json_encode($grafico->get_total_horas_por_proy());
    break;

    case 'get_total_tareas_creadas':
        echo json_encode($grafico->get_total_tareas_creadas());
    break;

    case 'get_total_tareas_activas':
        echo json_encode($grafico->get_total_tareas_activas());
    break;

    case 'get_total_tarea_max':
        echo json_encode($grafico->get_total_tarea_max());
    break;

    case 'get_total_tareas_bar_char':
        echo json_encode($grafico->get_total_tareas_bar_char());
    break;

    case 'get_horas_consumidas_ultimo_valor':
        echo json_encode($grafico->get_horas_consumidas_ultimo_valor($_POST['event_id']));
    break;

    case 'get_datos_tareas':
            echo json_encode($grafico->get_datos_tareas());
    break;
    
    case 'get_datos_tareas_x_event_id':
            echo json_encode($grafico->get_datos_tareas_x_event_id($_POST['event_id']));
    break;

    // Inicio Datatable tareas
    case 'get_detalle_total_tareas':
        $datos = $grafico->get_detalle_total_tareas();
        $data = Array();
        foreach ($datos as $row) {
            $sub_array = array();
            $sub_array[] = $row['tick_titulo'];
            $sub_array[] = $row['horas_total_inicial'];
            $sub_array[] = $row['horas_consumidas'];
            $sub_array[] = $row['horas_restantes'];
            $sub_array[] = $row['sector_nom'] == "Calidad Y Procesos" ? "Calidad" : $row['sector_nom'];
            $sub_array[] = $row['tarea'];
            $sub_array[] = $row['producto'];
            $sub_array[] = $row['evento_activo'] == "si" ? '<span data-toggle="tooltip" data-placement="top" title="Ver actividades creadas" style="cursor:pointer" id="btnVerDetalleTarea" onclick="btnVerDetalleTarea('.$row['event_id'].')" class="badge badge-gradient-warning">Activo</span>' : '<span data-toggle="tooltip" data-placement="top" title="Ver actividades creadas" style="cursor:pointer" class="badge badge-gradient-info" id="btnVerDetalleTarea" onclick="btnVerDetalleTarea('.$row['event_id'].')">Finalizado</span>';            
            $data[] = $sub_array;
        }
        $results = array(
            "sEcho" => 1,
            "iTotalRecords" => count($data),
            "iTotalDisplayRecords" => count($data),
            "aaData" => $data
        );
        echo json_encode($results);
        break;
    // Fin Datatable tareas

    //Inicio detalle Datatable tareas
    case 'get_datos_tareas_datatables_detalle':
        $datos=$grafico->get_datos_tareas_datatables_detalle($_POST['event_id']);
        $data=Array();
        if(is_array($datos) && count($datos)>0){
            foreach ($datos as $key => $row) {
                $sub_array = array();
                $sub_array[] = $row['producto'];
                $sub_array[] = $row['tarea'];
                $sub_array[] = $row['sector'];
                $sub_array[] = $row['event_descrip'];
                $sub_array[] = $row['usuario'];
                $sub_array[] = $row['horas_total'];
                $sub_array[] = $row['horas_consumidas'];
                $sub_array[] = $row['horas_restantes'];
                $sub_array[] = $row['fech_ini'];
                $sub_array[] = $row['fech_fin'];
                $data[] = $sub_array;
            }
            $results = array(
                "sEcho" => 1,
                "iTotalRecords" => count($data),
                "iTotalDisplayRecords" => count($data),
                "aaData" => $data
            );
            echo json_encode($results);
        }
        break;
        //Fin detalle Datatable tareas

        case 'get_datos_tareas_datatables_detalle_cliente':
            echo json_encode($grafico->get_datos_tareas_datatables_detalle($_POST['event_id']));
            break;

    default:
    break;
}