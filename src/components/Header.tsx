import React from 'react';
import { Link } from 'react-router-dom';
import Container from './ui/Container';
import styled from 'styled-components';

interface HeaderProps {
    className?: string;
}

function Header(props: HeaderProps) {
    return (
        <nav className={props.className}>
            <div className="links__container">
                <ul className="links">
                    <li className="links__item">
                        <Link to="/">React Games</Link>
                    </li>
                    <li className="links__item">
                        <Link to="/taken-game">Taken-puzzle</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}


export default styled(Header)`
    width: 100%;
    position: sticky;
    top: 0px;
    background-color: rgb(232, 232, 232);
    z-index: 10;
    box-sizing: border-box;

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
