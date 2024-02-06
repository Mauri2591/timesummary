<?php
require_once '../../config/Conexion.php';
session_destroy();
header("location:".URL);
exit();
?>