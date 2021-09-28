import React from 'react';
import styled from 'styled-components';
import Button from '../../components/ui/Button';

interface GameMenuProps {
    onNewGameClick: () => void;
    onUndoMoveClick: () => void;
    className?: string;
}

function GameMenu(props: GameMenuProps) {
    return (
        <div className={props.className}>
            <div className="menu__item">
                <button onClick={props.onNewGameClick}>
                    NEW GAME
                </button>
                <button onClick={props.onUndoMoveClick}>
                    Undo Move
                </button>
            </div>
        </div>
    );
}

export default styled(GameMenu)`
    display:flex;
    margin-bottom: 10px;
`;

