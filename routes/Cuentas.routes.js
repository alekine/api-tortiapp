

import Datosctr from "../controllers/Cuentas.controller.js";
import routerc from "express-promise-router";





const routers = routerc();




routers.post("/auth/registro", Datosctr.postDatos); // POST para guaradar cuentas

routers.post("/auth/login", Datosctr.Login); // POST para guaradar cuentas
routers.post("/auth/refreshtoken", Datosctr.refreshAccessToken);





routers.get("/obtener/cuentas", Datosctr.getDatos); // GET /Movies para obtener todos los datos
routers.get("/obtener/cuenta/:id", Datosctr.getDato); // GET /Movies/:id para obtener un dato por su ID
routers.patch("/put/:id", Datosctr.putDatos); // PATCH /Movies/:id para actualizar un dato por su ID
routers.delete("/delet/:id", Datosctr.delDatos); // DELETE /Movies/:id para eliminar un dato por su ID





export default routers;

