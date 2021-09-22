import React from 'react'
import TileModel from '../../model/TileModel'
import Tile from './Tile'
import styled from 'styled-components'



interface GridProps {
    level: TileModel[]
    className?: string;
    onClick: (tile: TileModel) => void;
}


function Grid(props: GridProps) {

    return (
        <div className={props.className}>
            {props.level.map((e, i) => <Tile onClick={() => props.onClick(e)} correct={e.value === e.y * 4 + e.x + 1} key={i} data={e} />)}
        </div>
    )
}


export default styled(Grid)`
 position: relative;
 min-width: 400px;
 `
