import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
// import { DndProvider } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import ProjectsList from './pages/projects/ProjectsList.js';
import SignUp from './pages/auth/SignUp.js';
import Login from './pages/auth/Login.js';
import Notifications from './pages/Notifications.js';
import ReportsAndAnalytics from './pages/ReportsandAnalytics.js';
import ProjectDetail from './pages/projects/ProjectDetail.js';
import NewProject from './pages/projects/NewProject.js';
import NewTask from './pages/projects/NewTask.js';
import UserProfile from './pages/auth/UserProfile.js';
import Documents from './pages/docs/Docs.js';
import AutomateDoc from './pages/docs/AutomateDoc.js';
import WithoutNav from './components/layout/navigation/WithoutNav.js';
import WithNav from './components/layout/navigation/WithNav.js';
import { AuthProvider } from './context/AuthContext.js';
import NotFound from './pages/404.js';
import Logout from './pages/auth/Logout.js';



function App() {

  return (
    <div>
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<WithoutNav />}>
              <Route exact path="/" element={<Index />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path='*' element={<NotFound />}/>
              <Route path="/logout" element={<Logout />} />
            </Route>

            <Route element={<WithNav />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects" element={<ProjectsList />} />
              <Route exact path="/projects/:slug/:projectId"  element={ <ProjectDetail /> }></Route>
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/reports-and-analytics" element={<ReportsAndAnalytics />} />
              <Route path='projects/new-project' element={<NewProject />} />
              <Route path='/projects/:url/:id/new-task' element={<NewTask />} />
              <Route path='/user-profile' element={<UserProfile />} />
              <Route path='/projects/:slug/:projectId/documents' element={<Documents />} />
              <Route path='/projects/:slug/:projectId/documents/automate/:type' element={<AutomateDoc />} />
            </Route>
             
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
        </AuthProvider>
        </Router>
      {/* <Index /> */}
      {/* <p>Test GET request: {testGet}</p>
      <p>Test POST request: {testPost}</p> */}
    </div>
  );
}

export default App;