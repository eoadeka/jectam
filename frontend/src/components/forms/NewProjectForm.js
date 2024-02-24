import { useState } from "react";
import { Input, TextArea } from "./FormElement";
import Button from "../buttons/Button";

const NewProjectForm = () => {
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
            <form  onSubmit={handleSubmit} className='new-project-form' style={{ width:"40%"}}>
                <h4>Enter project details</h4>
                <Input  
                    placeholder='Enter project name...' 
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleInputChange}
                />
                <p style={{margin: "0.3em 0 1em 0", fontFamily:"'Space Grotesk', sans-serif",}}>e.g AutoTasker</p>

                <Input 
                    placeholder='Enter project description...' 
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}

                />
                <p style={{margin: "0 0 1em 0", fontFamily:"'Space Grotesk', sans-serif"}}>e.g A system that automates task scheduling and assignment based on priority and resource availability.</p>

                <TextArea  
                    placeholder='Enter project specifics...' 
                    rows={4} 
                    name="projectSpecifics"
                    value={formData.projectSpecifics}
                    onChange={handleInputChange}
                />
                <p style={{margin: "0.3em 0 1em 0", fontFamily:"'Space Grotesk', sans-serif"}}>eg budget (£400), documentation-heavy? or not, team-size, time-bound, adaptable to change</p>
                <br></br>
                <Button type="button" onClick={() => predictMethodology()}>Save</Button>
            </form>

            <div className='new-project-form' style={{verticalAlign:"top", width:"55%",border: "2px dashed gray", borderRadius:"5px", textAlign:"center", background:"gainsboro"}}>
                <div className='best-fit'>
                    <small>Best fit methodolology</small>
                    {predictedMethodology ? (
                        <h1 style={{marginTop:"-0.1em"}}>{predictedMethodology}</h1>
                    ) : (
                        <h1 style={{visibility:"hidden", textDecoration:"underline"}}>no method yet</h1>
                    )}
                </div>
                {predictedMethodology ? (
                    <small style={{position: "absolute", bottom: "1em", right: "14em"}}>click here to carry on? or choose another methodolology</small>
                ) : (
                    <small style={{position: "absolute", bottom: "1em", right: "10em"}}>fill the form on the left to get the best fit methodology for your project</small>
                )}
                {/* <small>click here to carry on? or choose another methodolology</small> */}
            </div>
      </div>
    )
}

export default NewProjectForm;