import React, { useState } from 'react';
import VAMAlgorithm from './VAMAlgorithm';
import '/911/comm-fridge/src/components/distribStyl.css'

const DistributionTable = () => {
  const [supply, setSupply] = useState([7, 9, 18]);
  const [demand, setDemand] = useState([5, 8, 7, 14]);
  const [costs, setCosts] = useState([
    [19, 30, 50, 10],
    [70, 30, 40, 60],
    [40, 8, 70, 20]
  ]);
  const [quantity, setQuantity] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
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
      {calculate && (
        // Pass the setQuantity function to VAMAlgorithm
        <VAMAlgorithm 
          supply={[...supply]} 
          demand={[...demand]} 
          costs={costs.map(row => [...row])} 
          quantity={quantity} 
          setQuantity={setQuantity} 
        />
      )}
    </div>
  );
};

export default DistributionTable;
