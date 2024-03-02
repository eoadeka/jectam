import { useState } from "react";
import { Input, TextArea, Label, Select } from "./FormElement";
import OverlayBtn from "../buttons/OverlayBtn";
import CancelBtn from "../buttons/CancelBtn";

const NewTaskForm = () => {
    const [formData, setFormData] = useState({
        taskTitle: '',
        taskDescription: '',
        taskCategory: '',
        taskPriority: '',
        taskPriority: '',
        assignedTo: '',
        dueDate: ''
    });

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // if (name === 'taskTitle') {
        //     onTaskTitleChange(value);
        //   }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setFormData({
            taskTitle: '',
            taskDescription: '',
            taskCategory: '',
            taskPriority: '',
            taskPriority: '',
            assignedTo: '',
            dueDate: ''
        });
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setFormData({
            taskTitle: '',
            taskDescription: '',
            taskCategory: '',
            taskPriority: '',
            taskPriority: '',
            assignedTo: '',
            dueDate: ''
        });
    };
    
    return (
            <form onSubmit={handleSubmit}>
                <Input  
                    placeholder='Task title...' 
                    type="text"
                    name="taskTitle"
                    value={formData.taskTitle}
                    onChange={handleInputChange}
                    style={{fontSize:"1.4em"}}
                />

                <TextArea 
                    placeholder='Task description...' 
                    rows={2} 
                    name="taskDescription"
                    value={formData.taskDescription}
                    onChange={handleInputChange}
                />
                <Input  
                    placeholder='Assigned to...' 
                    type="text"
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleInputChange}
                />

                <Input  
                    placeholder='Due date...' 
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                />

                <Label htmlFor="category">Category:</Label>
                <Select 
                    name="taskCategory" 
                    id="id_task_category" 
                    multiple
                    value={formData.taskCategory}
                    onChange={handleInputChange}
                    selected="selected"
                >
                    <option className='task-category-btn' value="frontend_devt">Frontend devt</option>
                    <option className='task-category-btn' value="backend_devt">Backend devt</option>
                    <option className='task-category-btn' value="feature_devt">Feature devt</option>
                    <option className='task-category-btn' value="ui_design">UI Design</option>
                </Select>

                <Label htmlFor="status">Status:</Label>
                <Select 
                    name="taskStatus" 
                    id="id_task_status" 
                    multiple
                    value={formData.taskStatus}
                    onChange={handleInputChange}
                >
                    <option className='task-category-btn' value="to_do" selected="selected">To do</option>
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