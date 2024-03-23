import React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import moment from 'moment';


const Comments = ({comment, commenterFirstName, commenterLastName}) => {


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
                    <Avatar alt={commenterFirstName}  src={comment.commenter_profile_pic} sx={{ width: 24, height: 24 }} />
                </AvatarGroup>
                <small style={{display:"inline-block", width: "65%",  verticalAlign:"middle", fontSize: "0.95em"}}>{commenterFirstName} {commenterLastName}</small>
                <small style={{display:"inline-block", width: "20%",  verticalAlign:"middle", textAlign:"right", opacity:"0.6", fontSize:"0.8em"}}>{timeAgoString()}</small>
            </div>
            <p>{comment.comment}</p>
            <hr></hr>
            {/* {comment.read === false && (<span>New</span>)} */}
        </div>
    )
}

export default Comments