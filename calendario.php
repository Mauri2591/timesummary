<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Calendario del Mes Actual</title>
  <style>
    body {
      font-family: Arial, sans-serif;
    }

    #calendario {
      display: none;
      max-width: 600px;
      margin: 20px auto;
      border: 1px solid #ccc;
      border-radius: 5px;
      overflow: hidden;
    }

    #calendario header {
      background-color: #007bff;
      color: white;
      padding: 10px;
      text-align: center;
    }

    #calendario table {
      width: 100%;
      border-collapse: collapse;
    }

    #calendario table th,
    #calendario table td {
      padding: 10px;
      text-align: center;
      border: 1px solid #ccc;
    }

    #mostrarCalendario {
      cursor: pointer;
      background-color: #007bff;
      color: white;
      padding: 10px;
      border: none;
      border-radius: 5px;
    }
  </style>
</head>
<body>

  <button id="mostrarCalendario">Mostrar Calendario</button>
  <div id="calendario"></div>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      var calendario = document.getElementById('calendario');
      var botonMostrarCalendario = document.getElementById('mostrarCalendario');

      botonMostrarCalendario.addEventListener('click', function() {
        generarCalendario();
        calendario.style.display = (calendario.style.display === 'none' || calendario.style.display === '') ? 'block' : 'none';
      });

      function generarCalendario() {
        var fechaActual = new Date();
        var primerDiaDelMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
        var ultimoDiaDelMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);

        var diasEnMes = ultimoDiaDelMes.getDate();
        var primerDiaDeLaSemana = primerDiaDelMes.getDay();

        var contenidoCalendario = '<header>Calendario del Mes Actual</header><table>';
        contenidoCalendario += '<thead><tr><th>Lun</th><th>Mar</th><th>Mié</th><th>Jue</th><th>Vie</th><th>Sáb</th><th>Dom</th></tr></thead><tbody>';

        var dia = 1;

        for (var i = 0; i < 6; i++) {  // 6 filas para asegurarnos de mostrar todos los días del mes
          contenidoCalendario += '<tr>';

          for (var j = 0; j < 7; j++) {
            if ((i === 0 && j < primerDiaDeLaSemana) || dia > diasEnMes) {
              contenidoCalendario += '<td></td>';  // Celda vacía antes del primer día y después del último día
            } else {
              contenidoCalendario += '<td>' + dia + '</td>';
              dia++;
            }
          }

          contenidoCalendario += '</tr>';
        }

        contenidoCalendario += '</tbody></table>';
        calendario.innerHTML = contenidoCalendario;
      }
    });
  </script>

</body>
</html>
