const validateNewTecnico = ({name, password, email}) => {
  if (name.length < 3 || typeof name !== 'string') return {status: 400, message: 'Nome muito curto'}
  if (password.length < 8 || typeof password !== 'string') return {status: 400, message: 'Senha muito curta'}
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return {status: 400, message: 'O email tem de estar no formato "test@test.com"'}
};

const validateLoginTecnico = ({email, password}) => {
  if (password.length < 8 || typeof password !== 'string') return {status: 400, message: 'Senha muito curta'}
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return {status: 400, message: 'O email tem de estar no formato "test@test.com"'}
};

const validateNewChamado = ({solicitante, setor, motivo, observacoes}) => {
  if (solicitante.length < 3 || typeof solicitante !== 'string') return {status: 400, message: 'Nome muito curto'}
  if (setor.length < 2 || typeof setor !== 'string') return {status: 400, message: 'Nome do setor muito curto'}
  if (motivo.length < 3 || typeof motivo !== 'string') return {status: 400, message: 'Motivo muito curto'}
  if (typeof observacoes !== 'string') return {status: 400, message: 'Observacao Inválida'}
};

const validateUpdateChamado = ({observacoesTec}) => {
  if (typeof observacoesTec !== 'string' || observacoesTec.length < 1) return {status: 400, message: 'Observacao Inválida'}
};

module.exports = { 
  validateNewTecnico,
  validateLoginTecnico,
  validateNewChamado,
  validateUpdateChamado
};