interface GridType{
    row: number;
    col: number;
    isWall: boolean;
    isStart: boolean;
    isEnd: boolean;
    previousNode: null | GridType;
    visited:boolean
}

export function bfs(grid:GridType[][], startNode:GridType, endNode:GridType) {
    const queue = [startNode];
    const visitedNodesInOrder: (GridType | undefined)[] = [];
    startNode.visited = true;
  
    while (queue.length) {
      const currentNode = queue.shift();
      visitedNodesInOrder.push(currentNode);
  
      if (!currentNode) {
        continue; // Skip if currentNode is undefined
      }

      if (currentNode === endNode) return visitedNodesInOrder;
  
      const neighbors = getNeighbors(grid, currentNode);
      for (const neighbor of neighbors) {
        if (!neighbor.visited && !neighbor.isWall) {
          neighbor.visited = true;
          neighbor.previousNode = currentNode;
          queue.push(neighbor);
        }
      }
    }
  
    return visitedNodesInOrder; // Return nodes visited if no path is found
}
  
function getNeighbors(grid:GridType[][], node:GridType) {
    const { row, col } = node;
    const neighbors = [];
  
    if (row > 0) neighbors.push(grid[row - 1][col]); // Up
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // Down
    if (col > 0) neighbors.push(grid[row][col - 1]); // Left
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // Right
  
    return neighbors;
}
  