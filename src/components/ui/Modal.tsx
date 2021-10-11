import React from 'react';
import styled from 'styled-components';

interface ModalProps {
    visible: boolean;
    onClick?: () => void;
    className?: string;
}

export default function Modal(props: ModalProps): JSX.Element {
    return (
        <>
            {props.visible ?

                <div className={props.className}>
                    <h1>ABOBA</h1>
                    <button onClick={props.onClick}>X</button>
                </div>

                : null}
        </>
    );
}
