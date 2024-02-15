import React from "react";
import { GoDotFill } from "react-icons/go";
import { TagSpanCategory } from "../buttons/Tags";


const NotificationItem = ({notification}) => {
    const dotFill = { verticalAlign: "middle" };

    switch (notification.type) {
        case 'tag':
          return (
            <div className='notif' style={{ width: "80%", marginLeft: "1em"}}>
                <p><b>{notification.member_name}</b> added new tags to <b>{notification.project_name}</b></p>
                <p style={{ marginTop: "-1em"}}><small style={{ opacity: "0.7"}}>{notification.timeStamp}<GoDotFill style={dotFill} /> {notification.project_name}</small></p>
                <TagSpanCategory category={"UI Design"}>UI design</TagSpanCategory>
                <TagSpanCategory category={"Frontend Devt"}>Frontend devt</TagSpanCategory>
            </div>
          );
        case 'button':
          return (
            <div className='notif' style={{ width: "80%", marginLeft: "1em"}}>
                <p><b>{notification.member_name}</b> asked to join <b>{notification.project_name}</b></p>
                <p style={{ marginTop: "-1em"}}><small style={{ opacity: "0.7"}}>{notification.timeStamp} <GoDotFill style={dotFill} /> {notification.project_name}</small></p>
                <button className='notif-btn'>Accept</button><button className='notif-btn'>Decline</button>
            </div>  
          );
        case 'comment':
          return (
           
                <div className='notif' style={{ width: "80%", marginLeft: "1em"}}>
                    <p><b>{notification.member_name}</b> mentioned you <b>{notification.project_name}</b></p>
                    <p style={{ marginTop: "-1em"}}><small style={{ opacity: "0.7"}}>{notification.timeStamp}<GoDotFill style={dotFill} />{notification.project_name}</small></p>
                    <p className='notif-comment'><small><b>@johnthedough</b> hey! i just added you to the the Luminate Upgrade UI team. we urgently need your expertise. just to clarify:  i just added you to the the Luminate Upgrade UI team. we urgently need your expertise</small></p>
                    <button className='notif-btn'>Reply</button>
                </div>
                
          );
        // Add more cases for other notification types as needed...
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