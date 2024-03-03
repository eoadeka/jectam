import React from 'react';
import Container from '../../components/layout/Container';
import { PageHeaderDiv, PageTitle, PageTitleDiv, PageTitleSpan } from '../../components/layout/PageHeader';

const Documents = () => {
  return (
    <Container>
        <PageHeaderDiv>
        <PageTitleDiv>
            <PageTitle>Project Documents</PageTitle>
            <small>AutoTasker</small>
        </PageTitleDiv>
        <PageTitleDiv>
            <PageTitleSpan className='filters'><button style={{background:"black", color:"white"}}>All</button> <button>Automated</button> <button>Nonautomated</button></PageTitleSpan>
        </PageTitleDiv>
        </PageHeaderDiv>

        <div className='project-item-body'> 
            {/* <h2 style={{marginBottom: "-0.3em"}}>Automated docs</h2> */}
            <a draggable className='project-link'  href={`automate-doc`}>
                <h3>Benefits Management Approach</h3>
                <div style={{ position: "absolute", bottom: "1em", right: "1em"}}>
                    <small style={{textDecoration:"underline"}}>view versions</small>
                </div>
            </a>
            <a draggable className='project-link'  href={`automate-doc`}>
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
            </a>
            {/* <a draggable className='project-link'  href={`automate-doc`}>
                <h3>Work Package</h3>
                <div style={{ position: "absolute", bottom: "1em", right: "1em"}}>
                    <small style={{textDecoration:"underline"}}>view versions</small>
                </div>
            </a> */}
        </div>

        <br></br>
        <hr></hr>
        <div className='project-item-body'> 
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