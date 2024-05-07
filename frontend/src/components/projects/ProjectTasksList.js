import React,  { useRef } from 'react';
import TaskCard from "../../components/projects/TaskCard";
import { PageHeaderDiv,  PageTitleDiv, PageTitleSpan } from '../../components/layout/PageHeader';
import { deleteTask } from '../../hooks/crudTasks';

const ProjectTaskList = ({tasks, handleUpdate}) => {
    // const [tasks, setTasks] = useState([]);

    // const draggableTodo = useRef(null);
    // const groupName = useRef(null);

    // const dragStart = (event) => {
    //     const { target } = event;
    //     const id = target.id;
    //     const parentElementId = target.parentElement.id;
    //     setTimeout(() => {
    //       target.style.display = "none";
    //       draggableTodo.current = target;
    //     }, 0);
    //     setTasks((prevState) => {
    //       // prevent mutation
    //       const state = { ...prevState };
    
    //       const fn = (name) => {
    //         groupName.current = name;
    //         state.dragged = state[name].find((i) => i._id.toString() === id);
    //       };
    
    //       switch (parentElementId) {
    //         case "todo_div":
    //           fn("todo");
    //           return state;
    //         case "inProgress_div":
    //           fn("inProgress");
    //           return state;
    //         case "done_div":
    //           fn("done");
    //           return state;
    //         default:
    //           return state;
    //       }
    //     });
    //   };
    //   const dragEnd = (event) => {
    //     event.preventDefault();
    //     draggableTodo.current.style.display = "block";
    //   };
    
    //   const dragOver = (event) => {
    //     event.stopPropagation();
    //     event.preventDefault();
    //   };
    
    //   // const dragEnter = (event) => {};
    
    //   const dragLeave = (event) => {
    //     // event.target.style.border = "none";
    //   };
    
    //   const dragDrop = (event) => {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     const { currentTarget } = event;
    //     const id = currentTarget.id;
    //     setTasks((prevState) => {
    //       // This is to not mutate state object
    //       const state = { ...prevState };
    //       const fn = (name) => {
    //         const { current } = groupName;
    //         const dragged = state.dragged;
    //         const previousParentId = draggableTodo.current.parentElement.id;
    //         if (previousParentId !== id) {
    //           state[current] = state[current].filter((i) => i._id !== dragged._id);
    //           state[name] = [...state[name], dragged];
    //         } else {
    //           draggableTodo.current.style.display = "block";
    //         }
    //       };
    
    //       switch (id) {
    //         case "todo_div":
    //           fn("todo");
    //           return state;
    //         case "inProgress_div":
    //           fn("inProgress");
    //           return state;
    //         case "done_div":
    //           fn("done");
    //           return state;
    //         default:
    //           return state;
    //       }
    //     });
    //   };


    const handleDeleteTask = async (taskId) => {
        try {
          await deleteTask(taskId);
          tasks = tasks.filter(task => task.task_id !== taskId);
          console.log(tasks)
        } catch (error) {
          console.error('Error deleting task:', error);
        }
    };

    // console.log(tasks)
    

    const todoTasks = tasks.filter(task => task.status === 'To Do');
    const inProgressTasks = tasks.filter(task => task.status === 'In Progress');
    const onHoldTasks = tasks.filter(task => task.status === 'On Hold');
    const underReviewTasks = tasks.filter(task => task.status === 'Under Review');
    const doneTasks = tasks.filter(task => task.status === 'Done');
    const cancelledTasks = tasks.filter(task => task.status === 'Cancelled');
    
    // console.log(todoTasks.length)
    // Function to format count with leading zero if less than 10
    const formatCount = (count) => {
        return count < 10 ? `0${count}` : count;
    };

    return (
        <div className='project-body' tabindex="0">
            <div className='project-status to-do'>
                <div className='to-do'>
                    <PageHeaderDiv>
                        <PageTitleDiv>
                            <h2>To do</h2>
                        </PageTitleDiv>
                        <PageTitleDiv>
                            {/* <PageTitleSpan><small className='total-tasks'>{format(statusCounts[todoTasks] || 0)}</small></PageTitleSpan> */}
                            <PageTitleSpan><small className='total-tasks'>{formatCount(todoTasks.length || 0)}</small></PageTitleSpan>
                        </PageTitleDiv>
                    </PageHeaderDiv>
                    {todoTasks?.map(task => <TaskCard key={task.task_id} task={task} handleUpdate={handleUpdate}  onDelete={() => handleDeleteTask(task.task_id)} />)
                    }
                    {/* {tasks.map(task => <TaskCard key={task.task_id} task={task} />)
                    } */}

                    {/* Display a message if there are no tasks for this status */}
                    {/* {todoTasks.length === 0 && ( */}
                    {/* // <li>No tasks for this status</li>
                    // <TaskCard />
                    // )} */}
            
                </div>
            </div>

            <div className='project-status'>
                <div className='in-progress'>
                    <PageHeaderDiv>
                        <PageTitleDiv>
                            <h2>In Progress</h2>
                        </PageTitleDiv>
                        <PageTitleDiv>
                            <PageTitleSpan><small className='total-tasks'>{formatCount(inProgressTasks.length || 0)}</small></PageTitleSpan>
                            {/* <PageTitleSpan><small className='total-tasks'>{formatCount(0)}</small></PageTitleSpan> */}
                        </PageTitleDiv>
                    </PageHeaderDiv>
                    {inProgressTasks?.map(task => <TaskCard key={task.task_id} task={task} handleUpdate={handleUpdate} onDelete={() => handleDeleteTask(task.task_id)} />)
                    }
            
                </div>
            </div>

            <div className='project-status'>
                <div className='on-hold'>
                    <PageHeaderDiv>
                        <PageTitleDiv>
                            <h2>On Hold</h2>
                        </PageTitleDiv>
                        <PageTitleDiv>
                            <PageTitleSpan><small className='total-tasks'>{formatCount(onHoldTasks.length || 0)}</small></PageTitleSpan>
                            {/* <PageTitleSpan><small className='total-tasks'>{formatCount(0)}</small></PageTitleSpan> */}
                        </PageTitleDiv>
                    </PageHeaderDiv>
                    {onHoldTasks?.map(task => <TaskCard key={task.task_id} task={task} handleUpdate={handleUpdate} onDelete={() => handleDeleteTask(task.task_id)} />)
                    }
                </div>
            </div>

            <div className='project-status'>
                <div className='waiting-for-review'>
                    <PageHeaderDiv>
                        <PageTitleDiv>
                            <h2>Under Review</h2>
                        </PageTitleDiv>
                        <PageTitleDiv>
                            <PageTitleSpan><small className='total-tasks'>{formatCount(underReviewTasks.length || 0)}</small></PageTitleSpan>
                            {/* <PageTitleSpan><small className='total-tasks'>{formatCount(0)}</small></PageTitleSpan> */}
                        </PageTitleDiv>
                    </PageHeaderDiv>
                    {underReviewTasks?.map(task => <TaskCard key={task.task_id} task={task} handleUpdate={handleUpdate} onDelete={() => handleDeleteTask(task.task_id)} />)
                    }
                </div>
            </div>

            <div className='project-status'>
                <div className='done'>
                    <PageHeaderDiv>
                        <PageTitleDiv>
                            <h2>Done</h2>
                        </PageTitleDiv>
                        <PageTitleDiv>
                            <PageTitleSpan><small className='total-tasks'>{formatCount(doneTasks.length || 0)}</small></PageTitleSpan>
                            {/* <PageTitleSpan><small className='total-tasks'>{formatCount(0)}</small></PageTitleSpan> */}
                        </PageTitleDiv>
                    </PageHeaderDiv>
                    {doneTasks?.map(task => <TaskCard key={task.task_id} task={task} handleUpdate={handleUpdate} onDelete={() => handleDeleteTask(task.task_id)} />)
                    }
            
                </div>
            </div>

            <div className='project-status' style={{filter: "grayscale(100%)", zIndex: "1"}}>
                <div className='cancelled'>
                    <PageHeaderDiv>
                        <PageTitleDiv>
                            <h2>Cancelled</h2>
                        </PageTitleDiv>
                        <PageTitleDiv>
                            <PageTitleSpan><small className='total-tasks'>{formatCount(cancelledTasks.length || 0)}</small></PageTitleSpan>
                            {/* <PageTitleSpan><small className='total-tasks'>{formatCount(0)}</small></PageTitleSpan> */}
                        </PageTitleDiv>
                    </PageHeaderDiv>
                    {cancelledTasks?.map(task => <TaskCard key={task.task_id} task={task} handleUpdate={handleUpdate} onDelete={() => handleDeleteTask(task.task_id)} />)
                    }
            
                </div>
            </div>


        </div>

    );
}

export default ProjectTaskList;