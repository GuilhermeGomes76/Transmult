import './App.css';
import { Link } from 'react-router-dom';
import logoMult from './images/logoTransMult.jpg';
import logoSpTrans from './images/spTrans.png';

function App() {
  return (
    <div className="App">

      {/* Header */}
      <header>
        <div className="header-container">

          {/* Logo */}
          <a className="logo">
            <img src={logoMult} className="imagemMult" alt="Logo" />
            <span>Transmult</span>
          </a>

          {/* Menu */}
          <nav className="nav-menu">
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#sobre">Sobre</a></li>
              <li><a href="#contato">Contato</a></li>
            </ul>
          </nav>

        </div>
      </header>

      {/* Conteúdo principal */}
      <article>
        <div className="meio">
          <img src={logoMult} className="imagemMult" alt="Logo TransMult" />

          <Link to="/recarga">
            <button>Acessar</button>
          </Link>

          <Link to="/conta">
            <button>Criar conta</button>
          </Link>
        </div>
      </article>

      {/* Botão SPTrans fixo
      <a 
        href="https://lv.sbe.sptrans.com.br/vcw/login.action"
        className="btn-fixed"
      >

        <img src={logoSpTrans} className="imagemSpTrans" alt="SPTrans logo" />
        Recarga
      </a>
      */}
    </div>
  );
}

export default App;
