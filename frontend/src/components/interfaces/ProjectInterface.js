import React from 'react';
import ScrumInterface from './ScrumInterface';
import Prince2Interface from './Prince2Interface';

const ProjectInterface = ({ project }) => {
  // Assuming project.methodology contains the methodology information
  switch (project.method) {
    case 'Scrum':
      return <ScrumInterface project={project} />;
    case 'PRINCE2':
      return <Prince2Interface project={project} />;
    default:
      return <ScrumInterface project={project} />;
  }
};

export default ProjectInterface;
