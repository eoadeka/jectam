import React from "react";
import GanttChart from "../projects/GanttChart";

const Prince2Interface = ({project}) => {
    // console.log(project[0].project_name)
    // console.log("prince2 is here")
    return (
        <div >
            {/* Prince2 details for {project[0].project_name} */}
            {/* <ProjectGanttChart /> */}
            <GanttChart tasks={project.tasks} />
        </div>
    )
}

export default Prince2Interface;