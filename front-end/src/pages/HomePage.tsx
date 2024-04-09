import React from 'react';
import { Link } from 'react-router-dom';

type Tec = {
  name: string;
  email: string;
};

const HomePage = () => {
  const [tec, setTec] = React.useState<Tec[] | null>(null);
  React.useEffect(() => {
    fetch('http://localhost:3000/tecnicos')
      .then((r) => r.json())
      .then((data) => setTec(data));
  }, []);
  console.log(tec);
  
  return (
    <div>
      <h1>HelpDask</h1>
      <Link to="/login">Entrar como Tecnico</Link>
      <br />
      <br />
      <Link to="/chamado">Abrir Chamado</Link>
    </div>
  );
};

export default HomePage;
