import React from "react";
import styled from 'styled-components';
import { FaPlus } from "react-icons/fa";

const StartNewProjectButton = styled.button`
    background: black;
    border-radius: 5px;
    border: 2px solid black;
    color: white;
    padding: 1em;
    position: fixed;
    bottom: 2em;
    right: 2em;
    font-family: 'Space Grotesk', sans-serif;
    cursor: pointer;
    &:hover{
        background-color: white;
        color: black;
        transition: all .5s ease-in;
    }
`

const StartNewProject = () => {
    const style = { fontSize: "1em", verticalAlign: "middle", fontFamily: "'Space Grotesk', sans-serif" };
    return (
        <div className="startNewProjectButton">
            <a href={`projects/new-project`}>
                <StartNewProjectButton>Start new project <FaPlus  style={style} /></StartNewProjectButton>
            </a>
        </div>
    )
}

export default StartNewProject;