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
  
  const [userDetails, setUserDetails] = useState(null);
  const isDefault = userDetails?.groups[0] === 'Default';
  const isProjectManager = userDetails?.groups[0] === 'Manager';
  const isTeamMember = userDetails?.groups[0] === 'Team Member';

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
      }
    };

    getUserDetails();
  }
  }, []);

  return (
    <div>
      <Container>
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
        {/* </span> */}
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
        <div className='dashboard-body'>
          <div className='dashboard-statistics'>
            <div className='dashboard-stats' style={{width: "40%", display: "inline-block"}}>
                <ApexLineChart />
              </div>
            <div className='dashboard-stats about-projects' style={{width: "25%", display: "inline-block"}}>
              {/* <h3>About Projects</h3>
              <p>project status: done, in progress</p> */}
                <PieChart />
            </div>

            <div className='dashboard-stats platform' style={{width: "25%", display: "inline-block"}}>
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

          <div className='current-projects' style={{border: "1px solid lightgray", borderRadius: "5px", padding: "0 10px", width: "52.5%",marginRight:"1em", display:"inline-block"}}>

            <div className='project-header'>
              <div className='project-title'>
                <h4 style={{ marginBottom:"-0.3em", fontSize:"1.05em"}}>Recent activity</h4>
                <small style={{ opacity: "0.6", fontSize:".8em"}}>Get an overview of all recent activity</small>
              </div>
              <div className='project-title' style={{textAlign: "right"}}>
                <small style={{textDecoration:"underline",}}>
                  See all
                </small>
              </div>
            </div>
              {/* <h3>Current Projects</h3> */}
                {data.slice(0,4).map((project) => (
              <ul className='current-project'>
                  <li >
                  <a className='current-projects-link' id={project.id} href={`projects/${project.url}/${project.id}`}>
                  <div className='project-title'>
                    <span>{project.project_name}</span>
                    </div>
                    {/* <p>{project.project_short_desc}</p>
                    <div className='project-title'>
                      <small>{project.status}</small>
                    </div> */}
                    <div className='project-title' style={{textAlign: "right"}}>
                      <small style={{textDecoration:"underline",  }}>
                        0/10
                      </small>
                    </div>
                    
                    {/* <br></br>
                    <progress  value={0.7} style={{position: "absolute", width:"87%", marginTop: "10px"}} />
                    <TagSpanStatus>Oct 18, 2024</TagSpanStatus> */}
                    {/* <TagSpanStatus status={project.status}>{project.status}</TagSpanStatus> */}
                  </a>
                  <hr></hr>
                </li>
              </ul>
                ))}
          </div>

              { isProjectManager && (
                <div className='current-projects' style={{border: "1px solid lightgray", borderRadius: "5px", padding: "0 10px", width: "40%", display:"inline-block", verticalAlign:"top"}}>
                  <div className='project-header'>
                    <div className='project-title'>
                      <h4 style={{ marginBottom:"-0.3em", fontSize:"1.05em"}}>Assigned tasks</h4>
                      <small style={{ opacity: "0.6", fontSize:".8em"}}>Get an overview of all assigned tasks</small>
                    </div>
                    <div className='project-title' style={{textAlign: "right"}}>
                      <small style={{textDecoration:"underline",}}>
                        See all
                      </small>
                    </div>
                  </div>
                  <div>
                    {tasks.slice(0,4).map((task) => (
                      <div style={{position:"relative"}}>
                        <h4 style={{verticalAlign:"top"}}>{task.title}</h4>
                        <TagSpanStatus status={task.status} >{task.status}</TagSpanStatus>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              { isTeamMember && (
                <div className='current-projects' style={{border: "1px solid lightgray", borderRadius: "5px", padding: "0 10px", width: "40%", display:"inline-block", verticalAlign:"top"}}>
                  <div className='project-header'>
                    <div className='project-title'>
                      <h3>Assigned to me</h3>
                    </div>
                    <div className='project-title' style={{textAlign: "right"}}>
                      <small style={{textDecoration:"underline",}}>
                        See all
                      </small>
                    </div>
                  </div>
                  <small>Get an overview of your assigned tasks</small>
  
                  <div>
                    {tasks.slice(0,4).map((task) => (
                      <div style={{position:"relative"}}>
                        <h4 style={{verticalAlign:"top"}}>{task.title}</h4>
                        <TagSpanStatus status={task.status} >{task.status}</TagSpanStatus>
                      </div>
                    ))}
                  </div>
                </div>
              )}

          <div className='team-members'>
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
          </div>

            Project Statistics - Project status - Tasks<br></br>
            isProjectManager <br></br>
              latest activity -  assigned tasks<br></br>
            isTeamMember<br></br>
              latest activity -  assigned to me
           

        </div>
      </Container>
    </div>
  );
}

export default Dashboard;