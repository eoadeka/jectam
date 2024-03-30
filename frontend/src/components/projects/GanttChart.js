import React, {useState} from 'react';
import { FrappeGantt } from 'frappe-gantt-react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';



const GanttChart = ({tasks}) => {
    const [mode, setMode] = useState('Week');

    const handleModeChange = (newMode) => {
        setMode(newMode);
    };

    const customPopupHtml = (task) => {
        return (`
            <div>
                <p>Name: ${task.title}</p>
                <p>Description: ${task.description}</p>
                <p>Start Date: ${task.created_at}</p>
                <p>End Date: ${task.due_date}</p>
                <p>Status: ${task.status}</p>
            </div>
        `)
    }

    // Sort tasks based on start date or any other criteria you have
    const sortedTasks = tasks.sort((a, b) => a.created_at.localeCompare(b.created_at));

    const configuration = {
        header_height: 100,
        column_width: 50,
        step: 44,
        bar_height: 20,
        bar_corner_radius: 3,
        arrow_curve: 5,
        padding: 18,
    };



    const mappedTasks = tasks.map((task, index) => {
        let progress = 0; // Default progress value
        const dependency = index < sortedTasks.length - 1 ? [sortedTasks[index + 1].id] : [];


        // Set progress based on task status
        if (task.status === 'To Do') {
            progress = 0;
        } else if (task.status === 'In Progress') {
            progress = 50;
        } else if (task.status === 'Done') {
            progress = 100;
        }

        return {
            id: task.task_id, // Assuming your task has an id field
            name: task.title, // Assuming your task has a name field
            start: task.created_at, // Assuming your task has a start_date field
            end: task.due_date, // Assuming your task has an end_date field
            progress: progress, // Assuming your task has a progress field
            // dependencies: dependency // Assuming your task has a dependencies field
            // dependencies: index > 0 ? [tasks[index - 1].id] : [] // Assuming your task has a dependencies field
            // dependencies: task.dependencies // Assuming your task has a dependencies field
            // Add other fields as needed
        }
    });



    return (
       <div style={{position: "relative"}}>
        {/* <p>lol</p> */}
            <FrappeGantt
                step={configuration.step}
                headerHeight={configuration.header_height}
                columnWidth={configuration.column_width}
                tasks={mappedTasks}
                viewMode={mode}
                onClick={task => console.log(task)}
                onDateChange={(task, start, end) => console.log(task, start, end)}
                customPopupHtml={customPopupHtml}
                // onProgressChange={(task, progress) => console.log(task, progress)}
                // onTasksChange={tasks => console.log(tasks)}
            />
        <div style={{position: "absolute", bottom: "1em", right:"1em"}}>
                {/* <span style={{marginRight: "1em"}}>Select Mode:</span> */}
                {/* <ul>
                    <li onClick={() => handleModeChange('Quarter Day')}>Quarter Day</li>
                    <li onClick={() => handleModeChange('Half Day')}>Half Day</li>
                    <li onClick={() => handleModeChange('Day')}>Day</li>
                    <li onClick={() => handleModeChange('Week')}>Week</li>
                    <li onClick={() => handleModeChange('Month')}>Month</li>
                </ul> */}

                <ButtonGroup 
                    sx={{
                        ".MuiButtonGroup-grouped": {
                            background: "gainsboro",
                            border: "1px solid black",
                            "&:hover": {
                                background: "darkgray",
                                border: "1px solid black"
                            //   border: "transparent"
                            }
                          },
                        
                    }}
                    variant="outlined" 
                    // color="secondary" 
                    aria-label="Medium-sized button group"
                    >
                    <Button sx={{color: "black", border: "1px solid black", fontFamily: "'Space Grotesk', sans-serif", textTransform: "capitalize"}} onClick={() => handleModeChange('Quarter Day')}>Quarter Day</Button>
                    <Button sx={{color: "black", border: "1px solid black", fontFamily: "'Space Grotesk', sans-serif", textTransform: "capitalize"}}  onClick={() => handleModeChange('Half Day')}>Half Day</Button>
                    <Button sx={{color: "black", border: "1px solid black", fontFamily: "'Space Grotesk', sans-serif", textTransform: "capitalize"}}  onClick={() => handleModeChange('Day')}>Day</Button>
                    <Button sx={{color: "black", border: "1px solid black", fontFamily: "'Space Grotesk', sans-serif", textTransform: "capitalize"}}  onClick={() => handleModeChange('Week')}>Week</Button>
                    <Button sx={{color: "black", border: "1px solid black", fontFamily: "'Space Grotesk', sans-serif", textTransform: "capitalize"}}  onClick={() => handleModeChange('Month')}>Month</Button>
                </ButtonGroup>
            </div>
       </div>
    );
}

export default GanttChart;