import './App.css';
import logoSpTrans from './images/spTrans.png';

function App() {
  return (
    <div className="App">
      {/* Header */}
      <header>
        <div className="header-container">
          {/* Logo (leva para SPTrans) */}
          <a 
            href="https://lv.sbe.sptrans.com.br/vcw/login.action" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="logo"
          >
            <img src={logoSpTrans} alt="SPTrans" />
            <span>SPTrans</span>
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

      {/* Botão SPTrans fixo no canto inferior esquerdo */}
      <a 
        href="https://lv.sbe.sptrans.com.br/vcw/login.action" 
        target="_blank" 
        rel="noopener noreferrer"
        className="btn-fixed"
      >
        Recarga
      </a>
    </div>
  );
}

export default App;
