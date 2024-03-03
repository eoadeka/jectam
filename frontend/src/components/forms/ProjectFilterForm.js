import React, { useState } from "react";
import { Label, Select } from "./FormElement";
import OverlayBtn from "../buttons/OverlayBtn";
import CancelBtn from "../buttons/CancelBtn";

const ProjectFilterForm = ({ onFilter, onClear }) => {
    const [methodology, setMethodology] = useState('');
    const [status, setStatus] = useState('');

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        // Call the onFilter function passed from the parent component
        onFilter({ methodology, status });
        console.log(e)
    };

    const handleClearFilters = () => {
        setMethodology('');
        setStatus('');
        onClear();
    };

    return (
        <form onSubmit={handleFilterSubmit}>
            <Label htmlFor="method">Methodology:</Label>
            <Select 
                name="method" 
                id="id_task_category" 
                multiple
                value={methodology} 
                onChange={(e) => setMethodology(e.target.value)}
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
                name="status" 
                id="id_task_status" 
                multiple
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
            >
                <option className='task-category-btn' value="To do">To do</option>
                <option className='task-category-btn' value="Planned">Planned</option>
                <option className='task-category-btn' value="In Progress">In Progress</option>
                <option className='task-category-btn' value="Done">Done</option>
                <option className='task-category-btn' value="On Hold">On Hold</option>
            </Select>
            <hr></hr>
            
            <OverlayBtn type="submit">Filter</OverlayBtn>
            <CancelBtn type="button" onClick={handleClearFilters}>Clear all filters</CancelBtn>
        </form>
    )
}

export default ProjectFilterForm;