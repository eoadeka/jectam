import React, { useState, useEffect } from "react";
// import tasks from "../../data/tasks";
import Overlay from "../layout/Overlay";
import { FaRegComments } from "react-icons/fa";
import { PiDotsThreeOutlineDuotone } from "react-icons/pi";
import { IoReturnUpBack, IoCheckmark, IoPencil, IoTrashOutline } from "react-icons/io5";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { PiDotsSixVerticalThin } from "react-icons/pi";
import { EditMode, TagSpanCategory, TagSpanPriority, TagSpanStatus } from "../buttons/Tags";
import PalmLeaves from "../../assets/images/palm_leaves.jpg";
import { GrOverview } from "react-icons/gr";
import { Tooltip as ReactTooltip  } from 'react-tooltip';
import CommentForm from "../forms/CommentForm";
import Comments from "../Comments";
import { createComment, fetchCommentsForTask } from "../../hooks/crudComments";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Moment from 'react-moment';

const TaskCard = ({task, item, onDelete, handleUpdate }) => {
    const style = { fontSize: "1.2em", verticalAlign: "middle" };
    const style2 = { fontSize: "1em", verticalAlign: "middle" };

    const [ comments, setComments] = useState([]);
    const [userDetails, setUserDetails] = useState(null);

    const [open, setOpen] = useState(false);
    const [isOpenTooltip, setIsOpenTooltip] = useState(false); // tooltip
    const [isOpenComment, setIsOpenComment] = useState(false); // tooltip
    const [showEditMode, setShowEditMode] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [showStatuses, setShowStatuses] = useState(false);
    const [showPriorities, setShowPriorities] = useState(false);

    const [selected, setSelected] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("sub_tasks");
    const onSubCategoryClick = () => setSelectedCategory(!selectedCategory);
    const onEditModeClick = () => setShowEditMode(!showEditMode);
    const onModalClick = () => setShowModal(!showModal);
    const onStatusClick = () => setShowStatuses(!showStatuses);
    const onPriorityClick = () => setShowPriorities(!showPriorities);
    const onCategoryClick = () => setShowCategories(!showCategories);


    useEffect(() => {
  
      const refreshToken = localStorage.getItem('access_token');
  
        if (!refreshToken){
        window.location.replace("/login");
        } else {
        const getUserDetails = async () => {
            try {
            // Retrieve JWT token from local storage (assumed to be stored as 'jwtToken')
            const accessToken = localStorage.getItem('access_token');
    
            // Send authenticated request to an endpoint that requires authentication
            const response = await axios.get('http://localhost:8000/accounts/profile/', {
                headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'accept': 'application/json'
                },  withCredentials: true
            });
    
            const data = response.data;
            // console.log(data)
            setUserDetails({
                id: data.id,
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                role: data.role,
                groups: data.groups
            });
            // console.log(userDetails.email)
            } catch (error) {
            console.error('Error fetching user details:', error);
            }
        };

        const fetchData = async () => {
            try {
                const data = await fetchCommentsForTask(task.task_id);
                setComments(data);
                // console.log(data)
            } catch (error) {
                console.error('Error fetching projects:', error);
                // Handle error, e.g., set an error state or display a message to the user
                // setLoading(false);
            }
        };
        
        getUserDetails();
        fetchData();
        }
    }, []);

    const handleUpdateClick = () => {
        // onUpdateClick(); // Pass the project data to the onUpdateClick function
        handleUpdate(task); // Pass the project data to the onUpdateClick function
    };


    // useEffect(() => {
    //     const token = localStorage.getItem('refresh_token');
    //     if (!token) {
    //       window.location.replace('/login');
    //     } else {
    //       // Fetch projects when the component mounts
    //       const fetchData = async () => {
    //         try {
    //             const data = await fetchCommentsForTask(task.task_id);
    //             setComments(data);
    //             // console.log(data)
    //         } catch (error) {
    //             console.error('Error fetching projects:', error);
    //             // Handle error, e.g., set an error state or display a message to the user
    //             // setLoading(false);
    //         }
    //     };
    //       fetchData();
    //     }
    
    //   }, []);
    // const filteredSubCategory = selectedCategory === 'sub_tasks' ? task : task.filter(task => task.sub_task === selectedCategory);

    // const categoryCounts = {
    //     sub_task,
    //     attachments,
    //     activities,
    //     histories 
    //   };
    // const categoryCounts = {
    //     sub_task: task.filter(task => task.sub_task === 'sub_task').length,
    //     attachments: task.filter(task => task.attachments === 'attachments').length,
    //     activities: task.filter(task => task.activities === 'activities').length,
    //     histories: task.filter(task => task.histories === 'histories').length,
    //   };

    // console.log(task.assignee);

    const handleClick = (index) => {
        setSelected(index)
        setOpen(!open);
    };

    const taskId = task.task_id;
    const userId = userDetails ? userDetails.id : null;

    const isCurrentUserAssignee = task.assignees_list.some(assignee => assignee.email === userDetails?.email);

    const isTeamMember = userDetails?.groups && userDetails.groups.includes("Team Member");
    const isProjectManagerOrDefaultUser = userDetails?.groups && (userDetails.groups.includes("Manager") || userDetails.groups.includes("Default User"));

    console.log(userDetails)
 
    // console.log(userId)

    const handleCommentSubmit = async (comment) => {
        try {
            const newComment = await createComment(comment, taskId,userId);
            setComments([...comments, newComment]);
            console.log(newComment)
            console.log(comments)
          } catch (error) {
            console.error('Error creating comment:', error);
          }
        console.log('Comment submitted in parent component:', comments);
    };

    const handleCommentEdit = () => {
        try{
            console.log(`comment has been edited`)
        } catch (error) {
            console.error('Error updating comment: ', error)
        }
    }

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const formatCount = (count) => {
        return count < 10 ? `0${count}` : count;
    };

    const getWidth = (width) => {
        if (width === 'sub_task') {
            return '25%';
        }
        if (width === 'attachments') {
            return '29%';
        }
        if (width === 'activities' || width === 'histories') {
            return '23%';
        }
    }

    // Calculate the height based on the number of comments
    const getHeight = () => {
        return comments.length > 0 ? 'auto' : '80px'; // Adjust the height as needed
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
            {/* <SortableContext items={task} strategy={verticalListSortingStrategy}> */}
            
                <div draggable>
                    <div className='tasks' key={task.task_id} id={task.title}>
                        <div className="tags">
                            <span className="tag tag-1">
                                <span><TagSpanCategory category={task.category}>{task.category}</TagSpanCategory></span> 
                                <span><TagSpanPriority priority={task.priority}>{task.priority}</TagSpanPriority></span>
                            </span>
                            <PiDotsThreeOutlineDuotone className="tag tag-2" style={style} data-tooltip-id={task.task_id} onMouseEnter={() => setIsOpenTooltip(true)}  />
                            <ReactTooltip id={task.task_id}
                                style={{ backgroundColor: "white", color: "#222" , padding:"10px", zIndex: "2"}}
                                border="1px solid black"
                                place="right-start"
                                isOpenTooltip={isOpenTooltip}
                                onClick={() => setIsOpenTooltip(true)}
                                clickable
                                >
                                <span id={task.task_id} key={task.task_id}  onClick={() => handleClick(item)}><GrOverview style={style2} /> view</span>
                                <hr></hr>
                                {
                                    ( isCurrentUserAssignee || !isTeamMember ) && (
                                        <>
                                            <span id={task.task_id}  onClick={handleUpdateClick}><IoPencil style={style2} /> edit</span>
                                            <hr></hr>
                                            <span style={{color:"red"}} onClick={onDelete}><IoTrashOutline style={style2} /> delete</span>
                                        </>
                                    )
                                }
                            </ReactTooltip>
                        </div>
                        <h3 onClick={() => handleClick(item)}>{task.title}</h3>
                        <p>{task.description}</p>
                        <hr></hr>
                        <div className="tags">
                            <div className="tag tag-1">
                                <AvatarGroup max={4} style={{float: "left"}} sx={{
                                    '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 15 },
                                }}>
                                    {task.assignees_list.map((member) => (
                                        <Avatar alt={member.full_name}  src={`http://localhost:8000${member.profile_picture}`} sx={{ width: 24, height: 24 }} />
                                    ))}
                                </AvatarGroup>
                            </div>
                            <div className={`tag tag-2 comment-tag ${comments.filter(comment => comment.task === task.task_id).length > 0 ? 'task-comment' : ''}`}><FaRegComments style={style} data-tooltip-id={`comment ${task.task_id}`} onMouseEnter={() => setIsOpenComment(true)} /></div>
                            <ReactTooltip id={`comment ${task.task_id}`}
                                style={{ backgroundColor: "white", color: "#222" , padding:"10px", width:"200px",height:getHeight(), zIndex:"2"}}
                                border="1px solid black"
                                place="right-start"
                                isOpenComment={isOpenComment}
                                onClick={() => setIsOpenComment(true)}
                                clickable
                                >
                                    <div className="comments" style={{minHeight:"0", maxHeight:"220px",overflowY:"auto", display:"flex", flexDirection:"column-reverse"}}>
                                        {comments.filter(comment => comment.task === task.task_id).map((comment, index) => (
                                            <Comments 
                                                key={index}    
                                                comment={comment}
                                                onEdit={handleCommentEdit}
                                                taskId={taskId}
                                                userId={userId}
                                            />
                                        ))} 
                                    </div>
                                <CommentForm onCommentSubmit={handleCommentSubmit} />
                            </ReactTooltip>
                        </div>
                    </div>
                    {open && item===selected && (
                    <Overlay in={!open} key={task.title} style={{visibility: showEditMode ? 'visible' : 'hidden', background: showEditMode ? "black" : "white"}}>
                        
                        <div className="tags" style={{padding: "1em 0 2em 0",  justifyContent:"right"}}>
                            <span className="tag tag-1"  style={{width:"50%"}} onClick={handleClick}><IoReturnUpBack className='cancel' size="1.5em"  /></span>
                            <span className="tag tag-1"   style={{width:"50%", textAlign: "right"}}><IoPencil size="1.2em"  style={{marginRight: "1em"}} onClick={onEditModeClick}  /><IoTrashOutline size="1.2em" /></span>
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
                                    {/* { showEditMode && (<p>should be black</p>)} */}
                                    <h2>{task.title}</h2>
                                    <p>{task.description}</p>
                                </div>
                                <div>
                                    <div className="tags" style={{marginBottom: ".4em"}}>
                                        <span className="tag tag-1 about-task" style={{width:"20%"}} >Assigned</span>
                                        <span className="tag tag-2 about-task" style={{width:"80%"}} >
                                            {task.assignees_list.slice(0,2).map((member) => (
                                                <div style={{display: "inline-block"}}>
                                                    <AvatarGroup style={{ marginRight: ".8em"}}>
                                                        <Avatar alt={member.full_name}  src={`http://localhost:8000${member.profile_picture}`} sx={{ width: 24, height: 24 }} style={{marginRight: ".5em",}}  />
                                                        <span style={{ paddingTop:".5em"}}>{member.full_name}</span>
                                                    </AvatarGroup>

                                                </div>
                                            ))}
                                        </span>
                                    </div>
                                    <div className="tags" style={{marginBottom: "1em"}}>
                                        <span className="tag tag-1 about-task" style={{width:"20%"}} >Timeline</span>
                                        <span className="tag tag-2 about-task" style={{width:"80%"}} ><Moment format="MMM D, YYYY">{task.created_At}</Moment>  - <Moment format="MMM D, YYYY">{task.due_date}</Moment></span>
                                        {/* <span className="tag tag-2 about-task" style={{width:"80%"}} >Nov 27, 2023 - Dec 02, 2023</span> */}
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
                                        

                                   
                                    

                                        <span className="tag about-task" onClick={onSubCategoryClick} style={{width:"25%", paddingBottom: "1em", borderBottom: "1px solid black"}}>Sub-tasks <small style={{background: "lightgray", color: "black", borderRadius: "5px", padding:"5px"}}>02</small></span>
                                        <span className="tag about-task" onClick={onSubCategoryClick} style={{width:"29%", paddingBottom: "1em", borderBottom: "1px solid black"}}>Attachments <small style={{background: "lightgray", color: "black", borderRadius: "5px", padding:"5px"}}>02</small></span>
                                        <span className="tag about-task" onClick={onSubCategoryClick} style={{width:"23%", paddingBottom: "1em", borderBottom: "1px solid black"}}>Activity <small style={{background: "lightgray", color: "black", borderRadius: "5px", padding:"5px"}}>02</small></span>
                                        <span className="tag about-task" onClick={onSubCategoryClick} style={{width:"23%", paddingBottom: "1em", borderBottom: "1px solid black"}}>History <small style={{background: "lightgray", color: "black", borderRadius: "5px", padding:"5px"}}>02</small></span>

                                    {/* <div className="tags" style={{width: "100%", display: "inline-block", marginTop: "2em"}}>
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
                                    </div> */}
                                    
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
                                    
                                    {/* { filteredSubCategory.map(notif => (
                                        <p>{notif.sub_task}</p>
                                    ))} */}
                                </div>
                            </div>
                    </Overlay>
                    )}
             </div>

            {/* </SortableContext> */}
        </div>
    )
}

export default TaskCard;