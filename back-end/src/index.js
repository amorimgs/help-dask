const express = require('express');
var cors = require('cors')
const connection = require('./models/connection');
const controlerTecnicos = require('./controlers/tecnico.controler')
const controlerChamado = require('./controlers/chamado.controler')
const verifyToken = require('./middlewares/verifyToken.middleware')

const app = express();
app.use(express.json());
app.use(cors());

//Rota tecnicos
app.get("/tecnicos", controlerTecnicos.getAllTecnicos);
app.post("/tecnicos", controlerTecnicos.createTecnico);
app.post("/tecnicos/login", controlerTecnicos.loginTecnico);

//Rota chamados
app.get("/chamados", verifyToken, controlerChamado.getAllChamados);
app.post("/chamados", controlerChamado.createChamado);
app.put("/chamados/:id", verifyToken, controlerChamado.updateChamado);

//Iniciando servidor

connection.getConnection().then(() => {
  console.log("Conectado ao banco de dados");
  app.listen(3000, () => {
    console.log("Listening on http://localhost:3000");
  });
}).catch((error)=>{console.log(error.message);})
