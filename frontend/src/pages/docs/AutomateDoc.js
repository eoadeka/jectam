import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { PageHeaderDiv, PageTitle, PageTitleDiv, PageTitleSpan } from '../../components/layout/PageHeader';
import Container from '../../components/layout/Container';
import Editor from '../../components/editor/Editor';
import { fetchProject } from '../../hooks/crudTasks';
import AutomateDocButton from '../../components/buttons/AutomateBtn';
import Overlay from '../../components/layout/Overlay';
import { IoReturnUpBack } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { PiDotsSixVerticalThin } from "react-icons/pi";
import { automateDocument, fetchDocuments } from '../../hooks/crudDocs';
import {  fetchTemplateTypes } from '../../hooks/crudDocs';
import toast, { Toaster } from 'react-hot-toast';


const AutomateDoc = () => {
    const style = { fontSize: "1.2em", verticalAlign: "middle", cursor:"grab" };
    const dotFill = { verticalAlign: "middle" };
    
    const [documentContent, setDocumentContent] = useState('');
    const [openVersions, setOpenVersions] = useState(false);
    const [showDocs, setShowDocs] = useState(true);
    const [versionNumber, setVersionNumber] = useState(0);
    const onVersionDocClick = () => setShowDocs(!showDocs);
    const [selectedVersion, setSelectedVersion] = useState(null);
    const [templateTypes, setTemplateTypes] = useState([]);
    const [, forceUpdate] = useState();

    const { projectId, type } = useParams();
    const [project, setProject] = useState(null);
    const [documents, setDocuments] = useState(null);

    const toggleVersion = (documentId) => {
        setSelectedVersion(selectedVersion === documentId ? null : documentId);
        // console.log(documentId)
        // setShowDocs(!showDocs)
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await fetchProject(projectId);
            const template = await fetchTemplateTypes();
            setProject(data);
            setTemplateTypes(template);
            // console.log(template)
          } catch (error) {
            console.error('Error fetching project:', error);
          }
        };

        const fetchDocs = async () => {
            try {
                const data = await fetchDocuments();
                setDocuments(data);
                // console.log(data)
                // console.log(documents)
            } catch (error) {
                console.error('Error fetching documents:', error);
                // Handle error, e.g., set an error state or display a message to the user
            }
        };
        
        fetchData();
        fetchDocs();
        fetchTemplateTypes();
    }, [projectId]);


    const handleAutomateDocument = async () => {
        try {
            const response = await automateDocument(projectId, type);
            console.log('Automated document:', response);

            setVersionNumber(response.version_number)
             // Check if the response contains document_content
            if (response && response.content) {
                // Extract document content and document ID from the response
                const { content: documentContent, document_id: documentId } = response;

                // Update document content state
                setDocumentContent(documentContent);
                toast.success('Document created successfully!!!'); 
                // Log document ID and content
                // console.log('Document ID:', documentId);
                // console.log('Document Content:', documentContent);
            } else {
                console.error('Error: Response does not contain document content');
                toast.error('No document content');
            }
        } catch (error) {
            console.error('Error automating document:', error);
            toast.error('Failed to create document');
        }
    }

    // const title_type = templateTypes.template_types.filter(type => type[0] === type);
    // Filter the template_types array based on the first element of each sub-array
    const filteredType = templateTypes.template_types?.filter(typeArr => typeArr[0] === type);

    // If any matching type is found, use its corresponding second value (index 1) as title_type
    const title_type = filteredType?.length > 0 ? filteredType[0][1] : null;    
    // console.log(title_type);
    // console.log(type);



    const handleVersionsOverlay = () => {
        setOpenVersions(!openVersions);
    };

    const lastVersionNumber = documents?.reduce((maxVersion, document) => {
        return Math.max(maxVersion, document.version_number);
    }, -Infinity);

    if (!project) {
        return <div>Loading...</div>;
    }

    // const templateType = template.template_types

    return (
        <div>
            <Container>
                <header role='banner'>
                <PageHeaderDiv>
                    <PageTitleDiv>
                        <PageTitle>Automate Doc</PageTitle>
                        <small>{project.title}  <GoDotFill style={dotFill} /> {title_type} <GoDotFill style={dotFill} /> Version {lastVersionNumber} (latest)</small>
                    </PageTitleDiv>
                    <PageTitleDiv>
                        <PageTitleSpan> <small setOpenVersions={setOpenVersions} onClick={handleVersionsOverlay}  style={{textDecoration:"underline", cursor: "pointer"}}>view all versions</small></PageTitleSpan>
                        {/* <PageTitleSpan  ><button onClick={automateDocument}>automate</button></PageTitleSpan> */}
                        {/* <PageTitleSpan><button onClick={handleAutomateDocument}>Automate</button>  </PageTitleSpan> */}
                        <PageTitleSpan><AutomateDocButton onClick={handleAutomateDocument}/></PageTitleSpan>
                    </PageTitleDiv>
                </PageHeaderDiv>
                </header>
                
                {/* {selectedType && (
                    <Editor templateType={selectedType} />
                )} */}

                {/* <Editor templateType={selectedType} /> */}
                <Editor documentContent={documentContent}  />
                {/* <Editor   /> */}
                {/* <p>{response?.version_number}</p> */}
                {openVersions && (
                    <Overlay>
                        <div className="tags" style={{padding: "1em 0 0 0",  justifyContent:"right"}}>
                        <span className="tag tag-1"  style={{width:"95%", verticalAlign: "middle"}} >
                            <IoReturnUpBack onClick={handleVersionsOverlay} className='cancel' size="1.5em" style={{ marginRight:"1em", verticalAlign: "middle"}}  />
                            <small style={{verticalAlign: "middle", opacity: "0.5"}}>
                            {project.title} / {title_type} / Versions
                            </small>
                        </span>
                            <span className="tag tag-1"   style={{width:"5%", textAlign: "right"}}><IoTrashOutline size="1.2em" /></span>
                        </div>
                        <h2>Versions</h2>

                        <div style={{marginBottom: "2em"}}> 
                        {documents?.filter(document => type === document.document_type).map((document) => (
                            <div key={document.document_id}>
                                <div draggable className=" tags about-task"  style={{ marginTop: ".5em", padding: "1em 0 1em 0", verticalAlign: "middle"}} onClick={() => toggleVersion(document.document_id)} >
                                <PiDotsSixVerticalThin style={style} />
                                <input type="radio" style={{verticalAlign:"top", marginRight: "1em"}} />
                                <span style={{marginRight: "1em"}}>{project.title} - version {document.version_number}</span>
                                <progress value={0.7} style={{verticalAlign:"middle", marginRight: "1em"}} />
                                <small style={{background: "lightgray", color: "black", borderRadius: "5px", padding:"3.5px",position: "absolute",right:"2em",}}>2h</small>

                                {/* { !showDocs && ( */}
                                <div style={{ display: selectedVersion === document.document_id ? 'block' : 'none' }}>
                                    <div style={{ marginLeft: "5%",marginTop: ".5em", padding: "1em 2em", background:"gainsboro"}}>
                                    <h2 style={{textDecoration: "underline"}}>{project.title}</h2>
                                    <h3>{title_type}</h3>
                                    {/* <br></br> */}
                                    <ul>
                                        {JSON.parse(document.content).records.map((record, index) => (
                                            <li key={index}>
                                                <strong>{record[0]}:</strong> {record[1]}
                                            </li>
                                        ))}
                                    </ul>
                                    {JSON.parse(document.content).sections.map((section, index) => (
                                        <span key={index}>
                                            <h3>{section.title}</h3>
                                            <p>{section.content}</p>
                                        </span>
                                    ))}
                                    {/* <p>{project.description}</p> */}
                                    </div>
                                </div>
                                </div>
                            </div>
                            
  
                            
                        ))}
                        </div>

                      

                        {/* <div draggable className=" tags about-task"  style={{ marginTop: ".5em", padding: "1em 0 1em 0",  verticalAlign: "middle"}}>
                            <PiDotsSixVerticalThin style={style} />
                            <input type="radio" style={{verticalAlign:"top", marginRight: "1em"}} />
                            <span style={{marginRight: "1em"}}>{project.title} - version 2</span>
                            <progress value={0.7} style={{verticalAlign:"middle", marginRight: "1em"}} />
                            <small style={{background: "lightgray", color: "black", borderRadius: "5px", padding:"3.5px",position: "absolute",right:"2em",}}>1d</small>
                        </div>
                        <div draggable className=" tags about-task"  style={{ marginTop: ".5em", padding: "1em 0 1em 0",  verticalAlign: "middle"}}>
                            <PiDotsSixVerticalThin style={style} />
                            <input type="radio" style={{verticalAlign:"top", marginRight: "1em"}} />
                            <span style={{marginRight: "1em"}}>{project.title} - version 1</span>
                            <progress value={0.7} style={{verticalAlign:"middle", marginRight: "1em"}} />
                            <small style={{background: "lightgray", color: "black", borderRadius: "5px", padding:"3.5px",position: "absolute",right:"2em",}}>3m</small>
                        </div> */}
                    </Overlay>
                )}

                <Toaster
                    position="bottom-left"
                    reverseOrder={false}
                />
            </Container>
        </div>
    );
}

export default AutomateDoc;