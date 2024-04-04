import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Container from '../../components/layout/Container';
import { PageHeaderDiv, PageTitle, PageTitleDiv, PageTitleSpan } from '../../components/layout/PageHeader';
import { fetchProject } from '../../hooks/crudTasks';
import {  fetchTemplateTypes } from '../../hooks/crudDocs';
import { GoDotFill } from "react-icons/go";
import Moment from 'react-moment';


const Documents = ({ onSelectType }) => {
    const dotFill = { fontSize: ".5em", verticalAlign: "middle" };

    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [templateTypes, setTemplateTypes] = useState([]);

    const handleSelectType = (type) => {
        onSelectType(type[0]);
    }


    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await fetchProject(projectId);
            const template = await fetchTemplateTypes();
            setProject(data);
            setTemplateTypes(template);
          } catch (error) {
            console.error('Error fetching project:', error);
          }
        };
    
        fetchData();
        fetchTemplateTypes();
      }, [projectId]);

    if (!project) {
        return <div>Loading...</div>;
    }

  return (
    <Container>
        <PageHeaderDiv>
            <PageTitleDiv>
                <PageTitle>Project Documents</PageTitle>
                <small>
                        {project.title} <GoDotFill style={dotFill} />  {` `}
                        {project.three_word_description} <GoDotFill style={dotFill} /> 
                        
                    {` `} <Moment format="MMM D, YYYY">{project.start_date}</Moment>  - <Moment format="MMM D, YYYY">{project.end_date}</Moment>
                    </small>
            </PageTitleDiv>
            <PageTitleDiv>
                <PageTitleSpan className='filters'><button style={{background:"black", color:"white"}}>All</button> <button>Automated</button> <button>Nonautomated</button></PageTitleSpan>
            </PageTitleDiv>
        </PageHeaderDiv>

        <div className='project-item-body'> 
            {/* <h2 style={{marginBottom: "-0.3em"}}>Automated docs</h2> */}
            {templateTypes.template_types.map((type, index) => (
                // <a key={index} onClick={handleSelectType} draggable className='project-link'  href={`/projects/${project.slug}/${project.project_id}/documents/automate/${type[1]}`}>
                <a key={index} onClick={handleSelectType} draggable className='project-link'  href={`/projects/${project.slug}/${project.project_id}/documents/automate/${type[0]}`}>
                    <h3>{type[1]}</h3>
                    <div style={{ position: "absolute", bottom: "1em", right: "1em"}}>
                        <small style={{textDecoration:"underline"}}>view versions</small>
                    </div>
                </a>
            ))}
            {/* <a draggable className='project-link'  href={`automate-doc`}>
                <h3>Business Case</h3>
                <div style={{ position: "absolute", bottom: "1em", right: "1em"}}>
                    <small style={{textDecoration:"underline"}}>view versions</small>
                </div>
            </a>
            <a draggable className='project-link'  href={`automate-doc`}>
                <h3>Change Control Approach</h3>
                <div style={{ position: "absolute", bottom: "1em", right: "1em"}}>
                    <small style={{textDecoration:"underline"}}>view versions</small>
                </div>
            </a>
            <a draggable className='project-link'  href={`automate-doc`}>
                <h3>Communication Management Approach</h3>
                <div style={{ position: "absolute", bottom: "1em", right: "1em"}}>
                    <small style={{textDecoration:"underline"}}>view versions</small>
                </div>
            </a> */}
            {/* <a draggable className='project-link'  href={`automate-doc`}>
                <h3>Work Package</h3>
                <div style={{ position: "absolute", bottom: "1em", right: "1em"}}>
                    <small style={{textDecoration:"underline"}}>view versions</small>
                </div>
            </a> */}
        {/* </div> */}

        {/* <br></br> */}
        <hr></hr>
        {/* <div className='project-item-body'>  */}
            <h2 style={{marginBottom: "-0.3em"}}>Records</h2>
            <a draggable className='project-link'   href={`automate-doc`}>
                <h3>Daily Log</h3>
                <div style={{ position: "absolute", bottom: "1em", right: "1em"}}>
                <button>Automate</button>
                </div>
            </a>
            <a draggable className='project-link'   href={`automate-doc`}>
                <h3>Issue Register</h3>
                <div style={{ position: "absolute", bottom: "1em", right: "1em"}}>
                    <button>Automate</button>
                </div>
            </a>
            <a draggable className='project-link'   href={`automate-doc`}>
                <h3>Lessons Log</h3>
                <div style={{ position: "absolute", bottom: "1em", right: "1em"}}>
                    <button>Automate</button>
                </div>
            </a>
            <a draggable className='project-link'   href={`automate-doc`}>
                <h3>Quality Register</h3>
                <div style={{ position: "absolute", bottom: "1em", right: "1em"}}>
                    <button>Automate</button>
                </div>
            </a>
        </div>
    </Container>
  );
}

export default Documents;