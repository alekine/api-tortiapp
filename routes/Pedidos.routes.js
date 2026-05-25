import Pedidosctr from "../controllers/Pedidos.controller.js";
import routerx from "express-promise-router";
import auth from "../middlewares/Autentication.js";

const router = routerx();

router.use(auth.asureAuth);

router.get("/obtener/pedidos", Pedidosctr.getPedidos);
router.patch("/actualizar/pedido/:id", Pedidosctr.actualizarPedido);
router.get("/obtener/todos/pedidos", Pedidosctr.obtenerTodosLosPedidos);//obtener todos los pedidos



router.post("/agregar/pedido", Pedidosctr.postPedido);
router.get("/obtener/pedido/:id", Pedidosctr.getPedido);
router.get("/obtener/pedido/cliente/:idCliente", Pedidosctr.getPedidosPorCliente);

router.get("/obtener/pedidos/anteriores", Pedidosctr.obtenerPedidosAnteriores);// pedidos anteriores





router.delete("/delet/pedido/:id", Pedidosctr.delPedido);

export default router;
