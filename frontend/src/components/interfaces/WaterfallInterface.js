import React, { useState } from "react";
import GanttChart from "../projects/GanttChart";
import Container from "../layout/Container";
// import { FrappeGantt } from 'frappe-gantt-react';



const WaterfallInterface = ({ project }) => {
    // console.log(project[0].project_name)
    // const [tasks, setTasks] = useState([]);
    // setTasks(project.tasks)
    // // const tasks = project.tasks;
    // const [mode, setMode] = useState('Week'); // Assuming you have a state for mode

    // const handleTaskClick = (task) => {
    //     console.log(task);
    // };

    // const handleDateChange = (task, start, end) => {
    //     console.log(task, start, end);
    // };

    // const handleProgressChange = (task, progress) => {
    //     console.log(task, progress);
    // };

    // const handleTasksChange = (updatedTasks) => {
    //     console.log(updatedTasks);
    //     setTasks(updatedTasks); // Update tasks state if needed
    // };

   

    return (
        <Container >
        {/* //     Waterfall details for {project.title} */}
            {/* Scrum details for {project[0].project_name}
            Scrum details for {project[0].project_name} */}
             {/* <FrappeGantt
                    tasks={tasks}
                    viewMode={mode}
                    onClick={handleTaskClick}
                    onDateChange={handleDateChange}
                    onProgressChange={handleProgressChange}
                    onTasksChange={handleTasksChange}        
                /> */}

                <GanttChart tasks={project.tasks} />
        </Container>
    )
}

export default WaterfallInterface;