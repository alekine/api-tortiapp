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
        estadoPedido

      } = req.body;

      const guardarPedidos = new Models.Pedidos({
        nombreCliente,
        cantidadTortilla,
        tamanoTortilla,
        tipoEntrega,
        direccion,
        horaEntrega,
        ubicacion,
        estadoPedido

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

  // Endpoint Buscar Todos los Pedidos
  // getPedidos: async (req, res, next) => {
  //   try {
  //     const obtener = await Models.Datos.find();
  //     res.status(200).json(obtener);
  //   } catch (error) {
  //     res.status(500).send({
  //       message: "Error al obtener los datos",
  //     });
  //     next(error);
  //   }
  // },
  //pedidos con la fecha de hoy
  getPedidos: async (req, res, next) => {
    try {
      // Inicio del día
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      //ELIMINAR PEDIDOS ANTERIORES
      await Models.Pedidos.deleteMany({
        createdAt: { $lt: hoy }
      });

      // Inicio del día siguiente
      const manana = new Date(hoy);
      manana.setDate(manana.getDate() + 1);

      // Obtener solo pedidos de hoy
      const obtener = await Models.Pedidos.find({
        createdAt: {
          $gte: hoy,
          $lt: manana
        }
      });

      res.status(200).json(obtener);

    } catch (error) {
      res.status(500).send({
        message: "Error al obtener los pedidos",
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

  // Endpoint Actualizar Pedido
  putPedido: async (req, res, next) => {
    try {
      const {
        nombreCliente,
        cantidadTortilla,
        tamanoTortilla,
        tipoEntrega,
        direccion,
        horaEntrega

      } = req.body;

      const actualizarPedidos = {
        nombreCliente,
        cantidadTortilla,
        tamanoTortilla,
        tipoEntrega,
        direccion,
        horaEntrega

      };

      const actualizar = await Models.Pedidos.findByIdAndUpdate(
        req.params.id,
        actualizarPedidos,
        { new: true }
      );

      res.status(200).json(actualizar);

    } catch (error) {
      res.status(500).send({
        message: "Error al actualizar",
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

};
