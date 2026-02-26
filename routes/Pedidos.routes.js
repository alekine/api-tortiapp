import Pedidosctr from "../controllers/Pedidos.controller.js";
import routerx from "express-promise-router";
// import auth from "../middlewares/Autentication.js";

const router = routerx();

// router.use(auth.asureAuth);

router.post("/agregar/pedido", Pedidosctr.postPedido);
router.get("/obtener/pedidos", Pedidosctr.getPedidos);
router.get("/obtener/pedido/:id", Pedidosctr.getPedido);
router.patch("/put/pedido/:id", Pedidosctr.putPedido);
router.delete("/delet/pedido/:id", Pedidosctr.delPedido);

export default router;
