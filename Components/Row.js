import styled from "styled-components";

function Row({name, id, data}) {
    return (
        <Container id={id}>
            <Title>{name}</Title>
            <Title>{data}</Title>
        </Container>
    )
}
const Title = styled.div`
    color: white;
    font-size: 20px;
`
const Container = styled.div`
    width: 100%;
    background-color: #${props => props.id % 2 === 0 ? "48434F" : "8F8996"};
    display: flex;
    justify-content: space-between;
`
export default Row
