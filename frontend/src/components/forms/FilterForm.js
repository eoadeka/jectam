import React, { useState, useEffect } from "react";
import { Input, TextArea, Label, Select } from "./FormElement";
import OverlayBtn from "../buttons/OverlayBtn";
import CancelBtn from "../buttons/CancelBtn";
import tasks from "../../data/tasks";

const FilterForm = () => {
    const [data, setData] = useState(tasks);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPriority, setSelectedPriority] = useState('');
    const [selectedTeamMember, setSelectedTeamMember] = useState('');
    const [selectedTimeline, setSelectedTimeline] = useState('');
    const [customStartDate, setCustomStartDate] = useState('');
    const [customEndDate, setCustomEndDate] = useState('');

     // Filter data based on selected filters
    const filterData = () => {
        let filteredData = data.filter(task => {
            if (selectedCategory && task.category !== selectedCategory) {
                console.log(selectedCategory)
                return false;
            }
            if (selectedPriority && task.priority !== selectedPriority) {
                // console.log("false")
            return false;
            }
            if (selectedTeamMember && task.assignedTo !== selectedTeamMember) {
            return false;
            }
            if (selectedTimeline && !checkTimeline(task.dueDate)) {
            return false;
            }
            return true;
        });
        setData(filteredData);
        console.log(filteredData)
    }

     // Function to check if the task is within the selected timeline
    const checkTimeline = dueDate => {
        if (selectedTimeline === 'Today') {
        const today = new Date().toISOString().split('T')[0];
        return dueDate === today;
        } else if (selectedTimeline === 'This Week') {
        const today = new Date();
        const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
        return new Date(dueDate) <= endOfWeek;
        } else if (selectedTimeline === 'This Month') {
        const today = new Date();
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        return new Date(dueDate) <= endOfMonth;
        } else if (selectedTimeline === 'Custom Date Range') {
        return new Date(dueDate) >= new Date(customStartDate) && new Date(dueDate) <= new Date(customEndDate);
        }
        return true; // If no timeline selected, return true
    };

    // / Handle filter button click
    const handleFilterClick = () => {
        filterData();
        // Reset filter criteria
        setSelectedCategory('');
        setSelectedPriority('');
        setSelectedTeamMember('');
        setSelectedTimeline('');
        setCustomStartDate('');
        setCustomEndDate('');
    };

    // useEffect(() => {
    //     handleFilterClick();
    //   }, []);
    //   }, [selectedCategory, selectedPriority, selectedTeamMember, selectedTimeline, customStartDate, customEndDate]);
    
    return (
        <div>

            <Label htmlFor="category">Category:</Label>
            <Select 
                name="category" 
                id="id_task_category" 
                multiple
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                selected="selected"
            >
                <option className='task-category-btn' value="Frontend Devt">Frontend Devt</option>
                <option className='task-category-btn' value="Backend Devt">Backend Devt</option>
                <option className='task-category-btn' value="Feature Devt">Feature Devt</option>
                <option className='task-category-btn' value="UI Design">UI Design</option>
            </Select>
            <hr></hr>

            <Label htmlFor="priority">Priority:</Label>
            <Select 
                name="priority" 
                id="id_task_status" 
                multiple
                value={selectedPriority} 
                onChange={(e) => setSelectedPriority(e.target.value)}
            >
                <option className='task-category-btn' value="Low">Low</option>
                <option className='task-category-btn' value="Medium">Medium</option>
                <option className='task-category-btn' value="High">High</option>
            </Select>
            <hr></hr>

            <Label htmlFor="timeline">Timeline:</Label>
            <Select 
                name="timeline"
                id="id_task_status" 
                multiple
                value={selectedTimeline} 
                onChange={(e) => setSelectedTimeline(e.target.value)}
            >
                <option value="">All Timelines</option>
                <option value="1 month">1 month</option>
                <option value="2 weeks">2 weeks</option>
                <option value="3 months">3 months</option>
                {/* Add more options for other timelines */}
            </Select>
            {/* Custom date range */}
            {selectedTimeline === 'Custom Date Range' && (
                <>
                <input type="date" value={customStartDate} onChange={e => setCustomStartDate(e.target.value)} />
                <input type="date" value={customEndDate} onChange={e => setCustomEndDate(e.target.value)} />
                </>
      )}
            <hr></hr>

            <Label htmlFor="team">Team</Label>
            <Select 
                name="team"
                id="id_task_status" 
                multiple
                value={selectedTeamMember} 
                onChange={(e) => setSelectedTeamMember(e.target.value)}
            >
                <option value="">All Team Members</option>
                <option value="John">John</option>
                <option value="Alice">Alice</option>
                <option value="Bob">Bob</option>
                <option value="Eve">Eve</option>
                {/* Add more options for other team members */}
            </Select>

            <ul>
                {data.map(task => (
                <li key={task.id}>{task.title}</li>
                ))}
            </ul>

            
            <OverlayBtn  onClick={handleFilterClick}>Filter</OverlayBtn>
            <CancelBtn>Clear all filters</CancelBtn>
            {/* <Button type="button" onClick={() => console.log("new task")}>Save</Button> */}
        </div>
    )
}

export default FilterForm;