import janeSmith from "../assets/images/avatars/jane_smith.jpg";
import johnDoe from "../assets/images/avatars/john_doe.jpg";

const tasks =  
[
    {
    "id": 1,
    "status": "In Progress",
    "category": "Feature Devt",
    "priority": "High",
    "title": "Implement User Authentication",
    "description": "Develop user authentication system using JWT tokens.",
    "assigned_team_members": [
        {
            "name": "John Doe",
            "profile_pic_url": johnDoe
          },
          {
            "name": "Jane Smith",
            "profile_pic_url": janeSmith
          }
    ]
    },
    {
        "id": 2,
    "status": "To Do",
    "category": "Backend Devt",
    "priority": "Medium",
    "title": "Set Up Database Schema",
    "description": "Design and implement the database schema for task storage.",
    "assigned_team_members": [
        {
            "name": "Alice Johnson",
            "profile_pic_url": janeSmith
          },
          {
            "name": "Bob Brown",
            "profile_pic_url": johnDoe
          },
          {
            "name": "Jane Smith",
            "profile_pic_url": janeSmith
          }
    ]
    },
    {
        "id": 3,
        "status": "Done",
        "category": "Frontend Devt",
        "priority": "Low",
        "title": "Create Task Dashboard UI",
        "description": "Design and develop the user interface for displaying tasks.",
        "assigned_team_members": [
            {
                "name": "Emily Davis",
                "profile_pic_url": janeSmith
            }
        ]
    },
    {
        "id": 4,
        "status": "In Progress",
        "category": "UI Design",
        "priority": "Medium",
        "title": "Create Task Dashboard Wireframe",
        "description": "Design and develop the wireframe for task scheduler.",
        "assigned_team_members": [
            {
                "name": "Emily Davis",
                "profile_pic_url": janeSmith
              }
        ]
        }
]

export default tasks;