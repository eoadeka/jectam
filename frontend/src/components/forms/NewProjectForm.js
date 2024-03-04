import { useState } from "react";
import { Input, TextArea } from "./FormElement";
import OverlayBtn from "../buttons/OverlayBtn";
import CancelBtn from "../buttons/CancelBtn";

const NewProjectForm = ({onSubmit}) => {
    const [predictedMethodology, setPredictedMethodology] = useState('');
    const [formData, setFormData] = useState({
        projectName: '',
        description: '',
        projectSpecifics: '',
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
        console.log(formData);
        setFormData({
            projectName: '',
            description: '',
            projectSpecifics: '',
        });
        onSubmit();
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setFormData({
            projectName: '',
            description: '',
            projectSpecifics: '',
        });
    };

    // Function to predict methodology
    const predictMethodology = () => {
        const { projectSpecifics } = formData;
        
        // Convert project specifics to lowercase and split into words
        const words = projectSpecifics.toLowerCase().split(' ');

        // Define keywords and characteristics associated with each methodology
        const methodologies = {
            'Waterfall': ["sequential", "phases", "documentation", "plan-driven", "requirements", "design", "implementation", "testing", "deployment"],
            'Agile': ["iterative", "incremental", "flexible", "adaptive", "customer collaboration", "feedback", "sprints", "user stories", "iterative development"],
            'Scrum': ["sprints", "daily stand-ups", "product backlog", "scrum master", "product owner", "sprint planning", "sprint review", "sprint retrospective"],
            'Extreme Programming (XP)': ["pair programming", "test-driven development", "continuous integration", "small releases", "refactoring", "simplicity", "customer involvement"],
            'Lean': ["maximize value", "minimize waste", "continuous improvement", "value stream mapping", "kanban", "flow", "pull-based"],
            'PRINCE2': ["structured", "controlled", "stages", "deliverables", "reviews", "roles", "management by exception", "project board", "project manager"]
        };

        // Initialize methodology scores
        const methodologyScores = {};

        // Check the presence of keywords for each methodology
        for (const [methodology, keywords] of Object.entries(methodologies)) {
        methodologyScores[methodology] = 0;
        for (const keyword of keywords) {
            if (words.includes(keyword)) {
            methodologyScores[methodology]++;
            }
        }
        }

        // Choose the methodology with the highest score
        const predictedMethodology = Object.keys(methodologyScores).reduce((a, b) => methodologyScores[a] > methodologyScores[b] ? a : b);

        setPredictedMethodology(predictedMethodology);
    };

    return (
        <div className='new-project-div'>
            <form onSubmit={handleSubmit} className='new-project-form'>
                {/* <h3 style={{marginTop: "-0.2em",}}>Enter project details</h3> */}
                <Input  
                    placeholder='Project name...' 
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    style={{fontSize:"1.4em"}}
                />
                <p style={{margin: "-0.8em 0 1em 0", fontFamily:"'Space Grotesk', sans-serif",}}>e.g AutoTasker</p>

                <Input 
                    placeholder='Enter project description...' 
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}

                />
                <p style={{margin: "-0.8em 0 1em 0", fontFamily:"'Space Grotesk', sans-serif"}}>e.g A system that automates task scheduling and assignment based on priority and resource availability.</p>

                <TextArea  
                    placeholder='Enter project specifics...' 
                    rows={4} 
                    name="projectSpecifics"
                    value={formData.projectSpecifics}
                    onChange={handleInputChange}
                />
                <p style={{margin: "-0.8em 0 1em 0", fontFamily:"'Space Grotesk', sans-serif"}}>eg budget (£400), documentation-heavy? or not, team-size, time-bound, adaptable to change</p>
                <br></br>
                <OverlayBtn onClick={() => predictMethodology()}>Save</OverlayBtn>
                <CancelBtn onClick={handleCancel}>Cancel</CancelBtn>
            </form>

            <div className='new-project-form' style={{verticalAlign:"top",border: "2px dashed gray", borderRadius:"5px", textAlign:"center", background:"gainsboro"}}>
                <div className='best-fit'>
                    <small>Best fit methodolology</small>
                    {predictedMethodology ? (
                        <h1 style={{marginTop:"-0.1em"}}>{predictedMethodology}</h1>
                    ) : (
                        <h1 style={{visibility:"hidden", textDecoration:"underline"}}>no method yet</h1>
                    )}
                </div>
                {predictedMethodology ? (
                    <small>click here to carry on? or choose another methodolology</small>
                ) : (
                    <small>skip for now</small>
                )}
                {/* <small>click here to carry on? or choose another methodolology</small> */}
            </div>
      </div>
    )
}

export default NewProjectForm;