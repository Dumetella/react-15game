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
            <div className="menu__item">
                <button onClick={props.onClick}>
                    NEW GAME
                </button>
            </div>
            <div className="menu__item">
                <button >
                    Undo
                </button>
            </div>
            <div className="menu__item">
                <button >
                    Solve
                </button>
            </div>
            <div className="menu__item">
                <div>Number of moves: {props.moves}</div>
            </div>
            <div className="menu__item">
                <div>Time elapsed: {props.timer}</div>
            </div>
        </div>
    );
}

export default styled(GameMenu)`
    display:flex;
    margin-bottom: 10px;
`;
