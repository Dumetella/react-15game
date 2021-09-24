import React from 'react';
import styled from 'styled-components';

interface GameMenuProps {
    onClick: () => void;
    moves: number;
    timer: number;
    className?: string;
}

function GameMenu(props: GameMenuProps) {
    return (
        <div className={props.className}>
            <button onClick={props.onClick}>
                NEW GAME
            </button>
            <div>Number of moves:{props.moves}</div>
            <div>Time:{props.timer}</div>
        </div>
    );
}

export default styled(GameMenu)`
    display:flex;
`;
