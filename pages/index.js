import Card from "../Components/Card";
import Main from "../Components/Main";
import styled from "styled-components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Row from "../Components/Row";
import quickSort from "../Utils/functions/quickSort";
import { useEffect, useState } from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import Map from "../Components/Map";


export default function Home({ world, states, data }) {
  const [flag, setFlag] = useState(false);
  const [countries, setCountries] = useState(null);
  const cases = useSelector(state => state.countries.cases);
  const values = useSelector(state => state.countries.country);
  const choose = useSelector(state => state.countries.choose);
  const [mostInfected, setMostInfected] = useState([]);
  const [casesData, setCasesData] = useState([]);
  const [casesDataMap, setCasesDataMap] = useState([["Country","Infected"]]);
  const [recoveredDataMap, setRecoveredDataMap] = useState([["Country","Recovered"]]);
  const [deathsDataMap, setDeathsDataMap] = useState([["Country","Deaths"]]);
  
  useEffect(() => {
    for(let obj in data.cases) {
      setCasesData(prevState => [...prevState, {date : obj, cases: data.cases[obj], recovered: data.recovered[obj], deaths: data.deaths[obj]}])
    }
    setFlag(true);
  }, [])

  useEffect(() => {
    let temp = states;
    quickSort(temp, 0, temp.length - 1);
    setCountries(temp);
    for(let i = 0; i < temp.length; i++) {
      setCasesDataMap(prev => [...prev, [temp[i].country === "USA" ? "United States" : temp[i].country, temp[i].cases]])
      setRecoveredDataMap(prev => [...prev, [temp[i].country === "USA" ? "United States" : temp[i].country, temp[i].recovered]])
      setDeathsDataMap(prev => [...prev, [temp[i].country === "USA" ? "United States" : temp[i].country, temp[i].deaths]])

    }

    for(let i = 1; i <= 10; i++) {
      setMostInfected(prev => [...prev, temp[temp.length - i]]);
    }
  }, [])

  return (
    <Container>
      <Main countries={states}/>
      <MainContainer>
      <Banner>
      <Cards>
        <Card color="#03DAC5" title="Coronavirus cases" cases={!values ? (cases ? world.todayCases : world.cases) : (cases ? values.todayCases : values.cases)} choose="cases" active={choose === "cases"}/>
        <Card color="#8AFF6C" title="Recovered" cases={!values ? (cases ? world.todayRecovered : world.recovered) : (cases ? values.todayRecovered : values.recovered)} choose="recovered" active={choose === "recovered"}/>
        <Card color="#FF7D05" title="Deaths" cases={!values ? (cases ? world.todayDeaths : world.deaths) : (cases ? values.todayDeaths : values.deaths)} choose="deaths" active={choose === "deaths"}/>
      </Cards>
      {casesDataMap.length > 2 ? <Map data={choose === "cases" ? casesDataMap : choose === "recovered" ? recoveredDataMap : deathsDataMap} choose={choose}/> : null}
      </Banner>
      
      <Aside>
        <Title>Live Cases By Country</Title>
        {mostInfected && 
        mostInfected.map((country, id) => {  
          return (<Row name={country.country} key={country.countryInfo._id} id={id} data={country.cases}/>)
        }
        )
        }
        {flag && (<LineChart width={300} height={200} data={casesData}>
          <Line type="monotone" dataKey={choose} stroke={choose === "cases" ? "#03DAC5" : choose === "deaths" ? "#FF7D05" : "#8AFF6C"} />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <Tooltip />
        </LineChart>)}
      </Aside>
      
      </MainContainer>
    </Container>
  )
}

export async function getStaticProps() {
  const world = await axios.get("https://api.caw.sh/v3/covid-19/all").then((response) => response.data).catch((err) => console.log(err));
  const countries = await axios.get("https://disease.sh/v3/covid-19/countries").then((response) => response.data).catch((err) => console.log(err));
  const data = await axios.get("https://disease.sh/v3/covid-19/historical/all?lastdays=120").then(response => response.data).catch(err => console.log(err));
  return {
    props: { 
      world: world,
      states: countries,
      data: data
    }
  }
}

const MainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content:center;
  align-items: center;
`
const Banner = styled.div`
  display: flex;
  flex-direction: column;
  
  flex: 0.7;
  flex-grow: 1;
`
const Title = styled.h1`
    color: white;
    font-size: 20px;
`

const Aside = styled.div`
  flex: 0.3;
  display: flex;
  flex-direction: column;
  background-color: #1F1B24;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`

const Cards = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  height: 50px;
`
const Container = styled.div`
  width: 100%;
`