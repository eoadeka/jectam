import React from "react";
import ProjectGanttChart from "../projects/ProjectGanttChart";

const Prince2Interface = ({project}) => {
    // console.log(project[0].project_name)
    // console.log("prince2 is here")
    return (
        <div >
            {/* Prince2 details for {project[0].project_name} */}
            {/* <ProjectGanttChart /> */}
            <ProjectGanttChart tasks={project.tasks} />
            <p>prince2</p>
        </div>
    )
}

export default Prince2Interface;