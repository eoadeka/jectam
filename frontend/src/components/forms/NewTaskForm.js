import { useState } from "react";
import { Input, TextArea, Label, Select } from "./FormElement";
import OverlayBtn from "../buttons/OverlayBtn";
import CancelBtn from "../buttons/CancelBtn";

const NewTaskForm = ({onSubmit, onInputChange}) => {
    const [formData, setFormData] = useState({
        taskTitle: '',
        taskDescription: '',
        taskCategory: '',
        taskPriority: '',
        assignedTo: '',
        dueDate: ''
    });

    const myCategories = ['Frontend Devt', 'Backend Devt', 'Feature Devt', 'UI Design']
    // console.log(myCategories)
    // const myStatus = ['To Do', 'In Progress', 'Done']

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'taskTitle') {
            onInputChange(e.target.value)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setFormData({
            taskTitle: '',
            taskDescription: '',
            taskCategory: '',
            taskPriority: '',
            assignedTo: '',
            dueDate: ''
        });
        onSubmit();
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setFormData({
            taskTitle: '',
            taskDescription: '',
            taskCategory: '',
            taskPriority: '',
            assignedTo: '',
            dueDate: ''
        });
    };
    
    return (
        <form onSubmit={handleSubmit} style={{marginTop:"1em"}}>
            <Label htmlFor="category" >Category:</Label>
            <Select 
                name="taskCategory" 
                id="id_task_category" 
                multiple
                value={formData.taskCategory}
                onChange={handleInputChange}
                
            >
            {/* <option value="">Select...</option> */}
            {/* {myCategories.map((catego, index) => {
                <option className='task-category-btn' key={index} value={catego}>{catego}</option>
            })} */}
                
                <option className='task-category-btn' value="Backend Devt">Backend Devt</option>
                <option className='task-category-btn' value="Feature Devt">Feature Devt</option>
                <option className='task-category-btn' value="UI Design">UI Design</option>
            </Select>

            <Input  
                placeholder='Task title...' 
                type="text"
                name="taskTitle"
                value={formData.taskTitle}
                onChange={handleInputChange}
                style={{fontSize:"1.4em"}}
            />
            <p>{formData.taskTitle}</p>

            <TextArea 
                placeholder='Task description...' 
                rows={2} 
                name="taskDescription"
                value={formData.taskDescription}
                onChange={handleInputChange}
            />
            <Input  
                placeholder='Assign to...' 
                type="text"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleInputChange}
            />
            {/* <small style={{marginTop:"4em", opacity:"0.5"}}>enable auto-assign</small> */}

            <Input  
                placeholder='Due date...' 
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
            />

            <Label htmlFor="status">Status:</Label>
            <Select 
                name="taskStatus" 
                id="id_task_status" 
                multiple
                value={formData.taskStatus}
                onChange={handleInputChange}
            >
                {/* {myStatus.map((stats, index) => {
                    <option className='task-category-btn' key={index} value={stats}>{stats}</option>
                    // <option className='task-category-btn' value="to_do">{stats}</option>
                })} */}
                <option className='task-category-btn' value="to_do">To do</option>
                <option className='task-category-btn' value="in_progress">In Progress</option>
                <option className='task-category-btn' value="done">Done</option>
            </Select>

            <Label htmlFor="priority">Priority:</Label>
            <Select 
                name="taskPriority" 
                id="id_task_status" 
                multiple
                value={formData.taskPriority}
                onChange={handleInputChange}
            >
                <option className='task-category-btn' value="low">Low</option>
                <option className='task-category-btn' value="medium">Medium</option>
                <option className='task-category-btn' value="high">High</option>
            </Select>

            
            <OverlayBtn onClick={handleSubmit}>Save</OverlayBtn>
            <CancelBtn onClick={handleCancel}>Cancel</CancelBtn>
            {/* <Button type="button" onClick={() => console.log("new task")}>Save</Button> */}
        </form>
    )
}

export default NewTaskForm;