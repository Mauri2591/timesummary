<?php
class Graficos extends Conexion
{

    public function get_total_productos_brindados()
    {
        $conn = parent::conectar();
        $sql = "SELECT COUNT(*) AS total FROM ts_eventoContiguo_creacion";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        return $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_total_tareas_en_proceso()
    {
        $conn = parent::conectar();
        $sql = "SELECT ts_tareas.tarea_nombre AS nombre_tareas, count(*) AS total FROM tm_ticket 
                        INNER JOIN ts_tareas ON ts_tareas.tarea_id=tm_ticket.tarea_id 
                        WHERE tm_ticket.est=1 GROUP BY ts_tareas.tarea_nombre ORDER BY total DESC";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        return $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_total_proyectos_creados()
    {
        $conn = parent::conectar();
        $sql = "SELECT COUNT(prod_id) AS total FROM ts_evento WHERE creacion_evento = 'si' AND est = 1";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        return $registro = $stmt->fetchALL(PDO::FETCH_ASSOC);
    }

    public function get_total_proyetos_activos()
    {
        $conn = parent::conectar();
        $sql = "SELECT count(*) as total FROM ts_eventoContiguo";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        return $registro = $stmt->fetchALL(PDO::FETCH_ASSOC);
    }

    public function get_tota_tareas_finalizadas()
    {
        $conn = parent::conectar();
        $sql = "SELECT count(*) AS total FROM `ts_eventoContiguo` WHERE evento_activo='no' AND contador =1";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        return $registro = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function get_total_max_x_cada_servicio()
    {
        $conn = parent::conectar();
        $sql = "SELECT
        (SELECT ts_productos.prod_nombre
         FROM ts_eventoContiguo
         INNER JOIN ts_productos ON ts_eventoContiguo.prod_id = ts_productos.prod_id
         GROUP BY ts_productos.prod_nombre
         ORDER BY COUNT(*) DESC
         LIMIT 1) AS prod_nombre_maximo,
        MAX(total) AS maximo_total
    FROM (
        SELECT
            COUNT(*) AS total,
            ts_productos.prod_nombre
        FROM
            ts_eventoContiguo
        INNER JOIN
            ts_productos ON ts_eventoContiguo.prod_id = ts_productos.prod_id WHERE contador = 1
        GROUP BY
            ts_productos.prod_nombre
    ) AS subconsulta";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        return $registro = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_total_max_ts_evento_x_cada_servicio()
    {
        $conn = parent::conectar();
        $sql = "SELECT COUNT(*) AS total, ts_productos.prod_nombre FROM ts_evento INNER JOIN ts_productos 
            ON ts_evento.prod_id = ts_productos.prod_id GROUP BY ts_productos.prod_nombre ORDER BY total 
            DESC LIMIT 3";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        return $registro = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_total_eventos_activos()
    {
        $conn = parent::conectar();
        $sql = "SELECT COUNT(*) AS total from ts_eventocontiguo WHERE evento_activo ='si' AND contador = 1";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_total_horas_por_proy()
    {
        $conn = parent::conectar();
        $sql = "SELECT 
        tick_titulo, 
        horas_total,
        ts_usuario.usu_nom AS usuario, 
        ts_productos.prod_nombre AS producto, 
        ts_tareas.tarea_nombre AS tarea, 
        ts_sector.sector_nom AS sector 
    FROM 
        ts_eventocontiguo
    INNER JOIN 
        ts_usuario ON ts_eventocontiguo.usu_id = ts_usuario.usu_id
    INNER JOIN 
        ts_productos ON ts_eventocontiguo.prod_id = ts_productos.prod_id
    INNER JOIN 
        ts_tareas ON ts_eventocontiguo.tarea_id = ts_tareas.tarea_id
    INNER JOIN 
        ts_sector ON ts_usuario.usu_sector = ts_sector.id
    WHERE 
        evento_activo = 'si' AND ts_eventocontiguo.contador = 1";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_total_tareas_creadas()
    {
        $conn = parent::conectar();
        $sql = "SELECT COUNT(*) AS total FROM ts_eventocontiguo";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_total_tareas_activas()
    {
        $conn = parent::conectar();
        $sql = "SELECT COUNT(*) AS total FROM ts_eventocontiguo WHERE evento_activo='si'";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_total_tarea_max()
    {
        $conn = parent::conectar();
        $sql = "SELECT COUNT(*) AS total, ts_tareas.tarea_nombre AS tarea FROM ts_eventocontiguo INNER JOIN ts_tareas 
                ON ts_eventocontiguo.tarea_id = ts_tareas.tarea_id GROUP BY tarea ORDER BY total DESC LIMIT 1";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_total_tareas_bar_char()
    {
        $conn = parent::conectar();
        $sql = "SELECT COUNT(*) AS total, ts_usuario.usu_nom,tick_titulo, ts_tareas.tarea_nombre AS tarea 
        FROM ts_eventocontiguo INNER JOIN ts_tareas ON ts_eventocontiguo.tarea_id = ts_tareas.tarea_id 
        INNER JOIN ts_usuario on ts_eventocontiguo.usu_id=ts_usuario.usu_id WHERE evento_activo='si' GROUP BY tarea ORDER BY tick_titulo";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_horas_consumidas_ultimo_valor($event_id)
    {
        $conn = parent::conectar();
        $sql = "SELECT SUM(horas_consumidas) AS suma_horas_consumidas, horas_total FROM ts_eventocontiguo WHERE event_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $event_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_datos_tareas()
    {
        $conn = parent::conectar();
        $sql = "WITH RankedEvents AS (
            SELECT 
                ec.id AS eventocontiguo_id, 
                ec.event_id, 
                tt.tarea_nombre AS tarea,
    			tp.prod_nombre AS producto,
                ec.tick_titulo, 
                tu.usu_nom AS nom_usuario, 
                ts.sector_nom, 
                ec.horas_total, 
                te.horas_total AS horas_total_inicial,
                ec.horas_consumidas, 
                ec.horas_restantes, 
    			ec.evento_activo,
                ROW_NUMBER() OVER (PARTITION BY ec.event_id ORDER BY ec.id DESC) AS RowNum,
                COUNT(*) OVER (PARTITION BY ec.event_id) AS total 
            FROM 
                ts_eventocontiguo ec
            INNER JOIN 
                ts_tareas tt ON ec.tarea_id = tt.tarea_id 
    		INNER JOIN ts_productos tp ON ec.prod_id = tp.prod_id
            INNER JOIN 
                ts_usuario tu ON ec.usu_id = tu.usu_id 
            INNER JOIN 
                ts_sector ts ON tu.usu_sector = ts.id 
            INNER JOIN 
                ts_evento te ON ec.event_id = te.event_id
            WHERE 
                ec.evento_activo = 'si'
        )
        SELECT 
            eventocontiguo_id, 
            event_id, 
            tarea,
            producto,
            tick_titulo, 
            nom_usuario, 
            sector_nom, 
            horas_total, 
            horas_total_inicial,
            evento_activo,
            -- Subconsulta para obtener sum_horas_consumidas
            (SELECT SUM(ec2.horas_consumidas) FROM ts_eventocontiguo ec2 WHERE ec2.event_id = re.event_id) AS horas_consumidas,
            horas_restantes, 
            total
        FROM 
            RankedEvents re
        WHERE 
            RowNum = 1
        ORDER BY 
            eventocontiguo_id DESC";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    //Este fue reemplazado por el de abajo;
    // public function get_detalle_total_tareas() 
    // {
    //     $conn = parent::conectar();
    //     $sql = "SELECT ts_eventocontiguo.*, ts_usuario.usu_nom, ts_usuario.usu_sector, ts_sector.sector_nom, 
    //         ts_tareas.tarea_nombre, ts_productos.prod_nombre FROM ts_eventocontiguo INNER JOIN ts_usuario 
    //         ON ts_usuario.usu_id = ts_eventocontiguo.usu_id INNER JOIN ts_productos 
    //         ON ts_eventocontiguo.prod_id = ts_productos.prod_id INNER JOIN ts_tareas 
    //         ON ts_eventocontiguo.tarea_id = ts_tareas.tarea_id INNER JOIN ts_sector 
    //         ON ts_usuario.usu_sector=ts_sector.id WHERE ts_eventocontiguo.contador = 1";
    //     $stmt = $conn->prepare($sql);
    //     $stmt->execute();
    //     return $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    // }

    public function get_detalle_total_tareas()
    {
        $conn = parent::conectar();
        $sql = "WITH RankedEvents AS (
            SELECT 
                ec.id AS eventocontiguo_id, 
                ec.event_id, 
                tt.tarea_nombre AS tarea,
    			tp.prod_nombre AS producto,
                ec.tick_titulo, 
                tu.usu_nom AS nom_usuario, 
                ts.sector_nom, 
                ec.horas_total, 
                te.horas_total AS horas_total_inicial,
                ec.horas_consumidas, 
                ec.horas_restantes, 
    			ec.evento_activo,
                ROW_NUMBER() OVER (PARTITION BY ec.event_id ORDER BY ec.id DESC) AS RowNum,
                COUNT(*) OVER (PARTITION BY ec.event_id) AS total 
            FROM 
                ts_eventocontiguo ec
            INNER JOIN 
                ts_tareas tt ON ec.tarea_id = tt.tarea_id 
    		INNER JOIN ts_productos tp ON ec.prod_id = tp.prod_id
            INNER JOIN 
                ts_usuario tu ON ec.usu_id = tu.usu_id 
            INNER JOIN 
                ts_sector ts ON tu.usu_sector = ts.id 
            INNER JOIN 
                ts_evento te ON ec.event_id = te.event_id
        )
        SELECT 
            eventocontiguo_id, 
            event_id, 
            tarea,
            producto,
            tick_titulo, 
            nom_usuario, 
            sector_nom, 
            horas_total, 
            horas_total_inicial,
            evento_activo,
            -- Subconsulta para obtener sum_horas_consumidas
            (SELECT SUM(ec2.horas_consumidas) FROM ts_eventocontiguo ec2 WHERE ec2.event_id = re.event_id) AS horas_consumidas,
            horas_restantes, 
            total
        FROM 
            RankedEvents re
        WHERE 
            RowNum = 1
        ORDER BY 
            eventocontiguo_id DESC";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        return $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }



    public function get_datos_tareas_x_event_id($event_id)
    {
        $conn = parent::conectar();
        $sql = "SELECT ts_eventocontiguo.*, ts_tareas.tarea_nombre AS tarea, ts_productos.prod_nombre AS producto, 
        ts_usuario.usu_nom AS usuario FROM ts_eventocontiguo INNER JOIN ts_tareas 
        ON ts_eventocontiguo.tarea_id=ts_tareas.tarea_id INNER JOIN ts_productos ON 
        ts_eventocontiguo.prod_id=ts_productos.prod_id INNER JOIN ts_usuario ON 
        ts_eventocontiguo.usu_id=ts_usuario.usu_id WHERE event_id = ? and evento_activo='si'";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $event_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_datos_tareas_datatables_detalle($event_id)
    {
        $conn = parent::conectar();
        $sql = "SELECT ts_eventocontiguo.*, ts_tareas.tarea_nombre AS tarea, ts_productos.prod_nombre AS producto, 
                ts_usuario.usu_nom AS usuario, ts_sector.sector_nom as sector FROM ts_eventocontiguo 
                INNER JOIN ts_tareas ON ts_eventocontiguo.tarea_id=ts_tareas.tarea_id INNER JOIN ts_productos 
                ON ts_eventocontiguo.prod_id=ts_productos.prod_id INNER JOIN ts_usuario 
                ON ts_eventocontiguo.usu_id=ts_usuario.usu_id INNER JOIN ts_sector 
                on ts_usuario.usu_sector=ts_sector.id WHERE event_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(1, $event_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
