import React,  {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
// import data from '../../data/projects';
import tasks from '../../data/tasks';
import Container from '../../components/layout/Container';
import { IoReturnUpBack } from "react-icons/io5";
import { TbInfoOctagon } from "react-icons/tb";
import { GoDotFill } from "react-icons/go";
import { PageHeaderDiv, PageTitle, PageTitleDiv, PageTitleSpan } from '../../components/layout/PageHeader';
import AddNewTask from '../../components/buttons/AddNewTaskBtn';
import Filter from '../../components/buttons/FilterBtn';
import Overlay from '../../components/layout/Overlay';
import NewTaskForm from '../../components/forms/projects/NewTaskForm';
import TaskFilterForm from '../../components/forms/filter/TaskFilterForm';
import ProjectInterface from '../../components/interfaces/ProjectInterface';
import toast, { Toaster } from 'react-hot-toast';
import ViewDocs from '../../components/buttons/ViewDocs';
import { Tooltip as ReactTooltip  } from 'react-tooltip';
import { createTask, fetchProject, updateTask } from '../../hooks/crudTasks';
import Moment from 'react-moment';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProjectDetail = () => {
    // const {url, id} = useParams();
    // const projects = data.filter(project => project.slug === url);
    // console.log(projects[0].method)
    const dotFill = { fontSize: ".5em", verticalAlign: "middle" };

    const notifyTask = () => toast.success('Task added successfully!!!');
    const notifyFilter = () => toast.success('Filter applied!!!');
    const [isOpen, setIsOpen] = useState(false)
    const [openFilter, setOpenFilter] = useState(false);
    const [openNewTask, setOpenNewTask] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [task, setTask] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const { projectId } = useParams();
    const [project, setProject] = useState(null);

    const [selectedTask, setSelectedTask] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);
  
    const handleCreate = () => {
      setIsUpdate(false);
      setSelectedTask(null); 
    };
  
    const handleUpdate = (task) => {
      setIsUpdate(true);
      setSelectedTask(task); 
      setOpenNewTask(true);
    };


    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await fetchProject(projectId);
          setProject(data);
          setLoading(false);
          console.log(data)
        } catch (error) {
          console.error('Error fetching project:', error);
        }
      };
  
      fetchData();
    }, [projectId]);
  
    if (!project) {
      return <div>Loading...</div>;
    }

    const handleCreateTask = async (formData) => {
      try {
        const newTask = await createTask(formData);
        setTask([...task, newTask]);
        notifyTask()
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }

    const handleUpdateTask = async (taskId, formData) => {
      try {
        const updatedTask = await updateTask(taskId, formData);
        const updatedTasks = tasks.map(task => {
          if (task.task_id === taskId) {
            return updatedTask;
          }
          return task;
        });
        setTask(updatedTasks);
        console.log(updatedTask)
        setOpenNewTask(false);
        toast.success('Task updated successfully!!!'); 
        // toastRef.current.showToast(); 
      } catch (error) {
        console.error('Error updating task:', error);
        toast.error('Failed to update task');
      }
    };

    // Filtered tasks based on project ID
    const projectTasks = tasks.filter(task => task.projectId === projectId);

    const handleFilter = () => {
      setOpenFilter(!openFilter);
    };

    const handleMainFilter = ({ category, priority, teamMember, timeline, customStartDate, customEndDate }) => {
      // Apply filtering logic based on filter criteria (methodology, status)
      let filteredTasks = tasks;

      if (category) {
        filteredTasks = filteredTasks.filter(task => task.category === category);
      }

      if (priority) {
        filteredTasks = filteredTasks.filter(task => task.priority === priority);
      }

      if (teamMember) {
        filteredTasks = filteredTasks.filter(task => task.priority === priority);
      }

      // Update filteredTasks state with the filtered projects
      setFilteredTasks(filteredTasks);
    };

    const handleClearFilters = () => {
      setFilteredTasks([]);
    };

    const handleNewTask = () => {
      setOpenNewTask(!openNewTask);
      setIsUpdate(false);
    };

    // const handleTaskTitleChange = (value) => {
    //   setTaskTitle(value);
    //   console.log(value)
    // };

  return (
    <div>
      {/* <DndContext collisionDetection={closestCorners}></DndContext> */}
      <Container>
        {
          !loading ?  (
            <>
              <header>
                <PageHeaderDiv>
                  <PageTitleDiv key={project.project_id}>
                    <PageTitle>{project.title}<sup><TbInfoOctagon style={dotFill}data-tooltip-id="my-tooltip" onMouseEnter={() => setIsOpen(true)}  /></sup></PageTitle>
                    <ReactTooltip id="my-tooltip"
                      style={{ backgroundColor: "gainsboro", color: "black" , padding:"10px", width: "20em"}}
                      border="1px solid black"
                      place="right-start"
                      onMouseEnter={() => setIsOpen(true)}
                      onClick={() => setIsOpen(false)}
                      >
                      <small>{project.description}</small>
                    </ReactTooltip>
                    <small>
                      {project.three_word_description} <GoDotFill style={dotFill} /> 
                      {(project.method === 'Scrum' && ' Sprint 1') || (project.method === 'Prince2' && ' Management Stage 1') || (project.method === 'Waterfall' && ' Requirements Gathering') } <GoDotFill style={dotFill} /> 
                      {` `} <Moment format="MMM D, YYYY">{project.start_date}</Moment>  - <Moment format="MMM D, YYYY">{project.end_date}</Moment>
                    </small>
                  </PageTitleDiv>
                  <PageTitleDiv>
                    <PageTitleSpan><Filter setOpenFilter={setOpenFilter} onClick={handleFilter} /></PageTitleSpan>
                    <PageTitleSpan><AddNewTask setOpenNewTask={setOpenNewTask} onClick={handleCreate}/></PageTitleSpan>
                    {(project.method === 'Prince2' && <PageTitleSpan><ViewDocs projectId={project.project_id} slug={project.slug} /></PageTitleSpan>) || (project.method === 'Waterfall' && <PageTitleSpan><ViewDocs projectId={project.project_id} slug={project.slug} /></PageTitleSpan>)}
                  </PageTitleDiv>
                </PageHeaderDiv>
              </header>
              <>
               <main>
               <ProjectInterface 
                  project={project} 
                  handleUpdate={handleUpdate} 
                />
               </main>
              </>
            </>
            ) : (
              <>
              
              </>
            )}
        
        {openFilter && (
          <Overlay>
            <div className="tags" style={{padding: "1em 0 0 0",  justifyContent:"right"}}>
                <span className="tag tag-1"  style={{width:"50%"}} onClick={handleFilter}><IoReturnUpBack className='cancel' size="1.5em"  /></span>
                {/* <span className="tag tag-1"   style={{width:"50%", textAlign: "right"}}><IoPencil size="1.2em"  /></span> */}
            </div>
            <div>
              <h2>Filter by</h2>
              {/* <p>
                <span>Category: 
                  <TagSpanCategory>All</TagSpanCategory>
                  <TagSpanCategory category={"Backend Devt"}>Backend Devt</TagSpanCategory>
                </span>
              </p> */}
              {/* <p><span>Priority: low, medium, high</span></p>
              <p><span>Timeline</span></p>
              <p><span>team members</span></p>
              <OverlayBtn>Filter</OverlayBtn>
              <CancelBtn>Clear all filters</CancelBtn> */}

              <TaskFilterForm onFilter={handleMainFilter} onClear={handleClearFilters} onSubmit={notifyFilter}  />
              <Toaster
                position="bottom-left"
                reverseOrder={false}
              />
            </div>
          </Overlay>
        )}

        {openNewTask && (
          <Overlay>
            <div className="tags" style={{padding: "1em 0",  justifyContent:"right"}}>
              <span className="tag tag-1"  style={{width:"50%", verticalAlign: "middle"}} >
                <IoReturnUpBack onClick={handleNewTask} className='cancel' size="1.5em" style={{ marginRight:"1em", verticalAlign: "middle"}}  />
                <small style={{verticalAlign: "middle", opacity: "0.5"}}>
                  {project.title} 
                </small>
                {` / `}
                {/* <small> {taskTitle}</small> */}
              </span>
              {/* <span className="tag tag-1"   style={{width:"50%", textAlign: "right"}}><IoPencil size="1.2em"  /></span> */}
            </div>
            <div>
              {/* <span>AutoTasker {`>`} New Task</span> */}
              {/* <div className='tags' style={{padding: "1em 0" }}> */}
                
              {/* <h2 style={{opacity: "0.5"}}>Task Title...</h2>
              <hr></hr>
              <p style={{opacity: "0.5"}}>Task desciption...</p>
              <p style={{opacity: "0.5"}}>Task priority...</p>
              <p style={{opacity: "0.5"}}>Task category...</p>
              <p style={{opacity: "0.5"}}>assign...</p> */}
              <NewTaskForm 
                // onSubmit={handleCreateTask} 
                onSubmit={(formData) => { // Pass formData as argument
                  if (isUpdate) {
                    handleUpdateTask(selectedTask.task_id, formData); // Pass TaskId and formData
                  } else {
                    handleCreateTask(formData); // No projectId needed for create operation
                  }
                }}
                initialValues={isUpdate ? selectedTask : null}  
                isUpdate={isUpdate} 
                projectId={projectId} 
              />
              {/* <NewTaskForm onSubmit={handleCreateTask} onInputChange={handleTaskTitleChange} /> */}
              <Toaster
                position="bottom-left"
                reverseOrder={false}
              />
            </div>
          </Overlay>
        )}
      </Container>
    </div>
  );
}

export default ProjectDetail;