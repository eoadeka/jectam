import React from 'react';
import Container from '../../components/layout/Container';
import NewProjectForm from '../../components/forms/NewProjectForm';
import { PageHeaderDiv, PageTitleDiv, PageTitle } from '../../components/layout/PageHeader';


const NewProject = () => {
  return (
    <Container>
      <PageHeaderDiv>
        <PageTitleDiv>
          <PageTitle>New Project</PageTitle>
          <small>*fill the form to get the best fit methodology for your project</small>
        </PageTitleDiv>
      </PageHeaderDiv>
        {/* <p>Project name e.g AutoTasker </p>
        <p>Project description e.g A system that automates task scheduling and assignment based on priority and resource availability.</p>
        <p>project specifics eg budget (£400), documentation-heavy? or not, team-size, time-bound, adaptable to change</p>

        <span>Best fit methodolology:<small> Prince2</small></span>
        <p>carry on? or choose another methodolology</p> */}

       
          <NewProjectForm />
        
    </Container>
  );
}

export default NewProject;