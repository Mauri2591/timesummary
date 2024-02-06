<?php
require_once 'config/Conexion.php';
if (isset($_POST['ingresar'])) {
    require_once 'controller/ctrUsuarioLogin.php';
}
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="public/css/style.css">
    <title>Time Summary</title>
    <style>
        #lbl_reset:hover {
            color: #ffd7e4;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="burbujas">
            <span style="--i:11;"></span>
            <span style="--i:12;"></span>
            <span style="--i:24;"></span>
            <span style="--i:10;"></span>
            <span style="--i:14;"></span>
            <span style="--i:26;"></span>
            <span style="--i:18;"></span>
            <span style="--i:16;"></span>
            <span style="--i:19;"></span>
            <span style="--i:20;"></span>
            <span style="--i:22;"></span>
            <span style="--i:18;"></span>
            <span style="--i:15;"></span>
            <span style="--i:26;"></span>
            <span style="--i:17;"></span>
            <span style="--i:13;"></span>
            <span style="--i:23;"></span>
            <span style="--i:28;"></span>

        </div>
    </div>
    <div class="login">
        <h1>Time Summary</h1>
        <form method="post" id="form_login" action="controller/ctrUsuarioLogin.php">
            <table>
                <tr>
                    <th>
                        <input type="text" id="usu_email" name="usu_email" placeholder="Ingrese Email" />
                    </th>
                    <th> <input type="password" id="usu_pass" name="usu_pass" placeholder="Ingrese su password" /></th>
                </tr>
                <tr>
                </tr>
            </table>
            <input type="submit" class="btn btn-primary btn-block btn-large" value="Login" name="ingresar">

            <?php
            if (isset($_GET['p'])) {
                switch ($_GET['p']) {
                    case 'vacios':
            ?>
                        <div>
                            <p class="alerta" style="background-color: #405189; opacity: 50%;box-shadow: 5px 10px 5px gray;padding:5px 10px;border-radius: 5px;text-align:center; color:#fff">Datos vacíos</p>
                        </div>
                        <script>
                            setTimeout(() => {
                                document.querySelector(".alerta").remove();
                            }, 1500);
                        </script>
                    <?php
                        break;
                    case 'error':
                    ?>
                        <div>
                            <p class="alerta" style="background-color: #405189; opacity: 90%;box-shadow: 5px 10px 5px gray;padding:5px 10px;border-radius: 5px;text-align:center; color:#fff; font-family:Verdana, Geneva, Tahoma, sans-serif">Error de datos</p>
                        </div> <?php
                                break;
                            case '3':
                                ?>
                        <div>
                            <p class="alerta" style="background-color: #405189; opacity: 90%;box-shadow: 5px 10px 5px gray;padding:5px 10px;border-radius: 5px;text-align:center; color:#fff; font-family:Verdana, Geneva, Tahoma, sans-serif">Error de datos</p>
                        </div>
                    <?php
                                break;
                            case 'updateUser':
                    ?>
                        <div>
                            <p class="alerta" style="background-color: #405189; opacity: 90%;box-shadow: 5px 10px 5px gray;padding:5px 10px;border-radius: 5px;text-align:center; color:#fff;font-family:Verdana, Geneva, Tahoma, sans-serif">Ingrese con sus nuevas credenciales</p>
                            <?php session_destroy(); ?>
                        </div>
                        <script>
                            setTimeout(() => {
                                document.querySelector(".alerta").remove();
                            }, 1900);
                        </script>
            <?php
                        }
                    }
            ?>
        </form>
    </div>

    <script>
        document.getElementById("lbl_reset").addEventListener("click", function() {
            document.getElementById("usu_dni").removeAttribute("readonly");
            document.getElementById("usu_dni").setAttribute("placeholder", "Habilitado");
            document.getElementById("usu_dni").focus();
        });
        setTimeout(() => {
            document.querySelector(".alerta").remove();
        }, 1500);
    </script>
</body>

</html>