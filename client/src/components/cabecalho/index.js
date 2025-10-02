import './index.css';
import logoMult from '../../images/logoTransMult.jpg';

function Cabecalho() {
  return (
    <header>
      <div className="header-container">
        <a className="logo">
          <img src={logoMult} className='imagemMult' alt="Transmult Logo" />
          <span>Transmult</span>
        </a>

      </div>
    </header>
  );
}

export default Cabecalho;
