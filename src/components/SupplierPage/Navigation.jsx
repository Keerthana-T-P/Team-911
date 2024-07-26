import React from 'react';
import { Link } from 'react-scroll';
import './Navigation.css';
import DistributionTable  from '../DistributionTable';
import '../distribStyl.css';

const App = () => {
  return (
    <div className="App">
      <nav className="navbar">
        <Link to="home" smooth={true} duration={500} className="navItem">Home</Link>
        <Link to="supplier" smooth={true} duration={500} className="navItem">Supplier</Link>
        <Link to="fridge" smooth={true} duration={500} className="navItem">Fridge</Link>
        <Link to="contact" smooth={true} duration={500} className="navItem">Contact</Link>
      </nav>
      
      <section id="home" className="section home">
        {/* <img src={almondsImage} alt="Home" className="sectionImage" /> */}
        <p className="sectionDescription">
        </p>
      </section>
      
      <section id="supplier" className="section supplier">
        <h1 className="sectionTitle">Supplier Section</h1>
        <DistributionTable/>
      </section>
      
      <section id="fridge" className="section fridge">
        <h1 className="sectionTitle">Fridge Section</h1>
        <img src="https://via.placeholder.com/800x400" alt="Fridge" className="sectionImage" />
        <p className="sectionDescription">Find community fridges near you.</p>
      </section>
      
      <section id="contact" className="section contact">
        <h1 className="sectionTitle">Contact Section</h1>
        <img src="https://via.placeholder.com/800x400" alt="Contact" className="sectionImage" />
        <p className="sectionDescription">Contact us for more information.</p>
      </section>
    </div>
  );
};

export default App;
