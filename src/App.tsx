import React, { useEffect, useState } from 'react';
import './App.css';
import Case from './Case';
import { GameService } from './services/game.service';
import { caseEnum, IGame } from '@monorepo/common';
import { v4 as uuidv4 } from 'uuid';

export const newGame = [
  [caseEnum.EMPTY, caseEnum.EMPTY, caseEnum.EMPTY],
  [caseEnum.EMPTY, caseEnum.EMPTY, caseEnum.EMPTY],
  [caseEnum.EMPTY, caseEnum.EMPTY, caseEnum.EMPTY],
];
function App() {
  const [game, setGame] = useState<IGame | null>(null);
  const [winner, setWinner] = useState<boolean>(false);

  const [clientId] = useState(uuidv4());
  useEffect(() => {
    const getNewGame = async () => {
      const newGame = await GameService.get(clientId);
      setGame(newGame);
    };
    getNewGame();
  }, []);

  const check = async (x: number, y: number) => {
    const newGame = await GameService.play(clientId, {
      x,
      y,
      case: caseEnum.CROSS,
    });

    if (newGame?.winner) {
      setWinner(newGame.winner);
    } else {
      setGame(newGame);
    }
  };

  if (!game) {
    return null;
  }

  return (
    <div className="App">
      <header className="App-header">
        {winner && <div style={{ fontSize: 50 }}>{winner} won !</div>}
        {game.map((row, x) => {
          return (
            <div style={{ display: 'flex' }} key={x}>
              {row.map((el, y) => (
                <Case
                  key={x + '-' + y}
                  state={el}
                  onClick={() => check(x, y)}
                />
              ))}
            </div>
          );
        })}
      </header>
    </div>
  );
}

export default App;
