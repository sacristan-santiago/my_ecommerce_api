Guia para la 3er entrega:

1- Crear un archivo .env siguiendo las indicaciones de .envExample


2- http://localhost:8080/api/register
nota: el phone number registrado va a recibir las notifiaciones de logueo y demas el formato es: +54911XXXXYYYY
nota: el mail de administrador recibira un mail con todos los datos del nuevo usuario 


3-Para subir la foto, no hay front....pero hay postman :)
-Primero loguearse en postman mediante POST:
http://localhost:8080/api/login
Ejemplo de body/json:
{
    "username": "santi",
    "password": "Rivercampeon10"
}

-Luego de loguearte:
http://localhost:8080/api/upload
En el body enviar foto mediante form-data:
key=file(tipo file), value=(C:\Documents\rutaejemplo.jpg)

Ahora se creó una nueva collection:photos.files y en el usuario se agrega un campo photoId con el _id de la foto.

4-Asumiendo que ya estás logueado:
Ver carrito: GET: http://localhost:8080/api/carrito

Agregar producto al carrito: POST http://localhost:8080/api/carrito/add/
Ejemplo body formato json:
{
    "productId": "614a537ccf76afc6329c9f6f",
    "productAmount": 5
}

Borrar producto del carrito: POST http://localhost:8080/api/carrito/delete/
Ejemplo body formato json:
{
    "productId": "614a537ccf76afc6329c9f6f",
    "productAmount": 3
}

Generar orden del carrito: POST http://localhost:8080/api/carrito/submit/
Nota: se genera en la collection orders una nueva orden. El administrador
recibe un mail, un sms y un whatsapp con la info del pedido.

5-Si se quisera se puede correr artillery para analizar el comportamiento de la app.
Hay que abrir 3 consolas:
consola 1: npm run start:fork
consola 2: npm run start:cluster
consola 3: npm run artillery:fork o npm run artillery:cluster
