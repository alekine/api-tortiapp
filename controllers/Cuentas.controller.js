import Model from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "../utils/jwt.js";

export default {
  // Endpoint para registrar cuenta
  postDatos: async (req, res, next) => {
    try {
      const { fullName, telefono, password, rol } = req.body;

      const guardarDatos = new Model.Cuentas({
        fullName,
        telefono,
        rol
      });

      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);
      guardarDatos.password = hashPassword;

      const guardar = await guardarDatos.save();
      res.status(200).json(guardar);
    } catch (error) {
      res.status(500).send({
        message: "Error al enviar",
      });
      next(error);
    }
  },

  // Login con teléfono
  Login: async (req, res) => {
    const { telefono, password } = req.body;

    try {
      if (!telefono)
        return res.status(400).send({ msg: "El teléfono es obligatorio" });

      if (!password)
        return res.status(400).send({ msg: "El password es obligatorio" });

      const response = await Model.Cuentas.findOne({ telefono });
      if (!response)
        return res.status(400).send({ msg: "Usuario no encontrado" });

      bcrypt.compare(password, response.password, (bcryptError, check) => {
        if (bcryptError) {
          res.status(500).send({ msg: "Error del usuario" });
        } else if (!check) {
          res.status(400).send({ msg: "Password incorrecto" });
        } else {
          res.status(200).send({
            access: jwt.createAccessToken(response),
            refresh: jwt.createRefreshToken(response)
          });
        }
      });
    } catch (error) {
      res.status(500).send({ msg: "Error al autenticar" });
    }
  },

  // Refresh token
  refreshAccessToken: async (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(400).send({ msg: "Token requerido" });

    const { usuario_id } = jwt.decoded(token);

    try {
      const response = await Model.Cuentas.findOne({ _id: usuario_id });
      res.status(200).send({
        accessToken: jwt.createAccessToken(response)
      });
    } catch (error) {
      res.status(500).send({ msg: "error del servidor" });
    }
  },

  // Obtener todas las cuentas
  getDatos: async (req, res, next) => {
    try {
      const obtener = await Model.Cuentas.find();
      res.status(200).json(obtener);
    } catch (error) {
      res.status(500).send({
        message: "Error al obtener los datos",
      });
      next(error);
    }
  },

  // Obtener cuenta por ID
  getDato: async (req, res, next) => {
    try {
      const obtener = await Model.Cuentas.findById(req.params.id);
      res.status(200).json(obtener);
    } catch (error) {
      res.status(500).send({
        message: "Error al obtener los datos",
      });
      next(error);
    }
  },

  // Actualizar datos
  putDatos: async (req, res, next) => {
    try {
      const { fullName, direccion, telefono, rol } = req.body;

      const actualizarDatos = {
        fullName,
        direccion,
        telefono,
        rol
      };

      const actualizar = await Model.Cuentas.findByIdAndUpdate(
        req.params.id,
        actualizarDatos,
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

  // Eliminar cuenta
  delDatos: async (req, res, next) => {
    try {
      await Model.Cuentas.findByIdAndDelete(req.params.id);
      res.status(200).send({
        message: "Datos eliminados correctamente"
      });
    } catch (error) {
      res.status(500).send({
        message: "Error al eliminar dato",
      });
      next(error);
    }
  },
};
