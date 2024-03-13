import React, {useState, useEffect} from 'react';
// import data from '../../data/projects';
import Container from '../../components/layout/Container';
import { GoDotFill } from "react-icons/go";
import { IoReturnUpBack } from "react-icons/io5";
import ProjectItem from '../../components/projects/ProjectItem';
import { PageHeaderDiv, PageTitle, PageTitleDiv, PageTitleSpan } from '../../components/layout/PageHeader';
import StartNewProject from '../../components/buttons/StartNewProjectBtn';
import Overlay from '../../components/layout/Overlay';
import Filter from '../../components/buttons/FilterBtn';
import ProjectFilterForm from '../../components/forms/ProjectFilterForm';
import NewProjectForm from '../../components/forms/NewProjectForm';
import toast, { Toaster } from 'react-hot-toast';
import { fetchProjects, createProject, updateProject, deleteProject } from '../../hooks/crudProjects';
import { VscEmptyWindow } from "react-icons/vsc";


const ProjectsList = () => {
  const style = { fontSize: "3em", verticalAlign: "middle", cursor:"pointer" };
  const dotFill = { verticalAlign: "middle" };
  const [openFilter, setOpenFilter] = useState(false);
  const [openNewProject, setOpenNewProject] = useState(false)
  const [projects, setProjects] = useState([]);
  const [activeButton, setActiveButton] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState([]);

  const notifyProject = () => toast.success('Project created successfully!!!')
  const notifyFilter = () => toast.success('Filter applied!!!');
  const notifyDelete = () => toast.success('Project deleted!!');

  useEffect(() => {
    // Fetch projects when the component mounts
    const fetchData = async () => {
      const data = await fetchProjects();
      setProjects(data);
    };

    fetchData();
  }, []);

  const handleCreateProject = async () => {
    try {
      const newProject = await createProject({ name: 'New Project', description: 'Project description' });
      setProjects([...projects, newProject]);
      notifyProject()
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleUpdateProject = async (projectId) => {
    try {
      const updatedProject = await updateProject(projectId, { name: 'Updated Project', description: 'Updated description' });
      const updatedProjects = projects.map(project => {
        if (project.project_id === projectId) {
          return updatedProject;
        }
        return project;
      });
      setProjects(updatedProjects);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      console.log(projectId)
      await deleteProject(projectId);
      const updatedProjects = projects.filter(project => project.project_id !== projectId);
      setProjects(updatedProjects);
      notifyDelete();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };



  const handleFilter = () => {
    setOpenFilter(!openFilter);
  };

  const handleNewProject = () => {
    setOpenNewProject(!openNewProject);
  };

  const filterProjects = (status) => {
    setActiveButton(status);
    if (status === "all") {
      const filteredProjects = projects.filter(project => project.status === "recent" || project.status === "archive");
      setProjects(filteredProjects)
    } else {
      const filteredProjects = projects.filter(project => project.status === status);
      setProjects(filteredProjects)
    }
  }

  const handleMainFilter = ({ method, project_status }) => {
    // Apply filtering logic based on filter criteria (method, project_status)
    let filteredProjects = projects;

    if (method) {
      filteredProjects = filteredProjects.filter(project => project.method === method);
    }

    if (project_status) {
      filteredProjects = filteredProjects.filter(project => project.project_status === project_status);
    }

    // Update filteredProjects state with the filtered projects
    setFilteredProjects(filteredProjects);
  };

  const handleClearFilters = () => {
    setFilteredProjects([]);
  };


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

        <div className='project-item-body'> 
          {projects.length === 0 ? (
            <div className='no-projects'>
              <VscEmptyWindow style={style}  onClick={handleNewProject}/>
              <h4 style={{marginBottom:"-0.1em"}}>You have no projects</h4>
              <small>click the icon above to start a new project</small>
            </div>
          ) : (
            projects.map(project => (
              <ProjectItem 
                // key={project.project_id}
                // project={project}
                onUpdate={handleUpdateProject} 
                onDelete={() => handleDeleteProject(project.project_id)} 
                project={filteredProjects.length > 0 ? filteredProjects : project} 
              />
            ))
          )}
        </div>
        
        {openFilter && (
          <Overlay>
            <div className="tags" style={{padding: "1em 0 1em 0",  justifyContent:"right"}}>
                <span className="tag tag-1"  style={{width:"50%"}} onClick={handleFilter}><IoReturnUpBack className='cancel' size="1.5em"  /></span>
                {/* <span className="tag tag-1"   style={{width:"50%", textAlign: "right"}}><IoPencil size="1.2em"  /></span> */}
            </div>
            <div>
              <h2>Filter by</h2>
              {/* <p><span>Status: <TagSpanStatus status={"To do"}>To do</TagSpanStatus></span></p>
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
              <CancelBtn>Clear all filters</CancelBtn> */}

              <ProjectFilterForm onFilter={handleMainFilter}  onClear={handleClearFilters} onSubmit={notifyFilter} />
              <Toaster
                position="bottom-left"
                reverseOrder={false}
              />
            </div>
          </Overlay>
        )}

        {openNewProject && (
          <Overlay>
            <div className="tags" style={{padding: "1em 0 0 0",  justifyContent:"right"}}>
                <span className="tag tag-1"  style={{width:"50%"}} onClick={handleNewProject}><IoReturnUpBack className='cancel' size="1.5em"  /></span>
            </div>
            <div>
              <NewProjectForm onSubmit={handleCreateProject} />
              {/* <NewProjectForm onSubmit={notifyProject} onSubmit={handleCreateProject} /> */}
              <Toaster
                position="bottom-left"
                reverseOrder={false}
              />
            </div>
          </Overlay>
        )}
        <StartNewProject setOpenNewProject={setOpenNewProject} onClick={handleNewProject} />
      </Container>
  );
}

export default ProjectsList;