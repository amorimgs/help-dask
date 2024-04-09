import React from 'react';
import { Link } from 'react-router-dom';

const Chamado = () => {
  const [form, setForm] = React.useState({
    solicitante: '', 
    setor: '',
    motivo: '',
    observacoes: '',
  })
  const [result, setResult] = React.useState<{message?:string, id?: number} | null>(null);
  /*body = {
			"solicitante": "exemple",
			"setor": "exemple",
			"motivo": "exemple",
			"observacoes": "exemple"
		}*/

  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:3000/chamados', {
        method: 'POST',
        headers: {"Content-type": "application/json;charset=UTF-8"},
        body: JSON.stringify(form),
      });
      const data = await response.json();
      console.log(data);
      setResult(data);
      setForm({
        solicitante: '', 
        setor: '',
        motivo: '',
        observacoes: '',
      })
      // navigate('/login')
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
    }
  };

  const inputValidate = () => {
    const {solicitante, setor, motivo} = form
    if (solicitante.length < 3 || setor.length < 2 || motivo.length < 3) {
      return false
    } return true
  };

  return (
    <div>
      <h1>Chamado</h1>
      <form onSubmit={e => e.preventDefault()}>
        <input type="text" onChange={ (e) => setForm({ ...form, solicitante: e.target.value })
        
        } value={form.solicitante} placeholder="solicitante" />
        <input type="text" onChange={ (e) => setForm({ ...form, setor: e.target.value })
        
      } placeholder="setor" value={form.setor} />
        <input type="text" onChange={ (e) => setForm({ ...form, motivo: e.target.value })
        
      } placeholder="motivo" value={form.motivo} />
        <input type="text" onChange={ (e) => setForm({ ...form, observacoes: e.target.value })
        
      } placeholder="observações" value={form.observacoes} />
      {!inputValidate() && <p>Preencha todos os campos CORRETAMENTE</p>}
        <button disabled={!inputValidate()} onClick={handleClick}>Enviar</button>
      </form>
      {result && result.id && <p>Chamado Efetuado com SUCESSO!</p>}
      <Link to="/">Voltar</Link>
    </div>
  );
};

export default Chamado;
