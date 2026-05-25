import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
// import routesResena from "./routes/resenas.routes.js"


import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();




const app = express();
app.set('port', process.env.PORT || 4000);

//conexion a base de datos
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI)

  .then(() => console.log('Conectado aL MongoDB'))
  .catch((error) => console.log(error))
//Listening de puertos


app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);
// app.use("/api", routesResena)


app.listen(app.get('port'), "0.0.0.0", () => {
  console.log(`Servidor escuchando en el puerto ${app.get('port')}`);
});