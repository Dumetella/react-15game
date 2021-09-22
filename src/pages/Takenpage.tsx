import React from 'react';
import TakenGame from '../games/Taken/TakenGame';
import Container from '../components/ui/Container';


function Takenpage() {

  return (
    <div className="taken-puzzle" style={{ minHeight: 500 }}>
      <Container>
        <TakenGame size={4} />
      </Container>
    </div>
  );
}

export default Takenpage;
