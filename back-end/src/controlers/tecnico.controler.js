const serviceTecnico = require('../services/tecninco.service')

const getAllTecnicos = async (req, res) => {
  const result = await serviceTecnico.getAllTecnicos();
  return res.status(result.status).json(result.data);
};

const createTecnico = async (req, res) => {
  const {name, password, email} = req.body;
  const result = await serviceTecnico.createTecnico({name, password, email});
  return res.status(result.status).json(result.data);
};

const loginTecnico = async (req, res) => {
  const {email, password} = req.body;
  const result = await serviceTecnico.loginTecnico({email, password});
  return res.status(result.status).json(result.data);
};

module.exports = {
  getAllTecnicos,
  createTecnico,
  loginTecnico
};