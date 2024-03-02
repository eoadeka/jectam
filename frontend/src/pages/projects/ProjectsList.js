import React, {useState} from 'react';
import data from '../../data/projects';
import Container from '../../components/layout/Container';
import StartNewProject from '../../components/buttons/StartNewProjectBtn';
import { GoDotFill } from "react-icons/go";
import ProjectItem from '../../components/projects/ProjectItem';
import { PageHeaderDiv, PageTitle, PageTitleDiv, PageTitleSpan } from '../../components/layout/PageHeader';
import Filter from '../../components/buttons/FilterBtn';
import Overlay from '../../components/layout/Overlay';
import OverlayBtn from '../../components/buttons/OverlayBtn';
import { IoReturnUpBack } from "react-icons/io5";
import { TagSpanCategory, TagSpanStatus } from '../../components/buttons/Tags';
import CancelBtn from '../../components/buttons/CancelBtn';
// import { IoPencil } from "react-icons/io5";



const ProjectsList = () => {
  const dotFill = { verticalAlign: "middle" };
  const [openFilter, setOpenFilter] = useState(false);
  const [projects, setProjects] = useState(data);
  const [activeButton, setActiveButton] = useState("all");

  const handleFilter = () => {
    setOpenFilter(!openFilter);
  };

  const filterProjects = (status) => {
    setActiveButton(status);
    if (status === "all") {
      const filteredProjects = data.filter(project => project.status === "recent" || project.status === "archive");
      setProjects(filteredProjects)
    } else {
      const filteredProjects = data.filter(project => project.status === status);
      setProjects(filteredProjects)
    }
  }

  return (
      <Container>
        <PageHeaderDiv>
          <PageTitleDiv>
            <PageTitle>Projects</PageTitle>
            <small>Sertified Co. <GoDotFill style={dotFill} /> Team 2 <GoDotFill style={dotFill} /> Jan 1 - Dec 31</small>
          </PageTitleDiv>
          <PageTitleDiv>
            <PageTitleSpan><Filter setOpenFilter={setOpenFilter} onClick={handleFilter} ></Filter></PageTitleSpan>
            <PageTitleSpan className='filters'>
              <button className={activeButton === "recent" ? "active" : ""} onClick={() => filterProjects("recent")}>Recent</button> 
              <button className={activeButton === "all" ? "active" : ""} onClick={() => filterProjects("all")}>All</button> 
              <button className={activeButton === "archive" ? "active" : ""} onClick={() => filterProjects("archive")}>Archive</button>
            </PageTitleSpan>
          </PageTitleDiv>
        </PageHeaderDiv>

        <ProjectItem data={projects} />
        
        {openFilter && (
          <Overlay>
            <div className="tags" style={{padding: "1em 0 1em 0",  justifyContent:"right"}}>
                <span className="tag tag-1"  style={{width:"50%"}} onClick={handleFilter}><IoReturnUpBack className='cancel' size="1.5em"  /></span>
                {/* <span className="tag tag-1"   style={{width:"50%", textAlign: "right"}}><IoPencil size="1.2em"  /></span> */}
            </div>
            <div>
              <h2>Filter by</h2>
              <p><span>Status: <TagSpanStatus status={"To do"}>To do</TagSpanStatus></span></p>
              <p>
                <span>Category: 
                  <TagSpanCategory>All</TagSpanCategory>
                  <TagSpanCategory category={"Backend Devt"}>Backend Devt</TagSpanCategory>
                </span>
              </p>
              <p><span>Priority: low, medium, high</span></p>
              <p><span>Timeline</span></p>
              <p><span>team members</span></p>
              <OverlayBtn>Filter</OverlayBtn>
              <CancelBtn>Clear all filters</CancelBtn>
            </div>
          </Overlay>
        )}
        <StartNewProject />
      </Container>
  );
}

export default ProjectsList;