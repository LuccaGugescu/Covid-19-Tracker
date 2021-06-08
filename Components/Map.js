import { Chart } from "react-google-charts"
import styled from "styled-components";

function Map({data, choose}) {
    return (
        <Container>
            <Chart
            width={'100%'}
            height={'100%'}
            chartType="GeoChart"
            data={data}
            options={{
                colorAxis: { colors: ['#ececec', choose === "cases" ? '#03DAC5' : choose === "recovered" ? "#8AFF6C" : "#FF7D05"] },
                backgroundColor: "81d4fa"
            }}
            rootProps={{ 'data-testid': '1' }}
            mapsApiKey="AIzaSyCWLUUVXv7DLP032uE53Xfmik27OKHn5Xw"
        />

        </Container>
        
    )
}
const Container = styled.div`
    width: 90%;
    height: 300px;
    margin-top: 150px;
    align-self: center;
    position: relative;
`;
export default Map
