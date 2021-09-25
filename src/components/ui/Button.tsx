import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
    className?: string;
    children?: React.ReactNode;
}

function Button(props: ButtonProps): JSX.Element {
    return (
        <div className={props.className}>
            {props.children}
        </div>
    );
}

export default styled(Button)`
    
`;
