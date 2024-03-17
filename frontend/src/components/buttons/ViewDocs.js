import React from "react";
import styled from 'styled-components';

const ViewDocsBtn = styled.small`
    // position: absolute;
    padding: .7em;
    background: black;
    border-radius: 5px;
    border: 1px solid black;
   
    font-family: 'Space Grotesk', sans-serif;
    vertical-align: middle;
    transition: all .5s ease-in;
    cursor: pointer;
    margin-right: .7em;
    a{
        color: white
    }
    &:hover{
        background-color: white;
        transition: all .5s ease-in;
        a{
            color: black;
        }
    }
`

const ViewDocs = (props) => {
    const { slug, projectId } = props;

    return (
        // <ViewDocsBtn onClick={() => props.setOpenNewTask(true)}>Add New Task</ViewDocsBtn> 
        <ViewDocsBtn><a href={`/projects/${slug}/${projectId}/documents`}>View docs</a></ViewDocsBtn> 
    )
}

export default ViewDocs;