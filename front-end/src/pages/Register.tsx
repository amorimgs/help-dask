import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    password: '',
  });
  const [tec, setTec] = React.useState<{message?:string, name?: string} | null>(null);
  

  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:3000/tecnicos', {
        method: 'POST',
        headers: {"Content-type": "application/json;charset=UTF-8"},
        body: JSON.stringify(form),
      });
      const data = await response.json();
      console.log(data);
      setForm({
        name: '',
        email: '',
        password: '',
      })
      setTec(data);
      // navigate('/login')
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  const inputValidate = () => {
    const {name, email, password} = form
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name.length < 3 || !emailRegex.test(email) || password.length < 8) {
      return false
    } return true
  }

  return (
    <div>
      <h2>Cadastro</h2>
      <form>
        <input
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          value={form.name}
          type="text"
          placeholder="name"
        />
        <input
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          value={form.email}
          type="email"
          placeholder="email"
        />
        <input
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          value={form.password}
          type="password"
          placeholder="password"
        />
        {tec && tec.message}
        <button disabled={!inputValidate()} type='button' onClick={ handleClick }>Cadastrar</button>

      </form>
      <Link to="/login">Login</Link>
      <Link to="/">Home</Link>

      {tec && tec.name && <p>{tec.name} cadastrado com SUCESSO!</p>}
    </div>
  );
};

export default Register;
