import styled from 'styled-components';

const OverlayBtn = styled.button`
    position: absolute;
    bottom: 5em;
    right: 2em;
    background: transparent;
    border-radius: 5px;
    border: 2px solid black;
    color: black;
    padding: 1em;
    transition: all .5s ease-in;
    &:hover{
        background-color: black;
        color: white;
        transition: all .5s ease-in;
        cursor: pointer;
    }
`

export default OverlayBtn;