import { useEffect, useState } from "react";
import { Input, TextArea, Label, Select } from "../FormElement";
import OverlayBtn from "../../buttons/OverlayBtn";
import CancelBtn from "../../buttons/CancelBtn";
import axios from 'axios';
import { AiOutlineClose } from "react-icons/ai";
import Switch from '@mui/material/Switch';
import { fetchRoleChoices } from "../../../hooks/fetchRoles";


const label = { inputProps: { 'aria-label': 'Size switch demo' } };
// const NewTaskForm = ({onSubmit, onInputChange}) => {
const NewTaskForm = ({ projectId, initialValues, onSubmit, isUpdate }) => {
    const style = { fontSize: "1em", verticalAlign: "middle" };
    const [showAutoAssignSwitch, setShowAutoAssignSwitch] = useState(false);
    const [formData, setFormData] = useState( initialValues || {
        title: '',
        description: '',
        category: '',
        priority: '',
        status: '',
        assignee: {},
        due_date: '',
        is_complete: false,
        project: projectId
    });

    const [checked, setChecked] = useState(true);
	const handleSwitchChange = () => {setChecked(!checked);};
    const [roleChoices, setRoleChoices] = useState([]);

    const myCategories = ['Frontend Devt', 'Backend Devt', 'Feature Devt', 'UI Design']
    // console.log(myCategories)
    // const myStatus = ['To Do', 'In Progress', 'Done']

    // useEffect(() => {
    //     const fetchRoleTypes = async () => {
    //         try {
    //             const roleChoice = await fetchRoleChoices();
    //             setRoleChoices(roleChoice)
    //         } catch (error) {
    //             console.error('Error fetching roles:', error)
    //         }
    //     }

    //     fetchRoleTypes();
    // }, []);
    
    const fetchUserData = async (email) => {
        const token = localStorage.getItem('refresh_token');

        // Check if token exists
        if (!token) {
          // throw new Error('No authentication token found');
          window.location.replace('/login');
        }
      
        try {
          const accessToken = localStorage.getItem('access_token');
            const response = await axios.get(`http://localhost:8000/accounts/user/retrieve/?email=${email}`, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                  },  withCredentials: true
              });
            return response.data; // Assuming the response contains user data
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
    };

    const handleAutoAssign = async () => {
        if (checked) {
            console.log("i choose to auto-assign")
        }
        // const userData = await fetchUserData(role);
        // console.log(userData)

        // const role = formData.assignee.split(' ').splice(-1)[0];

        // if (formData.category.toLowerCase().includes(role.toLowerCase())) {
        //     // Auto-assign the task
        //     // Add your auto-assign logic here...
        // }
    }

    // Function to handle form input changes
    // Function to handle form input changes
    const handleInputChange = (e) => {
        // const { name, value } = e.target;
        // setFormData(prevData => ({
        //     ...prevData,
        //     [name]: value
        // }));

        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;
        setFormData((prevData) => ({
            ...prevData,
            [name]: inputValue,
        }));

        // Check if a category is selected
        if (name === 'category') {
            // setSelectedCategory(value);
            setShowAutoAssignSwitch(true); // Show the switch when a category is selected
        }
    };

    // Function to add new assignee
    const handleAddAssignee = () => {
        // const newAssignee = Array.isArray(formData.assignee) ? [...formData.assignee] : [];
        // const newAssignee = formData.assignee.slice(); // Create a copy of the assignee array
        const newAssignee = Object.keys(formData.assignee).length > 0 ? formData.assignee.slice() : [];

        newAssignee.push(''); // Add a new empty string for the new assignee
        setFormData(prevData => ({
            ...prevData,
            assignee: newAssignee
        }));
    };

    // Function to handle assignee input change
    const handleAssigneeChange = (index, value) => {
        const newAssignee = formData.assignee.slice(); // Create a copy of the assignee array
        newAssignee[index] = value; // Update the value of the assignee at the specified index
        console.log(newAssignee)
        setFormData(prevData => ({
            ...prevData,
            assignee: newAssignee
        }));

        
    };

    // Function to remove assignee
    const handleRemoveAssignee = (index) => {
        const newAssignee = formData.assignee.slice(); // Create a copy of the assignee array
        newAssignee.splice(index, 1); // Remove the assignee at the specified index
        setFormData(prevData => ({
            ...prevData,
            assignee: newAssignee
        }));
    };

    // Function to handle "Enter" key press
    const handleKeyPress = (e, index) => {
        if (e.key === 'Enter') {
            handleAddAssignee();
            e.preventDefault(); // Prevent form submission on "Enter" key press
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Extract assignee emails from formData
        const assigneeEmails = Object.values(formData.assignee);

        // Fetch user data for each assignee email and map to user_id
        const assigneeUserIds = await Promise.all(assigneeEmails.map(async (email) => {
            const userData = await fetchUserData(email);
            console.log(userData)
            return userData ? userData.id : null; // Or handle error as needed
        }));

        // Update formData with assignee user_ids
        const updatedFormData = {
            ...formData,
            assignee: assigneeUserIds
        };

        // Submit the form with updated formData
        onSubmit(updatedFormData);


        // onSubmit(formData);
        console.log(updatedFormData);
        // console.log(formData.assignee);
        setFormData(initialValues || {
            title: '',
            description: '',
            category: '',
            priority: '',
            status: '',
            assignee: {},
            due_date: '',
            is_complete: false
        });
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setFormData(initialValues ||{
            title: '',
            description: '',
            category: '',
            priority: '',
            status: '',
            assignee: {},
            due_date: '', 
            is_complete: false
        });
    };
    
    return (
        <form onSubmit={handleSubmit} style={{marginTop:".5em"}}>
            <Label htmlFor="category" >Category:</Label>
            <Select 
                name="category" 
                id="id_task_category" 
                multiple
                value={formData.category}
                onChange={handleInputChange}
                
            >
            {/* <option value="">Select...</option> */}
            {/* {myCategories.map((catego, index) => {
                <option className='task-category-btn' key={index} value={catego}>{catego}</option>
            })} */}
                
                <option className='task-category-btn' value="Planning">Planning</option>
                <option className='task-category-btn' value="Review">Review</option>
                <option className='task-category-btn' value="Backend">Backend</option>
                <option className='task-category-btn' value="Frontend">Frontend</option>
                <option className='task-category-btn' value="UI">UI</option>
                <option className='task-category-btn' value="QA">QA</option>
                <option className='task-category-btn' value="DevOps">DevOps</option>
            </Select>

            <Label htmlFor="title" >Title:</Label>
            <Input  
                placeholder='Task title...' 
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                style={{fontSize:"1.4em"}}
            />
            {/* <p>{formData.title}</p> */}

            <Label htmlFor="description" >Task description:</Label>
            <TextArea 
                placeholder='Task description...' 
                rows={2} 
                name="description"
                value={formData.description}
                onChange={handleInputChange}
            />
            
            <h5 style={{marginTop: "-0.4em", fontSize: ".8em"}}>Assignees:</h5>
            <div  style={{marginTop: "-1em",marginBottom: ".1em",display: "flex", flexWrap: "wrap"  }}>
                {Object.keys(formData.assignee).map((key) => (
                    <div key={key} style={{ background:"gainsboro", borderRadius: "5px", padding: "5px 8px", width: "auto", display: "inline", marginRight: ".5em", marginBottom: ".5em"}}>
                        <small style={{ paddingRight: "1em"}} >{formData.assignee[key]}</small>
                        <small style={{ borderLeft: "2px solid black", paddingLeft: ".8em"}} onClick={() => handleRemoveAssignee(key)}><AiOutlineClose style={style} /></small>
                    </div>
                ))}
            </div>
            {/* <br></br> */}


             {/* Dynamically generated assignee input fields */}
             <Input
                type="text"
                placeholder="Assignee email"
                onClick={handleAddAssignee}
                value={formData.assignee[formData.assignee.length - 1]} // Use the last assignee input value
                onChange={(e) => handleAssigneeChange(formData.assignee.length - 1, e.target.value)}
                onKeyDown={(e) => handleKeyPress(e, formData.assignee.length - 1)}
            />
            
            <div style={{textAlign: "right", marginTop: "-0.5em", visibility: showAutoAssignSwitch ? 'visible' : 'hidden' }}>
                <small style={{ fontSize: ".9em"}}>
                    {/* <Label htmlFor="due_date" >auto-assign tasks to all team members:</Label> */}
                    <Label htmlFor="due_date" >auto-assign tasks to backend engineers:</Label>
                    <Switch {...label}  color={checked ? "default" : "primary"} size="small" onChange={handleSwitchChange} onClick={handleAutoAssign} />
                    {/* <Switch {...label} defaultChecked color="default" size="small" /> */}
                </small>
            </div>

          

            {/* <Label htmlFor={`assignee`}>Assignee:</Label>
                    <Input
                        placeholder='Assignee email...'
                        type="text"
                        name={`assignee`}
                        value={formData.assignee}
                        onChange={(e) => handleAssigneeChange(e, e.target.value)}
                        onKeyDown={(e) => handleKeyPress(e, e)}
                    /> */}
            {/* <button type="button" onClick={handleAddAssignee}>Add Assignee</button> */}
            {/* <small style={{marginTop:"4em", opacity:"0.5"}}>enable auto-assign</small> */}

            {/* <br></br> */}
            {/* <br></br> */}
            <Label htmlFor="due_date" >Due date:</Label>
            <Input  
                placeholder='Due date...' 
                type="date"
                name="due_date"
                value={formData.due_date}
                onChange={handleInputChange}
            />

            <Label htmlFor="status">Status:</Label>
            <Select 
                name="status" 
                id="id_task_status" 
                multiple
                value={formData.status}
                onChange={handleInputChange}
            >
                {/* {myStatus.map((stats, index) => {
                    <option className='task-category-btn' key={index} value={stats}>{stats}</option>
                    // <option className='task-category-btn' value="to_do">{stats}</option>
                })} */}
                <option className='task-category-btn' value="To Do">To do</option>
                <option className='task-category-btn' value="In Progress">In Progress</option>
                <option className='task-category-btn' value="On Hold">On Hold</option>
                <option className='task-category-btn' value="Under Review">Under Review</option>
                <option className='task-category-btn' value="Done">Done</option>
                <option className='task-category-btn' value="Cancelled">Cancelled</option>
            </Select>

            <Label htmlFor="priority">Priority:</Label>
            <Select 
                name="priority" 
                id="id_task_status" 
                multiple
                value={formData.priority}
                onChange={handleInputChange}
            >
                <option className='task-category-btn' value="Low">Low</option>
                <option className='task-category-btn' value="Medium">Medium</option>
                <option className='task-category-btn' value="High">High</option>
            </Select>

            {isUpdate === true && (
                <>
                    <div>
                        <Label htmlFor="is_completed">Mark as Completed:</Label>
                        <Input 
                            placeholder='Archive' 
                            type="checkbox"
                            name="is_completed"
                            checked={formData.is_completed}
                            onChange={handleInputChange}
                            style={{display: "inline-block",  width: "5%", verticalAlign: "baseline"}}
                        />  
                    </div>
                </>
            )}

            
            <OverlayBtn onClick={() => handleSubmit}>{isUpdate ? 'Update' : 'Create'}</OverlayBtn>
            <CancelBtn onClick={handleCancel}>Cancel</CancelBtn>
            {/* <Button type="button" onClick={() => console.log("new task")}>Save</Button> */}
        </form>
    )
}

export default NewTaskForm;