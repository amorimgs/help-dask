import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Chamado from "./pages/Chamado";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tecnico from "./pages/Tecnico";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tecnico/:id" element={<Tecnico />} />
          <Route path="/chamado" element={<Chamado />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
