'use client'

import React, { useState } from 'react'
import PathMenu from './pathMenu';
import { bfs } from './algorithms/bfs';

const ROWS = 20;
const COLS = 60;

interface GridType{
    row: number;
    col: number;
    isWall: boolean;
    isStart: boolean;
    isEnd: boolean;
    visited: boolean;
    previousNode: GridType | null;
}

const Grid = () => {

  const [selectedType, setSelectedType] = useState('wall');
  const [start, setStart] = useState({row:10, col:5});
  const [end, setEnd] = useState({row:10, col:45});
  const [grid, setGrid] = useState(createGrid());
  const [isMousePressed, setIsMousePressed] = useState(false);

  function createGrid(){
    const grid = [];
    for(let row = 0; row < ROWS;row++){
      const currentRow = [];
      for(let col = 0;col < COLS;col++){
        currentRow.push({
          row,
          col,
          isWall:false,
          isStart:row === start.row && col === start.col,
          isEnd:row === end.row && col === end.col,
          visited:false,
          previousNode:null,
        });
      }
      grid.push(currentRow);
    }
    return grid;
  }

  const visualize = () => {
    const startNode = grid[10][5];
    const endNode = grid[10][45];
    const visitedNodesInOrder = bfs(grid, startNode, endNode);
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        if (i === visitedNodesInOrder.length) {
          drawShortestPath(endNode);
          return;
        }
        const node = visitedNodesInOrder[i];
        if(node){
          const element = document.getElementById(`node-${node.row}-${node.col}`);
          if (!element) return;
          setTimeout(() => {
            element.className = "h-6 w-6 border bg-green-500"; 
          }, 100);
    
          setTimeout(() => {
            element.className = "h-6 w-6 border bg-yellow-500"; 
          }, 300);
    
          setTimeout(() => {
            element.className = "h-6 w-6 border bg-blue-500"; // Thi color
          }, 500);
        }
      }, 10 * i);
    }
  };
  
  function drawShortestPath(endNode:GridType) {
    const nodesInShortestPathOrder:GridType[] = [];
    let currentNode:GridType|null = endNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
  
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const element = document.getElementById(`node-${node.row}-${node.col}`);
  
        if (!element) return;
  
        element.className = "h-6 w-6 border bg-yellow-500";
      }, 50 * i);
    }
  }
  
  function toggleWall(row:number, col:number){
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    if(node.isStart || node.isEnd) return;
    node.isWall = !node.isWall;
    setGrid(newGrid);
  }

  function changeStart(row:number, col:number){
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    if(node.isEnd) return;
    if(node.isWall){node.isWall = false}
    const prevStart = newGrid[start.row][start.col];
    prevStart.isStart = false;
    node.isStart = true;
    setStart({row, col});
    setGrid(newGrid);
  }

  function changeEnd(row:number, col:number){
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    if(node.isStart) return;
    if(node.isWall){node.isWall = false};
    const prevEnd = newGrid[end.row][end.col];
    prevEnd.isEnd = false;
    node.isEnd = true;
    setEnd({row, col});
    setGrid(newGrid);
  }

  function handleMouseUp(){
    setIsMousePressed(false);
  }

  function handleMouseDown(row:number, col:number){
    setIsMousePressed(true);
    if(selectedType === 'wall'){
      toggleWall(row, col);
    }else if(selectedType === 'start'){
      changeStart(row, col);
    }else{
      changeEnd(row, col);
    }
  }
  
  function handleMouseEnter(row:number, col:number){
    if(!isMousePressed) return;
    if(selectedType === 'wall'){
      toggleWall(row, col);
    }else if(selectedType === 'start'){
      changeStart(row, col);
    }else{
      changeEnd(row, col);
    }
  }

  return (
    <div className='flex flex-col items-center' onMouseUp={handleMouseUp}>
      <PathMenu 
        setSelectedType = {setSelectedType}
        visualize = {visualize}
      />
      <div className='grid grid-cols-[repeat(60,minmax(0,1fr))] pt-10'>
        {grid.map((row, rowIdx) =>
          row.map((node, nodeIdx) =>(
            <div 
              key={`${rowIdx}-${nodeIdx}`}
              id={`node-${node.row}-${node.col}`}
              onMouseDown={()=>{handleMouseDown(node.row, node.col)}}
              onMouseEnter={()=>{handleMouseEnter(node.row, node.col)}}
              className={`h-6 w-6 border ${
                node.isStart
                ?'bg-red-500'
                :node.isEnd
                ?'bg-green-500'
                :node.isWall
                ?'bg-black'
                :'bg-white'
                }`}
            >
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Grid