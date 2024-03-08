import React from "react";
import ProjectTaskList from "../projects/ProjectTasksList";

const ScrumInterface = ({  tasks }) => {
    // console.log(project[0].project_name)
    return (
        <div >
            {/* Scrum details for {project[0].project_name} */}
            <ProjectTaskList tasks={tasks} />

        </div>
    )
}

export default ScrumInterface;