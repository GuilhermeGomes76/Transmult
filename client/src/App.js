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
            className="logo"
          >
            <div className="quadrado"> <p>logo</p> </div>
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

      <article>
        <div className="meio"> 
          <div className="quadrado"> <p>logo</p> </div>
          <a href="/conta"> <button> Criar conta </button></a>

        </div>
      </article>

      {/* Botão SPTrans fixo no canto inferior esquerdo */}
      <a 
        href="https://lv.sbe.sptrans.com.br/vcw/login.action" 
        className="btn-fixed"
      >
        Recarga
      </a>
    </div>
  );
}

export default App;
