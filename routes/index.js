import routerx from "express-promise-router";
import PedidosR from "./Pedidos.routes.js";
import CuentasR from "./Cuentas.routes.js";
import AuthR from "./Usuarios.routes.js";



const router = routerx();

router.use("/pedidos", PedidosR);//ruta pedidos
router.use("/cuentas", CuentasR);//rutas cuentas
router.use("/user", AuthR);//hacer peticiones


export default router;