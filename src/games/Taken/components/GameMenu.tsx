import React, { ReactNode } from 'react';

import Button from '../../../components/ui/Button';
import { MenuContainer } from '../style/GameMenuStyle';

interface GameMenuProps {
    onNewGameClick: () => void;
    onUndoMoveClick: () => void;
}

export default function GameMenu(props: GameMenuProps): JSX.Element {
    return (
        <MenuContainer>
            <div className="menu__item">
                <button onClick={props.onNewGameClick}>
                    NEW GAME
                </button>
                <button onClick={props.onUndoMoveClick}>
                    Undo Move
                </button>
            </div>
        </MenuContainer>
    );
}



