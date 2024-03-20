const serviceChamado = require('../services/chamado.service');

const getAllChamados = async (req, res) => {
  const chamados = await serviceChamado.getAll();
  return res.status(200).json(chamados);
};

const createChamado = async (req, res) => {
  const result = await serviceChamado.createChamado(req.body);
  return res.status(result.status).json(result.data);
};

const updateChamado = async (req, res) => {
  const {tecnicoId} = req
  const {id} = req.params
  const result = await serviceChamado.updateChamado(tecnicoId, {...req.body, id});
  return res.status(result.status).json(result.data);
}

module.exports = {
  getAllChamados,
  createChamado,
  updateChamado
};