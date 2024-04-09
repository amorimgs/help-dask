const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM chamados',
  );
  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM chamados WHERE id = ?',
    [id],
  );
  return result;
};

const createChamado = async ({solicitante, setor, motivo, observacoes}) => {
  const [result] = await connection.execute(
    'INSERT INTO chamados (solicitante, setor, motivo, observacoes) VALUES (?, ?, ?, ?)',
    [solicitante, setor, motivo, observacoes],
  );
  return {
    id: result.insertId,
    solicitante,
    setor,
    motivo,
    observacoes,
  };
};

const updateChamado = async (tecnicoId, {observacoesTec, concluido, id}) => {
  if (concluido) {
    const [result] = await connection.execute(
      'UPDATE chamados SET tecnico_id = ?, data_fechamento = now(),observacoes_tecnico = ?, concluido = true WHERE id = ?',
      [tecnicoId, observacoesTec, id],
    );
    return {message: "Chamado Atualizado"};
  }
  const [result] = await connection.execute(
    'UPDATE chamados SET tecnico_id = ?, observacoes_tecnico = ? WHERE id = ?',
    [tecnicoId, observacoesTec, id],
  );
  return {message: "Chamado Concluído!"};
};

module.exports = { 
  getAll,
  getById,
  createChamado,
  updateChamado
};