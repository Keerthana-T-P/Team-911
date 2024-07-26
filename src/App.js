// src/App.js
import React from 'react';

import DistributionTable from './components/DistributionTable';
import Navigation from './components/SupplierPage/Navigation';
import './App.css';

function App() {
  return (
    <div className="App">
      
      <main>
        <Navigation/>
        <DistributionTable />
      </main>
      
    </div>
  );
}

export default App;
