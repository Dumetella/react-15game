import React from 'react';
import styled from 'styled-components';
import Button from '../../components/ui/Button';

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
        </div>

    );
}

export default styled(GameMenu)`
    display:flex;
    margin-bottom: 10px;
`;

