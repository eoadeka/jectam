import React, { useState } from "react";
import tasks from "../../data/tasks";
import Overlay from "../layout/Overlay";
import { FaRegComments } from "react-icons/fa";
import { PiDotsThreeOutlineDuotone } from "react-icons/pi";
import { IoReturnUpBack, IoCheckmark, IoPencil } from "react-icons/io5";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { PiDotsSixVerticalThin } from "react-icons/pi";
import { EditMode, TagSpanCategory, TagSpanPriority, TagSpanStatus } from "../buttons/Tags";
import PalmLeaves from "../../assets/images/palm_leaves.jpg";

const TaskCard = (props) => {
    // const { attributes, listeners, setNodeRef, transform, transition } =
    //     useSortable({ id });

    // const stylus = {
    //     transition,
    //     transform: CSS.Transform.toString(transform),
    // };

    
    const style = { fontSize: "1.2em", verticalAlign: "middle" };
    const [open, setOpen] = useState(false);
    const [showEditMode, setShowEditMode] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [showStatuses, setShowStatuses] = useState(false);
    const [showPriorities, setShowPriorities] = useState(false);

    const [selected, setSelected] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("sub_tasks");
    const onSubCategoryClick = () => setSelectedCategory(!selectedCategory);
    const onEditModeClick = () => setShowEditMode(!showEditMode);
    const onStatusClick = () => setShowStatuses(!showStatuses);
    const onPriorityClick = () => setShowPriorities(!showPriorities);
    const onCategoryClick = () => setShowCategories(!showCategories);

    // const Modal = props => {
    //     return (
    //         <div className="overlay">{props.children}</div>
    //     );
    // };

    const filteredSubCategory = selectedCategory === 'sub_tasks' ? tasks : tasks.filter(task => task.sub_tasks === selectedCategory);

    const categoryCounts = {
        sub_tasks: tasks.filter(task => task.sub_tasks === 'sub_tasks').length,
        attachments: tasks.filter(task => task.attachments === 'attachments').length,
        activities: tasks.filter(task => task.activities === 'activities').length,
        histories: tasks.filter(task => task.histories === 'histories').length,
      };

    const handleClick = (index) => {
        setSelected(index)
        setOpen(!open);
    };

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      };

      const formatCount = (count) => {
        return count < 10 ? `0${count}` : count;
      };

    const getWidth = (width) => {
        if (width === 'sub_tasks') {
            return '25%';
        }
        if (width === 'attachments') {
            return '29%';
        }
        if (width === 'activities' || width === 'histories') {
            return '23%';
        }
    }
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
                            <span className="tag tag-1"   style={{width:"50%", textAlign: "right"}}><IoPencil size="1.2em"  onClick={onEditModeClick}  /></span>
                        </div>
                            {/* MAKE THIS OVERLAY DISAPPEAR!!! */}
                            <div>
                                <div>
                                    <TagSpanCategory onClick={onCategoryClick}  category={task.category}>{task.category}</TagSpanCategory>
                                    { showCategories && (
                                        <div style={{position: "absolute",top: "5em",right: "2em", width: "60%", background: "white", padding: "1em", borderRadius: "5px",  filter: "drop-shadow(0 0 0.75em gray)"}}>
                                            <TagSpanCategory category={task.category}><IoCheckmark style={style} /> {task.category}</TagSpanCategory>
                                            <TagSpanCategory category={task.category}>UI Design</TagSpanCategory>
                                            <TagSpanCategory category={task.category}>Backend Devt</TagSpanCategory>
                                            {/* <TagSpanCategory  category={task.category}>{task.category}</TagSpanCategory> */}
                                            {/* <TagSpanCategory  category={task.category}>{task.category}</TagSpanCategory> */}
                                        </div>
                                    )}
                                    { showEditMode && (<EditMode>Edit Mode</EditMode>)}
                                    <h2>{task.title}</h2>
                                    <p>{task.description}</p>
                                </div>
                                <div>
                                    <div className="tags" style={{marginBottom: ".2em"}}>
                                        <span className="tag tag-1 about-task" style={{width:"20%"}} >Assigned</span>
                                        <span className="tag tag-2 about-task" style={{width:"80%"}} >
                                            {task.assigned_team_members.slice(0,2).map((member) => (
                                                <div style={{display: "inline-block"}}>
                                                    <AvatarGroup style={{ marginRight: ".8em"}}>
                                                        <Avatar alt={member.name}  src={member.profile_pic_url} sx={{ width: 24, height: 24 }} style={{marginRight: ".5em",}}  />
                                                        <span style={{ paddingTop:".5em"}}>{member.name}</span>
                                                    </AvatarGroup>

                                                </div>
                                            ))}
                                        </span>
                                    </div>
                                    <div className="tags" style={{marginBottom: ".7em"}}>
                                        <span className="tag tag-1 about-task" style={{width:"20%"}} >Timeline</span>
                                        <span className="tag tag-2 about-task" style={{width:"80%"}} >Nov 27, 2023 - Dec 02, 2023</span>
                                    </div>
                                    <div className="tags" style={{marginBottom: "1.5em"}}>
                                        <span className="tag tag-1 about-task" style={{width:"20%"}} >Status</span>
                                        <span className="tag tag-2" style={{width:"80%"}} ><TagSpanStatus onClick={onStatusClick}  status={task.status}>{task.status}</TagSpanStatus></span>
                                        { showStatuses && (
                                            <div style={{position: "absolute",top: "16.8em",right: "1em", width: "50%", background: "white", padding: ".8em", borderRadius: "5px",  filter: "drop-shadow(0 0 0.75em gray)"}}>
                                                <TagSpanStatus style={{display: "inline-block", marginBottom: ".2em"}} status={task.status}>To do</TagSpanStatus>
                                                <TagSpanStatus  style={{display: "inline-block"}}  status={task.status}><IoCheckmark  style={style} /> {task.status}</TagSpanStatus>
                                                <TagSpanStatus  style={{display: "inline-block"}}  status={task.status}>Done</TagSpanStatus>
                                            </div>
                                        )}
                                    </div>
                                    <div className="tags">
                                        <span className="tag tag-1 about-task" style={{width:"20%"}} >Priority</span>
                                        <span className="tag tag-2" style={{width:"80%"}} ><TagSpanPriority onClick={onPriorityClick}  priority={task.priority}>{task.priority}</TagSpanPriority></span>
                                        { showPriorities && (
                                            <div style={{position: "absolute",top: "19.7em",right: "2em", width: "50%", background: "white", padding: ".6em", borderRadius: "5px",  filter: "drop-shadow(0 0 0.75em gray)"}}>
                                                <TagSpanPriority style={{display: "inline-block", marginBottom: ".2em"}}  priority={task.priority}>Low</TagSpanPriority>
                                                <TagSpanPriority style={{display: "inline-block"}} priority={task.priority}>Medium</TagSpanPriority>
                                                <TagSpanPriority style={{display: "inline-block"}} priority={task.priority}><IoCheckmark  style={style} /> {task.priority}</TagSpanPriority>
                                            </div>
                                        )}
                                    </div>

                                    
                                            <br></br>
                                    <img src={PalmLeaves} alt="palm leaves" width="100%" height="260px" style={{objectFit: "fill"}} />
                                        

                                   
                                    

                                        {/* <span className="tag about-task" onClick={onSubCategoryClick} style={{width:"25%", paddingBottom: "1em", borderBottom: "1px solid black"}}>Sub-tasks <small style={{background: "lightgray", color: "black", borderRadius: "5px", padding:"5px"}}>02</small></span>
                                        <span className="tag about-task" onClick={onSubCategoryClick} style={{width:"29%", paddingBottom: "1em", borderBottom: "1px solid black"}}>Attachments <small style={{background: "lightgray", color: "black", borderRadius: "5px", padding:"5px"}}>02</small></span>
                                        <span className="tag about-task" onClick={onSubCategoryClick} style={{width:"23%", paddingBottom: "1em", borderBottom: "1px solid black"}}>Activity <small style={{background: "lightgray", color: "black", borderRadius: "5px", padding:"5px"}}>02</small></span>
                                        <span className="tag about-task" onClick={onSubCategoryClick} style={{width:"23%", paddingBottom: "1em", borderBottom: "1px solid black"}}>History <small style={{background: "lightgray", color: "black", borderRadius: "5px", padding:"5px"}}>02</small></span> */}

                                    <div className="tags" style={{width: "100%", display: "inline-block", marginTop: "2em"}}>
                                        {Object.keys(categoryCounts).map((category) => (
                                            <>
                                                <span  
                                                className={`tag about-task ${selectedCategory === category ? "active" : ""}`}
                                                style={{ paddingBottom: "1em", borderBottom: selectedCategory === category ? '1px solid black' : 'none',
                                                width: getWidth(category)
                                                }}  
                                                onClick={() => onSubCategoryClick}>{capitalizeFirstLetter(category)}{task.length === 0 ? (<small style={{marginLeft: ".4em", }}></small>) : (<small style={{background: "lightgray", color: "black", padding:"5px",marginLeft: ".4em", borderRadius:"3px"}}>{formatCount(categoryCounts[category])}</small>)}</span>
                                            </>
                                        ))}
                                    </div>
                                    
                                    <div draggable className=" tags about-task"  style={{ marginTop: ".5em", padding: "1em 0 1em 0", verticalAlign: "middle"}}>
                                        <PiDotsSixVerticalThin style={style} />
                                        <input type="radio" style={{verticalAlign:"top", marginRight: "1em"}} />
                                        <span style={{marginRight: "1em"}}>New user button</span>
                                        <progress value={0.7} style={{verticalAlign:"middle", marginRight: "1em"}} />
                                        <small style={{background: "lightgray", color: "black", borderRadius: "5px", padding:"3.5px",position: "absolute",right:"2em",}}>2h</small>
                                    </div>
                                    <div draggable className=" tags about-task"  style={{ marginTop: ".5em", padding: "1em 0 1em 0",  verticalAlign: "middle"}}>
                                        <PiDotsSixVerticalThin style={style} />
                                        <input type="radio" style={{verticalAlign:"top", marginRight: "1em"}} />
                                        <span style={{marginRight: "1em"}}>Test flow #3</span>
                                        <progress value={0.7} style={{verticalAlign:"middle", marginRight: "1em"}} />
                                        <small style={{background: "lightgray", color: "black", borderRadius: "5px", padding:"3.5px",position: "absolute",right:"2em",}}>1d</small>
                                    </div>
                                    <div draggable className=" tags about-task"  style={{ marginTop: ".5em", padding: "1em 0 1em 0",  verticalAlign: "middle"}}>
                                        <PiDotsSixVerticalThin style={style} />
                                        <input type="radio" style={{verticalAlign:"top", marginRight: "1em"}} />
                                        <span style={{marginRight: "1em"}}>Use case diagram</span>
                                        <progress value={0.7} style={{verticalAlign:"middle", marginRight: "1em"}} />
                                        <small style={{background: "lightgray", color: "black", borderRadius: "5px", padding:"3.5px",position: "absolute",right:"2em",}}>3m</small>
                                    </div>
                                    
                                    { filteredSubCategory.map(notif => (
                                        <p>{notif.sub_task}</p>
                                    ))}
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