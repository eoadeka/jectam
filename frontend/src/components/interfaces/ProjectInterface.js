import React from 'react';
import ScrumInterface from './ScrumInterface';
import Prince2Interface from './Prince2Interface';
import WaterfallInterface from './WaterfallInterface';

const ProjectInterface = ({ project, tasks }) => {
  // Assuming project.method contains the methodology information
  switch (project[0].method) {
    case 'Scrum':
      return <ScrumInterface project={project} tasks={tasks} />;
    case 'PRINCE2':
      return <Prince2Interface project={project} tasks={tasks}  />;
    case 'Waterfall':
      return <WaterfallInterface project={project} tasks={tasks}  />;
    default:
      return <ScrumInterface project={project} tasks={tasks}  />;
  }
};

export default ProjectInterface;
