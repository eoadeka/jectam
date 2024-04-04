import React from 'react';
import ScrumInterface from './ScrumInterface';
import Prince2Interface from './Prince2Interface';
import WaterfallInterface from './WaterfallInterface';

const ProjectInterface = ({ project, handleUpdate }) => {
  // Assuming project.method contains the methodology information
  // console.log(projects)
  // {projects.map(project => {
    switch (project.method) {
      case 'Scrum':
        return <ScrumInterface  key={project.project_id} project={project} handleUpdate={handleUpdate} />;
      case 'Prince2':
        return <Prince2Interface  key={project.project_id} project={project}  />;
      case 'Waterfall':
        return <WaterfallInterface  key={project.project_id} project={project}  />;
      default:
        return <ScrumInterface  key={project.project_id} project={project}  />;
    }
  // })}
};

export default ProjectInterface;
