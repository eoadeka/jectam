import React from "react";
import ProjectTaskList from "../projects/ProjectTasksList";

const ScrumInterface = ({  project, handleUpdate }) => {
    // console.log(project[0].project_name)
    // console.log(project.tasks)
    return (
        <div >
            {/* Scrum details for {project[0].project_name} */}
            <ProjectTaskList tasks={project.tasks} handleUpdate={handleUpdate} />

        </div>
    )
}

export default ScrumInterface;