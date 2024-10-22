import { useState } from "react";
import { Label, TextArea } from "../../FormElement";
import OverlayBtn from "../../../buttons/OverlayBtn";
import CancelBtn from "../../../buttons/CancelBtn";
import axios from 'axios';


const BASE_URL = 'http://localhost:8000/projects/';

const PredictMethodForm = () => {
    const [projectDescription, setProjectDescription] = useState('');
    const [predictedMethodology, setPredictedMethodology] = useState('');
    const [error, setError] = useState('');

    const handleSubmit =  async (e) => {
        e.preventDefault();
        // console.log(e)
        const token = localStorage.getItem('refresh_token');

        // Check if token exists
        if (!token) {
          // throw new Error('No authentication token found');
          window.location.replace('/login');
        }

        try {
            const accessToken = localStorage.getItem('access_token');
            const response = await axios.post(`${BASE_URL}predict-method/`, {
              project_description: projectDescription
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
              }, withCredentials: true
            });
              console.log(response.data.predicted_methodology)
            setPredictedMethodology(response.data.predicted_methodology);
            console.log(projectDescription)
        } catch (error) {
            setError('Error predicting methodology. Please try again later.');
            console.error('Error predicting methodology:', error);
        }
    };

    const handleCancel = () => {
        setProjectDescription('');
        setError('');
    };

    // Function to predict methodology
    // const predictMethodology = () => {
    //     const { project_description } = formData;
        
    //     // Convert project specifics to lowercase and split into words
    //     const words = project_description.toLowerCase().split(' ');

    //     // Define keywords and characteristics associated with each methodology
    //     const methodologies = {
    //         'Waterfall': ["sequential", "phases", "documentation", "plan-driven", "requirements", "design", "implementation", "testing", "deployment"],
    //         'Agile': ["iterative", "incremental", "flexible", "adaptive", "customer collaboration", "feedback", "sprints", "user stories", "iterative development"],
    //         'Scrum': ["sprints", "daily stand-ups", "product backlog", "scrum master", "product owner", "sprint planning", "sprint review", "sprint retrospective"],
    //         'Extreme Programming (XP)': ["pair programming", "test-driven development", "continuous integration", "small releases", "refactoring", "simplicity", "customer involvement"],
    //         'Lean': ["maximize value", "minimize waste", "continuous improvement", "value stream mapping", "kanban", "flow", "pull-based"],
    //         'PRINCE2': ["structured", "controlled", "stages", "deliverables", "reviews", "roles", "management by exception", "project board", "project manager"]
    //     };

    //     // Initialize methodology scores
    //     const methodologyScores = {};

    //     // Check the presence of keywords for each methodology
    //     for (const [methodology, keywords] of Object.entries(methodologies)) {
    //     methodologyScores[methodology] = 0;
    //     for (const keyword of keywords) {
    //         if (words.includes(keyword)) {
    //         methodologyScores[methodology]++;
    //         }
    //     }
    //     }

    //     // Choose the methodology with the highest score
    //     const predictedMethodology = Object.keys(methodologyScores).reduce((a, b) => methodologyScores[a] > methodologyScores[b] ? a : b);

    //     setPredictedMethodology(predictedMethodology);
    // };

    return (
        <div className='new-project-div'>
            <div className='new-project-form' style={{verticalAlign:"top",border: "2px dashed gray", borderRadius:"5px", textAlign:"center", background:"gainsboro"}}>
                <div className='best-fit'>
                    <small>Best fit methodolology</small>
                    {predictedMethodology ? (
                        <h1 style={{marginTop:"-0.1em"}}>{predictedMethodology}</h1>
                    ) : (
                        <h1 style={{visibility:"hidden", textDecoration:"underline"}}>no method yet</h1>
                    )}
                </div>
                {/* <small>click here to carry on? or choose another methodolology</small> */}
            </div>

            <hr style={{margin: "3em 0 2em 0"}}></hr>
            {error && <div style={{ color: 'red' }}>{error}</div>}

            <h3>Predict the best fit methodology for your project</h3>
            <form onSubmit={handleSubmit} className='new-project-form'>
                <Label htmlFor="project_description">Project specifics</Label>               
                <TextArea  
                    placeholder='Enter project specifics...' 
                    rows={10} 
                    name="project_description"
                    value={projectDescription}
                    onChange={e => setProjectDescription(e.target.value)}
                />
                <p style={{margin: "-1.5em 0 1em 0", fontFamily:"'Space Grotesk', sans-serif",fontSize: "0.8em", opacity: "0.6"}}>eg budget (£400), documentation-heavy? or not, team-size, time-bound, adaptable to change</p>
                <br></br>
                <OverlayBtn type="submit">Save</OverlayBtn>
                <CancelBtn onClick={handleCancel}>Cancel</CancelBtn>
            </form>

            
      </div>
    )
}

export default PredictMethodForm;