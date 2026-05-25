import mongoose from "mongoose";

const cuentas = mongoose.Schema(
    {
        fullName: String,
        telefono: String,
        password: String,
        rol: String
    }
);

const Cuentas = mongoose.model('cuentas', cuentas);

export default Cuentas;