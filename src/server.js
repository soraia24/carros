import express from "express";
import usuarios from "./routes/usuarioRoutes.js";
import carros from "./routes/CarRoutes.js"
import erros from "./middleware/erro.middleware.js"

const app = express();

app.use(express.json());

app.use("/usuarios", usuarios);
app.use('/carros', carros);

app.set("view engine", "pug");
app.set("views", "./src/views");

app.use(erros);


app.listen(3001, () => {
  console.log("Servidor rodando na porta 3000 🚀");
});
