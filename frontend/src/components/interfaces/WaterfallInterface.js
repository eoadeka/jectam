import React from "react";

const WaterfallInterface = ({ project }) => {
    // console.log(project[0].project_name)
    return (
        <div >
            Waterfall details for {project[0].project_name}
            {/* Scrum details for {project[0].project_name}
            Scrum details for {project[0].project_name} */}
        </div>
    )
}

export default WaterfallInterface;