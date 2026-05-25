import Models from "../models/index.js";

export default {

  // Endpoint Enviar Pedido
  postPedido: async (req, res, next) => {
    try {
      const {
        nombreCliente,
        cantidadTortilla,
        tamanoTortilla,
        tipoEntrega,
        direccion,
        horaEntrega,
        ubicacion,
        estadoPedido,
        idCliente,
        telefono

      } = req.body;

      const guardarPedidos = new Models.Pedidos({
        nombreCliente,
        cantidadTortilla,
        tamanoTortilla,
        tipoEntrega,
        direccion,
        horaEntrega,
        ubicacion,
        estadoPedido,
        idCliente,
        telefono

      });

      const guardar = await guardarPedidos.save();
      res.status(200).json(guardar);

    } catch (error) {
      res.status(500).send({
        message: "Error al enviar",
      });
      next(error);
    }
  },



  // get solo pedidos de hoy (filtra)
  getPedidos: async (req, res, next) => {
    try {

      const ahora = new Date();

      const inicioDiaUTC = new Date(Date.UTC(
        ahora.getUTCFullYear(),
        ahora.getUTCMonth(),
        ahora.getUTCDate(),
        0, 0, 0, 0
      ));

      const finDiaUTC = new Date(Date.UTC(
        ahora.getUTCFullYear(),
        ahora.getUTCMonth(),
        ahora.getUTCDate(),
        23, 59, 59, 999
      ));

      const pedidosHoy = await Models.Pedidos.find({
        createdAt: {
          $gte: inicioDiaUTC,
          $lte: finDiaUTC
        }
      });

      res.status(200).json(pedidosHoy);

    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los pedidos"
      });
      next(error);
    }
  },


  // Endpoint Buscar Pedido por ID
  getPedido: async (req, res, next) => {
    try {
      const obtener = await Models.Pedidos.findById(req.params.id);
      res.status(200).json(obtener);
    } catch (error) {
      res.status(500).send({
        message: "Error al obtener los datos",
      });
      next(error);
    }
  },

  //obtener pedido por id del cliente
  getPedidosPorCliente: async (req, res, next) => {
    try {

      const { idCliente } = req.params;

      if (!idCliente) {
        return res.status(400).json({
          message: "El idCliente es obligatorio"
        });
      }

      const pedidos = await Models.Pedidos.find({
        idCliente: idCliente
      });

      res.status(200).json(pedidos);

    } catch (error) {
      res.status(500).send({
        message: "Error al obtener los pedidos del cliente",
      });
      next(error);
    }
  },

  // Endpoint Actualizar Pedido
  actualizarPedido: async (req, res, next) => {
    try {
      const { estadoPedido } = req.body;

      if (!estadoPedido) {
        return res.status(400).json({
          msg: "estadoPedido es obligatorio"
        });
      }

      const actualizar = await Models.Pedidos.findByIdAndUpdate(
        req.params.id,
        { estadoPedido },
        { new: true }
      );

      if (!actualizar) {
        return res.status(404).json({
          msg: "Pedido no encontrado"
        });
      }

      res.status(200).json(actualizar);

    } catch (error) {
      res.status(500).json({
        msg: "Error al actualizar"
      });
      next(error);
    }
  },

  // Endpoint Eliminar Pedido
  delPedido: async (req, res, next) => {
    try {
      await Models.Pedidos.findByIdAndDelete(req.params.id);
      res.status(200).send({
        message: "pedido eliminados correctamente"
      });
    } catch (error) {
      res.status(500).send({
        message: "Error al eliminar pedido",
      });
      next(error);
    }
  },


  //pedidos anteriores 
  obtenerPedidosAnteriores: async (req, res, next) => {
    try {

      const ahora = new Date();

      // 🔥 MISMA LÓGICA UTC
      const inicioDiaUTC = new Date(Date.UTC(
        ahora.getUTCFullYear(),
        ahora.getUTCMonth(),
        ahora.getUTCDate(),
        0, 0, 0, 0
      ));

      const pedidos = await Models.Pedidos.find({
        createdAt: { $lt: inicioDiaUTC }
      }).sort({ createdAt: -1 });

      res.status(200).json(pedidos);

    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Error al obtener pedidos anteriores"
      });
      next(error);
    }
  },


  //obtener todas los pedidos
  obtenerTodosLosPedidos: async (req, res, next) => {
    try {
      const obtener = await Models.Pedidos.find();
      res.status(200).json(obtener);
    } catch (error) {
      res.status(500).send({
        message: "Error al obtener los datos",
      });
      next(error);
    }
  },
};


