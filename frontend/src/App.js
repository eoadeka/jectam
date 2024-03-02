import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {withRouter} from 'react-router';
// import { DndProvider } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import Navbar from "./components/layout/navigation/Navbar.js";
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
import AutomateDocs from './pages/AutomateDocs.js';


const API_HOST = 'http://localhost:8000';

let _csrfToken = null;

async function getCsrfToken() {
  if (_csrfToken === null) {
    const response = await fetch(`${API_HOST}/csrf/`, {
      credentials: 'include',
    });
    const data = await response.json();
    _csrfToken = data.csrfToken;
  }
  return _csrfToken;
}

async function testRequest(method) {
  const response = await fetch(`${API_HOST}/ping/`, {
    method: method,
    headers: (
      method === 'POST'
        ? {'X-CSRFToken': await getCsrfToken()}
        : {}
    ),
    credentials: 'include',
  });
  const data = await response.json();
  return data.result;
}

function App() {
  // const [testGet, setTestGet] = useState('KO');
  // const [testPost, setTestPost] = useState('KO');

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const testGetResult = await testRequest('GET');
  //     const testPostResult = await testRequest('POST');
  //     setTestGet(testGetResult);
  //     setTestPost(testPostResult);
  //   };
  //   fetchData();
  // }, []);
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
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/reports-and-analytics" element={<ReportsAndAnalytics />} />
              <Route path='projects/new-project' element={<NewProject />} />
              <Route path='/projects/:url/:id/new-task' element={<NewTask />} />
              <Route path='/user-profile' element={<UserProfile />} />
              <Route path='/automate-documents' element={<AutomateDocs />} />
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
      {/* <p>Test GET request: {testGet}</p>
      <p>Test POST request: {testPost}</p> */}
    </div>
  );
}

export default App;