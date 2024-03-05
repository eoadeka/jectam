import React from "react";
import styled from 'styled-components';

const ContainerWithoutNavDiv = styled.div`
    width: 95vw;
    position: absolute;
    right: 0;
`
const ContainerWithoutNav = (props) => {
    return (
        <ContainerWithoutNavDiv className="container">
            {props.children}
        </ContainerWithoutNavDiv>
    )
}

export default ContainerWithoutNav;