"use strict";

function init() {}

$(document).ready(function () {
  $.post("../../controller/ctrGraficos.php?op_grafico=get_total_max_ts_evento_x_cada_servicio", function (data, textStatus, jqXHR) {
    prod_nombre = data.map(function (elem) {
      return [elem.prod_nombre];
    });
    total = data.map(function (elem) {
      return [elem.total];
    });
    var chartDoughProd = document.getElementById('chartDoughProductos'); //----------------Inicio gráfico de dona

    var data = {
      labels: prod_nombre,
      datasets: [{
        label: 'Total',
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(150, 206, 200, 0.5)', 'rgba(100, 100, 200, 0.5)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(150, 206, 200, 1)', 'rgba(100, 100, 200, 1)'],
        borderWidth: 1,
        data: total
      }]
    }; // Configurar opciones del gráfico

    var options = {
      responsive: true,
      maintainAspectRatio: false
    }; // Crear el gráfico

    var chartDoughProductos = new Chart(chartDoughProd, {
      type: 'doughnut',
      data: data,
      options: options
    }); //--------------------Finaliza gráfico de dona
  }, "json");
});
init();