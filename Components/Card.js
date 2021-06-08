import styled from "styled-components"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setChoose } from "../Utils/slices/countriesSlice";

function Card({color, title, cases, choose, active}) {
    const dispatch = useDispatch();
    return (
        <Container onClick={() => dispatch(setChoose(choose))}>
            <Header active={active} color={color}></Header>
            <Title>{title}</Title>
            <Cases color={color}>+{cases}</Cases>
        </Container>
    )
}

export default Card

const Container = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1F1B24;
    flex-direction: column;
    width: 250px;
    border-radius: 12px;
`;
const Header = styled.div`
    width: 100%;
    border-radius: 12px 12px 0px 0px ;
    background-color: ${({active, color}) => active ? color : null};
    height: 30px;
`
const Title = styled.h1`
    color: white;
    font-size: 25px;
`
const Cases = styled.h1`
    color: ${props => props.color};
    font-size: 30px;
`