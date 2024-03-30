import React from 'react';
import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";


const ProjectGanttChart = ({tasks}) => {
    const taskss = [
        {
            start: new Date(2020, 1, 1),
            // end: new Date(tasks[0].due_date),
            end: new Date(2020, 1, 13),
            name: 'idea',
            id: 1,
            type: 'task',
            progress: 45,
            isDisabled: true,
            styles: { progressColor: 'gainsboro', progressSelectedColor: '#ff9e0d', textColor: 'black' },
        },
        // Add other tasks here
    ];

    console.log(tasks)

    const view = [ "Hour", "Quarter Day", "Half Day", "Day"]
  

    return (
        <Gantt
            tasks={taskss}
            viewMode={view}
            // onDateChange={onTaskChange}
            // onTaskDelete={onTaskDelete}
            // onProgressChange={onProgressChange}
            // onDoubleClick={onDblClick}
            // onClick={() = {console.log("me")}}
            // onClick={onClick}
      />
    // <Gantt tasks={tasks} />
    );
}

export default ProjectGanttChart;