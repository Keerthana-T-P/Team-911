// src/components/VAMAlgorithm.js
import React, { useEffect, useState } from 'react';

const VAMAlgorithm = ({ supply, demand, costs }) => {
  const INF = 10 ** 6;
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    let grid = costs.map(row => row.slice());
    let n = grid.length;
    let m = grid[0].length;
    let ans = 0;
    let localSupply = [...supply];
    let localDemand = [...demand];

    // Helper function for finding the row difference and the column difference
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

    // Loop runs until both the demand and the supply are exhausted
    while (Math.max(...localSupply) !== 0 || Math.max(...localDemand) !== 0) {
      // Finding the row and col difference
      let [row, col] = findDiff(grid);

      // Finding the maximum element in row difference array
      let maxi1 = Math.max(...row);

      // Finding the maximum element in col difference array
      let maxi2 = Math.max(...col);

      // If the row diff max element is greater than or equal to col diff max element
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

    setSolution(ans);
  }, [supply, demand, costs]);

  return (
    <div>
      <h2>Vogel's Approximation Method Result</h2>
      {solution !== null && <p>The basic feasible solution is: {solution}</p>}
    </div>
  );
};

export default VAMAlgorithm;
