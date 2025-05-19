// Importar los módulos necesarios
const express = require('express');
const cors = require('cors');
const path = require('path');

// Crear una instancia de la aplicación Express
const app = express();

// Definir el puerto en el que escuchará el servidor
const PORT = 4040;

// Habilitar CORS para todas las rutas y orígenes
// Esto permitirá que Azgaar Fantasy Map Generator (u otras aplicaciones web)
// puedan solicitar los archivos .map desde este servidor.
app.use(cors());

// Servir archivos estáticos desde la carpeta 'maps'
// La carpeta 'maps' dentro del contenedor Docker contendrá los archivos .map
// que se montarán desde el sistema de archivos del host.
// express.static sirve los archivos directamente.
// path.join se usa para construir rutas de archivo de forma segura y compatible con diferentes sistemas operativos.
app.use('/maps', express.static(path.join(__dirname, 'maps')));

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en el puerto ${PORT} en todas las interfaces de red (0.0.0.0)`);
  console.log('Sirviendo archivos desde la carpeta "maps"');
  console.log(`Asegúrate de que la carpeta "maps" exista en el directorio raíz del proyecto y contenga tus archivos .map`);
  console.log('Para acceder a un mapa desde la misma máquina, usa: http://localhost:4040/maps/nombreDelMapa.map');
  console.log('Para acceder desde otra máquina en la red, usa: http://[IP-DE-ESTE-SERVIDOR]:4040/maps/nombreDelMapa.map');
});
