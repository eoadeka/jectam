import React from "react";

const PagesHeader = (props) => {
    let props = {
        title: props.title,
    }
    return (
        <div className="project-header">
            {props.children}
        </div>
    )
}

export default PagesHeader;