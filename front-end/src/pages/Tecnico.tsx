import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Editar from './Editar';
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWNuaWNvSWQiOjIsImlhdCI6MTcxMTUxNTc4OSwiZXhwIjoxNzExNjAyMTg5fQ.KHTONK8pMgRke0Ee77wlDMaPvTriEO03HHXNJ13_WSU
type Chamado = {
  concluido: number;
  data_abertura: string;
  data_fechamento: string | null;
  id: number;
  motivo: string;
  observacoes: string;
  observacoes_tecnico: string | null;
  setor: string;
  solicitante: string;
  tecnico_id: number | null;
};

const Tecnico = () => {
  const [auth, setAuth] = React.useState(null);
  const [chamados, setChamados] = React.useState<Chamado[] | null>(null);
  const [modal, setModal] = React.useState(false);
  const [dadosModal, setDadosModal] = React.useState<Chamado | null>(null);
  const getLocalStorage = () => {
    const ls = localStorage.getItem('auth');
    if (ls) {
      setAuth(JSON.parse(ls));
    }
  };
  const param = useParams();
  console.log(param.id);
  

  React.useEffect(() => {
    getLocalStorage();
    const fetchChamados = async () => {
      try {
        const response = await fetch('http://localhost:3000/chamados', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json;charset=UTF-8',
            Authorization: `${auth}`,
          },
        });
        const data = await response.json();
        console.log(data);
        if (data.length !== 0 && typeof data !== 'string') {
          setChamados(data);
        }
      } catch (err) {
        if (err instanceof Error) console.log(err.message);
      }
    };
    if (auth) {
      fetchChamados();
    }
  }, [auth, setChamados, modal]);

  if (auth) {
    return (
      <div>
        <h1>Área do Técnico</h1>
        <h2>Chamados</h2>
        {chamados ? <table>
          <tr>
            <th>ID</th>
            <th>SOLICITANTE</th>
            <th>Editar</th>
            <th>Concluído</th>
          </tr>
          {chamados &&
            chamados.map((e) => {
              return (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.solicitante}</td>
                  <td>{e.setor}</td>
                  <td>{e.motivo}</td>
                  <td><button onClick={()=>{setModal(true)
                  setDadosModal(e)}}>Edit</button></td>
                  <td>{e.concluido ? 'Sim' : 'Não'}</td>
                </tr>
              );
            })}
        </table> : 'Nenhum Chamado Encontrado!'}
        {modal && <Editar setModal={setModal } dados={dadosModal}/>}
        <Link to="/">Home</Link>
        <Link to="/register">Cadastrar Técnico</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Faça Login!</h1>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Tecnico;
