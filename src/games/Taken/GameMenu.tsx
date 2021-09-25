import React from 'react';
import styled from 'styled-components';

interface GameMenuProps {
    onClick: () => void;
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
        </div>

    );
}

export default styled(GameMenu)`
    display:flex;
    margin-bottom: 10px;
`;


//clock
// <svg>
//     <path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path>
// </svg>
//Moves
// <svg>
//     <path d="M9.01 14H2v2h7.01v3L13 15l-3.99-4v3zm5.98-1v-3H22V8h-7.01V5L11 9l3.99 4z"></path>
// </svg>
