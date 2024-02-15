import React from "react";
import styled from 'styled-components';

const TagSpanStatus = styled.span`
    position: absolute;
    right: 1em;
    bottom: 1em;
    margin-right:0;
    font-size: .7em;
    padding: .5em;
    border-radius: 5px;
    color: black;
    background-color: ${props => 
        props.status === 'To do' ? 'lightgray'
        : props.status === 'In Progress' ? 'lightblue'
        : props.status === 'Done' ? 'lightgreen'
        : 'orange'
    };
`;

const ProjectItem = (props) => {
    return (
        <div className='project-item-body'> 
            {props.data.map((project, item) => (
                <a draggable className='project-link' id={project.id} href={`projects/${project.url}/${project.id}`}>
                    <h2>{project.project_name}</h2>
                    <p>{project.description}</p>
                    <TagSpanStatus status={project.status}>{project.status}</TagSpanStatus>
                </a>
            ))}
        </div>
    )
}

export default ProjectItem;