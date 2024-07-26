// src/components/VAMAlgorithm.js
import React from 'react';

const VAMAlgorithm = ({ supply, demand, costs }) => {
  const INF = 10 ** 3;
  let grid = costs.map(row => row.slice());
  let n = grid.length;
  let m = grid[0].length;
  let ans = 0;

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

  while (Math.max(...supply) !== 0 || Math.max(...demand) !== 0) {
    let [row, col] = findDiff(grid);
    let maxi1 = Math.max(...row);
    let maxi2 = Math.max(...col);

    if (maxi1 >= maxi2) {
      for (let ind = 0; ind < row.length; ind++) {
        if (row[ind] === maxi1) {
          let mini1 = Math.min(...grid[ind]);
          for (let ind2 = 0; ind2 < grid[ind].length; ind2++) {
            if (grid[ind][ind2] === mini1) {
              let mini2 = Math.min(supply[ind], demand[ind2]);
              ans += mini2 * mini1;
              supply[ind] -= mini2;
              demand[ind2] -= mini2;

              if (demand[ind2] === 0) {
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
              let mini2 = Math.min(supply[ind2], demand[ind]);
              ans += mini2 * mini1;
              supply[ind2] -= mini2;
              demand[ind] -= mini2;

              if (demand[ind] === 0) {
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

  return (
    <div>
      <h2>Vogel's Approximation Method Result</h2>
      <p>The basic feasible solution is: {ans}</p>
    </div>
  );
};

export default VAMAlgorithm;
