import { useContext } from "react";
import { Link } from 'react-router-dom';

function Navbar() {
    return (
      <div className='navbar'>
        <div className="container">
          <div className="logo">
            Logo
          </div>
          <div className="links">
            <Link className="link" to="/"><h6>Skaner</h6></Link>
            <Link className="link" to="/allergens"><h6>Alergeny</h6></Link>
            <Link className="link" to="/info"><h6>Informacje</h6></Link>
          </div>
        </div>
      </div>
    );
  }
  
  export default Navbar;