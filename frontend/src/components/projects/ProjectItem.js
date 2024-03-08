import React, {useState} from "react";
import styled from 'styled-components';
import { PiDotsThreeOutlineDuotone } from "react-icons/pi";
import useAxios from "../../hooks/useAxios";
// import ReactTooltip from 'react-tooltip';
import { Tooltip as ReactTooltip  } from 'react-tooltip';
import { IoPencil, IoTrashOutline } from "react-icons/io5";
import { GrOverview } from "react-icons/gr";

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
    const [isOpen, setIsOpen] = useState(false)
    const style = { fontSize: "1.2em", verticalAlign: "baseline", display: "inline-block", width: "10%", outline:"none" };
    const style2 = { fontSize: "1em", verticalAlign: "middle" };
    const [data] = useAxios("http://localhost:8000/projects/project/");
    console.log(data)

    return (
        <div className='project-item-body'> 
        {data.title}
            {props.data.map((project) => (
            //  {data.map((project) => (
                <div draggable className='project-link' id={project.id} >
                    
                    <div style={{marginBottom:"-1em"}}>
                        <a href={`projects/${project.url}/${project.id}`} style={{display: "inline-block", width: "90%"}}>
                            <h2>{project.project_name}</h2>
                        </a>
                        <PiDotsThreeOutlineDuotone className="tag tag-2" style={style}  data-tooltip-id="my-tooltip" onMouseEnter={() => setIsOpen(true)}  />
          
                        <ReactTooltip id="my-tooltip"
                            style={{ backgroundColor: "white", color: "#222" , padding:"10px"}}
                            border="1px solid black"
                            place="right-start"
                            isOpen={isOpen}
                            clickable
                            >
                            <span><a id={project.id} href={`projects/${project.url}/${project.id}`}><GrOverview style={style2} /> view</a></span>
                            <hr></hr>
                            <span><IoPencil style={style2} /> edit</span>
                            <hr></hr>
                            <span style={{color:"red"}}><IoTrashOutline style={style2} /> delete</span>
                        </ReactTooltip>
                    </div>
                    <p>{project.description}</p>
                    <div style={{ position: "absolute", bottom: "1em", right: "1em"}}>
                        <TagSpanMethod method={project.method}>{project.method}</TagSpanMethod>
                        <TagSpanStatus status={project.project_status}>{project.project_status}</TagSpanStatus>
                    </div>
                </div>
            ))} 
        </div>
    )
}

export default ProjectItem;