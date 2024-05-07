import React, {useState} from "react";
import styled from 'styled-components';
import { PiDotsThreeOutlineDuotone } from "react-icons/pi";
import { Tooltip as ReactTooltip  } from 'react-tooltip';
import { IoPencil, IoTrashOutline } from "react-icons/io5";
import { GrOverview } from "react-icons/gr";
import Moment from 'react-moment';

const TagSpanStatus = styled.span`
    display: inline-block;
    margin-right:0;
    font-size: .7em;
    padding: .5em;
    border-radius: 5px;
    color: black;
    background-color: ${props => 
        props.status === 'To Do' ? 'lightgray'
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
        : props.method === 'Prince2' ? 'burlywood'
        : props.method === 'Waterfall' ? 'forestgreen'
        : props.method === 'XP' ? 'hotpink'
        : 'orange'
    };
`;

const ProjectItem = ({project,onUpdateClick, onDelete, isTeamMember}) => {
    const [isOpenProject, setIsOpenProject] = useState(false)
    const style = { fontSize: "1.2em", verticalAlign: "baseline", display: "inline-block", width: "10%", outline:"none" };
    const style2 = { fontSize: "1em", verticalAlign: "middle" };

    const handleUpdateClick = () => {
        onUpdateClick(project); // Pass the project data to the onUpdateClick function
      };
    

    return (
        <> 
        {/* {data.title} */}
            {/* {props.projects.map((project) => ( */}
            {/* //  {data.map((project) => ( */}
                <div draggable className='project-link' key={project.project_id} >
                    
                    <div style={{marginBottom:"-1em"}}>
                        <a href={`/projects/${project.slug}/${project.project_id}`} style={{display: "inline-block", width: "90%"}}>
                            <h2>{project.title}</h2>
                        </a>
                        <PiDotsThreeOutlineDuotone className="tag tag-2" style={style}  data-tooltip-id={project.project_id} onMouseEnter={() => setIsOpenProject(true)}  />
          
                        <ReactTooltip id={project.project_id}
                            style={{ backgroundColor: "white", color: "#222" , padding:"10px"}}
                            border="1px solid black"
                            place="right-start"
                            isOpenProject={isOpenProject}
                            onClick={() => setIsOpenProject(true)}
                            clickable
                            >
                            <span><a id={project.project_id} key={project.project_id} href={`projects/${project.slug}/${project.project_id}`}><GrOverview style={style2} /> view</a></span>
                            <hr></hr>
                            {
                                !isTeamMember && (
                                    <>
                                        <span id={project.project_id}  onClick={handleUpdateClick}><IoPencil style={style2}/> edit</span>
                                        <hr></hr>
                                        <span style={{color:"red"}} onClick={onDelete}><IoTrashOutline style={style2} /> delete</span>
                                    </>
                                )
                            }
                        </ReactTooltip>
                    </div>
                    <a href={`/projects/${project.slug}/${project.project_id}`}>
                        
                    <p>{project.description}</p>
                    </a>
                    <div className="tags" style={{ position: "absolute", bottom: "1em", width: "90%" }}>
                        <div className="tag tag-1" style={{width: "50%"}}>
                            <small><Moment format="MMM D, YYYY">{project.end_date}</Moment></small>
                        </div>
                        <div className="tag tag-2"  style={{width: "50%", textAlign: "right"}}>
                            { project.is_archived && (<TagSpanMethod style={{background: "lightgray"}}>Archived</TagSpanMethod>)}
                            <TagSpanMethod method={project.method}>{project.method}</TagSpanMethod>
                            <TagSpanStatus status={project.project_status}>{project.project_status}</TagSpanStatus>
                        </div>
                    </div>
                </div>
            {/* // ))}  */}
        </>
    )
}

export default ProjectItem;