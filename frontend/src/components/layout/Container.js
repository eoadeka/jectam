import React from "react";
import styled from 'styled-components';

const ContainerDiv = styled.div`
    width: 85vw;
    position: absolute;
    right: 0;
`
const Container = (props) => {
    return (
        <ContainerDiv className="container">
            {props.children}
        </ContainerDiv>
    )
}

export default Container;