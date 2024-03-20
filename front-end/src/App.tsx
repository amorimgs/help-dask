import React from "react"

type Tec = {
  name: string;
  email: string;
}

function App() {
  const [tec, setTec] = React.useState<Tec[] | null>(null);
  React.useEffect(() => {
    fetch('http://localhost:3000/tecnicos').then(r=>r.json()).then(data=>setTec(data));
  },[]);

  console.log(tec);
  return (
    <>
      <h1>HelpDask</h1>
      {tec &&
        tec.map((tec) => (
          <>
            <h3>{tec.name}</h3>
            <h3>{tec.email}</h3>
          </>
        ))}
    </>
  );
}

export default App
