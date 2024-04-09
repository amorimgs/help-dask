import React from 'react'
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
const Editar = ({ setModal, dados } : {setModal:React.Dispatch<React.SetStateAction<boolean>>, dados: Chamado | null}) => {

const [obs, setObs] = React.useState<string>("");
const [auth, setAuth] = React.useState<string>("");


const getLocalStorage = () => {
  const ls = localStorage.getItem('auth');
  if (ls) {
    setAuth(JSON.parse(ls));
  }
};
React.useEffect(() => {
  getLocalStorage();
  if(dados?.observacoes_tecnico) setObs(dados?.observacoes_tecnico)
},[dados?.observacoes_tecnico])

const fetchChamado = async (c:number) => {
  const body = {
    observacoesTec: obs,
    concluido: c
  }
  const r = await fetch(`http://localhost:3000/chamados/${dados?.id}`, {
        method: 'PUT',
        headers: {"Content-type": "application/json;charset=UTF-8", Authorization: `${auth}`,},
        body: JSON.stringify(body),
      });
  const data = await r.json();
  console.log(data);
};


  if (dados) 
  return (
    <div>
      
      <div>
        <h1>Chamado </h1>
        <p>ID: {dados.id}</p>
        <p>Solicitante: {dados.solicitante}</p>
        <p>Setor: {dados.setor}</p>
        <p>Motivo: {dados.motivo}</p>
        <p>Data de Abertura: {dados.data_abertura}</p>
        {dados.concluido === 1 && <p>Data de Fechamento: {dados.data_fechamento}</p>}
        <p>Observações: {dados.observacoes}</p>
        <p>Observações do Tecnico: {dados.observacoes_tecnico} <input type="text" value={obs} onChange={(e) => setObs(e.target.value)} /> </p>
        <p>Tecnico Responsavel: {dados.tecnico_id}</p>
        <p>Concluído: {dados.concluido === 1 ? 'SIM' : "NAO"}</p>
      </div>
      <button onClick={()=> setModal(false)}>Fechar</button>
      <button onClick={async () =>{
        await fetchChamado(0);
        setModal(false)
      }}>Salvar</button>
      <button onClick={async () =>{
        await fetchChamado(1);
        setModal(false)
      }}>Concluir</button>
    </div>
  )
}

export default Editar