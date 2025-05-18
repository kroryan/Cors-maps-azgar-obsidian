# Usar una imagen base oficial de Node.js. 
# Se recomienda usar una versión LTS (Long Term Support) por estabilidad.
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
# Todas las rutas subsiguientes serán relativas a /usr/src/app
WORKDIR /usr/src/app

# Copiar el archivo package.json y package-lock.json (si existe)
# Esto es para aprovechar el cache de capas de Docker. Si estos archivos no cambian,
# Docker no reinstalará las dependencias innecesariamente.
COPY package*.json ./

# Instalar las dependencias del proyecto definidas en package.json
RUN npm install

# Copiar el resto de los archivos de la aplicación al directorio de trabajo del contenedor
# Esto incluye server.js y cualquier otro archivo necesario para la aplicación.
COPY . .

# Crear la carpeta 'maps' dentro del contenedor.
# Esta carpeta es donde se montarán los archivos .map desde el host.
RUN mkdir -p /usr/src/app/maps

# Exponer el puerto en el que la aplicación se ejecutará dentro del contenedor
# Esto no publica el puerto al host, solo lo documenta.
EXPOSE 4040

# Comando para ejecutar la aplicación cuando se inicie el contenedor
# Esto ejecutará el script "start" definido en package.json (que es "node server.js")
CMD [ "npm", "start" ]
