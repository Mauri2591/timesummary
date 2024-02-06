https://www.youtube.com/watch?v=W-ikSIdz4W0

1_Crear la estructura MVC  
1_CREAR archivo config con 2 conexiones, una a la BD de Timesummary y otra a la de Vulma Gestión.
3_Crear carpeta de Models.
    1_ Crear todos los archivos Models del Timesummary.
    2_ Crear carpeta Model_VulmaGestion con los Models de Vulma Gestión.
        1_crear el archivo UsuarioVulma.php
            1_class Usuario_Vulma extends ConexionVulma{}
                a_el método get_datos_session_vulma($ts_session){} nos da todos los datos de la sessión que vincula con Vulma Gestión, para ello requiere el parámetro ts_session, este parametro se tiene que crear en la DB de Vulma Gestión, tabla tm_usuario, valores del parámetro: "ts_session INT NOT NULL" y debe contener los valores de usu_id de la BD timesummary, tabla ts_usuario, es decir que: ts_usuario.usu_id tiene que ser igual a tm_usuario.ts_session;
                Para ello se creó una tabla en la DB timemsummary llamada ts_sessiones.

*Los usuarios se crean por primera vez:
    1_model: inser_usuarios($usu_rol,$usu_sector,$usu_email,$usu_pass)# timesummary

*Vista para modificar los usuarios:
    1_Campo db key_perfil = eh2023

$-CAMBIO A POSTERIOR-$: Descomentar el código de la línea 73 y 109 para agregar eventos predefinidos.

$-Para agregar usuarios en Timmesumary, también hay que agregarlos en la tabla ts_sessiones, el campo session_tasking puede ser nulo.

$-La vista de tareas a trabajar las traigo de Model/Model/Tasking/UsuarioTasking.php# timesummary
