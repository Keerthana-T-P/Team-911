// src/components/DistributionTable.js
import React, { useState } from 'react';
import VAMAlgorithm from './VAMAlgorithm';


const DistributionTable = () => {
  const [supply, setSupply] = useState([300, 400, 500]);
  const [demand, setDemand] = useState([250, 350, 400, 200]);
  const [costs, setCosts] = useState([
    [3, 1, 7, 4],
    [2, 6, 5, 9],
    [8, 3, 3, 2]
  ]);
  const [calculate, setCalculate] = useState(false);

  const handleInputChange = (event, setFunc, index, subIndex = null) => {
    const value = parseInt(event.target.value);
    setFunc(prevState => {
      const newState = [...prevState];
      if (subIndex !== null) {
        newState[index][subIndex] = value;
      } else {
        newState[index] = value;
      }
      return newState;
    });
  };

  return (
    <div>
      <h2>Distribution Table</h2>
      <div>
        <h3>Supply</h3>
        {supply.map((value, index) => (
          <input
            key={index}
            type="number"
            value={value}
            onChange={e => handleInputChange(e, setSupply, index)}
          />
        ))}
      </div>
      <div>
        <h3>Demand</h3>
        {demand.map((value, index) => (
          <input
            key={index}
            type="number"
            value={value}
            onChange={e => handleInputChange(e, setDemand, index)}
          />
        ))}
      </div>
      <div>
        <h3>Cost Grid</h3>
        {costs.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((value, colIndex) => (
              <input
                key={colIndex}
                type="number"
                value={value}
                onChange={e => handleInputChange(e, setCosts, rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
      <button onClick={() => setCalculate(true)}>Calculate VAM</button>
      {calculate && <VAMAlgorithm supply={[...supply]} demand={[...demand]} costs={costs.map(row => [...row])} />}
    </div>
  );
};

export default DistributionTable;
