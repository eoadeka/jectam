import { useState } from "react";
import { Input, TextArea, Label, Select } from "./FormElement";

const NewTaskForm = ({onTaskTitleChange}) => {
    const [formData, setFormData] = useState({
        taskTitle: '',
        taskDescription: '',
        taskCategory: '',
        taskPriority: '',
        assignedTo: '',
    });

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'taskTitle') {
            onTaskTitleChange(value);
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
        });
    };
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Input  
                    placeholder='Task title...' 
                    type="text"
                    name="taskTitle"
                    value={formData.taskTitle}
                    onChange={handleInputChange}
                    style={{fontSize:"1.5em"}}
                />

                <TextArea 
                    placeholder='Task description...' 
                    rows={2} 
                    name="taskDescription"
                    value={formData.taskDescription}
                    onChange={handleInputChange}
                />
                <Input  
                    placeholder='Enter assigned to...' 
                    type="text"
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleInputChange}
                />

                <Label htmlFor="category">Category:</Label>
                <Select 
                    name="taskCategory" 
                    id="id_task_category" 
                    multiple
                    value={formData.taskCategory}
                    onChange={handleInputChange}
                >
                    <option className='task-category-btn' value="frontend_devt">Frontend devt</option>
                    <option className='task-category-btn' value="backend_devt">Backend devt</option>
                    <option className='task-category-btn' value="feature_devt">Feature devt</option>
                    <option className='task-category-btn' value="ui_design">UI Design</option>
                </Select>

                <Label htmlFor="priority">Priority:</Label>
                <Select 
                    name="taskCategory" 
                    id="id_task_category" 
                    multiple
                    value={formData.taskPriority}
                    onChange={handleInputChange}
                >
                    <option className='task-category-btn' value="low">Low</option>
                    <option className='task-category-btn' value="medium">Medium</option>
                    <option className='task-category-btn' value="high">High</option>
                </Select>

                
                <br></br>
                {/* <Button type="button" onClick={() => console.log("new task")}>Save</Button> */}
            </form>
      </div>
    )
}

export default NewTaskForm;