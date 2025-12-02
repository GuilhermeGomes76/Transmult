import './App.css';
import logoMult from './images/logoTransMult.jpg';
<<<<<<< HEAD
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
=======
import Cabecalho from './components/cabecalho';
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
>>>>>>> 844dc9c4511b601c219d64411121baab46208c72
  );
}

export default App;
