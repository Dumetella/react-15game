import styled from 'styled-components';

export const Nav = styled.nav`
    background-color: rgb(232, 232, 232);
    box-sizing: border-box;
    height: 70px;
    display: flex;
    align-items: center;
    text-align: center;
`;

export const LinksList = styled.ul`
    display: flex;
    padding: 0px 0px 0px 0px;
    margin: 0px 0px 0px 0px;
`;

export const LinksItem = styled.li`
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
`;







