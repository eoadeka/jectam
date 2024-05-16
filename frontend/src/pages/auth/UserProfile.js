import React, { useEffect, useState } from 'react';
import Container from '../../components/layout/Container';
import axios from 'axios';
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { PageHeaderDiv, PageTitle, PageTitleDiv, PageTitleSpan } from '../../components/layout/PageHeader';

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'projects_tasks', label: 'Assigned Projects & Tasks' },
    { id: 'roles_permissions', label: 'Roles & Permissions' }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };


  useEffect(() => {

    const refreshToken = localStorage.getItem('access_token');

   if (!refreshToken){
    window.location.replace("/login");
   } else {
    const getUserDetails = async () => {
      try {
        // Retrieve JWT token from local storage (assumed to be stored as 'jwtToken')
        const accessToken = localStorage.getItem('access_token');

        // Send authenticated request to an endpoint that requires authentication
        // const response = await axios.get('http://localhost:8000/accounts/profile/', {
        const response = await axios.get('https://jectam-backend.onrender.com/accounts/profile/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'accept': 'application/json'
          },  withCredentials: true
        });

        const data = response.data;
        // console.log(data)
        setUserDetails({
          id: data.id,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          role: data.role,
          profile_picture: data.profile_picture,
        });
        // console.log(userDetails.email)
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    getUserDetails();
  }
  }, []);


  return (
    <Container>
      <PageHeaderDiv>
        <PageTitleDiv>
          <PageTitle>User Profile</PageTitle>
        </PageTitleDiv>
        <PageTitleDiv style={{marginTop: "1.5em"}}>
          <PageTitleSpan>
            <AvatarGroup>
              <Avatar alt={userDetails?.first_name} src={`http://localhost:8000${userDetails?.profile_picture}`} sx={{ width: 60, height: 60 }} />
            </AvatarGroup>
          </PageTitleSpan>
          <PageTitleSpan style={{marginRight: "1em", marginTop:"0.3em"}}>
              <span  style={{ fontSize:"1.1em"}}>{userDetails?.first_name} {userDetails?.last_name}</span>
              <p style={{marginTop:"0.3em", fontSize:"0.7em"}}> {userDetails?.email}</p>
              <p style={{marginTop:"-1.3em",fontSize:"0.7em"}}> {userDetails?.role}</p>
          </PageTitleSpan>
        </PageTitleDiv>
      </PageHeaderDiv>

      <div className='dashboard-cat'>
        <>
          {tabs.map(tab => (
            <span
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              style={{
                borderBottom: activeTab === tab.id ? '2px solid black' : 'none',
                marginRight: "1em", padding: "0 1em 1em 0",
                cursor: 'pointer',
                textAlign:'left',
                // backgroundColor: activeTab === tab.id ? '#f0f0f0' : 'inherit',
                outline: 'none',
              }}
            >
              {tab.label}
            </span>
          ))}
        </>
      </div>

      {activeTab === 'profile' && <UserProfileInfo userDetails={userDetails} />}
      {activeTab === 'projects_tasks' && <AssignedProjectsTasks />}
      {activeTab === 'roles_permissions' && <RolesPermissions />}

    </Container>
  );
}

const UserProfileInfo = ({ userDetails }) => {
  return (
    <div style={{marginTop: "2em"}}>
      <h2>User Profile Information</h2>
      {/* Display user profile information here */}
      <span>{userDetails?.email}</span><br></br>
      <span>{userDetails?.role}</span>
      <span>{userDetails?.first_name}</span>
      <span>{userDetails?.last_name}</span>
    </div>
  );
};

const AssignedProjectsTasks = () => {
  return (
    <div style={{marginTop: "2em"}}>
      <h2>Assigned Projects & Tasks</h2>
      {/* Display assigned projects and tasks here */}
    </div>
  );
};

const RolesPermissions = () => {
  return (
    <div style={{marginTop: "2em"}}>
      <h2>Roles & Permissions</h2>
      {/* Display roles and permissions here */}
    </div>
  );
};


export default UserProfile;