import React, { useEffect, useState } from 'react';
import './App.css';
import Case from './Case';
import { GameService } from './services/game.service';
import { caseEnum, IGame, playerEnum } from '@monorepo/common';
import { v4 as uuidv4 } from 'uuid';

export const newGame = [
  [caseEnum.EMPTY, caseEnum.EMPTY, caseEnum.EMPTY],
  [caseEnum.EMPTY, caseEnum.EMPTY, caseEnum.EMPTY],
  [caseEnum.EMPTY, caseEnum.EMPTY, caseEnum.EMPTY],
];
function App() {
  const [game, setGame] = useState<IGame | null>(null);
  const [winner, setWinner] = useState<playerEnum>();

  const [clientId] = useState(uuidv4());
  useEffect(() => {
    const getNewGame = async () => {
      const { game: newGame } = await GameService.get(clientId);
      setGame(newGame);
    };
    getNewGame();
  }, [clientId]);

  const check = async (x: number, y: number, el: caseEnum) => {
    if (el !== caseEnum.EMPTY) {
      return;
    }
    const { game: newGame, winner } = await GameService.play(clientId, {
      x,
      y,
      case: caseEnum.CROSS,
    });
    setGame(newGame);

    if (winner) {
      setWinner(winner);
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
                  onClick={() => check(x, y, el)}
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
