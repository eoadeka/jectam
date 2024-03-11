import React, { useState } from "react";
import { Label, Select } from "./FormElement";
import OverlayBtn from "../buttons/OverlayBtn";
import CancelBtn from "../buttons/CancelBtn";

const ProjectFilterForm = ({ onFilter, onClear, onSubmit }) => {
    const [method, setMethod] = useState('');
    const [projectStatus, setProjectStatus] = useState('');

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        // Call the onFilter function passed from the parent component
        onFilter({ method, projectStatus });
        console.log(e);
        onSubmit();
    };

    const handleClearFilters = () => {
        setMethod('');
        setProjectStatus('');
        onClear();
    };

    return (
        <form onSubmit={handleFilterSubmit}>
            <Label htmlFor="method">Method:</Label>
            <Select 
                name="method" 
                id="id_task_category" 
                multiple
                value={method} 
                onChange={(e) => setMethod(e.target.value)}
                selected="selected"
            >
                <option className='task-category-btn' value="Scrum">Scrum</option>
                <option className='task-category-btn' value="Waterfall">Waterfall</option>
                <option className='task-category-btn' value="PRINCE2">PRINCE2</option>
                <option className='task-category-btn' value="UI Design">UI Design</option>
            </Select>
            <hr></hr>

            <Label htmlFor="status">Status:</Label>
            <Select 
                name="project_status" 
                id="id_task_status" 
                multiple
                value={projectStatus} 
                onChange={(e) => setProjectStatus(e.target.value)}
            >
                <option className='task-category-btn' value="To do">To do</option>
                <option className='task-category-btn' value="Planned">Planned</option>
                <option className='task-category-btn' value="In Progress">In Progress</option>
                <option className='task-category-btn' value="Done">Done</option>
                <option className='task-category-btn' value="On Hold">On Hold</option>
            </Select>
            <hr></hr>
            
            <OverlayBtn onClick={handleFilterSubmit}>Filter</OverlayBtn>
            <CancelBtn onClick={handleClearFilters}>Clear all filters</CancelBtn>
        </form>
    )
}

export default ProjectFilterForm;