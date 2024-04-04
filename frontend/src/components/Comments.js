import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import moment from 'moment';
import { Input } from "./forms/FormElement";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { updateComment } from "../hooks/crudComments";
import { Tooltip as ReactTooltip  } from 'react-tooltip';
import { PiDotsThreeOutlineDuotone } from "react-icons/pi";
import { IoPencil, IoTrashOutline } from "react-icons/io5";


const Comments = ({comment, onEdit, taskId, userId}) => {
    const style = { fontSize: ".8em", verticalAlign: "middle", marginLeft: ".2em" };
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(comment.comment);
    const [isOpenTooltip, setIsOpenTooltip] = useState(false); // tooltip


    const handleEdit = () => {
        setIsEditing(true);
    };
    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        // Call the onEdit function to save changes
        const editedComment = await updateComment(comment.comment_id, editedText, taskId, userId);
        onEdit(editedComment);
        setIsEditing(false);
    };

    const handleCancel = () => {
        // Reset edited text and exit edit mode
        setEditedText(comment.comment);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setEditedText(e.target.value);
    };
    

    const timeAgoString = () => {
        const timeElapsed = moment(comment.timeStamp).fromNow();
        
        // Split the time elapsed string to extract numeric value and unit
        const [value, unit] = timeElapsed.split(' ');
    
        switch (unit) {
        case 'seconds':
            return `${value}s`;
          case 'minutes':
            return value === 'a' ? '1m' : `${value}m`;
          case 'hours':
            return `${value}h`;
          case 'days':
            return `${value}d`;
          case 'weeks':
            return `${value}w`;
          case 'months':
            return `${value}mo`;
          default:
            return timeElapsed;
        }
      };

    return (
        <div style={{ width:"100%"}}>
            <div>
                <AvatarGroup sx={{display:"inline-block", width: "15%",  verticalAlign:"middle"}}>
                    <Avatar alt={comment.commenter_full_name}  src={`http://localhost:8000${comment.commenter_profile_picture}`} sx={{ width: 24, height: 24 }} />
                </AvatarGroup>
                <small style={{display:"inline-block", width: "70%",  verticalAlign:"middle", fontSize: "0.95em"}}>{comment.commenter_full_name} <small style={{ fontSize:"0.8em", opacity:"0.6"}}>{timeAgoString()}</small></small>
                {/* <small style={{display:"inline-block", width: "20%",  verticalAlign:"middle", textAlign:"right", opacity:"0.6", fontSize:"0.8em"}}>{timeAgoString()}</small> */}
                <small style={{display:"inline-block", width: "13%",  verticalAlign:"middle", textAlign:"right", opacity:"0.6", fontSize:"0.8em"}}><PiDotsThreeOutlineDuotone data-tooltip-id={comment.comment_id} onMouseEnter={() => setIsOpenTooltip(true)}  /></small>
                <ReactTooltip id={comment.comment_id}
                    style={{ backgroundColor: "white", color: "#222" , padding:"10px"}}
                    border="1px solid black"
                    place="right-start"
                    isOpenTooltip={isOpenTooltip}
                    onClick={() => setIsOpenTooltip(true)}
                    clickable
                    >
                    <span id={comment.comment}><IoPencil onClick={handleEdit} /> edit</span>
                    <hr></hr>
                    <span style={{color:"red"}}><IoTrashOutline  /> delete</span>
                </ReactTooltip>
            </div>
            {
                isEditing ? (
                    <span>
                        <Input
                        type="text"
                        value={editedText}
                        onChange={handleChange}
                        autoFocus />
                        <div style={{textAlign: "right"}}>
                            <button onClick={handleSave} type="submit" style={style}><AiOutlineCheck /></button>
                            <button onClick={handleCancel} style={style}><AiOutlineClose /></button>
                        </div>
                    </span>
                ) : (
                    <p onDoubleClick={handleDoubleClick}>{comment.comment}</p>
                )
            }
            <hr></hr>
            {/* {comment.read === false && (<span>New</span>)} */}
        </div>
    )
}

export default Comments