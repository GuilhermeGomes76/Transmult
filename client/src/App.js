import './App.css';
import logoMult from './images/logoTransMult.jpg';
import Cabecalho from '../src/components/cabecalho';
import { Link } from 'react-router-dom';

function App() {
  return (
    <>
      <Cabecalho />
      <div className="App">
        <article>
          <div className="meio">
            <img src={logoMult} className="imagemMult" alt="Logo TransMult" />
            <Link to="cadastro" className="acessar">Criar conta</Link>
            <Link to="recarga" className="acessar">Acessar</Link>
          </div>
        </article>
      </div>
    </>
  );
}

export default App;
