import React from 'react';

import styled from 'styled-components';
import Container from '../components/layout/Container';
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import userAvatar from "../assets/images/avatars/jane_smith.jpg"
import data from '../data/projects';
import {PageHeaderDiv,PageTitle, PageTitleDiv, PageTitleSpan } from '../components/layout/PageHeader';


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

  return (
    <div>
      <Container>
        <PageHeaderDiv>
          <PageTitleDiv>
            <PageTitle>Dashboard</PageTitle>
          </PageTitleDiv>
          <PageTitleDiv>
            <PageTitleSpan>
              <AvatarGroup>
                <Avatar alt="ella-adeka" src={userAvatar} sx={{ width: 30, height: 30 }} />
              </AvatarGroup>
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
          <div className='about-projects'>
            <h3>About Projects</h3>
            <p>project status: done, in progress</p>
          </div>

          <div className='about-projects'>
            <h3>Platform</h3>
            <p>website, ios, tablet, android</p>
          </div>

          <div className='current-projects'>

            <div className='project-header'>
              <div className='project-title'>
                <h3>Current Projects</h3>
              </div>
              <div className='project-title'>
                <small style={{float: "right", textDecoration:"underline", marginTop: "-3em"}}>
                  See all
                </small>
              </div>
            </div>
              {/* <h3>Current Projects</h3> */}
              <div >
                {data.slice(0,5).map((project, item) => (
                  <div className='current-project'  style={{ position:"relative", verticalAlign:"top"}}>
                  <a className='current-projects-link' id={project.id} href={`projects/${project.url}/${project.id}`}>
                    <h4 style={{marginBottom: "-0.125em"}}>{project.project_name}</h4>
                    <p>{project.project_short_desc}</p>
                    <TagSpanStatus status={project.status}>{project.status}</TagSpanStatus>
                  </a>
                </div>
                ))}
              </div>
            </div>

            <div className='current-clients'>
              <div className='project-header'>
                <div className='project-title'>
                  <h3>Current Clients</h3>
                </div>
                <div className='project-title'>
                  <small style={{float: "right", textDecoration:"underline"}}>
                    See all
                  </small>
                </div>
              </div>
              <div>
                {data.slice(0,5).map((project, item) => (
                  <div className='current-project'>
                    <a className='current-projects-link' id={project.id} href={`projects/${project.url}/${project.id}`}>
                      <h4 style={{marginBottom: "-0.125em"}}>{project.project_name}</h4>
                      <small>{project.project_short_desc}</small>
                      <button>{project.status}</button>
                    </a>
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