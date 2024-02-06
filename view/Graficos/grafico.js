function init(){
}

window.onload=function(){
    $("#pagina_tareas").hide();
    $("#pagina_detalle").hide();

    $("#clickBtnPaginaTareas").on("click",function(){
        $("#clickBtnPaginaTareas").show();
        $("#pagina_tareas").show();
        $("#pagina_detalle").hide();
    });

    $("#clickBtnPaginaDetalle").on("click",function(){
        $("#clickBtnPaginaDetalle").show();
        $("#pagina_detalle").show();
        $("#pagina_tareas").hide();
        $("#pagina_productos").hide();
    });

    $("#clickBtnPaginaProductos").on("click",function(){
        $("#clickBtnPaginaProductos").show();
        $("#pagina_productos").show();
        $("#pagina_tareas").hide();
        $("#pagina_detalle").hide();
    });

}


init();