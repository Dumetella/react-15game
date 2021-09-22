import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { gameFactory } from '../../helpers/gamefactory';
import TileModel from '../../model/TileModel'
import GameMenu from './GameMenu';
import Grid from './Grid'


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
    const [gameState, setGameState] = useState('GameInit')


    const onNewGameClick = () => {
        setCurrentLevel(gameFactory(4));
        setTotalMoves(0);
        setTotalSeconds(0);

    }

    const isPuzzleSolved = () => {
        const solvedTiles = currentLevel.filter((tile) => {
            return tile.value === tile.y * 4 + tile.x + 1;
        });
        if (solvedTiles.length === 15) {
            return true;
        } else return false;
    }

    function setTimer() {
        const timerId = setInterval(() => setTotalSeconds(totalSeconds => totalSeconds + 1), 1000);
    }


    const onClick = (tile: TileModel) => {

        if (totalMoves === 0) {
            setTimer();
        }

        const empty = currentLevel.find((e) => {
            return e.value === -1;
        })
        if (!empty) {
            return
        };

        if (tile.y + 1 === empty.y && tile.x === empty.x) {
            [tile.y, empty.y] = [empty.y, tile.y];
            setTotalMoves(totalMoves => totalMoves + 1);
            if (isPuzzleSolved()) {
                console.log('YOU WON!')
            }
        }
        else if (tile.y - 1 === empty.y && tile.x === empty.x) {
            [tile.y, empty.y] = [empty.y, tile.y];
            setTotalMoves(totalMoves => totalMoves + 1);
            if (isPuzzleSolved()) {
                console.log('YOU WON!')
            }
        }
        else if (tile.x + 1 === empty.x && tile.y === empty.y) {
            [tile.x, empty.x] = [empty.x, tile.x];
            setTotalMoves(totalMoves => totalMoves + 1);
            if (isPuzzleSolved()) {
                console.log('YOU WON!')
            }
        }
        else if (tile.x - 1 === empty.x && tile.y === empty.y) {
            [tile.x, empty.x] = [empty.x, tile.x];
            setTotalMoves(totalMoves => totalMoves + 1);
            if (isPuzzleSolved()) {
                console.log('YOU WON!')
            }
        }
        setCurrentLevel(currentLevel.slice())
    }

    return (
        <div className={props.className}>
            <GameMenu onClick={onNewGameClick}
                moves={totalMoves}
                timer={totalSeconds}
            />
            <Grid
                level={currentLevel}
                onClick={(tile) => onClick(tile)}
            />
        </div>
    )
}

export default styled(TakenGame)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 100px;
`


// useEffect(() => {
//     const timerId = setInterval(() => setTotalSeconds(totalSeconds + 1), 1000);
//     return () => {
//         clearInterval(timerId)
//     };
// });