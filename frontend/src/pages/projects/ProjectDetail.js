import React,  {useState} from 'react';
import { useParams } from "react-router-dom";
import data from '../../data/projects';
import tasks from '../../data/tasks';
import Container from '../../components/layout/Container';
import { IoReturnUpBack } from "react-icons/io5";

import { GoDotFill } from "react-icons/go";
import TaskCard from "../../components/projects/TaskCard";
import { PageHeaderDiv, PageTitle, PageTitleDiv, PageTitleSpan } from '../../components/layout/PageHeader';
import AddNewTask from '../../components/buttons/AddNewTaskBtn';
import Filter from '../../components/buttons/FilterBtn';
import Overlay from '../../components/layout/Overlay';
import OverlayBtn from '../../components/buttons/OverlayBtn';
import { TagSpanCategory } from '../../components/buttons/Tags';
import CancelBtn from '../../components/buttons/CancelBtn';
// console.log(tasks[0])

const ProjectDetail = (props) => {
  const {url} = useParams();
  const projects = data.filter(project => project.url === url);
  const dotFill = { verticalAlign: "middle" };

  const [openFilter, setOpenFilter] = useState(false);
  const [openNewTask, setOpenNewTask] = useState(false);

  const handleFilter = () => {
    setOpenFilter(!openFilter);
  };

  const handleNewTask = () => {
    setOpenNewTask(!openNewTask);
  };


  // Filter tasks by status
  const toDoTasks = tasks.filter(task => task.status === 'To Do');
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress');
  const doneTasks = tasks.filter(task => task.status === 'Done');
  
  // Get the count of tasks
  const toDoTaskCount = toDoTasks.length;
  const inProgressTaskCount = inProgressTasks.length;
  const doneTaskCount = doneTasks.length;

  // Function to format count with leading zero if less than 10
   const formatCount = (count) => {
    return count < 10 ? `0${count}` : count;
  };

  return (
    <div>
      {/* <DndContext collisionDetection={closestCorners}></DndContext> */}
      <Container>
        <PageHeaderDiv>
          {projects.map((project) => (
            <PageTitleDiv key={project.id}>
              <PageTitle>{project.project_name}</PageTitle>
              <small>{project.project_short_desc} <GoDotFill style={dotFill} /> Sprint 2 <GoDotFill style={dotFill} /> Nov 7 - Nov 21</small>
            </PageTitleDiv>
           ))}
           <PageTitleDiv>
              <PageTitleSpan><Filter setOpenFilter={setOpenFilter} onClick={handleFilter} /></PageTitleSpan>
              <PageTitleSpan><AddNewTask setOpenNewTask={setOpenNewTask} onClick={handleNewTask}/></PageTitleSpan>
           </PageTitleDiv>
        </PageHeaderDiv>

        <div className='project-body'>
          <div className='project-status to-do'>
            <PageHeaderDiv>
              <PageTitleDiv>
                <h2>To do</h2>
              </PageTitleDiv>
              <PageTitleDiv>
                <PageTitleSpan><small className='total-tasks'>{formatCount(toDoTaskCount)}</small></PageTitleSpan>
              </PageTitleDiv>
            </PageHeaderDiv>
            {/* {toDo.map((project) => ( */}
              <TaskCard data={toDoTasks} />
            {/* ))} */}
          </div>
          <div className='project-status in-progress'>
            <PageHeaderDiv>
              <PageTitleDiv>
                <h2>In progress</h2>
              </PageTitleDiv>
              <PageTitleDiv>
                <PageTitleSpan><small className='total-tasks'>{formatCount(inProgressTaskCount)}</small></PageTitleSpan>
              </PageTitleDiv>
            </PageHeaderDiv>
            <TaskCard data={inProgressTasks} />
          </div>
          <div className='project-status completed'>
            <PageHeaderDiv>
              <PageTitleDiv>
                <h2>Done</h2>
              </PageTitleDiv>
              <PageTitleDiv>
                <PageTitleSpan><small className='total-tasks'>{formatCount(doneTaskCount)}</small></PageTitleSpan>
              </PageTitleDiv>
            </PageHeaderDiv>
              <TaskCard data={doneTasks} />
          </div>
        </div>

        {openFilter && (
          <Overlay>
            <div className="tags" style={{padding: "1em 0 1em 0",  justifyContent:"right"}}>
                <span className="tag tag-1"  style={{width:"50%"}} onClick={handleFilter}><IoReturnUpBack className='cancel' size="1.5em"  /></span>
                {/* <span className="tag tag-1"   style={{width:"50%", textAlign: "right"}}><IoPencil size="1.2em"  /></span> */}
            </div>
            <div>
              <h2>Filter by</h2>
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

        {openNewTask && (
          <Overlay>
            <div className="tags" style={{padding: "1em 0",  justifyContent:"right"}}>
                <span className="tag tag-1"  style={{width:"50%"}} onClick={handleNewTask}><IoReturnUpBack className='cancel' size="1.5em"  /></span>
                {/* <span className="tag tag-1"   style={{width:"50%", textAlign: "right"}}><IoPencil size="1.2em"  /></span> */}
            </div>
            <div>
              <span>AutoTasker {`>`} New Task</span>
              <div className='tags' style={{padding: "1em 0" }}>
                
              <h2 style={{opacity: "0.5"}}>Task Title...</h2>
              <hr></hr>
              <p style={{opacity: "0.5"}}>Task desciption...</p>
              <p style={{opacity: "0.5"}}>Task priority...</p>
              <p style={{opacity: "0.5"}}>Task category...</p>
              <p style={{opacity: "0.5"}}>assign...</p>
              <OverlayBtn>Save</OverlayBtn>
              <CancelBtn>Cancel</CancelBtn>
              </div>
            </div>
          </Overlay>
        )}
      </Container>
    </div>
  );
}

export default ProjectDetail;