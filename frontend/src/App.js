import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
// import { DndProvider } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import Navbar from "./components/layout/navigation/Navbar.js";
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import ProjectsList from './pages/projects/ProjectsList.js';
import SignUp from './pages/SignUp.js';
import Login from './pages/Login.js';
import Notifications from './pages/Notifications.js';
import ReportsAndAnalytics from './pages/ReportsandAnalytics.js';
import ProjectDetail from './pages/projects/ProjectDetail.js';
import Favorites from './pages/Favorites.js';
import NewProject from './pages/projects/NewProject.js';
import NewTask from './pages/projects/NewTask.js';
  

function App() {
  return (
    <div>
      <Router>
        <Navbar/>
            <Routes>
                <Route exact path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/projects" element={<ProjectsList />} />
                <Route exact path="/projects/:url/:id"  element={ <ProjectDetail  /> }></Route>
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/reports-and-analytics" element={<ReportsAndAnalytics />} />
                <Route path='projects/new-project' element={<NewProject />} />
                <Route path='/projects/:url/:id/new-task' element={<NewTask />} />
                {/* <Route
                    path="/contact"
                    element={<Contact />}
                />
                <Route path="/blogs" element={<Blogs />} />
                <Route
                    path="/sign-up"
                    element={<SignUp />}
                /> */}
            </Routes>
        </Router>
      {/* <Index /> */}
    </div>
  );
}

export default App;