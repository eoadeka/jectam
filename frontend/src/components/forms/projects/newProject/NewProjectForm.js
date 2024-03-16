import { useState } from "react";
import { Input, Select, Label } from "../../FormElement";
import OverlayBtn from "../../../buttons/OverlayBtn";
import CancelBtn from "../../../buttons/CancelBtn";

const NewProjectForm = ({onSubmit}) => {

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

    const [formData, setFormData] = useState({
        title: '',
        three_word_description: '',
        description: '',
        start_date: '',
        end_date: '',
        method: '',
        project_status: '',
    });

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        console.log(formData);
        setFormData({
            title: '',
            three_word_description: '',
            description: '',
            start_date: '',
            end_date: '',
            method: '',
            project_status: '',
        });
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setFormData({
            title: '',
            three_word_description: '',
            description: '',
            start_date: '',
            end_date: '',
            method: '',
            project_status: '',
        });
    };


    return (
        <div>
            <form onSubmit={handleSubmit} className='new-project-form'>
                {/* <h3 style={{marginTop: "-0.2em",}}>Enter project details</h3> */}
                <Input  
                    placeholder='Project name...' 
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    style={{fontSize:"1.4em"}}
                />
                <p style={{margin: "-1.5em 0 1em 0", fontFamily:"'Space Grotesk', sans-serif",fontSize: "0.8em", opacity: "0.6"}}>e.g AutoTasker</p>

                <Input 
                    placeholder='Enter three word description...' 
                    type="text"
                    name="three_word_description"
                    value={formData.three_word_description}
                    onChange={handleInputChange}
                />
                <p style={{margin: "-1em 0 1em 0", fontFamily:"'Space Grotesk', sans-serif",fontSize: "0.8em", opacity: "0.6"}}>e.g Automated Task Scheduler</p>

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

                <Label htmlFor="method">Methods</Label>
                <Select 
                    id="id_roles" 
                    name="method"
                    multiple
                    value={formData.method}
                    onChange={handleInputChange}
                    style={{height: "60px"}}
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
                >
                    {statusOptions.map(([text, value], i) => (
                        <option key={i} className='role-btn' value={value} defaultValue={value}>{text}</option>
                    ))}
                </Select>

              
                <br></br>
                <OverlayBtn onClick={() => handleSubmit}>Save</OverlayBtn>
                <CancelBtn onClick={handleCancel}>Cancel</CancelBtn>
            </form>
      </div>
    )
}

export default NewProjectForm;