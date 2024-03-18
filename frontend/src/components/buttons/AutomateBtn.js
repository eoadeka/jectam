import React from "react";
import styled from 'styled-components';

const AutomateDocBtn = styled.small`
    // position: absolute;
    padding: .7em;
    background: black;
    border-radius: 5px;
    border: 1px solid black;
    color: white;
    font-family: 'Space Grotesk', sans-serif;
    vertical-align: middle;
    transition: all .5s ease-in;
    cursor: pointer;
    margin-right: .7em;
    &:hover{
        background-color: white;
        color: black;
        transition: all .5s ease-in;
    }
`

const AutomateDocButton = (props, {onClick}) => {

    return (
        <AutomateDocBtn onClick={onClick}>Automate</AutomateDocBtn> 
    )
}

export default AutomateDocButton;