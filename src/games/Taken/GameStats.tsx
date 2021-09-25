import React from 'react';
import styled from 'styled-components';

interface GameStatsProps {
    moves: number;
    timer: number;
    className?: string;
}

function GameStats(props: GameStatsProps): JSX.Element {
    return (
        <div className={props.className}>
            <div className="stats">
                <div className="stats__item">
                    <div>Number of moves: {props.moves}</div>
                </div>
                <div className="stats__item">
                    <div>Time elapsed: {props.timer}</div>
                </div>
            </div>
        </div>
    );
}

export default styled(GameStats)`

    .stats {
        display: flex;
    }

    .stats__item {
        margin-right: 10px;
    }
`;
