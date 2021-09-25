import React from 'react';
import TakenGame from '../games/Taken/TakenGame';
import Container from '../components/ui/Container';
import GameFrame from '../games/Taken/GameFrame';


function Takenpage(): JSX.Element {

  return (
    <GameFrame >
      <TakenGame size={4} />
    </GameFrame >
  );
}

export default Takenpage;
