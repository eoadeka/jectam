import React, { useState } from "react";
// import tasks from "../../data/tasks";
import Overlay from "../layout/Overlay";
import { FaRegComments } from "react-icons/fa";
import { PiDotsThreeOutlineDuotone } from "react-icons/pi";
import { IoReturnUpBack } from "react-icons/io5";
import { IoPencil } from "react-icons/io5";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { TagSpanCategory, TagSpanPriority, TagSpanStatus } from "../buttons/Tags";


const TaskCard = (props) => {
    // const { attributes, listeners, setNodeRef, transform, transition } =
    //     useSortable({ id });

    // const stylus = {
    //     transition,
    //     transform: CSS.Transform.toString(transform),
    // };

    
    const style = { fontSize: "1.2em", verticalAlign: "middle" };
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(1);

    // const Modal = props => {
    //     return (
    //         <div className="overlay">{props.children}</div>
    //     );
    // };

    const handleClick = (index) => {
        setSelected(index)
        setOpen(!open);
      };

    return (
        <div>
            {/* {props.children} */}
            {/* tags: status */}
            {/* tags: priority */}
            {/* tags: category */}
            {/* title */}
            {/* description (optional) */}
            {/* ----- */}
            {/* assigned team members */}
            {/* comments (optional): icon & number */}

            {/* <div className="tags">
                <div className="tag">to-do</div>
                <div className="tag">medium</div>
            </div>
            <h2>Charts design</h2>
            <p>Create variants of a new chart type</p>
            <hr></hr>
            <div>
                <div>teams</div>
                <div>comments</div>
            </div> */}
            {/* <SortableContext items={tasks} strategy={verticalListSortingStrategy}> */}
            {props.data.map((task, item) => (
                // <div ref={setNodeRef}
                // style={stylus}
                // {...attributes}
                // {...listeners}
                // >
                <div draggable>
                    <div className='tasks' key={task.title} id={task.title} onClick={() => handleClick(item)}>
                        <div className="tags">
                            <span className="tag tag-1">
                                <span><TagSpanCategory category={task.category}>{task.category}</TagSpanCategory></span> 
                                <span><TagSpanPriority priority={task.priority}>{task.priority}</TagSpanPriority></span>
                            </span>
                            <PiDotsThreeOutlineDuotone className="tag tag-2" style={style} />
                        </div>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <hr></hr>
                        <div className="tags">
                            <div className="tag tag-1">
                                <AvatarGroup max={4} style={{float: "left"}} sx={{
                                    '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 15 },
                                }}>
                                    {task.assigned_team_members.map((member) => (
                                        <Avatar alt={member.name}  src={member.profile_pic_url} sx={{ width: 24, height: 24 }} />
                                    ))}
                                </AvatarGroup>
                            </div>
                            <div className="tag tag-2"><FaRegComments style={style} /></div>
                        </div>
                    </div>
                    {open && item===selected && (
                    <Overlay in={!open} key={task.title}>
                        
                        <div className="tags" style={{padding: "1em 0 2em 0",  justifyContent:"right"}}>
                            <span className="tag tag-1"  style={{width:"50%"}} onClick={handleClick}><IoReturnUpBack className='cancel' size="1.5em"  /></span>
                            <span className="tag tag-1"   style={{width:"50%", textAlign: "right"}}><IoPencil size="1.2em"  /></span>
                        </div>
                            {/* MAKE THIS OVERLAY DISAPPEAR!!! */}
                            <div>
                                <div>
                                    <TagSpanCategory category={task.category}>{task.category}</TagSpanCategory>
                                    <TagSpanCategory>Edit Mode</TagSpanCategory>
                                    <h2>{task.title}</h2>
                                    <p>{task.description}</p>
                                </div>
                                <div>
                                    <div className="tags">
                                        <span className="tag tag-1" style={{width:"25%"}} >Assigned</span>
                                        <span className="tag tag-2" style={{width:"75%"}} >assigned</span>
                                    </div><br></br>
                                    <div className="tags">
                                        <span className="tag tag-1" style={{width:"25%"}} >Timeline</span>
                                        <span className="tag tag-2" style={{width:"75%"}} >Nov 27 - Dec 02</span>
                                    </div><br></br>
                                    <div className="tags">
                                        <span className="tag tag-1" style={{width:"25%"}} >Status</span>
                                        <span className="tag tag-2" style={{width:"75%"}} ><TagSpanStatus status={task.status}>{task.status}</TagSpanStatus></span>
                                    </div><br></br>
                                    <div className="tags">
                                        <span className="tag tag-1" style={{width:"25%"}} >Priority</span>
                                        <span className="tag tag-2" style={{width:"75%"}} ><TagSpanPriority priority={task.priority}>{task.priority}</TagSpanPriority></span>
                                    </div>
                                </div>
                            </div>
                    </Overlay>
                    )}
             </div>
            ))}
            {/* </SortableContext> */}
        </div>
    )
}

export default TaskCard;