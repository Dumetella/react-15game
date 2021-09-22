import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TakenGameState from './enum/TakenGameState';
import { gameFactory } from './helpers/gamefactory';
import TileModel from './model/TileModel';
import GameMenu from './GameMenu';
import Grid from './Grid';


interface GameProps {
    size: number
    className?: string;
}

function TakenGame(props: GameProps) {

    const level = gameFactory(props.size);
    const originalLevel = level.slice();

    const [currentLevel, setCurrentLevel] = useState(originalLevel);
    const [totalMoves, setTotalMoves] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [gameState, setGameState] = useState(TakenGameState.NotStarted);
    const [timer, setTimer] = useState<ReturnType<typeof setInterval> | null>(null);


    const onNewGameClick = () => {
        setCurrentLevel(gameFactory(props.size));
        setTotalMoves(0);
        setTotalSeconds(0);
        setGameState(TakenGameState.NotStarted);
        timer && clearInterval(timer);
        setTimer(null);
    };

    const isPuzzleSolved = () => currentLevel.filter(c => c.value > 0).every(c => c.value === c.y * props.size + c.x + 1);


    const onClick = (tile: TileModel) => {

        if (gameState === TakenGameState.NotStarted) {
            setGameState(TakenGameState.InProgress);
            setTimer(setInterval(() => setTotalSeconds(totalSeconds => totalSeconds + 1), 1000));
        }

        const empty = currentLevel.find((e) => {
            return e.value === -1;
        });
        if (!empty) {
            return;
        }

        let moveValid = false;
        if (tile.y + 1 === empty.y && tile.x === empty.x) {
            [tile.y, empty.y] = [empty.y, tile.y];
            moveValid = true;
        }
        else if (tile.y - 1 === empty.y && tile.x === empty.x) {
            [tile.y, empty.y] = [empty.y, tile.y];
            moveValid = true;
        }
        else if (tile.x + 1 === empty.x && tile.y === empty.y) {
            [tile.x, empty.x] = [empty.x, tile.x];
            moveValid = true;
        }
        else if (tile.x - 1 === empty.x && tile.y === empty.y) {
            [tile.x, empty.x] = [empty.x, tile.x];
            moveValid = true;
        }

        if (moveValid) {
            setTotalMoves(totalMoves => totalMoves + 1);
            setCurrentLevel(currentLevel.slice());

            if (isPuzzleSolved()) {
                setGameState(TakenGameState.Solved);
                timer && clearInterval(timer);
                setTimer(null);
            }
        }
    };

    return (
        <div className={props.className}>
            {
                gameState === TakenGameState.Solved
                    ? <div>
                        <h2>YOU WON</h2>
                        <button onClick={() => onNewGameClick()}>Restart</button>
                    </div>
                    : null
            }
            <GameMenu onClick={onNewGameClick}
                moves={totalMoves}
                timer={totalSeconds}
            />
            <Grid
                level={currentLevel}
                onClick={(tile) => onClick(tile)}
            />
        </div>
    );
}

export default styled(TakenGame)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 100px;
`;


// useEffect(() => {
//     const timerId = setInterval(() => setTotalSeconds(totalSeconds + 1), 1000);
//     return () => {
//         clearInterval(timerId)
//     };
// });
