import jwt from "../utils/jwt.js";

export default {
    asureAuth: async (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(401).send({
                msg: "No se encontró el token de autorización"
            });
        }

        const token = req.headers.authorization.replace("Bearer ", "");

        try {
            const payload = jwt.decoded(token);
            const { exp } = payload;

            const currentTime = Date.now() / 1000; // segundos

            if (exp <= currentTime) {
                return res.status(401).send({ msg: "El token ha expirado" });
            }

            req.usuario = payload;
            next();

        } catch (error) {
            return res.status(401).send({
                msg: "Token no válido"
            });
        }
    }
};
