import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import styled from 'styled-components';

function Header(props: any) {
    return (
        <nav className={props.className}>
            <Container>
                <div className="links__container">
                    <ul className="links">
                        <li className="links__item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="links__item">
                            <Link to="/taken-game">Taken-puzzle</Link>
                        </li>
                    </ul>
                </div>
            </Container>
        </nav>
    );
}


export default styled(Header)`
    width: 100%;
    position: sticky;
    top: 0px;
    background-color: white;
    z-index: 10;

    .links {
        display: flex;
        padding: 0px 0px 0px 0px;
        margin: 0px 0px 0px 0px;
        
        .links__item {
            list-style: none;
            margin-right: 10px;
            a {
                text-decoration: none;
                font-size: 2rem;
                line-height: 32px;
                color: black;
                transition: 0.4s ease;
            }
            a:hover {
                color:red;
            }
        }
    }          
`;
