import React from 'react'

interface GameMenuProps {
    onClick: () => void;
    moves: number;
    timer: number;
}

export default function GameMenu(props: GameMenuProps) {
    return (
        <div>
            <button onClick={props.onClick}>
                NEW GAME
            </button>
            <div>{props.moves}</div>
            <div>{props.timer}</div>
        </div>
    )
}
