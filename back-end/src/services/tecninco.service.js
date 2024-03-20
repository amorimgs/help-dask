const bcript = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateInputs = require('./validations/validateInputsValues');
const modelTecnico = require('../models/model.tecnico')
require('dotenv').config();

const SECRET = process.env.SECRET;

const getAllTecnicos = async () => {
  const allTecnicos = await modelTecnico.getAll();
  return { status: 200, data: allTecnicos};
};

const createTecnico = async ({name, password, email}) => {
  const error = validateInputs.validateNewTecnico({name, password, email})
  if (error) {
    return {status: error.status, data:{message: error.message}}
  }

  const verifyTecnico = await modelTecnico.getByEmail(email);

  if (verifyTecnico) return {status: 400, data:{message: 'Email já cadastrado.'}}

  const passwordHash = await bcript.hash(password, 10);

  const newTecnico = await modelTecnico.createTecnico({name, password:passwordHash, email});

  return { status: 201, data: newTecnico };
};

const loginTecnico = async ({email, password}) => {
  const error = validateInputs.validateLoginTecnico({email, password});
  if (error) return {status: error.status, data:{message: error.message}}
  const tecnico = await modelTecnico.getByEmail(email)
  if (!tecnico) return {status: 404, data:{message: 'Tecnico não cadastrado.'}};
  const passwordMatch = await bcript.compare(password, tecnico.password);
  if (!passwordMatch) return {status: 401, data:{message: 'Senha incorreta.'}};

  const token = await jwt.sign({tecnicoId: tecnico.id}, SECRET, { expiresIn: '1d' });

  const result = {
    id: tecnico.id,
    name: tecnico.name,
    email: tecnico.email,
    token
  }
  return {status: 200, data: result};
};

module.exports = { getAllTecnicos, createTecnico, loginTecnico };