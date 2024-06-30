import { useContext } from "react";
import { Link } from 'react-router-dom';

function Navbar() {
  let activeSection = "";

  const changeActiveSection = (section) => (event) => {
        // Remove 'active' class from all links
        const links = document.querySelectorAll('.link');
        links.forEach(link => link.classList.remove('link__active'));
    
        // Add 'active' class to the clicked link
        event.currentTarget.classList.add('link__active');
  }

  return (
    <div className='navbar'>
      <div className="navbar__logo">
        <img src="../public/logo.png" alt="logo" />
      </div>
      <div className="links">
        <Link className="link" to="/" onClick={changeActiveSection("scanner")}><h6>Skaner</h6></Link>
        <p class="navbar__line"></p>
        <Link className="link" to="/allergens" onClick={changeActiveSection("allergens")}><h6>Alergeny</h6></Link>
        <p class="navbar__line"></p>
        <Link className="link" to="/info" onClick={changeActiveSection("info")}><h6>Informacje</h6></Link>
      </div>
    </div>
  );
}

export default Navbar;