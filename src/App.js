// src/App.js
import React from 'react';
 import GlassContainer from './components/GlassContainer';
// import DistributionTable from './components/DistributionTable';
// import GoogleMapComponent from "./components/GoogleMapComponent";
import Navigation from "./components/SupplierPage/Navigation";
//import styles from "./components/GlassContainer.module.css";
 import './App.css';

function App() {
  return (
    <div className="App">
      
      <main>
        <Navigation/>
         <GlassContainer/>
       {/* <DistributionTable />
        <GoogleMapComponent/> */}
      </main>
      
    </div>
  );
}

export default App;
