import express from "express";
import usuarios from "./routes/usuarioRoutes.js";
import filmes from "./routes/filmeRoutes.js"
import erros from "./middleware/erro.middleware.js"

const app = express();

app.use(express.json());

app.use("/usuarios", usuarios);
app.use('/filmes', filmes);

app.use(erros);


app.listen(3001, () => {
  console.log("Servidor rodando na porta 3000 🚀");
});
