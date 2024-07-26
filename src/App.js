// src/App.js
import React from 'react';
import Navigation from './components/SupplierPage/Navigation';
import MapComponent from './components/MapComponent';
import DistributionTable from './components/DistributionTable';
import ImageComponent from './components/ImageComponent/ImageComponent';
import ProfileSection from './components/ProfileSection/ProfileSection';
import './App.css';

function App() {
  return (
    <div className="App">
      
      <main>
        <Navigation/>
        <DistributionTable />
      </main>
      <MapComponent />
    </div>
  );
}

export default App;
