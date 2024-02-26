import React from 'react';
import Container from '../components/layout/Container';
import { PageHeaderDiv, PageTitle, PageTitleDiv } from '../components/layout/PageHeader';
import ProjectItem from '../components/projects/ProjectItem';
import data from '../data/projects';

const Favorites = () => {
  return (
    <div>
        <Container>
            <PageHeaderDiv>
              <PageTitleDiv>
                <PageTitle>Favorites</PageTitle>
                <small>Your favorite projects at a glance</small>
              </PageTitleDiv>
            </PageHeaderDiv>

            <ProjectItem data={data} />
        </Container>
    </div>
  );
}

export default Favorites;