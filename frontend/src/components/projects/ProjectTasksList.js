import React from 'react';
import TaskCard from "../../components/projects/TaskCard";
import { PageHeaderDiv,  PageTitleDiv, PageTitleSpan } from '../../components/layout/PageHeader';
import { deleteTask } from '../../hooks/crudTasks';

const ProjectTaskList = ({tasks}) => {
    // const [tasks, setTasks] = useState([]);


    const handleDeleteTask = async (taskId) => {
        try {
          await deleteTask(taskId);
          tasks = tasks.filter(task => task.task_id !== taskId);
          console.log(tasks)
        } catch (error) {
          console.error('Error deleting task:', error);
        }
    };
    

    const todoTasks = tasks.filter(task => task.status === 'To Do');
    const inProgressTasks = tasks.filter(task => task.status === 'In Progress');
    const doneTasks = tasks.filter(task => task.status === 'Done');
    
    // console.log(todoTasks.length)
    // Function to format count with leading zero if less than 10
    const formatCount = (count) => {
        return count < 10 ? `0${count}` : count;
    };

    return (
        <div className='project-body'>
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
                    {todoTasks.map(task => <TaskCard key={task.task_id} task={task} onDelete={() => handleDeleteTask(task.task_id)} />)
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
                <div className='in '>
                    <PageHeaderDiv>
                        <PageTitleDiv>
                            <h2>In Progress</h2>
                        </PageTitleDiv>
                        <PageTitleDiv>
                            <PageTitleSpan><small className='total-tasks'>{formatCount(inProgressTasks.length || 0)}</small></PageTitleSpan>
                            {/* <PageTitleSpan><small className='total-tasks'>{formatCount(0)}</small></PageTitleSpan> */}
                        </PageTitleDiv>
                    </PageHeaderDiv>
                    {inProgressTasks.map(task => <TaskCard key={task.task_id} task={task} />)
                    }
            
                </div>
            </div>

            <div className='project-status'>
                <div className='in '>
                    <PageHeaderDiv>
                        <PageTitleDiv>
                            <h2>Done</h2>
                        </PageTitleDiv>
                        <PageTitleDiv>
                            <PageTitleSpan><small className='total-tasks'>{formatCount(doneTasks.length || 0)}</small></PageTitleSpan>
                            {/* <PageTitleSpan><small className='total-tasks'>{formatCount(0)}</small></PageTitleSpan> */}
                        </PageTitleDiv>
                    </PageHeaderDiv>
                    {doneTasks.map(task => <TaskCard key={task.task_id} task={task} onDelete={() => handleDeleteTask(task.task_id)} />)
                    }
            
                </div>
            </div>


        </div>

    );
}

export default ProjectTaskList;