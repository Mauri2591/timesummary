function init(){

}

$(document).ready(function () {

    $.post("../../ctrMantUser.php?op=get_usuarios_x_rol_x_sector_para_organigrama",function (data, textStatus, jqXHR) {
            console.log(data);
        },
        "json"
    );

});



init();