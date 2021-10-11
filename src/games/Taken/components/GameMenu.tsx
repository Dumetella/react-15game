import React, { ReactNode } from 'react';

import Button from '../../../components/ui/Button';
import { MenuContainer } from '../style/GameMenuStyle';
import { } from '../style/TakenGameStyle';

interface GameMenuProps {
    onNewGameClick: () => void;
    onUndoMoveClick: () => void;
}

export default function GameMenu(props: GameMenuProps): JSX.Element {
    return (
        <MenuContainer>
            <Button onClick={props.onNewGameClick}>
                New Game
            </Button>
            <Button onClick={props.onUndoMoveClick}>
                Undo Move
            </Button>
        </MenuContainer>
    );
}



