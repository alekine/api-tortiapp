import mongoose from "mongoose";

const pedidos = mongoose.Schema(
    {
        nombreCliente: String,
        cantidadTortilla: Number,
        tamanoTortilla: String,
        tipoEntrega: String,
        direccion: String,
        horaEntrega: String,
        estadoPedido: String,
        idCliente: String,
        telefono: String,

        ubicacion: {
            lat: { type: Number },
            lng: { type: Number }
        }

    },
    {
        timestamps: true // createdAt y updatedAt automáticos
    }
);

const Pedidos = mongoose.model('Pedidos', pedidos);
export default Pedidos;