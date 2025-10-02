import './App.css';
import logoMult from './images/logoTransMult.jpg';
import Cabecalho from '../src/components/cabecalho'; 

function App() {
  return (
    <>
      <Cabecalho />
      <div className="App">
        <article>
          <div className="meio"> 
            <img src={logoMult} className="imagemMult" alt="Logo TransMult" />
            <a href="/cadastro" className="acessar">Criar conta</a>
            <a href="/recarga" className="acessar">Acessar</a>
          </div>
        </article>

      </div>
    </>
  );
}

export default App;
