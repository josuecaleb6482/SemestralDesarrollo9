# Semestral Desarrollo 9
# Sistema de Pagos en Línea
1. [Información General](#general-info)
2. [Tecnologías](#technologies)
3. [Instalación](#installation)

### Información General
***
Api creada en Node con Express JS, consumida por un Front creado en Vanilla JS y otro con C# Asp.Net
### Screenshot
Rama Carlos
![image](https://user-images.githubusercontent.com/20881963/181866877-02224164-df4c-47eb-85a9-070bbdd49687.png)
Rama Anel
![image](https://user-images.githubusercontent.com/20881963/181866896-ac37c309-bb4a-4614-87c9-89b371a0a46c.png)

## Tecnologías
***
* [.NETFrameworkCore](https://dotnet.microsoft.com/download/dotnet/3.1)
* [SqlServer](https://azure.microsoft.com/es-es/products/azure-sql/database/)
* [NodeJS](https://nodejs.org)

## Instalación
***
* Despues de descargar la aplicación de la rama carlos
* Abre un nuevo terminal para ejecutar el API 

Terminal
```
$ nano .env
$ npm install
$ nodemon
```

Project made with Node JS usin Express Js and Sequalize to a mysql database mounted on an azure instance, Vanilla Js used for the Ui and C# whit Aps.Net for the Ui Admin. This aplication is made in Ubuntu but u can run it in Windows or Mac, if you want to add token auth validation downlond de folder _midelware/auth from the branch feature/auth and follow the example in component/transaction.
Remember to write the .env file that had the environment variables.
If you find an issue with this library feel free to open an issue here on GitHub🙂.
