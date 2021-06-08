import styled from "styled-components";
import { useState } from "react"
import Button from '@material-ui/core/Button';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { setData, setCases } from "../Utils/slices/countriesSlice";

import { useSelector, useDispatch } from "react-redux";

export default function Main({countries}) {
    const cases = useSelector(state => state.countries.cases);
    const [show, setShow] = useState(false);
    const [input, setInput] = useState("");
    const [title, setTitle] = useState("World");
    const dispatch = useDispatch();
    function contain(string, substring) {
        for(let i = 0; i < substring.length; i++) {
            if(string[i].toUpperCase() !== substring[i].toUpperCase()) return false;
        }
        return true;
    }
    function pressed(value, country) {
        setTitle(value);
        dispatch(setData(country))
        setInput("");
        setShow(!show);
    }
    return (
        <div>
            <Header>
                <Title>Covid-19 Tracker</Title>
                <Container>
                    <Button
                        onClick={() => dispatch(setCases(!cases))}
                        variant="contained"
                        color="secondary">{cases ? "Today" : "All"}</Button>
                    <Button
                        onClick={() => setShow(!show)}
                        variant="contained"
                        color="primary"
                        endIcon={<ArrowDownwardIcon />}
                    >
                    {title}
                    </Button>
                    {show && (<Select>
                        <Search onChange={(e) => setInput(e.target.value)}/>
                        <Countries>
                        {countries.map(country => contain(country.country, input) ? (<Row onClick={() => pressed(country.country, country)}cases={country.todayCases} deaths={country.todayDeaths} recovered={country.todayRecovered}>{country.country}</Row>) : null)}
                        </Countries>
                    </Select>)}
                    
                </Container>
            </Header>
        </div>
    )
}




const Header = styled.nav`
    display: flex;
    justify-content: space-between;
    height: 50px;
    align-items: center;
    width: 100%;
    margin: 25px 0px;
`
const Title = styled.h1`
    color: #03DAC5;
    font-size: 50px;
    margin-left: 30px;
`

const Container = styled.div`
    width: 200px;
    display: flex;
    justify-content: space-around;
    margin-right: 100px;
`

const Search = styled.input`
    width: 100%;
`
const Select = styled.div`
    width: 150px;
    position: absolute;
    top: 70px;
`
const Row = styled.div`
    background-color: #48434F;
    color: white;
    width: 100%;
    
    &:hover{
        background-color: #8F8996;
    }
`
const Countries = styled.div`
    height: 400px;
    width: 100%;
    overflow-y: scroll;
`