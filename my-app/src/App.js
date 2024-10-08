import React from 'react';
import './App.css'; // 确保引入了CSS文件
import Game2048 from './Game2048'; // 引入你创建的2048游戏组件

function App() {
  return (
    <div className="App">
      <h1>2048 Game</h1>
      <Game2048 /> {/* 渲染2048游戏组件 */}
    </div>
  );
}

export default App;
