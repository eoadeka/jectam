import React from "react";
import styled from 'styled-components';
import { CiFilter } from "react-icons/ci";

const FilterBtn = styled.small`
    // background: black;
    border-radius: 5px;
    border: 1px solid black;
    color: black;
    padding: .7em;
    font-family: 'Space Grotesk', sans-serif;
    cursor: pointer;
    vertical-align: bottom;
    transition: all .5s ease-in;
    &:hover{
        background-color: black;
        color: white;
        transition: all .5s ease-in;
        opacity:1;
    }
`

const Filter = (props) => {
    const style = { fontSize: "1.2em", verticalAlign: "middle" };
    
    return (
        <FilterBtn onClick={() => props.setOpenFilter(true)}>
            <CiFilter style={style} />Filter
        </FilterBtn>
    )
}

export default Filter;