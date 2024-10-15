import React, { useState } from 'react';

const GuessNumberGame = () => {
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [targetNumber, setTargetNumber] = useState(null);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [history, setHistory] = useState([]);

  // 處理範圍輸入的函數
  const handleStartGame = () => {
    const min = parseInt(minValue);
    const max = parseInt(maxValue);

    if (isNaN(min) || isNaN(max) || min >= max) {
      setMessage('上限必須大於下限，請重新輸入範圍');
      return;
    }

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setTargetNumber(randomNumber);
    setMessage(`遊戲開始！請輸入 ${min} 到 ${max} 之間的數字`);
    setAttempts(0);
    setHistory([]);
    setGuess('');
  };

  // 處理猜測的函數
  const handleGuess = () => {
    const userGuess = parseInt(guess);
    if (isNaN(userGuess)) {
      setMessage('請輸入一個有效的數字');
      return;
    }

    setAttempts(attempts + 1);

    if (userGuess === targetNumber) {
      setMessage(`恭喜你！猜對了！總共嘗試了 ${attempts + 1} 次。`);
      setHistory([...history, `你猜的數字: ${userGuess}, 結果: 猜對了!`]);
    } else if (userGuess < targetNumber) {
      setMessage('太小了！再試一次。');
      setHistory([...history, `你猜的數字: ${userGuess}, 結果: 太小了`]);
    } else {
      setMessage('太大了！再試一次。');
      setHistory([...history, `你猜的數字: ${userGuess}, 結果: 太大了`]);
    }

    setGuess(''); // 清空輸入框
  };

  return (
    <div className="guess-number-game">
      {targetNumber === null ? (
        <div>
          <h2>猜數字遊戲</h2>
          <div>
            <label>請輸入下限：</label>
            <input
              type="number"
              value={minValue}
              onChange={(e) => setMinValue(e.target.value)}
            />
          </div>
          <div>
            <label>請輸入上限：</label>
            <input
              type="number"
              value={maxValue}
              onChange={(e) => setMaxValue(e.target.value)}
            />
          </div>
          <button onClick={handleStartGame}>開始遊戲</button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <h2>請輸入你的猜測：</h2>
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
          <button onClick={handleGuess}>提交猜測</button>
          <p>{message}</p>
          <p>嘗試次數: {attempts}</p>
          <div>
            <h3>歷史猜測紀錄：</h3>
            <ul>
              {history.map((entry, index) => (
                <li key={index}>{entry}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuessNumberGame;
