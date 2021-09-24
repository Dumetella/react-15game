import React from 'react';
import Container from './ui/Container';
import styled from 'styled-components';

interface FooterProps {
    className?: string;
}
function Footer(props: FooterProps) {
    return (
        <footer className={props.className}>
            <Container>
                React Games by Dumetella
            </Container>
        </footer>
    );
}


export default styled(Footer)`
    position: relative;
    bottom: 0;
`;
