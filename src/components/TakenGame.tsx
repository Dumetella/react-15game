import React, { useState } from 'react'
import styled from 'styled-components';
import { gameFactory } from '../helpers/gamefactory';
import TileModel from '../model/TileModel'
import Grid from './Grid'




interface GameProps {
    size: number
    className?: string;
}

function TakenGame(props: GameProps) {

    const level = gameFactory(props.size);
    const originalLevel = level.slice();

    const [currentLevel, setCurrentLevel] = useState(originalLevel);


    const onNewGameClick = () => {
        setCurrentLevel(gameFactory(4));
    }

    const onClick = (tile: TileModel) => {

        const empty = currentLevel.find((e) => {
            return e.value === -1;
        })
        if (!empty) {
            return
        };

        if (tile.y + 1 === empty.y && tile.x === empty.x) {
            [tile.y, empty.y] = [empty.y, tile.y]
            console.log('UP')
        }
        else if (tile.y - 1 === empty.y && tile.x === empty.x) {
            [tile.y, empty.y] = [empty.y, tile.y]
            console.log('DOWN')
        }
        else if (tile.x + 1 === empty.x && tile.y === empty.y) {
            [tile.x, empty.x] = [empty.x, tile.x]
            console.log('RIGHT')
        }
        else if (tile.x - 1 === empty.x && tile.y === empty.y) {
            [tile.x, empty.x] = [empty.x, tile.x]
            console.log('LEFT')
        }
        setCurrentLevel(currentLevel.slice())
    }

    return (
        <div className={props.className}>
            <Grid
                level={currentLevel}
                onClick={(tile) => onClick(tile)}
            />
        </div>
    )
}

export default styled(TakenGame)`
    display: flex;
    justify-content: center;
    margin-top: 100px;
`
