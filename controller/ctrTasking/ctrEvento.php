<?php
require_once '../../config/Conexion.php';
require_once '../../model/Model_Tasking/EventoTasking.php';
$event_tasking=new Evento_Tasking();

switch ($_GET['op_evento_tasking']) {
    case 'get_total_clientes_tasking':
        echo json_encode($event_tasking->get_total_clientes_tasking());
        break;

    case 'get_cliente_x_palabra':
        echo json_encode($event_tasking->get_cliente_x_palabra($_POST['valor_cliente']));
    break;
    
    default:
    break;
}