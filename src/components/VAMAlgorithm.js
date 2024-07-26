import React, { useEffect, useState } from 'react';

const VAMAlgorithm = ({ supply, demand, costs, quantity, setQuantity }) => {
  const INF = 10 ** 6;
  const [solution, setSolution] = useState(null);
  const [showQuantity, setShowQuantity] = useState(false);

  useEffect(() => {
    let grid = costs.map(row => row.slice());
    let n = grid.length;
    let m = grid[0].length;
    let ans = 0;
    let localSupply = [...supply];
    let localDemand = [...demand];
    let localQuantity = quantity.map(row => row.slice());

    function findDiff(grid) {
      let rowDiff = [];
      let colDiff = [];
      for (let i = 0; i < grid.length; i++) {
        let arr = [...grid[i]];
        arr.sort((a, b) => a - b);
        rowDiff.push(arr[1] - arr[0]);
      }

      for (let col = 0; col < grid[0].length; col++) {
        let arr = [];
        for (let i = 0; i < grid.length; i++) {
          arr.push(grid[i][col]);
        }
        arr.sort((a, b) => a - b);
        colDiff.push(arr[1] - arr[0]);
      }

      return [rowDiff, colDiff];
    }

    while (Math.max(...localSupply) !== 0 || Math.max(...localDemand) !== 0) {
      let [row, col] = findDiff(grid);

      let maxi1 = Math.max(...row);
      let maxi2 = Math.max(...col);

      if (maxi1 >= maxi2) {
        for (let ind = 0; ind < row.length; ind++) {
          if (row[ind] === maxi1) {
            let mini1 = Math.min(...grid[ind]);
            for (let ind2 = 0; ind2 < grid[ind].length; ind2++) {
              if (grid[ind][ind2] === mini1) {
                let mini2 = Math.min(localSupply[ind], localDemand[ind2]);
                ans += mini2 * mini1;
                localSupply[ind] -= mini2;
                localDemand[ind2] -= mini2;
                localQuantity[ind][ind2] = mini2;

                if (localDemand[ind2] === 0) {
                  for (let r = 0; r < n; r++) {
                    grid[r][ind2] = INF;
                  }
                } else {
                  grid[ind] = new Array(m).fill(INF);
                }
                break;
              }
            }
            break;
          }
        }
      } else {
        for (let ind = 0; ind < col.length; ind++) {
          if (col[ind] === maxi2) {
            let mini1 = INF;
            for (let j = 0; j < n; j++) {
              mini1 = Math.min(mini1, grid[j][ind]);
            }

            for (let ind2 = 0; ind2 < n; ind2++) {
              if (grid[ind2][ind] === mini1) {
                let mini2 = Math.min(localSupply[ind2], localDemand[ind]);
                ans += mini2 * mini1;
                localSupply[ind2] -= mini2;
                localDemand[ind] -= mini2;
                localQuantity[ind2][ind] = mini2;

                if (localDemand[ind] === 0) {
                  for (let r = 0; r < n; r++) {
                    grid[r][ind] = INF;
                  }
                } else {
                  grid[ind2] = new Array(m).fill(INF);
                }
                break;
              }
            }
            break;
          }
        }
      }
    }

    setQuantity(localQuantity);
    setSolution(ans);
  }, [supply, demand, costs, quantity, setQuantity]);

  const handleCalculateClick = () => {
    setShowQuantity(true);
  };

  
  const tableStyle = {
    borderCollapse: 'collapse',
    width: '45%',
    margin: '0 auto 10px',
  };

  const tableCellStyle = {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'center',
  }

  return (
    <div>
      <h2>Vogel's Approximation Method Result</h2>
      <button onClick={handleCalculateClick}>Calculate allocation matrix</button>
      {solution !== null && <p>The basic feasible solution is: {solution}</p>}
      {showQuantity && (
        <div style={{ textAlign: 'center' }}>
          <h3>Quantity Matrix</h3>
          <table style={tableStyle}>
            <thead>
              <tr>
                {quantity[0].map((_, colIndex) => (
                  <th key={colIndex}>Fridge {colIndex + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {quantity.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} style={tableCellStyle}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VAMAlgorithm;
