import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

type Tec = {
  name: string;
  email: string;
};

const Login = () => {
  const [tec, setTec] = React.useState<Tec[] | null>(null);
  const [form, setForm] = React.useState({
    email: '',
    password: '',
  })

  React.useEffect(() => {
    fetch('http://localhost:3000/tecnicos')
      .then((r) => r.json())
      .then((data) => setTec(data));
  }, []);

  const navigate = useNavigate();

  const handleClick = async () =>{
    try {
      const response = await fetch('http://localhost:3000/tecnicos/login', {
        method: 'POST',
        headers: {"Content-type": "application/json;charset=UTF-8"},
        body: JSON.stringify(form),
      });
      const data = await response.json();
      localStorage.setItem('auth', JSON.stringify(data.token));
      navigate(`/tecnico/${data.id}`, { state: { key: data.token} });
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
    }
    
  }
  
  const inputValidate = () => {
    const {email, password} = form
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || password.length < 8) {
      return false
    } return true
  }
  return (
    <div>
      <h1>Login</h1>
      {tec?.length !== 0 ? (
        <form onSubmit={e => e.preventDefault()}>
          <input type="text" onChange={e => setForm({...form, email: e.target.value})} value={form.email} placeholder="email" />
          <input type="password" onChange={e => setForm({...form, password: e.target.value})} value={form.password} placeholder="senha" />

          <button disabled={!inputValidate()} onClick={handleClick} type="button">Entrar</button>
        </form>
      ) : (
        <div>
          <h2>Nenhum Tecnico Cadastrado</h2>
          <Link to="/register">Cadastrar Tecnico</Link>
        </div>
      )}

      <Link to="/">Voltar</Link>
    </div>
  );
};

export default Login;
