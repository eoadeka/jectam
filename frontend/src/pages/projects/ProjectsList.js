import React, {useState, useEffect, useRef } from 'react';
// import data from '../../data/projects';
import Container from '../../components/layout/Container';
import { GoDotFill } from "react-icons/go";
import { IoReturnUpBack } from "react-icons/io5";
import ProjectItem from '../../components/projects/ProjectItem';
import { PageHeaderDiv, PageTitle, PageTitleDiv, PageTitleSpan } from '../../components/layout/PageHeader';
import StartNewProject from '../../components/buttons/StartNewProjectBtn';
import Overlay from '../../components/layout/Overlay';
import Filter from '../../components/buttons/FilterBtn';
import ProjectFilterForm from '../../components/forms/filter/ProjectFilterForm';
import NewProjectForm from '../../components/forms/projects/newProject/NewProjectForm';
import toast, { Toaster } from 'react-hot-toast';
import { fetchProjects, createProject, updateProject, deleteProject } from '../../hooks/crudProjects';
import { VscEmptyWindow } from "react-icons/vsc";
import { Tooltip as ReactTooltip  } from 'react-tooltip';
import { TbInfoOctagon } from "react-icons/tb";
import PredictMethodForm from '../../components/forms/projects/newProject/PredictMethodForm';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Box from '@mui/material/Box';



// const BASE_URL = 'http://localhost:8000/projects/';
const BASE_URL = 'https://jectam-backend.onrender.com/projects/';

