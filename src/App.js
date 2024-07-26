// src/App.js
import React from 'react';

import DistributionTable from './components/DistributionTable';
import ImageComponent from './components/ImageComponent/ImageComponent';
import ProfileSection from './components/ProfileSection/ProfileSection';
import MapComponent from './components/MapComponent';
import './App.css';

function App() {
  return (
    <div className="App">
      
      <main>
        <DistributionTable />
        
      </main>
      <MapComponent />
    </div>
  );
}

export default App;
