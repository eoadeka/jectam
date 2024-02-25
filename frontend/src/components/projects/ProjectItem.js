import React from "react";
import styled from 'styled-components';
import AddToFavorites from "../buttons/AddToFav";

const TagSpanStatus = styled.span`
    display: inline-block;
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
const TagSpanMethod = styled.span`
    display: inline-block;
    margin-right: .5em;
    font-size: .7em;
    padding: .5em;
    border-radius: 5px;
    color: black;
    background-color: ${props => 
        props.method === 'Scrum' ? 'cadetblue'
        : props.method === 'PRINCE2' ? 'burlywood'
        : props.method === 'Waterfall' ? 'forestgreen'
        : props.method === 'XP' ? 'hotpink'
        : 'orange'
    };
`;

const ProjectItem = (props) => {
    return (
        <div className='project-item-body'> 
            {props.data.map((project) => (
                <a draggable className='project-link' id={project.id} href={`projects/${project.url}/${project.id}`}>
                    <h2>{project.project_name}</h2>
                    <p>{project.description}</p>
                    <AddToFavorites />
                    <div style={{ position: "absolute", bottom: "1em", right: "1em"}}>
                        <TagSpanMethod method={project.method}>{project.method}</TagSpanMethod>
                        <TagSpanStatus status={project.status}>{project.status}</TagSpanStatus>
                    </div>
                </a>
            ))}
        </div>
    )
}

export default ProjectItem;