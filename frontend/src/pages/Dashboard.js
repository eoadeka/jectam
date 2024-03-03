import React from 'react';
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
  
  return (
    <div>
      <Container>
        <PageHeaderDiv>
          <PageTitleDiv>
            <PageTitle>Dashboard</PageTitle>
          </PageTitleDiv>
          <PageTitleDiv>
            <PageTitleSpan>
              <a href={`/user-profile`}>
                <AvatarGroup>
                  <Avatar alt="ella-adeka" src={userAvatar} sx={{ width: 30, height: 30 }} />
                </AvatarGroup>
              </a>
            </PageTitleSpan>
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
              <small style={{fontSize: ".9em"}}>Platform</small>
              {/* <p>website, ios, tablet, android</p> */}
              <br></br>
              <div style={{width: "50%", display: "inline-block",textAlign: "center",}}>
                  <h2 style={{marginBottom: "-0.1em", }}>21</h2>
                  <CgWebsite style={style} /><small>website</small>
              </div>
              <div style={{width: "50%", display: "inline-block", textAlign: "center",}}>
                  <h2 style={{marginBottom: "-0.1em",  }}>12</h2>
                  <FaAppStoreIos style={style} /><small>ios</small>
              </div>
              <div style={{width: "50%", display: "inline-block",textAlign: "center", marginTop: "1em" }}>
                  <h2 style={{marginBottom: "-0.1em", }}>3</h2>
                  <IoMdTabletLandscape style={style} /><small>tablet</small>
              </div>
              <div style={{width: "50%", display: "inline-block", textAlign: "center", marginTop: "1em" }}>
                  <h2 style={{marginBottom: "-0.1em" }}>15</h2>
                  <FaAndroid style={style} /><small>android</small>
              </div>
            </div>
          </div>

          <div className='current-projects' style={{border: "1px solid lightgray", borderRadius: "5px", padding: "0 10px", width: "53%",marginRight:"1em", display:"inline-block"}}>

            <div className='project-header'>
              <div className='project-title'>
                <h3>Projects</h3>
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
              <div>
              {tasks.slice(0,4).map((task) => (
                <div style={{position:"relative"}}>
                  <h4 style={{verticalAlign:"top"}}>{task.title}</h4>
                  <TagSpanStatus status={task.status} >{task.status}</TagSpanStatus>
                </div>
              ))}
              </div>
            </div>

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

        </div>
      </Container>
    </div>
  );
}

export default Dashboard;