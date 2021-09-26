import React from 'react';
import { Link } from 'react-router-dom';
import { LinksContainer, LinksItem, LinksList, Nav } from './HeaderStyle';

import Container from './ui/Container';




export default function Header(): JSX.Element {
    return (
        <Nav>
            <LinksContainer>
                <LinksList>
                    <LinksItem>
                        <Link to="/">React Games</Link>
                    </LinksItem>
                    <LinksItem>
                        <Link to="/taken-game">Taken-puzzle</Link>
                    </LinksItem>
                </LinksList>
            </LinksContainer>
        </Nav>
    );
}

