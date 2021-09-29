import React from 'react';
import TileModel from './model/TileModel';
import styled from 'styled-components';

interface TileProps {
    data: TileModel,
    className?: string;
    correct: boolean;
    onClick?: () => void;
}
function Tile(props: TileProps): JSX.Element {

    return (
        <div className={props.className} onClick={() => props.onClick && props.onClick()}>
            <div className="tile__value">{props.data.value}</div>
        </div>
    );
}


export default styled(Tile)`

    border: 1px solid #FFD1AA;
    width: 108px;
    height: 108px;
    position: absolute;
    justify-content: center;
    left: ${props => props.data.x * 110}px;
    top: ${props => props.data.y * 110}px;
    cursor: pointer;
    background-color: ${props => props.correct ? '#226666' : '#D4726a'};
    transition-property: top, left, background-color;
    transition-duration: .300s;
    transition-timing-function: ease-in;
    display: ${props => props.data.value === -1 ? 'none' : 'flex'};

    @media ${(props) => props.theme.breakpoints.sm} {
        width: 88px;
        height: 88px;
        left: ${props => props.data.x * 90}px;
        top: ${props => props.data.y * 90}px;
    }
    
    .tile__value {
        color: #FFD1AA;
        font-weight: 400;
        font-size: 3em;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
`;
