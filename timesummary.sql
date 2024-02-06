-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-01-2024 a las 14:54:52
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `timesummary`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ts_cargos`
--

CREATE TABLE `ts_cargos` (
  `id` int(11) NOT NULL,
  `puesto_nom` varchar(100) NOT NULL,
  `est` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ts_cargos`
--

INSERT INTO `ts_cargos` (`id`, `puesto_nom`, `est`) VALUES
(1, 'Analista', 1),
(2, 'Referente', 1),
(3, 'Líder de equipo', 1),
(4, 'Gerente', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ts_certificaciones`
--

CREATE TABLE `ts_certificaciones` (
  `id` int(11) NOT NULL,
  `id_combo_cert` int(11) NOT NULL,
  `usu_id` int(11) NOT NULL,
  `cert_nom` varchar(255) NOT NULL,
  `fech_crea` date DEFAULT current_timestamp(),
  `fech_elim` date DEFAULT current_timestamp(),
  `est` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ts_certificaciones`
--

INSERT INTO `ts_certificaciones` (`id`, `id_combo_cert`, `usu_id`, `cert_nom`, `fech_crea`, `fech_elim`, `est`) VALUES
(1, 2, 1, 'OSCP', '2023-12-09', '2023-12-09', 1),
(2, 2, 232, 'CCNA', '2023-12-09', '2023-12-09', 1),
(3, 3, 1, 'WEB PHP MYSQL', '2023-12-09', '2023-12-09', 1),
(4, 2, 1, 'cnna', '2023-12-09', '2023-12-09', 1),
(5, 2, 234, 'CCNA', '2023-12-10', '2023-12-10', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ts_certificaciones_combo`
--

CREATE TABLE `ts_certificaciones_combo` (
  `id` int(11) NOT NULL,
  `nom_combo` varchar(255) NOT NULL,
  `est` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ts_certificaciones_combo`
--

INSERT INTO `ts_certificaciones_combo` (`id`, `nom_combo`, `est`) VALUES
(1, 'Ethical Hacking', 1),
(2, 'Redes', 1),
(3, 'Desarrollo', 1),
(4, 'Bases de Datos', 1),
(5, 'Linux', 1),
(6, 'Infraestructura', 1),
(7, 'Microservicios', 1),
(8, 'Gestión', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ts_evento`
--

CREATE TABLE `ts_evento` (
  `event_id` int(11) NOT NULL,
  `usu_id` int(11) NOT NULL,
  `tick_id` varchar(255) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `prod_id` int(11) DEFAULT NULL,
  `tarea_id` int(11) DEFAULT NULL,
  `tick_titulo` varchar(255) NOT NULL,
  `horas_total` varchar(10) DEFAULT NULL,
  `horas_restantes` varchar(10) DEFAULT NULL,
  `horas_consumidas` varchar(10) DEFAULT NULL,
  `event_descrip` varchar(1000) DEFAULT NULL,
  `fech_ini` date DEFAULT NULL,
  `fech_fin` date NOT NULL DEFAULT current_timestamp(),
  `hora_ini` time NOT NULL,
  `hora_fin` time NOT NULL,
  `fecha_evento` datetime DEFAULT current_timestamp(),
  `evento_activo` varchar(4) NOT NULL,
  `contador` int(11) NOT NULL,
  `creacion_evento` varchar(5) NOT NULL,
  `est` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ts_evento`
--

INSERT INTO `ts_evento` (`event_id`, `usu_id`, `tick_id`, `client_id`, `prod_id`, `tarea_id`, `tick_titulo`, `horas_total`, `horas_restantes`, `horas_consumidas`, `event_descrip`, `fech_ini`, `fech_fin`, `hora_ini`, `hora_fin`, `fecha_evento`, `evento_activo`, `contador`, `creacion_evento`, `est`) VALUES
(1, 1, '5', 2, 6, 15, 'CLUB ATLETICO RIVER PLATE', '30', '24', '6', 'inicio', '2024-01-01', '2024-01-01', '09:00:00', '15:00:00', '2024-01-17 01:13:52', 'si', 1, 'si', 1),
(2, 1, '5', 2, 6, 15, 'CLUB ATLETICO RIVER PLATE', '10', '7', '3', 'inicio', '2024-01-05', '2024-01-05', '09:00:00', '12:00:00', '2024-01-17 01:21:32', 'si', 1, 'si', 1),
(3, 249, NULL, 218, 2, 15, 'DE ALZAGA MONICA HELENA', '20', '11', '9', 'inicio', '2024-01-01', '2024-01-01', '09:00:00', '18:00:00', '2024-01-17 01:35:41', 'si', 1, 'si', 1),
(4, 1, '20', 15, 7, 15, 'VOLADOR SA SOMBRERO', '40', '31', '9', 'inicio de tareas', '2024-01-10', '2024-01-10', '09:00:00', '18:00:00', '2024-01-17 19:03:37', 'si', 1, 'si', 1);

--
-- Disparadores `ts_evento`
--
DELIMITER $$
CREATE TRIGGER `after_insert_ts_evento` AFTER INSERT ON `ts_evento` FOR EACH ROW BEGIN
    INSERT INTO ts_eventoContiguo (
        event_id,
        usu_id,
        tick_id,
        client_id,
        prod_id,
        tarea_id,
        tick_titulo,
        horas_total,
        horas_restantes,
        horas_consumidas,
        event_descrip,
        fech_ini,
        fech_fin,
        hora_ini,
        hora_fin,
        evento_activo,
        contador,
        creacion_evento,
        est
    )
    VALUES (
        NEW.event_id,
        NEW.usu_id,
        NEW.tick_id,
        NEW.client_id,
        NEW.prod_id,
        NEW.tarea_id,
        NEW.tick_titulo,
        NEW.horas_total,
        NEW.horas_restantes,
        NEW.horas_consumidas,
        NEW.event_descrip,
        NEW.fech_ini,
        NEW.fech_fin,
        NEW.hora_ini,
        NEW.hora_fin,
        NEW.evento_activo,
        NEW.contador,
        NEW.creacion_evento,
        NEW.est
    );
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ts_eventocontiguo`
--

CREATE TABLE `ts_eventocontiguo` (
  `id` int(11) NOT NULL,
  `event_id` int(11) DEFAULT NULL,
  `usu_id` int(11) NOT NULL,
  `tick_id` varchar(255) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `prod_id` int(11) DEFAULT NULL,
  `tarea_id` int(11) DEFAULT NULL,
  `tick_titulo` varchar(255) NOT NULL,
  `horas_total` varchar(10) DEFAULT NULL,
  `horas_restantes` varchar(10) DEFAULT NULL,
  `horas_consumidas` varchar(10) DEFAULT NULL,
  `event_descrip` varchar(1000) DEFAULT NULL,
  `fech_ini` date DEFAULT NULL,
  `fech_fin` date NOT NULL DEFAULT current_timestamp(),
  `hora_ini` time NOT NULL,
  `hora_fin` time NOT NULL,
  `fecha_evento` datetime DEFAULT current_timestamp(),
  `evento_activo` varchar(4) NOT NULL,
  `contador` int(11) NOT NULL,
  `creacion_evento` varchar(5) NOT NULL,
  `est` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ts_eventocontiguo`
--

INSERT INTO `ts_eventocontiguo` (`id`, `event_id`, `usu_id`, `tick_id`, `client_id`, `prod_id`, `tarea_id`, `tick_titulo`, `horas_total`, `horas_restantes`, `horas_consumidas`, `event_descrip`, `fech_ini`, `fech_fin`, `hora_ini`, `hora_fin`, `fecha_evento`, `evento_activo`, `contador`, `creacion_evento`, `est`) VALUES
(1, 1, 1, '5', 2, 6, 15, 'CLUB ATLETICO RIVER PLATE', '30', '24', '6', 'inicio', '2024-01-01', '2024-01-01', '09:00:00', '15:00:00', '2024-01-17 01:13:52', 'no', 1, 'si', 1),
(4, 1, 1, '5', 2, 6, 3, 'CLUB ATLETICO RIVER PLATE', '24', '15', '9', 'Call', '2024-01-02', '2024-01-02', '09:00:00', '18:00:00', '2024-01-17 01:18:10', 'no', 2, 'no', 1),
(5, 1, 1, '5', 2, 6, 15, 'CLUB ATLETICO RIVER PLATE', '15', '6', '9', 'prueba 4', '2024-01-03', '2024-01-03', '09:00:00', '18:00:00', '2024-01-17 01:18:21', 'no', 2, 'no', 1),
(6, 1, 1, '5', 2, 6, 15, 'CLUB ATLETICO RIVER PLATE', '6', '0', '6', 'final', '2024-01-04', '2024-01-04', '09:00:00', '15:00:00', '2024-01-17 01:18:36', 'no', 0, 'no', 0),
(7, 2, 1, '5', 2, 6, 5, 'CLUB ATLETICO RIVER PLATE', '10', '7', '3', 'inicio', '2024-01-05', '2024-01-05', '09:00:00', '12:00:00', '2024-01-17 01:21:32', 'no', 1, 'si', 1),
(13, 3, 249, NULL, 218, 2, 15, 'DE ALZAGA MONICA HELENA', '20', '11', '9', 'inicio', '2024-01-01', '2024-01-01', '09:00:00', '18:00:00', '2024-01-17 01:35:41', 'si', 1, 'si', 1),
(14, 3, 249, NULL, 218, 7, 15, 'DE ALZAGA MONICA HELENA', '11', '2', '9', 'asdadasds', '2024-01-02', '2024-01-02', '09:00:00', '18:00:00', '2024-01-17 01:36:34', 'si', 2, 'no', 1),
(15, 3, 249, NULL, 218, 7, 15, 'DE ALZAGA MONICA HELENA', '2', '1', '1', 'casi', '2024-01-03', '2024-01-03', '09:00:00', '10:00:00', '2024-01-17 01:37:01', 'si', 2, 'no', 1),
(24, 2, 1, '5', 2, 6, 6, 'CLUB ATLETICO RIVER PLATE', '7', '6', '1', 'call', '2024-01-06', '2024-01-06', '09:00:00', '10:00:00', '2024-01-17 18:15:04', 'no', 2, 'no', 1),
(25, 2, 1, '5', 2, 6, 15, 'CLUB ATLETICO RIVER PLATE', '6', '2', '4', 'prueba', '2024-01-07', '2024-01-07', '09:00:00', '13:00:00', '2024-01-17 18:15:13', 'no', 2, 'no', 1),
(26, 2, 1, '5', 2, 6, 15, 'CLUB ATLETICO RIVER PLATE', '2', '1', '1', 'prueba', '2024-01-08', '2024-01-08', '09:00:00', '10:00:00', '2024-01-17 18:15:22', 'no', 2, 'no', 1),
(27, 2, 1, '5', 2, 6, 15, 'CLUB ATLETICO RIVER PLATE', '1', '0', '1', 'ultimo', '2024-01-09', '2024-01-09', '09:00:00', '10:00:00', '2024-01-17 19:01:17', 'no', 0, 'no', 0),
(28, 4, 1, '20', 15, 7, 3, 'VOLADOR SA SOMBRERO', '40', '31', '9', 'inicio de tareassssssssssss', '2024-01-10', '2024-01-10', '09:00:00', '18:00:00', '2024-01-17 19:03:37', 'si', 1, 'si', 1),
(31, 4, 1, '20', 15, 7, 15, 'VOLADOR SA SOMBRERO', '31', '22', '9', 'prueba', '2024-01-11', '2024-01-11', '09:00:00', '18:00:00', '2024-01-17 19:05:44', 'si', 2, 'no', 1),
(32, 4, 1, '20', 15, 7, 15, 'VOLADOR SA SOMBRERO', '22', '13', '9', 'prueba 3', '2024-01-12', '2024-01-12', '09:00:00', '18:00:00', '2024-01-17 19:05:53', 'si', 2, 'no', 1),
(33, 4, 1, '20', 15, 7, 15, 'VOLADOR SA SOMBRERO', '13', '4', '9', 'prueba', '2024-01-13', '2024-01-13', '09:00:00', '18:00:00', '2024-01-17 19:06:05', 'si', 2, 'no', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ts_evento_predefinido`
--

CREATE TABLE `ts_evento_predefinido` (
  `id` int(11) NOT NULL,
  `titulo` varchar(100) DEFAULT NULL,
  `horainicio` time NOT NULL,
  `horafin` time NOT NULL,
  `colortexto` varchar(100) DEFAULT NULL,
  `colorfondo` varchar(100) DEFAULT NULL,
  `est` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ts_evento_predefinido`
--

INSERT INTO `ts_evento_predefinido` (`id`, `titulo`, `horainicio`, `horafin`, `colortexto`, `colorfondo`, `est`) VALUES
(1, 'Reunión EH - Novedades', '10:00:00', '11:00:00', 'black', 'orange', 1),
(2, 'Pentest CyT', '13:00:00', '18:00:00', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ts_habilidades`
--

CREATE TABLE `ts_habilidades` (
  `id` int(11) NOT NULL,
  `usu_id` int(11) DEFAULT NULL,
  `combo_hab_id` int(11) NOT NULL,
  `fech_crea` date DEFAULT current_timestamp(),
  `fech_elim` date DEFAULT current_timestamp(),
  `est` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ts_habilidades`
--

INSERT INTO `ts_habilidades` (`id`, `usu_id`, `combo_hab_id`, `fech_crea`, `fech_elim`, `est`) VALUES
(1, 1, 2, '2023-12-09', '2023-12-09', 1),
(2, 232, 2, '2023-12-09', '2023-12-09', 1),
(3, 1, 5, '2023-12-09', '2023-12-09', 1),
(4, 234, 2, '2023-12-10', '2023-12-10', 1),
(5, 237, 2, '2023-12-10', '2023-12-10', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ts_habilidades_combo`
--

CREATE TABLE `ts_habilidades_combo` (
  `id` int(11) NOT NULL,
  `nom_combo` varchar(255) NOT NULL,
  `est` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ts_habilidades_combo`
--

INSERT INTO `ts_habilidades_combo` (`id`, `nom_combo`, `est`) VALUES
(1, 'Ethical Hacking', 1),
(2, 'Redes', 1),
(3, 'Desarrollo', 1),
(4, 'Bases de Datos', 1),
(5, 'Linux', 1),
(6, 'Infraestructura', 1),
(7, 'Microservicios', 1),
(8, 'Modelado de Bases de Datos', 1),
(9, 'Gestión', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ts_productos`
--

CREATE TABLE `ts_productos` (
  `prod_id` int(11) NOT NULL,
  `prod_nombre` varchar(255) NOT NULL,
  `fech_crea` date DEFAULT current_timestamp(),
  `fech_elim` date DEFAULT NULL,
  `est` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ts_productos`
--

INSERT INTO `ts_productos` (`prod_id`, `prod_nombre`, `fech_crea`, `fech_elim`, `est`) VALUES
(1, 'Call', '2023-10-26', NULL, 1),
(2, 'Cloud', '2023-10-26', NULL, 1),
(3, 'AntiSpam Solution', '2023-10-26', NULL, 1),
(4, 'APN Privado', '2023-10-26', NULL, 1),
(5, 'Assetsments', '2023-10-26', NULL, 1),
(6, 'Pentest', '2023-10-27', NULL, NULL),
(7, 'VA', '2023-10-28', NULL, 1),
(8, 'Gestión Seguimiento', '2023-10-28', NULL, NULL),
(9, 'Proyectos Propios EH', '2023-10-28', NULL, 1),
(10, 'Incident Response', '2023-10-28', NULL, 1),
(11, 'R + D', '2023-10-28', NULL, 1),
(12, 'SAST', '2023-10-28', NULL, 1),
(13, 'Wireless', '2023-10-28', NULL, 1),
(14, 'Incident & Response', '2023-10-28', NULL, 1),
(15, 'SOC', '2023-10-28', NULL, 1),
(16, 'VA Lite', '2023-10-28', NULL, 1),
(17, 'WIP-CBI', '2023-10-28', NULL, 1),
(18, 'Desarrollo Interno', '2023-10-28', NULL, 1),
(19, 'Implementación de Proyecto', '2023-12-05', NULL, 1),
(20, 'Secure Access NGFW', '2023-12-05', NULL, 1),
(21, 'Secure ID', '2023-12-05', NULL, 1),
(22, 'Secure ID RSA', '2023-12-05', NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ts_roles`
--

CREATE TABLE `ts_roles` (
  `id` int(11) NOT NULL,
  `rol_nom` varchar(100) NOT NULL,
  `est` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ts_roles`
--

INSERT INTO `ts_roles` (`id`, `rol_nom`, `est`) VALUES
(1, 'Usuario', 1),
(2, 'Administrador', 1),
(3, 'Desarrollador', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ts_sector`
--

CREATE TABLE `ts_sector` (
  `id` int(11) NOT NULL,
  `sector_nom` varchar(100) NOT NULL,
  `est` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ts_sector`
--

INSERT INTO `ts_sector` (`id`, `sector_nom`, `est`) VALUES
(1, 'EH', 1),
(2, 'Calidad Y Procesos', 1),
(3, 'SOC', 1),
(4, 'SASE', 1),
(5, 'MSSP', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ts_sessiones`
--

CREATE TABLE `ts_sessiones` (
  `id_session` int(11) NOT NULL,
  `session_vulmaGestion` varchar(100) NOT NULL,
  `session_timesummary` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `est` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ts_sessiones`
--

INSERT INTO `ts_sessiones` (`id_session`, `session_vulmaGestion`, `session_timesummary`, `Nombre`, `est`) VALUES
(1, '36', 1, 'Mauricio', 1),
(2, '1', 2, 'Facundo', 1),
(3, '3', 3, 'Rodrigo', 1),
(4, '29', 4, 'Luciana', 1),
(5, '31', 5, 'Jose Dalbion', 1),
(6, '32', 6, 'Mauro', 1),
(7, '33', 7, 'Ramiro Gallo', 1),
(8, '39', 8, 'Daniel Losa', 1),
(9, '41', 9, 'Agustín Becerra', 1),
(10, '49', 10, 'Carina Martinez', 1),
(11, '2', 11, 'Hector Baquero', 1),
(12, '51', 230, 'Luis Gonzalez', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ts_tareas`
--

CREATE TABLE `ts_tareas` (
  `tarea_id` int(11) NOT NULL,
  `tarea_nombre` varchar(255) NOT NULL,
  `fech_crea` date DEFAULT current_timestamp(),
  `fech_elim` date DEFAULT NULL,
  `est` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ts_tareas`
--

INSERT INTO `ts_tareas` (`tarea_id`, `tarea_nombre`, `fech_crea`, `fech_elim`, `est`) VALUES
(2, 'ABM', '2023-10-26', NULL, 1),
(3, 'Actualización', '2023-10-26', NULL, 1),
(4, 'Administrativa', '2023-10-26', NULL, 1),
(5, 'Autocapacitación', '2023-10-28', NULL, 1),
(6, 'Call', '2023-10-28', NULL, 1),
(7, 'Capacitación Interna', '2023-10-29', NULL, 1),
(8, 'Demo', '2023-10-29', NULL, 1),
(9, 'Desarrollo', '2023-10-29', NULL, 1),
(10, 'Documentación', '2023-10-29', NULL, 1),
(11, 'Evaluación de Proveedor', '2023-10-29', NULL, 1),
(12, 'Implementación', '2023-10-29', NULL, 1),
(13, 'POC', '2023-10-29', NULL, 1),
(14, 'Prenventa', '2023-10-29', NULL, 1),
(15, 'Servicio', '2023-10-29', NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ts_usuario`
--

CREATE TABLE `ts_usuario` (
  `usu_id` int(11) NOT NULL,
  `id_session` int(11) DEFAULT NULL,
  `usu_rol` int(11) NOT NULL,
  `usu_sector` int(11) NOT NULL,
  `usu_nom` varchar(100) NOT NULL,
  `usu_ape` varchar(100) NOT NULL,
  `usu_dni` varchar(15) DEFAULT NULL,
  `usu_email` varchar(100) NOT NULL,
  `usu_pass` varchar(100) NOT NULL,
  `usu_celular` varchar(25) DEFAULT NULL,
  `usu_direccion` varchar(255) DEFAULT NULL,
  `usu_nacimiento` varchar(25) DEFAULT NULL,
  `fech_crea` date NOT NULL DEFAULT current_timestamp(),
  `fech_elim` date DEFAULT NULL,
  `contador` int(11) NOT NULL,
  `est` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ts_usuario`
--

INSERT INTO `ts_usuario` (`usu_id`, `id_session`, `usu_rol`, `usu_sector`, `usu_nom`, `usu_ape`, `usu_dni`, `usu_email`, `usu_pass`, `usu_celular`, `usu_direccion`, `usu_nacimiento`, `fech_crea`, `fech_elim`, `contador`, `est`) VALUES
(1, 1, 2, 1, 'Mauricio Raul', 'Gonzalez', '36.723.083', 'mrgonzalez@teco.com.ar', '$2y$10$uMwm8uU98L5CYtO4HRsSZen.q.xgqeyNDw.TsovRigY65cA4e3V0.', '1155726864', '', '25/12/1991', '2023-12-04', NULL, 1, 1),
(2, 2, 2, 1, 'Facundo', 'Jesus', '22.568.325', 'flestard@teco.com.ar', '$2y$10$ixlqZEzfoaRFnPwtivl5feF5Xn5uFzUQ358NrtKXx7trZymZcxuQy', '1155447788', 'beiro 882', '09/12/1989', '2023-12-07', NULL, 1, 1),
(3, 3, 1, 1, '', '', '', 'rdarias@teco.com.ar', 'admin', NULL, NULL, NULL, '2023-12-04', NULL, 0, 1),
(4, 4, 2, 2, '', '', '', 'legiarda@teco.com.ar', 'admin', NULL, NULL, NULL, '2023-12-04', NULL, 0, 1),
(5, 5, 2, 2, '', '', '', 'jadaboingaliano@teco.com.ar', 'admin', NULL, NULL, NULL, '2023-12-04', NULL, 0, 1),
(6, 6, 1, 1, '', '', '', 'miangellotti@teco.com.ar', 'admin', NULL, NULL, NULL, '2023-12-04', NULL, 0, 1),
(7, 7, 1, 1, '', '', '', 'regallo@teco.com.ar', 'admin', NULL, NULL, NULL, '2023-12-04', NULL, 0, 1),
(8, 8, 1, 1, '', '', '', 'dalosa@teco.com.ar', 'admin', NULL, NULL, NULL, '2023-12-04', NULL, 0, 1),
(9, 9, 1, 1, '', '', '', 'aebecerra@teco.com.ar', 'admin', NULL, NULL, NULL, '2023-12-04', NULL, 0, 1),
(10, 10, 2, 2, '', '', '', 'cvmartinez@teco.com.ar', 'admin', NULL, NULL, NULL, '2023-12-04', NULL, 0, 1),
(11, 11, 2, 1, '', '', '', 'hamartinezbaquero@teco.com.ar', 'admin', NULL, NULL, NULL, '2023-12-05', NULL, 0, 1),
(249, NULL, 1, 2, 'Prueba', 'Prueba Apellido', '20.254.021', 'prueba2@teco.com.ar', '$2y$10$Ngs42xDsYAUZkra1UCBZCusXE16xUrJcfLUErfiqgmdIn3Y957uIK', '1155447788', 'Francisco Beiró 882', '16/01/1988', '2024-01-16', NULL, 1, 1);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_tm_categoria`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `v_tm_categoria` (
`cat_id` int(11)
,`cat_nom` varchar(150)
,`est` int(11)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_tm_cliente`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `v_tm_cliente` (
`client_id` int(11)
,`client_rs` varchar(250)
,`client_cuit` varchar(255)
,`client_correo` varchar(250)
,`client_tel` varchar(255)
,`est` int(11)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_tm_pais`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `v_tm_pais` (
`pais_id` int(11)
,`pais_nombre` varchar(100)
,`est` int(11)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_tm_ticket`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `v_tm_ticket` (
`tick_id` int(11)
,`usu_id` int(11)
,`cat_id` int(11)
,`cats_id` int(11)
,`tick_titulo` varchar(250)
,`client_id` int(11)
,`uninegocio_id` int(11)
,`pais_id` int(11)
,`refPro` varchar(255)
,`fechaVentive` date
,`fechaIni` date
,`fechaFin` date
,`tick_descrip` mediumtext
,`ips` varchar(10000)
,`urls` varchar(10000)
,`tick_estado` varchar(15)
,`estados_id` int(11)
,`fech_crea` datetime
,`usu_asig` int(11)
,`fech_asig` datetime
,`tick_estre` int(11)
,`tick_coment` text
,`fech_cierre` datetime
,`prio_id` int(11)
,`est` int(11)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_tm_usuario`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `v_tm_usuario` (
`usu_id` int(11)
,`usu_nom` varchar(150)
,`usu_ape` varchar(150)
,`usu_correo` varchar(150)
,`usu_pass` varchar(150)
,`rol_id` int(11)
,`usu_telf` varchar(12)
,`fech_crea` datetime
,`fech_modi` datetime
,`fech_elim` datetime
,`est` int(11)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `v_tm_categoria`
--
DROP TABLE IF EXISTS `v_tm_categoria`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_tm_categoria`  AS SELECT `vulma_gestion`.`tm_categoria`.`cat_id` AS `cat_id`, `vulma_gestion`.`tm_categoria`.`cat_nom` AS `cat_nom`, `vulma_gestion`.`tm_categoria`.`est` AS `est` FROM `vulma_gestion`.`tm_categoria``tm_categoria`  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `v_tm_cliente`
--
DROP TABLE IF EXISTS `v_tm_cliente`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_tm_cliente`  AS SELECT `vulma_gestion`.`clientes`.`client_id` AS `client_id`, `vulma_gestion`.`clientes`.`client_rs` AS `client_rs`, `vulma_gestion`.`clientes`.`client_cuit` AS `client_cuit`, `vulma_gestion`.`clientes`.`client_correo` AS `client_correo`, `vulma_gestion`.`clientes`.`client_tel` AS `client_tel`, `vulma_gestion`.`clientes`.`est` AS `est` FROM `vulma_gestion`.`clientes``clientes`  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `v_tm_pais`
--
DROP TABLE IF EXISTS `v_tm_pais`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_tm_pais`  AS SELECT `vulma_gestion`.`tm_pais`.`pais_id` AS `pais_id`, `vulma_gestion`.`tm_pais`.`pais_nombre` AS `pais_nombre`, `vulma_gestion`.`tm_pais`.`est` AS `est` FROM `vulma_gestion`.`tm_pais``tm_pais`  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `v_tm_ticket`
--
DROP TABLE IF EXISTS `v_tm_ticket`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_tm_ticket`  AS SELECT `vulma_gestion`.`tm_ticket`.`tick_id` AS `tick_id`, `vulma_gestion`.`tm_ticket`.`usu_id` AS `usu_id`, `vulma_gestion`.`tm_ticket`.`cat_id` AS `cat_id`, `vulma_gestion`.`tm_ticket`.`cats_id` AS `cats_id`, `vulma_gestion`.`tm_ticket`.`tick_titulo` AS `tick_titulo`, `vulma_gestion`.`tm_ticket`.`client_id` AS `client_id`, `vulma_gestion`.`tm_ticket`.`uninegocio_id` AS `uninegocio_id`, `vulma_gestion`.`tm_ticket`.`pais_id` AS `pais_id`, `vulma_gestion`.`tm_ticket`.`refPro` AS `refPro`, `vulma_gestion`.`tm_ticket`.`fechaVentive` AS `fechaVentive`, `vulma_gestion`.`tm_ticket`.`fechaIni` AS `fechaIni`, `vulma_gestion`.`tm_ticket`.`fechaFin` AS `fechaFin`, `vulma_gestion`.`tm_ticket`.`tick_descrip` AS `tick_descrip`, `vulma_gestion`.`tm_ticket`.`ips` AS `ips`, `vulma_gestion`.`tm_ticket`.`urls` AS `urls`, `vulma_gestion`.`tm_ticket`.`tick_estado` AS `tick_estado`, `vulma_gestion`.`tm_ticket`.`estados_id` AS `estados_id`, `vulma_gestion`.`tm_ticket`.`fech_crea` AS `fech_crea`, `vulma_gestion`.`tm_ticket`.`usu_asig` AS `usu_asig`, `vulma_gestion`.`tm_ticket`.`fech_asig` AS `fech_asig`, `vulma_gestion`.`tm_ticket`.`tick_estre` AS `tick_estre`, `vulma_gestion`.`tm_ticket`.`tick_coment` AS `tick_coment`, `vulma_gestion`.`tm_ticket`.`fech_cierre` AS `fech_cierre`, `vulma_gestion`.`tm_ticket`.`prio_id` AS `prio_id`, `vulma_gestion`.`tm_ticket`.`est` AS `est` FROM `vulma_gestion`.`tm_ticket``tm_ticket`  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `v_tm_usuario`
--
DROP TABLE IF EXISTS `v_tm_usuario`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_tm_usuario`  AS SELECT `vulma_gestion`.`tm_usuario`.`usu_id` AS `usu_id`, `vulma_gestion`.`tm_usuario`.`usu_nom` AS `usu_nom`, `vulma_gestion`.`tm_usuario`.`usu_ape` AS `usu_ape`, `vulma_gestion`.`tm_usuario`.`usu_correo` AS `usu_correo`, `vulma_gestion`.`tm_usuario`.`usu_pass` AS `usu_pass`, `vulma_gestion`.`tm_usuario`.`rol_id` AS `rol_id`, `vulma_gestion`.`tm_usuario`.`usu_telf` AS `usu_telf`, `vulma_gestion`.`tm_usuario`.`fech_crea` AS `fech_crea`, `vulma_gestion`.`tm_usuario`.`fech_modi` AS `fech_modi`, `vulma_gestion`.`tm_usuario`.`fech_elim` AS `fech_elim`, `vulma_gestion`.`tm_usuario`.`est` AS `est` FROM `vulma_gestion`.`tm_usuario``tm_usuario`  ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ts_cargos`
--
ALTER TABLE `ts_cargos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ts_certificaciones`
--
ALTER TABLE `ts_certificaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ts_certificaciones_combo`
--
ALTER TABLE `ts_certificaciones_combo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ts_evento`
--
ALTER TABLE `ts_evento`
  ADD PRIMARY KEY (`event_id`);

--
-- Indices de la tabla `ts_eventocontiguo`
--
ALTER TABLE `ts_eventocontiguo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ts_evento_predefinido`
--
ALTER TABLE `ts_evento_predefinido`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ts_habilidades`
--
ALTER TABLE `ts_habilidades`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ts_habilidades_combo`
--
ALTER TABLE `ts_habilidades_combo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ts_productos`
--
ALTER TABLE `ts_productos`
  ADD PRIMARY KEY (`prod_id`);

--
-- Indices de la tabla `ts_roles`
--
ALTER TABLE `ts_roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ts_sector`
--
ALTER TABLE `ts_sector`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ts_sessiones`
--
ALTER TABLE `ts_sessiones`
  ADD PRIMARY KEY (`id_session`);

--
-- Indices de la tabla `ts_tareas`
--
ALTER TABLE `ts_tareas`
  ADD PRIMARY KEY (`tarea_id`);

--
-- Indices de la tabla `ts_usuario`
--
ALTER TABLE `ts_usuario`
  ADD PRIMARY KEY (`usu_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ts_cargos`
--
ALTER TABLE `ts_cargos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `ts_certificaciones`
--
ALTER TABLE `ts_certificaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `ts_certificaciones_combo`
--
ALTER TABLE `ts_certificaciones_combo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `ts_evento`
--
ALTER TABLE `ts_evento`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `ts_eventocontiguo`
--
ALTER TABLE `ts_eventocontiguo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `ts_evento_predefinido`
--
ALTER TABLE `ts_evento_predefinido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `ts_habilidades`
--
ALTER TABLE `ts_habilidades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `ts_habilidades_combo`
--
ALTER TABLE `ts_habilidades_combo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `ts_productos`
--
ALTER TABLE `ts_productos`
  MODIFY `prod_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `ts_roles`
--
ALTER TABLE `ts_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `ts_sector`
--
ALTER TABLE `ts_sector`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `ts_sessiones`
--
ALTER TABLE `ts_sessiones`
  MODIFY `id_session` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `ts_tareas`
--
ALTER TABLE `ts_tareas`
  MODIFY `tarea_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `ts_usuario`
--
ALTER TABLE `ts_usuario`
  MODIFY `usu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=252;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
