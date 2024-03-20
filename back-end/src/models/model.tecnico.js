const connection = require('./connection');

const getAll = async () => {
  const [tecnico] = await connection.execute('SELECT name, email FROM tecnicos');
  return tecnico;
};

const getByEmail = async (email) => {
  const [[tecnico]] = await connection.execute('SELECT * FROM tecnicos WHERE email LIKE ?', [email]);
  return tecnico;
};

const getTecnicosAtivos = async () => {
  const [tecnicos] = await connection.execute('SELECT name, email FROM tecnicos WHERE ativo = 1');
  return tecnicos; 
};

const createTecnico = async ({name, password, email}) => {
  const result = await connection.execute(
    `INSERT INTO tecnicos 
      (name, password, email) VALUES  (?, ?, ?)`, [name, password, email],
  );
  const tecnicoCadastrado = {
    id: result.insertId,
    name,
    email,
  } 
  return tecnicoCadastrado
};

module.exports = {
  getAll,
  getByEmail,
  createTecnico,
  getTecnicosAtivos
};
