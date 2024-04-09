const nodemiler = require('nodemailer');
const modelChamados = require('../models/model.chamado');
const modelTecnicos = require('../models/model.tecnico');
const validateInputs = require('./validations/validateInputsValues');
require('dotenv').config()


const transporter = nodemiler.createTransport({
  host: process.env.HOST_TRANSPORTER,
  port: process.env.PORT_TRANSPORTER,
  secure: true,
  auth: {
    user: process.env.USER_TRANSPORTER,
    pass: process.env.PASS_TRANSPORTER
  }
})

const envioEmail = async (id) => {
  const tecnicosAtivos = await modelTecnicos.getTecnicosAtivos();
  const enviarEmail = async (email, id) => {
    try {
     await transporter.sendMail({
        from: `HelpDask <${process.env.USER_TRANSPORTER}>`,
        to: email,
        subject: "HelpDask",
        html: `<p>Você tem um novo chamado com id <strong>${id}</strong>!</p>`,
      });
    } catch (error) {
     console.log(error.message);
    }
  };

  await tecnicosAtivos.forEach(async ({email}) => {
    await enviarEmail(email, id);
  })
};

const getAll = async () => {
  const chamados = await modelChamados.getAll();
  return chamados;
};

const createChamado = async (body) => {
  const error = validateInputs.validateNewChamado(body);
  if (error) {
    return {status: error.status, data:{message: error.message}}
  }
  const newChamado = await modelChamados.createChamado(body);
  envioEmail(newChamado.id);
  return {status: 200, data: newChamado};
};

const updateChamado = async (tecnicoId, body) => {
  const error = validateInputs.validateUpdateChamado(body);
  if (error) {
    return {status: error.status, data:{message: error.message}}
  }

  const chamado = await modelChamados.getById(tecnicoId);

  if (!chamado) return {status: 404, data:{message: 'Chamado não encontrado'}}

  const newChamado = await modelChamados.updateChamado(tecnicoId, body);
  return {status: 200, data: newChamado};
};

module.exports = {
  getAll,
  createChamado,
  updateChamado
};
