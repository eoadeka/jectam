import React from "react";
import { GoDotFill } from "react-icons/go";
import { TagSpanCategory } from "../buttons/Tags";
import moment from 'moment';


const NotificationItem = ({notification}) => {
    const dotFill = { verticalAlign: "middle" };

    const timeAgoString = () => {
      const timeElapsed = moment(notification.created_at).fromNow();
      
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

    switch (notification.notification_type) {
        case 'added_new_tags':
          return (
            <div className='notif' style={{ width: "80%", marginLeft: "1em"}}>
                <p><b>{notification.member_name}</b> added new tags to <b>{notification.project_name}</b></p>
                <p style={{ marginTop: "-1em"}}><small style={{ opacity: "0.7"}}>{notification.timeStamp}<GoDotFill style={dotFill} /> {notification.project_name}</small></p>
                <TagSpanCategory category={"UI Design"}>UI design</TagSpanCategory>
                <TagSpanCategory category={"Frontend Devt"}>Frontend devt</TagSpanCategory>
            </div>
          );
        case 'asked_to_join':
          return (
            <div className='notif' style={{ width: "80%", marginLeft: "1em"}}>
                <p><b>{notification.member_name}</b> asked you to join <b>{notification.project_name}</b></p>
                <p style={{ marginTop: "-1em"}}><small style={{ opacity: "0.7"}}>{notification.timeStamp} <GoDotFill style={dotFill} /> {notification.project_name}</small></p>
                <button className='notif-btn'>Accept</button><button className='notif-btn'>Decline</button>
            </div>  
          );
        case 'mentioned_you':
          return (
            <div className='notif' style={{ width: "80%", marginLeft: "1em"}}>
              <p><b>{notification.member_name}</b> mentioned you <b>{notification.project_name}</b></p>
              <p style={{ marginTop: "-1em"}}><small style={{ opacity: "0.7"}}>{notification.timeStamp}<GoDotFill style={dotFill} />{notification.project_name}</small></p>
              <p className='notif-comment'><small><b>@johnthedough</b> hey! i just added you to the the Luminate Upgrade UI team. we urgently need your expertise. just to clarify:  i just added you to the the Luminate Upgrade UI team. we urgently need your expertise</small></p>
              <button className='notif-btn'>Reply</button>
            </div>   
          );
        case 'deadline_approaching':
          return (
            <div className='notif' style={{ width: "80%", marginLeft: "1em"}}>
              <p>⚠️ <b>{notification.project}</b> approaching deadline</p>
              <p style={{ marginTop: "-1em"}}><small style={{ opacity: "0.7"}}>{timeAgoString()}<GoDotFill style={dotFill} />{notification.project}</small></p>
              <p>Deadline in <span><b>7 days</b></span></p>
              <button className='notif-btn'>View Project</button>
            </div>   
          );
        case 'deadline_passed':
          return (
            <div className='notif' style={{ width: "80%", marginLeft: "1em"}}>
              <p><b>⛔️ Deadline</b> has passed for <b>{notification.project_name}</b></p>
              <p style={{ marginTop: "-1em"}}><small style={{ opacity: "0.7"}}>{notification.timeStamp}<GoDotFill style={dotFill} />{notification.project_name}</small></p>
              <p>Deadline was <span><b>13 days ago</b></span></p>
              <button className='notif-btn'>View Project</button>
            </div>   
          );
        case 'task_assigned':
          return (
            <div className='notif' style={{ width: "80%", marginLeft: "1em"}}>
              <p><b>{notification.member_name}</b> assigned you a task on <b>{notification.project_name}</b></p>
              <p style={{ marginTop: "-1em"}}><small style={{ opacity: "0.7"}}>{notification.timeStamp}<GoDotFill style={dotFill} />{notification.project_name}</small></p>
              <p>Task:<span> <b>Implement User Authentication</b></span> 
                  <br></br> 
                Priority:  <span><b>Low</b></span><br></br>
                Due Date:  <span><b>13 June, 2024</b></span>
              </p>
              <button className='notif-btn'>View Task</button>
            </div>   
          );
        case 'commented':
          return (
            <div className='notif' style={{ width: "80%", marginLeft: "1em"}}>
              <p><b>{notification.sender}</b> made a comment to <b>`{notification.task}`</b> in <b>`{notification.project}`</b></p>
              <p style={{ marginTop: "-1em"}}><small style={{ opacity: "0.7"}}>{timeAgoString()}<GoDotFill style={dotFill} />{notification.project}</small></p>
              <p className='notif-comment'><small><b>@{notification.sender}</b>: {notification.comment}.</small></p>
              <button className='notif-btn'>Reply</button>
            </div>   
          );
        default:
          return (
                <div className='notif' style={{ width: "95%", marginLeft: "1em"}}>
                    <p><b>{notification.member_name}</b> added new tags to <b>{notification.project_name}</b></p>
                    <p style={{ marginTop: "-1em"}}><small style={{ opacity: "0.7"}}>{notification.timeStamp}<GoDotFill style={dotFill} /> {notification.project_name}</small></p>
                    <small>This is a default notification</small>
                </div>
                
          );
      }

    // return (
    //     <div className='notification'>
    //       <div className='notif' key={notification.id} id={notification.title}>
    //         <AvatarGroup  style={{ verticalAlign:"middle"}} sx={{ width: 40}}>
    //           <Avatar alt="ella-adeka" src={notification.member_profile_pic} sx={{ width: 40, height: 40 }} />
    //         </AvatarGroup>
    //       </div>

    //       <div className='notif' style={{ width: "95%", marginLeft: "1em"}}>
    //         <p><b>{notification.member_name}</b> added new tags to <b>{notification.project_name}</b></p>
    //         <p style={{ marginTop: "-1em"}}><small style={{ opacity: "0.7"}}>{notification.timeStamp}<GoDotFill style={dotFill} /> {notification.project_name}</small></p>
    //       </div>
    //       <div className='notif-span'></div>
    //     </div>
    // )
}

export default NotificationItem;