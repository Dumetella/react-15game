import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
}

function Button(props: ButtonProps): JSX.Element {
    return (
        <div className={props.className} onClick={props.onClick}>
            {props.children}
        </div>
    );
}

export default styled(Button)`
    background-color: rgb(188,188,188);
    min-width: 100px;
    color: black;
    font-size: 24px;
    padding: 16px 32px;
    border-radius: 5px;
    margin: 10px 10px;
    cursor: pointer;
`;
