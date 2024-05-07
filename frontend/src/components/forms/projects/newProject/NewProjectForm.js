import { useState } from "react";
import { Input, Select, Label } from "../../FormElement";
import OverlayBtn from "../../../buttons/OverlayBtn";
import CancelBtn from "../../../buttons/CancelBtn";
import Switch from '@mui/material/Switch';
import { AiOutlineClose } from "react-icons/ai";
import axios from 'axios';


const label = { inputProps: { 'aria-label': 'Size switch demo' } };
const NewProjectForm = ({ initialValues, onSubmit, isUpdate, randomWords}) => {
    const style = { fontSize: "1em", verticalAlign: "middle" };
    const [checked, setChecked] = useState(false);
    const [showTeamMemberField, setShowTeamMemberField] = useState(false);
	const handleSwitchChange = () => {setChecked(!checked); setShowTeamMemberField(!showTeamMemberField)};

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
        team_members: {},
        is_archived: false,
        is_complete: false
    });

    console.log(formData.team_members)

    // Function to fetch user data based on the email address
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
    

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;
        setFormData((prevData) => ({
            ...prevData,
            [name]: inputValue,
        }));

        console.log(formData.team_members)
    };

    // Function to add new assignee
    const handleAddTeamMember = () => {
        // Create a copy of the team members array
        // const newTeamMembers = [...formData.team_members];
        const newTeamMembers = Object.keys(formData.team_members).length > 0 ? formData.team_members.slice() : [];

        // Add a new team member object with default values
        newTeamMembers.push('');

        // Update the form data state with the new team members array
        setFormData(prevData => ({
            ...prevData,
            team_members: newTeamMembers
        }));
    };
    
    // Function to handle assignee input change
    const handleTeamMemberChange = async (index, value) => {
        const newTeamMembers = formData.team_members.slice(); // Create a copy of the team_members array
        newTeamMembers[index] = value; // Update the value of the team_members at the specified index
        console.log(newTeamMembers)
        setFormData(prevData => ({
            ...prevData,
            team_members: newTeamMembers
        }));
    };

     // Function to remove assignee
     const handleRemoveTeamMember = (index) => {
        const newTeamMembers = formData.team_members.slice();
        newTeamMembers.splice(index, 1);
        setFormData(prevData => ({
            ...prevData,
            team_members: newTeamMembers
        }));
    };

    // Function to handle "Enter" key press
    const handleKeyPress = (e, index) => {
        if (e.key === 'Enter') {
            handleAddTeamMember();
            e.preventDefault(); // Prevent form submission on "Enter" key press
        } else {
            // Call handleTeamMemberChange when any other key is pressed
            handleTeamMemberChange(index, e.target.value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Extract assignee emails from formData
        const teamMembersEmails = Object.values(formData.team_members);

        // Fetch user data for each assignee email and map to user_id
        const teamMembersUserIds = await Promise.all(teamMembersEmails.map(async (email) => {
            const userData = await fetchUserData(email);
            console.log(userData)
            return userData ? userData.id : null; // Or handle error as needed
        }));

        // Update formData with assignee user_ids
        const updatedFormData = {
            ...formData,
            team_members: teamMembersUserIds
        };

        // Submit the form with updated formData
        onSubmit(updatedFormData);


        console.log(formData);
        console.log(updatedFormData);
        setFormData( initialValues || {
            title: '',
            three_word_description: '',
            description: '',
            start_date: '',
            end_date: '',
            method: '',
            project_status: '',
            team_members: [],
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
            team_members: [],
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
                    placeholder='Enter project title...' 
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    style={{fontSize:"1.4em"}}
                />
                <p style={{margin: "-1em 0 1em 0", fontFamily:"'Space Grotesk', sans-serif",fontSize: "0.8em", opacity: "0.6"}}>e.g AutoTasker</p>

                <Label htmlFor="three_word_description">Three word description</Label>
                <Input 
                    placeholder='Enter three word description...' 
                    type="text"
                    name="three_word_description"
                    value={formData.three_word_description}
                    onChange={handleInputChange}
                />
                {isUpdate === false && (
                    <p style={{margin: "-0.5em 0 1em 0", fontFamily:"'Space Grotesk', sans-serif",fontSize: "0.8em",  textAlign: "right"}}>
                        <span style={{opacity: "0.6"}}>How about </span> 
                        <a 
                            style={{textDecoration: "underline", opacity: "1", color: "black"}}
                            onClick={() => setFormData(prevState => ({ ...prevState, three_word_description: randomWords }))}>
                            {randomWords}
                        </a> 
                        <span style={{opacity: "0.6"}}>?</span>
                    </p>
                )}

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

                <div style={{ margin: "0.5em 0 1.5em" }}>
                    <small style={{ fontSize: "1em"}}>
                        <Label htmlFor="team_members" >I have team members:</Label>
                        <Switch {...label} color={checked ? "primary" : "default"} size="small" onChange={handleSwitchChange} />
                        {/* <Switch {...label} defaultChecked color="default" size="small" /> */}
                    </small>
                </div>

                {showTeamMemberField === true && (
                    <>
                        <div  style={{marginTop: "-1em",marginBottom: ".1em",display: "flex", flexWrap: "wrap"  }}>
                            {/* {formData.team_members.map((teamMember, index) => (
                                <div key={index} style={{ background:"gainsboro", borderRadius: "5px", padding: "5px 8px", width: "auto", display: "inline", marginRight: ".5em", marginBottom: ".5em"}}>
                                    <small style={{ paddingRight: "1em"}} >{teamMember?.email}</small>
                                    <small style={{ borderLeft: "2px solid black", paddingLeft: ".8em"}} onClick={() => handleRemoveTeamMember(index)}><AiOutlineClose style={style} /></small>
                                </div>
                            ))} */}

                            {Object.keys(formData.team_members).map((key) => (
                                <div key={key} style={{ background:"gainsboro", borderRadius: "5px", padding: "5px 8px", width: "auto", display: "inline", marginRight: ".5em", marginBottom: ".5em"}}>
                                    <small style={{ paddingRight: "1em"}} >{formData.team_members[key]}</small>
                                    <small style={{ borderLeft: "2px solid black", paddingLeft: ".8em"}} onClick={() => handleRemoveTeamMember(key)}><AiOutlineClose style={style} /></small>
                                </div>
                            ))}
                        </div>

                        <Input
                            type="text"
                            placeholder="team members email"
                            onClick={handleAddTeamMember}
                            value={formData.team_members[formData.team_members.length - 1]} // Use the last assignee input value
                            onChange={(e) => handleTeamMemberChange(formData.team_members.length - 1, e.target.value)}
                            onKeyDown={(e) => handleKeyPress(e, formData.team_members.length - 1)}

                            // value={formData.team_members[key]?.email || ''}
                            // onChange={(e) => handleTeamMemberChange(key, e.target.value)}
                            // value={formData.team_members[Object.keys(formData.team_members).length - 1]?.email || ''}
                            // value={formData.team_members[Object.keys(formData.team_members).length - 1]?.email || ''}
                            // // value={formData.team_members[formData.team_members.length - 1]} // Use the last assignee input value
                            // onChange={(e) => handleTeamMemberChange(formData.team_members.length - 1, e.target.value)}
                            // onKeyDown={(e) => handleKeyPress(e, formData.team_members.length - 1)}

                            // value={formData.team_members[formData.team_members.length - 1]?.email || ''}
                            // onChange={(e) => handleTeamMemberChange(formData.team_members.length - 1, e.target.value)}
                            // onKeyDown={(e) => handleKeyPress(e, formData.team_members.length - 1)}
                        />
                    </>
                )}

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