const ProjectsList = () => {
  const toastRef = useRef(null);
  const style = { fontSize: "3em", verticalAlign: "middle", cursor:"pointer" };
  const dotFill = { verticalAlign: "middle" };
  const [openFilter, setOpenFilter] = useState(false);
  const [openNewProject, setOpenNewProject] = useState(false);
  const [openPredictMethod, setOpenPredictMethod] = useState(false);
  const [projects, setProjects] = useState([]);
  const [activeButton, setActiveButton] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [randomWords, setRandomWords] = useState('');

  const [userDetails, setUserDetails] = useState(null);
  const isDefault = userDetails?.groups[0] === 'Default';
  const isProjectManager = userDetails?.groups[0] === 'Manager';
  const isTeamMember = userDetails?.groups[0] === 'Team Member';


  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      window.location.replace('/login');
    } else {
      // Fetch projects when the component mounts
      const fetchData = async () => {
        try {
            const data = await fetchProjects();
            setProjects(data);
            setLoading(false);
            console.log(data)
        } catch (error) {
            console.error('Error fetching projects:', error);
            // Handle error, e.g., set an error state or display a message to the user
            setLoading(false);
            window.location.replace("/");
        }
      };

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

      fetchData();
      getUserDetails();
      fetchRandomWord();
    }

  }, []);

  const fetchRandomWord = () => {
    // axios.get(`http://localhost:8000/projects/generate-random-words/`)
    axios.get(`https://jectam-backend.onrender.com/projects/generate-random-words/`)
    .then(response => {
        const randomWords = response.data.random_words;
        setRandomWords(randomWords);
      })
      .catch(error => {
        console.error('Error fetching random words:', error);
      }); 
  }


  const handleCreate = () => {    
    fetchRandomWord();  
    setIsUpdate(false);
    setSelectedProject(null); 
  };

  const handleUpdate = (project) => {
    setIsUpdate(true);
    setSelectedProject(project); 
    setOpenNewProject(true);
  };


  const [loading, setLoading] = useState(true);
  // const [userProfile, setUserProfile] = useState(null);

  const notifyProject = () => toast.success('Project created successfully!!!')
  // const notifyUpdate = () => toast.success('Project updated successfully!!!')
  const notifyFilter = () => toast.success('Filter applied!!!');
  const notifyDelete = () => toast.success('Project deleted!!');

 

  const handleCreateProject = async (formData) => {
    try {
      const newProject = await createProject(formData);
      setProjects([...projects, newProject]);
      setOpenNewProject(false);
      toast.success('Project created successfully!!!'); 
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project');
    }
  };

  const handleUpdateProject = async (projectId, formData) => {
    // console.log(projectId)
    // console.log(formData)
    try {
      const updatedProject = await updateProject(projectId, formData);
      const updatedProjects = projects.map(project => {
        if (project.project_id === projectId) {
          console.log(updatedProject)
          return updatedProject;
        }
        return project;
      });
      setProjects(updatedProjects);
      setOpenNewProject(false);
      toast.success('Project updated successfully!!!'); 
      // toastRef.current.showToast(); 
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
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
    setIsUpdate(false);
  };

  const handlePredictMethod = () => {
    setOpenPredictMethod(!openPredictMethod);
    setOpenNewProject(false);
  };

  const filterProjects = (status) => {
    setActiveButton(status);
    if (status === "all") {
      const filteredProjects = projects.filter(project => project.status === "recent" || project.is_archived === true);
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

  // if (loading) {
  //   return  <Skeleton count={5} />;
  // }



  return (
      <Container>
        {
          !loading ? (
            <>
              <header>
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
              </header>
              <main>
                <div className='project-item-body'> 
                  {projects.length === 0 ? (
                    <div className='no-projects'>
                      <VscEmptyWindow style={style}  onClick={handleNewProject}/>
                      <h4 style={{marginBottom:"-0.1em"}}>You have no projects</h4>
                      <small>click the icon above to start a new project</small>
                    </div>
                  ) : (
                    projects.slice().map(project => (
                      <ProjectItem 
                        // key={project.project_id}
                        // project={project}
                        // onUpdate={handleUpdateProject} 
                        onUpdateClick={() => handleUpdate(project)} 
                        onDelete={() => handleDeleteProject(project.project_id)} 
                        project={filteredProjects.length > 0 ? filteredProjects : project} 
                        isTeamMember={isTeamMember}
                      />
                    ))
                  )}
                </div>
              </main>

              { (isProjectManager || isDefault) && (<StartNewProject setOpenNewProject={setOpenNewProject} onClick={handleCreate} />)}

            </>
          ) : (
            <>
              <PageHeaderDiv>
                <PageTitleDiv>
                  <PageTitle><Skeleton variant="rectangular" width={255} height={50} /></PageTitle>
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={270} />
                </PageTitleDiv>
                <PageTitleDiv>
                  <PageTitleSpan><button style={{background: "none"}}><Skeleton variant="rectangular" width={50} height={40} /></button></PageTitleSpan>
                  <PageTitleSpan className='filters'>
                    <button><Skeleton variant="rectangular" width={50} height={40} /></button> 
                    <button><Skeleton variant="rectangular" width={50} height={40} /></button> 
                    <button><Skeleton variant="rectangular" width={50} height={40} /></button> 
                  </PageTitleSpan>
                </PageTitleDiv>
              </PageHeaderDiv>

              <div className='project-item-body' style={{paddingTop: "20px", width: "100%"}}> 
                <span style={{display: "inline", width: "20%"}}><Skeleton variant="rectangular" width={370} height={200}  /></span>
                <span style={{display: "inline", width: "20%"}}><Skeleton variant="rectangular" width={370} height={200}  /></span>
                <span style={{display: "inline", width: "20%"}}><Skeleton variant="rectangular" width={370} height={200}  /></span>
              </div>
              
              <Skeleton variant="rectangular" width={150} height={50} style={{position: "absolute", bottom: "-2em", right: "1em" }} />
            </>
          )
        }
       

        
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

        {openPredictMethod && (
          <Overlay>
            <div className="tags" style={{padding: "1em 0 0 0",  justifyContent:"right"}}>
                <span className="tag tag-1"  style={{width:"50%"}} onClick={handlePredictMethod}><IoReturnUpBack className='cancel' size="1.5em"  /></span>               
            </div>
            <div>
              <PredictMethodForm />
            </div>
          </Overlay>
        )}

        {openNewProject && (
          <Overlay>
            <div className="tags" style={{padding: "1em 0 0 0",  justifyContent:"right"}}>
                <span className="tag tag-1"  style={{width:"50%"}} onClick={handleNewProject}><IoReturnUpBack className='cancel' size="1.5em"  /></span>
                <span className="tag tag-1"  style={{width:"50%", textAlign: "right", textDecoration:"underline"}}  onClick={handlePredictMethod}><small>predict method <sup><TbInfoOctagon style={dotFill} data-tooltip-id="my-tooltip" onMouseEnter={() => setIsOpen(true)}  /></sup></small></span>
                <ReactTooltip id="my-tooltip"
                  style={{ backgroundColor: "gainsboro", color: "black" , padding:"10px", width: "20em", zIndex:"2"}}
                  border="1px solid black"
                  place="right-start"
                  onMouseEnter={() => setIsOpen(true)}
                  onClick={() => setIsOpen(false)}
                  >
                  <small>get the prediction of the best fit methodology for your project.</small>
                </ReactTooltip>
            </div>
            <div>
              <NewProjectForm 
                // onSubmit={isUpdate ? handleUpdateProject(selectedProject.project_id) : handleCreateProject} 
                onSubmit={(formData) => { // Pass formData as argument
                  if (isUpdate) {
                    handleUpdateProject(selectedProject.project_id, formData); // Pass projectId and formData
                  } else {
                    handleCreateProject(formData); // No projectId needed for create operation
                  }
                }}
                initialValues={isUpdate ? selectedProject : null}  
                isUpdate={isUpdate} 
                randomWords={randomWords}
              />
              {/* {showCreateForm && <NewProjectForm onSubmit={handleCreateProject} isUpdate={false} />} */}
              {/* {showUpdateForm && <NewProjectForm onSubmit={handleUpdateProject} isUpdate={true} />} */}
              {/* <NewProjectForm onSubmit={notifyProject} onSubmit={handleCreateProject} /> */}
              <Toaster
                ref={toastRef}
                position="bottom-left"
                reverseOrder={false}
              />
            </div>
          </Overlay>
        )}

      </Container>
  );
}

export default ProjectsList;