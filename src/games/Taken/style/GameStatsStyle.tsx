import styled from 'styled-components';

export const Stats = styled.div`
    display:flex;
    margin-top: 10px;
`;

export const StatsItem = styled.div`
    border: 10px none;
    box-sizing: border-box;
    display: flex;
    font-family: 'Roboto', sans-serif;
    cursor: default;
    text-decoration: none;
    margin: 0px;
    padding: 0px;
    outline: currentcolor none medium;
    font-size: inherit;
    font-weight: inherit;
    position: relative;
    z-index: 1;
    background-color: rgb(224, 224, 224);
    border-radius: 16px;
    white-space: nowrap;
`;

export const SvgContainer = styled.div`
    color: rgb(255, 255, 255);
    background-color: rgb(188, 188, 188);
    user-select: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    border-radius: 50%;
    height: 32px;
    width: 32px;
    margin-right: -4px;
`;

export const Svg = styled.svg`
    display: inline-block;
    color: rgb(255, 255, 255);
    fill: rgb(255, 255, 255);
    height: 19.2px;
    width: 19.2px;
    user-select: none;
    font-size: 19.2px;
    margin: 6.4px;
`;

export const StatsValue = styled.span`
    color: rgba(0, 0, 0, 0.87);
    font-size: 14px;
    font-weight: 400;
    line-height: 32px;
    padding-left: 12px;
    padding-right: 12px;
    user-select: none;
    white-space: nowrap;
`;
