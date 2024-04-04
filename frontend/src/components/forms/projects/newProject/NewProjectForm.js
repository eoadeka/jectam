import { useState } from "react";
import { Input, Select, Label } from "../../FormElement";
import OverlayBtn from "../../../buttons/OverlayBtn";
import CancelBtn from "../../../buttons/CancelBtn";
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Size switch demo' } };
const NewProjectForm = ({ initialValues, onSubmit, isUpdate}) => {
    const [checked, setChecked] = useState(false);
	const handleSwitchChange = () => {setChecked(!checked);};

    const methodOptions =[
        [ "Scrum", "Scrum" ], 
        [ "Prince2", "Prince2" ], 
        [ "Waterfall", "Waterfall" ], 
    ]

    const statusOptions =[
        [ "To Do", "To Do" ], 
        [ "In Progress", "In Progress" ], 
        [ "Done", "Done" ], 
    ]

    const [formData, setFormData] = useState(initialValues || {
        title: '',
        three_word_description: '',
        description: '',
        start_date: '',
        end_date: '',
        method: '',
        project_status: '',
        is_archived: false,
        is_complete: false
    });

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;
        setFormData((prevData) => ({
            ...prevData,
            [name]: inputValue,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        console.log(formData);
        setFormData( initialValues || {
            title: '',
            three_word_description: '',
            description: '',
            start_date: '',
            end_date: '',
            method: '',
            project_status: '',
            is_archived: false,
            is_complete: false
        });
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setFormData( initialValues || {
            title: '',
            three_word_description: '',
            description: '',
            start_date: '',
            end_date: '',
            method: '',
            project_status: '',
            is_archived: false,
            is_complete: false
        });
    };


    return (
        <div>
            <form onSubmit={handleSubmit} className='new-project-form'v style={{marginTop:".5em"}}>
                {/* <h3 style={{marginTop: "-0.2em",}}>Enter project details</h3> */}
                <Label htmlFor="title">Project title</Label>
                <Input  
                    placeholder='Project name...' 
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    style={{fontSize:"1.4em"}}
                />
                <p style={{margin: "-1.5em 0 1em 0", fontFamily:"'Space Grotesk', sans-serif",fontSize: "0.8em", opacity: "0.6"}}>e.g AutoTasker</p>

                <Label htmlFor="three_word_description">Three word description</Label>
                <Input 
                    placeholder='Enter three word description...' 
                    type="text"
                    name="three_word_description"
                    value={formData.three_word_description}
                    onChange={handleInputChange}
                />
                <p style={{margin: "-1em 0 1em 0", fontFamily:"'Space Grotesk', sans-serif",fontSize: "0.8em", opacity: "0.6"}}>e.g Automated Task Scheduler</p>

                <Label htmlFor="description">Project description</Label>
                <Input 
                    placeholder='Enter project description...' 
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                />

                <Label htmlFor="start_date">When do you hope to start?</Label>
                <Input 
                    placeholder='When do you hope to start?...' 
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleInputChange}
                />

                <Label htmlFor="end_date">When do you hope to conclude the project?</Label>
                <Input 
                    placeholder='when do you hope to conclude the project...' 
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleInputChange}
                />  

                <div style={{ margin: "0.5em 0" }}>
                    <small style={{ fontSize: "1em"}}>
                        <Label htmlFor="tea_members" >I have team members:</Label>
                        <Switch {...label} color={checked ? "primary" : "default"} size="small" onChange={handleSwitchChange} />
                        {/* <Switch {...label} defaultChecked color="default" size="small" /> */}
                    </small>
                </div>

                <Label htmlFor="method">Methods</Label>
                <Select 
                    id="id_roles" 
                    name="method"
                    multiple
                    value={formData.method}
                    onChange={handleInputChange}
                    style={{height: "50px"}}
                >
                    {methodOptions.map(([text, value], i) => (
                        <option key={i} className='role-btn' value={value} defaultValue={value}>{text}</option>
                    ))}
                </Select>
                        
                <Label htmlFor="project_status">Status</Label>
                <Select 
                    id="id_roles" 
                    className="id_roles"
                    name="project_status"
                    multiple
                    value={formData.project_status}
                    onChange={handleInputChange}
                    style={{height: "50px"}}
                >
                    {statusOptions.map(([text, value], i) => (
                        <option key={i} className='role-btn' value={value} defaultValue={value}>{text}</option>
                    ))}
                </Select>



                {/* <div>
                    <Label htmlFor="team_members" >I have team members</Label>
                    <Input 
                        placeholder='I have team members' 
                        type="checkbox"
                        name="team_members"
                        checked={formData.team_members}
                        onChange={handleInputChange}
                        style={{display: "inline-block",  width: "5%", verticalAlign: "baseline"}}
                    />  
                </div> */}

                {/* Additional fields for update form */}
                {isUpdate === true && (
                    <>
                        <div style={{height:"10px"}}>
                            <Label htmlFor="is_archived" >Archive:</Label>
                            <Input 
                                placeholder='Archive' 
                                type="checkbox"
                                name="is_archived"
                                checked={formData.is_archived}
                                onChange={handleInputChange}
                                style={{display: "inline-block",  width: "5%", verticalAlign: "baseline"}}
                            />  
                        </div>
                        <br></br>
                        <div style={{height:"10px"}}>
                            <Label htmlFor="is_completed">Mark as completed:</Label>
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

              
                <br></br>
                <OverlayBtn onClick={() => handleSubmit}>{isUpdate ? 'Update' : 'Create'}</OverlayBtn>
                <CancelBtn onClick={handleCancel}>Cancel</CancelBtn>
            </form>
      </div>
    )
}

export default NewProjectForm;