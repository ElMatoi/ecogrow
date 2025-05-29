# Repositorio del Proyecto EcoGrow

**Sitio web oficial:** [https://www.ecogrow.cl](https://www.ecogrow.cl)

Este repositorio contiene el prototipo de la plataforma y sistema inteligente de **EcoGrow**, una solución de **hidroponía vertical automatizada** que integra sensores, conectividad IoT y diseño modular, permitiendo cultivar alimentos de forma eficiente en cualquier espacio del hogar.

### Descripción de EcoGrow

- **Sin tierra, solo agua**: Utiliza una técnica limpia y eficiente que reduce el desperdicio de recursos naturales.
- **Eficiencia mejorada**: Optimiza el crecimiento vegetal, logrando hasta un 90 % más de eficiencia comparado con métodos tradicionales.
- **Sensores integrados**: Monitorea humedad, temperatura, pH y nutrientes para ajustar automáticamente las condiciones del cultivo.
- **Conectividad IoT**: Accede a los datos de tu cultivo en tiempo real desde tu smartphone o computadora, estés donde estés.
- **Modular y accesible**: El sistema es fácil de montar, escalar y mantener. Es accesible para personas de todas las edades, sin necesidad de conocimientos técnicos.
- **Apto para cualquier hogar**: Su diseño vertical y compacto se adapta a espacios reducidos, siendo ideal para departamentos y viviendas urbanas.

### Ideal para

- Personas que quieren cultivar sus propios alimentos de forma saludable y autónoma.
- Proyectos educativos enfocados en tecnología, agricultura y sostenibilidad.
- Hogares urbanos que buscan una solución eficiente, ecológica y decorativa.
- Productores o aficionados que deseen automatizar y monitorear sus cultivos fácilmente.

### Tecnologías utilizadas

El prototipo actual de **EcoGrow** está compuesto por varios módulos que trabajan en conjunto para gestionar tanto la interacción del usuario como la recepción de datos en tiempo real desde sensores IoT:

- **Backend principal**  
  Desarrollado con **NestJS**, se encarga de la gestión de usuarios y máquinas. Permite enlazar cada usuario con su respectiva unidad de cultivo, gestionando autenticación, permisos y relaciones de control.

- **Servicio IoT (mini backend)**  
  Implementado con **FastAPI** y **MongoDB**, este microservicio recibe y almacena los datos provenientes de los sensores IoT en tiempo real. Además, expone una API que permite consultar dichos datos desde el frontend para su visualización y análisis.

- **Frontend**  
  Construido con **React**, proporciona una interfaz moderna y responsiva para que los usuarios puedan visualizar sus cultivos, monitorear el estado de los sensores y gestionar su sistema de hidroponía de manera intuitiva.




