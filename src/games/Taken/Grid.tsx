import React from 'react';
import TileModel from './model/TileModel';
import Tile from './Tile';
import styled from 'styled-components';
import { TileGrid } from './style/TakenGameStyle';

interface GridProps {
    level: TileModel[]
    onClick: (tile: TileModel) => void;
}


export default function Grid(props: GridProps): JSX.Element {

    return (
        <TileGrid>
            {props.level.map((e, i) => <Tile onClick={() => props.onClick(e)} correct={e.value === e.y * 4 + e.x + 1} key={i} data={e} />)}
        </TileGrid>
    );
}

