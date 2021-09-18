import React, { useState } from 'react'
import { gameFactory } from '../helpers/gamefactory';
import TileModel from '../model/TileModel'
import Grid from './Grid'




interface GameProps {
    size: number
}

export default function Game(props: GameProps) {

    const level = gameFactory(props.size);
    const originalLevel = level.slice();

    const [currentLevel, setCurrentLevel] = useState(originalLevel);

    const onResetGameClick = () => {
        setCurrentLevel(originalLevel);
    }

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
        <div>
            <Grid
                level={currentLevel}
                onClick={(tile) => onClick(tile)}
            />
        </div>
    )
}
