import './App.css';
import logoMult from './images/logoTransMult.jpg';
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
            <img src={logoMult} className='imagemMult'/>
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
          <img src={logoMult} className='imagemMult'/>
          <button className="acessar">Acessar</button>
          <a href="/conta"><button>Criar conta</button></a>
        </div>
      </article>



      {/* Botão SPTrans fixo no canto inferior esquerdo */}
      <a 
        href="https://lv.sbe.sptrans.com.br/vcw/login.action" 
        className="btn-fixed"
      >
        <img src={logoSpTrans} className='imagemSpTrans'/>
        Recarga
      </a>
    </div>
  );
}

export default App;
