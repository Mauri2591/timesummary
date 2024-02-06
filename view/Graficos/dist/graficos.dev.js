// function init() {
// }
// $(document).ready(function () {
//   $.post("../../controller/ctrGraficos.php?op_grafico=get_total_productos_brindados",
//     function (data, textStatus, jqXHR) {
//       var chartDataServicio = data.map((elem) => [elem.nombre_producto]);
//       var chartDataTotal = data.map((elem) => [elem.total]);
//       const bar = document.getElementById('chartBar'); //-------------------grafico de barras
//       new Chart(bar, {
//         type: 'bar',
//         data: {
//           labels: chartDataServicio,
//           datasets: [{
//             label: 'Cantidad de servicios vendidos a la fecha',
//             data: chartDataTotal,
//             borderWidth: 1
//           }]
//         },
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true
//             }
//           }
//         }
//       });//-------------------finaliza gráfico de barras
//       var chartDough = document.getElementById('chartDough');//----------------Inicio gráfico de dona
//       var data = {
//         labels: chartDataServicio,
//         datasets: [{
//           label: 'Cantidad de servicios vendidos a la fecha',
//           backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(150, 206, 200, 0.5)', 'rgba(100, 100, 200, 0.5)'],
//           borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(150, 206, 200, 1)', 'rgba(100, 100, 200, 1)'],
//           borderWidth: 1,
//           data: chartDataTotal
//         }]
//       };
//       // Configurar opciones del gráfico
//       var options = {
//         responsive: true,
//         maintainAspectRatio: false
//       };
//       // Crear el gráfico
//       var myDoughnutChart = new Chart(chartDough, {
//         type: 'doughnut',
//         data: data,
//         options: options
//       }); //--------------------Finaliza gráfico de dona
//     }, "json");
// });
// init();
"use strict";