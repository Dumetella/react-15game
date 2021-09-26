import React from 'react';
import { Link } from 'react-router-dom';
import { LinksItem, LinksList, Nav } from './HeaderStyle';
import Logo from './Logo';

import Container from './ui/Container';




export default function Header(): JSX.Element {
    return (
        <Nav>
            <Logo />
            <LinksList>
                <LinksItem>
                    <Link to="/">React Games</Link>
                </LinksItem>
                <LinksItem>
                    <Link to="/taken-game">Taken-puzzle</Link>
                </LinksItem>
            </LinksList>
        </Nav>
    );
}

