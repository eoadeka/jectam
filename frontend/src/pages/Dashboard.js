import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '../components/layout/Container';
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import userAvatar from "../assets/images/avatars/jane_smith.jpg"
import data from '../data/projects';
import tasks from '../data/tasks';
import {PageHeaderDiv,PageTitle, PageTitleDiv, PageTitleSpan } from '../components/layout/PageHeader';
import ApexLineChart from '../components/charts/SampleLine';
import PieChart from '../components/charts/PieChart';
import { CgWebsite } from "react-icons/cg";
import { FaAppStoreIos, FaAndroid } from "react-icons/fa";
import { IoMdTabletLandscape } from "react-icons/io";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { GrInProgress } from "react-icons/gr";
import { LuListTodo } from "react-icons/lu";
import { PiWarningCircle } from "react-icons/pi";
import { FaRegSquareCheck } from "react-icons/fa6";
import ColumnChart from '../components/charts/ColumnChart';
import { LuPartyPopper } from "react-icons/lu";
import { GiTumbleweed } from "react-icons/gi";


const TagSpanStatus = styled.span`
    position: absolute;
    right: 1em;
    bottom: 1em;
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

const Dashboard = () => {
  const style = { fontSize: "1em", verticalAlign: "middle", marginRight: ".5em" };
  const styleTwo = { fontSize: "1.7em", verticalAlign: "middle", marginRight: ".5em" };
  
  const [userDetails, setUserDetails] = useState(null);
  const isDefault = userDetails?.groups[0] === 'Default';
  const isProjectManager = userDetails?.groups[0] === 'Manager';
  const isTeamMember = userDetails?.groups[0] === 'Team Member';

  useEffect(() => {

    const refreshToken = localStorage.getItem('access_token');

   if (!refreshToken){
    window.location.replace("/");
   } else {
    const getUserDetails = async () => {
      try {
        // Retrieve JWT token from local storage (assumed to be stored as 'jwtToken')
        const accessToken = localStorage.getItem('access_token');

        // Send authenticated request to an endpoint that requires authentication
        // const response = await axios.get('http://localhost:8000/accounts/profile/', {
        const response = await axios.get('https://jectam-backend.onrender.com/accounts/profile/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'accept': 'application/json'
          },  withCredentials: true
        });

        const data = response.data;
        console.log(data)
        setUserDetails({
          id: data.id,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          role: data.role,
          groups: data.groups,
          profile_picture: data.profile_picture
        });
        // console.log(userDetails.email)
      } catch (error) {
        console.error('Error fetching user details:', error);
        window.location.replace("/");
      }
    };

    getUserDetails();
  }
  }, []);

  return (
    <div>
      <Container>
       <header>
       <PageHeaderDiv>
          <PageTitleDiv>
            <PageTitle>Dashboard</PageTitle>
            <small>A summary of all projects tasks, status, priotities and more.</small>
          </PageTitleDiv>

          <PageTitleDiv>
            <PageTitleSpan>
              <a href={`/user-profile`}>
                <AvatarGroup>
                  <Avatar alt={userDetails?.first_name} src={`http://localhost:8000${userDetails?.profile_picture}`} sx={{ width: 40, height: 40 }} />
                  {/* <Avatar alt={userDetails?.first_name} src={`https://jectam-backend.onrender.com/${userDetails?.profile_picture}`} sx={{ width: 40, height: 40 }} /> */}
                </AvatarGroup>
              </a>
            </PageTitleSpan>
              { userDetails ? (
                <PageTitleSpan style={{marginRight: "1em", marginTop:"0.3em"}}>
                    <span  style={{ fontSize:"1.1em"}}>{userDetails.first_name} {userDetails.last_name}</span>
                  <p style={{marginTop:"-0.3em",fontSize:"0.7em"}}> {userDetails.role}</p>
                  {/* <small style={{fontSize:"0.7em", marginTop:"3em"}}> {userDetails.email}</small> */}
                </PageTitleSpan>
              ): ('')}
            </PageTitleDiv>
          </PageHeaderDiv>
        
        </header>{/* </span> */}
        {/* <div className='project-header'>
          <div className='project-title'>
            <h1>Dashboard</h1>
          </div>
          <div className='project-title'>
            <span className='filter'>
              <AvatarGroup>
                <Avatar alt="ella-adeka" src={userAvatar} sx={{ width: 30, height: 30 }} />
              </AvatarGroup>
            </span>
          </div>
        </div> */}
        {/* {userDetails?.groups[[0]]} */}
        <main>
        <div className='dashboard-body'>
          <div className='dashboard-statistics'>
            <div className='dashboard-stats' style={{width: "40%", display: "inline-block",height: "230px"}}>
                <ApexLineChart />
              </div>
            <div className='dashboard-stats about-projects' style={{width: "30%", display: "inline-block", height: "230px"}}>
              {/* <h3>About Projects</h3>
              <p>project status: done, in progress</p> */}
                <PieChart />
            </div>

            <div className='dashboard-stats platform' style={{width: "25%", display: "inline-block", height: "230px"}}>
              <small style={{fontSize: ".9em"}}>Tasks</small>
              {/* <p>website, ios, tablet, android</p> */}
              <br></br>
              <div style={{width: "50%", display: "inline-block",textAlign: "center",}}>
                  <h2 style={{marginBottom: "-0.1em", }}>21</h2>
                  <LuListTodo style={style} /><small>To Do</small>
              </div>
              <div style={{width: "50%", display: "inline-block", textAlign: "center",}}>
                  <h2 style={{marginBottom: "-0.1em",  }}>12</h2>
                  <GrInProgress style={style} /><small>In Progress</small>
              </div>
              <div style={{width: "50%", display: "inline-block",textAlign: "center", marginTop: "1em" }}>
                  <h2 style={{marginBottom: "-0.1em", }}>3</h2>
                  <FaRegSquareCheck style={style} /><small>Completed</small>
              </div>
              <div style={{width: "50%", display: "inline-block", textAlign: "center", marginTop: "1em" }}>
                  <h2 style={{marginBottom: "-0.1em" }}>15</h2>
                  <PiWarningCircle style={style} /><small>Overdue</small>
              </div>
            </div>
          </div>
          {/* {userDetails.first_name} */}
          {/* {userDetails.email} */}
          {/* {userDetails.role} */}

        <div>
          <div className='current-projects' style={{border: "1px solid lightgray", borderRadius: "5px", padding: "0 10px", width: "56%",height: "250px",marginRight:"1em", display:"inline-block"}}>
            <div className='project-header'>
              <div className='project-title'>
                <h2 style={{ marginBottom:"-0.3em", fontSize:"1.05em"}}>Recent activity</h2>
                <small style={{ opacity: "0.6", fontSize:".8em"}}>Get an overview of all recent activity</small>
              </div>
              <div className='project-title' style={{textAlign: "right"}}>
                <a href='/notifications' style={{color:"black", fontSize: ".8em"}}>
                  See all
                </a>
              </div>
            </div>
            {/* <h3>Current Projects</h3> */}
            <div>
            {tasks.length === 0 ? (
                <div style={{textAlign:"center", marginTop: "5%", opacity: "0.5"}}>
                  <GiTumbleweed style={styleTwo} />
                  <h3 style={{marginBottom:"-0.1em", fontSize:"1.05em"}}>Looks like nothing much is happening!</h3>
                  <small>Get started on a project</small>
                </div>
              ) : (
                tasks.slice(0,4).map((task) => (
                  <div style={{position:"relative"}}>
                    <h3 style={{verticalAlign:"top", fontSize:"1.05em"}}>{task.title}</h3>
                    <TagSpanStatus status={task.status} >{task.status}</TagSpanStatus>
                  </div>
                )))}
              </div>
          </div>

          {( isProjectManager || isDefault ) && (
          <div className='current-projects' style={{border: "1px solid lightgray", borderRadius: "5px", padding: "0 10px", width: "40%",height: "250px", display:"inline-block", verticalAlign:"top"}}>
            <div className='project-header'>
              <div className='project-title'>
                <h4 style={{ marginBottom:"-0.3em", fontSize:"1.05em"}}>Assigned tasks</h4>
                <small style={{ opacity: "0.6", fontSize:".8em"}}>Get an overview of all assigned tasks</small>
              </div>
              <div className='project-title' style={{textAlign: "right"}}>
                <a href='/user-profile' style={{color:"black", fontSize: ".8em"}}>
                  See all
                </a>
              </div>
            </div>
            <div>
            {tasks.length === 0 ? (
                <div style={{textAlign:"center", marginTop: "6%", opacity: "0.5"}}>
                  <LuPartyPopper style={styleTwo} />
                  <p style={{marginBottom:"-0.1em"}}>Looks like you have no assigned tasks!</p>
                  <small>Assign tasks to your team</small>
                </div>
              ) : (
              tasks.slice(0,4).map((task) => (
                <div style={{position:"relative"}}>
                  <h3 style={{verticalAlign:"top",fontSize:"1.05em" }}>{task.title} <small style={{ fontSize: "0.7em" }}>- Jane Smith</small></h3>
                  <TagSpanStatus status={task.status} >{task.status}</TagSpanStatus>
                </div>
              )))}
            </div>
          </div>
          )}
          { isTeamMember && (
            <div className='current-projects' style={{border: "1px solid lightgray", borderRadius: "5px", padding: "0 10px", width: "40%",height: "250px", display:"inline-block", verticalAlign:"top"}}>
              <div className='project-header'>
                <div className='project-title'>
                  <h3 style={{ marginBottom:"-0.3em", fontSize:"1.05em"}}>Assigned to me</h3>
                  <small style={{ opacity: "0.6", fontSize:".8em"}}>Get an overview of all your tasks</small>
                </div>
                <div className='project-title' style={{textAlign: "right"}}>
                  <a href='/user-profile' style={{color:"black", fontSize: ".8em"}}>
                    See all
                  </a>
                </div>
              </div>
              <div>
              {tasks.length === 0 ? (
                <div style={{textAlign:"center", marginTop: "6%", opacity: "0.5"}}>
                  <LuPartyPopper style={styleTwo} />
                  <h4 style={{marginBottom:"-0.1em"}}>Looks like you have not been assigned any tasks yet!</h4>
                  <small>Kick back and have a cup of tea</small>
                </div>
              ) : (
                tasks.slice(0,4).map((task) => (
                  <div style={{position:"relative"}}>
                    <p style={{verticalAlign:"top"}}>{task.title}</p>
                    <TagSpanStatus status={task.status} >{task.status}</TagSpanStatus>
                  </div>
                )))}
              </div>
            </div>
          )}
        </div>

        <br></br>

        <div>
          <div className='current-projects' style={{border: "1px solid lightgray", borderRadius: "5px", padding: "0 10px", width: "25%",height: "300px",marginRight:"1em", display:"inline-block"}}>
            <div className='project-header'>
              <div className='project-title'>
                <h4 style={{ marginBottom:"-0.3em", fontSize:"1.05em"}}>Priority</h4>
                <small style={{ opacity: "0.6", fontSize:".8em"}}>An overview of work priorities</small>
              </div>
              <div className='project-title' style={{textAlign: "right"}}>
                <a href='/notifications' style={{color:"black", fontSize: ".8em"}}>
                  See all
                </a>
              </div>
            </div>
            <ColumnChart />
          </div>
          <div className='current-projects' style={{border: "1px solid lightgray", borderRadius: "5px", padding: "0 10px", width: "28%",height: "300px",marginRight:"1em", display:"inline-block", verticalAlign:"top"}}>
            <div className='project-header'>
              <div className='project-title'>
                <h4 style={{ marginBottom:"-0.3em", fontSize:"1.05em"}}>Coming up</h4>
                <small style={{ opacity: "0.6", fontSize:".8em"}}>Review meetings coming up</small>
              </div>
              <div className='project-title' style={{textAlign: "right"}}>
                <a href='/notifications' style={{color:"black", fontSize: ".8em"}}>
                  See all
                </a>
              </div>
            </div>
            <div style={{position: "relative"}}>
              {data.length === 0 ? (
                <div style={{textAlign:"center", marginTop: "20%", opacity: "0.5"}}>
                  <LuPartyPopper style={styleTwo} />
                  <h4 style={{marginBottom:"-0.1em"}}>Looks like your schedule is clear!</h4>
                  <small>You have no review meetings coming up</small>
                </div>
              ): (
              data.slice(0,5).map((task) => (
                <div style={{position:"relative"}}>
                  <h4 style={{verticalAlign:"top"}}>{task.project_name}</h4>
                  <TagSpanStatus status={task.project_status} >{task.project_status}</TagSpanStatus>
                </div>
              )))}
            </div>
          </div>
          <div className='current-projects' style={{border: "1px solid lightgray", borderRadius: "5px", padding: "0 10px", width: "42%", height: "300px", display:"inline-block", verticalAlign:"top"}}>
            <div className='project-header'>
              <div className='project-title'>
                <h4 style={{ marginBottom:"-0.3em", fontSize:"1.05em"}}>Team members</h4>
                <small style={{ opacity: "0.6", fontSize:".8em"}}>Get an overview of your team members</small>
              </div>
              <div className='project-title' style={{textAlign: "right"}}>
                <a href='/user-profile' style={{color:"black", fontSize: ".8em"}}>
                  See all
                </a>
              </div>
            </div>
            <div>
            {data.length === 0 ? (
                <div style={{textAlign:"center", marginTop: "10%", opacity: "0.5"}}>
                  <LuPartyPopper style={styleTwo} />
                  <h4 style={{marginBottom:"-0.1em"}}>Uh oh! You have no team members yet!</h4>
                  <small>Create a project to collaborate with your team</small>
                </div>
              ): (
              data.slice(0,5).map((task) => (
                <div style={{position:"relative"}}>
                  <h4 style={{verticalAlign:"top"}}>{task.project_name}</h4>
                  <TagSpanStatus status={task.project_status} >{task.project_status}</TagSpanStatus>
                </div>
              )))}
            </div>
          </div> 
        </div>

          {/* <div className='team-members'>
            <div className='project-header'>
              <div className='project-title'>
                <h3>Team Members</h3>
              </div>
              <div className='project-title'>
                <small style={{float: "right", textDecoration:"underline"}}>
                  See all
                </small>
              </div>
            </div>
            <div className='current-team'>
              <h2 style={{marginBottom: "-0.3em"}}>12</h2>
              <div className='tag tag-11'>
                <small style={{fontSize:".7em", wordBreak:"normal"}}>UI Designer</small>
              </div>
              <div className='tag tag-22' >
                <AvatarGroup max={3} sx={{
                    '& .MuiAvatar-root': { width: 20, height: 20, fontSize: 10 },
                  }}>
                    <Avatar alt="jane_smith"  src={userAvatar} sx={{ width: 20, height: 20 }} />
                    <Avatar alt="jane_smith"  src={userAvatar} sx={{ width: 20, height: 20 }} />
                    <Avatar alt="jane_smith"  src={userAvatar} sx={{ width: 20, height: 20 }} />
                    <Avatar alt="jane_smith"  src={userAvatar} sx={{ width: 20, height: 20 }} />
                    <Avatar alt="jane_smith"  src={userAvatar} sx={{ width: 20, height: 20 }} />
                </AvatarGroup>
              </div>
            </div>

            <div className='current-team'>
              <h2 style={{marginBottom: "-0.2em"}}>08</h2>
              <div className='tag tag-11'>
                <small style={{fontSize:".7em", wordBreak:"normal"}}>Frontend Engineer</small>
              </div>
              <div className='tag tag-22'>
                <AvatarGroup max={4} sx={{
                    '& .MuiAvatar-root': { width: 20, height: 20, fontSize: 10 },
                  }}>
                    <Avatar alt="jane_smith"  src={userAvatar} sx={{ width: 20, height: 20 }} />
                    <Avatar alt="jane_smith"  src={userAvatar} sx={{ width: 20, height: 20 }} />
                    <Avatar alt="jane_smith"  src={userAvatar} sx={{ width: 20, height: 20 }} />
                    <Avatar alt="jane_smith"  src={userAvatar} sx={{ width: 20, height: 20 }} />
                    <Avatar alt="jane_smith"  src={userAvatar} sx={{ width: 20, height: 20 }} />
                </AvatarGroup>
              </div>
            </div>

            <div className='current-team'>
              <h2 style={{marginBottom: "-0.2em"}}>02</h2>
              <div className='tag tag-11'>
                <small style={{fontSize:".7em", wordBreak:"normal"}}>DevOps Engineer</small>
              </div>
              <div className='tag tag-22'>
                <AvatarGroup max={4} sx={{
                    '& .MuiAvatar-root': { width: 20, height: 20, fontSize: 10 },
                  }}>
                    <Avatar alt="jane_smith"  src={userAvatar} sx={{ width: 20, height: 20 }} />
                    <Avatar alt="jane_smith"  src={userAvatar} sx={{ width: 20, height: 20 }} />
                    <Avatar alt="jane_smith"  src={userAvatar} sx={{ width: 20, height: 20 }} />
                    <Avatar alt="jane_smith"  src={userAvatar} sx={{ width: 20, height: 20 }} />
                    <Avatar alt="jane_smith"  src={userAvatar} sx={{ width: 20, height: 20 }} />
                </AvatarGroup>
              </div>
            </div>

            <div className='current-team'>
              <h2 style={{marginBottom: "-0.2em"}}>08</h2>
              <div className='tag tag-11' style={{ wordBreak:"break-all"}}>
                <small style={{fontSize:".7em", wordBreak:"normal"}}>SRE</small>
              </div>
              <div className='tag tag-22'  >
                <AvatarGroup max={4} sx={{
                    '& .MuiAvatar-root': { width: 20, height: 20, fontSize: 10 },
                  }}>
                    <Avatar alt="jane_smith"  src={userAvatar} sx={{ width: 20, height: 20 }} />
                    <Avatar alt="jane_smith"  src={userAvatar} sx={{ width: 20, height: 20 }} />
                    <Avatar alt="jane_smith"  src={userAvatar} sx={{ width: 20, height: 20 }} />
                    <Avatar alt="jane_smith"  src={userAvatar} sx={{ width: 20, height: 20 }} />
                    <Avatar alt="jane_smith"  src={userAvatar} sx={{ width: 20, height: 20 }} />
                </AvatarGroup>
              </div>
            </div>

            <div className='current-team'>
              <h2 style={{marginBottom: "-0.2em"}}>05</h2>
              <div className='tag tag-11' style={{ wordBreak:"break-all"}}>
                <small style={{fontSize:".7em", wordBreak:"normal"}}>Project Manager</small>
              </div>
              <div className='tag tag-22'  >
                <AvatarGroup max={4} sx={{
                    '& .MuiAvatar-root': { width: 20, height: 20, fontSize: 10 },
                  }}>
                    <Avatar alt="jane_smith"  src={userAvatar} sx={{ width: 20, height: 20 }} />
                    <Avatar alt="jane_smith"  src={userAvatar} sx={{ width: 20, height: 20 }} />
                    <Avatar alt="jane_smith"  src={userAvatar} sx={{ width: 20, height: 20 }} />
                    <Avatar alt="jane_smith"  src={userAvatar} sx={{ width: 20, height: 20 }} />
                    <Avatar alt="jane_smith"  src={userAvatar} sx={{ width: 20, height: 20 }} />
                </AvatarGroup>
              </div>
            </div>
          </div> */}
           

        </div>
        </main>
      </Container>
    </div>
  );
}

export default Dashboard;