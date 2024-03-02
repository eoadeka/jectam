import janeSmith from "../assets/images/avatars/jane_smith.jpg";
import johnDoe from "../assets/images/avatars/john_doe.jpg";

const tasks =  
[
    {
    "id": 1,
    "status": "In Progress",
    "category": "Backend Devt",
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
    ],
    "sub_tasks": [
      {
        "sub_task": " sub Task:Implement User Authentication"
      }
    ],
    "attachments": [
      {
        "attachment": " attachment:Implement User Authentication"
      }
    ],
    "activities": [
      {
        "activity": " activity:Implement User Authentication"
      }
    ],
    "histories": [
      {
        "history": " history:Implement User Authentication"
      }
    ],
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
    ],
    "sub_tasks": [
      {
        "sub_task": " sub Task:Set Up Database Schema"
      }
    ],
    "attachments": [
      {
        "attachment": " attachment:Set Up Database Schema"
      }
    ],
    "activities": [
      {
        "activity": " activity:Set Up Database Schema"
      }
    ],
    "histories": [
      {
        "history": " history:Set Up Database Schema"
      }
    ],
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
        ],
        "sub_tasks": [
          {
            "sub_task": " sub Task:Create Task Dashboard UI"
          }
        ],
        "attachments": [
          {
            "attachment": " attachment:Create Task Dashboard UI"
          }
        ],
        "activities": [
          {
            "activity": " activity:Create Task Dashboard UI"
          }
        ],
        "histories": [
          {
            "history": " history:Create Task Dashboard UI"
          }
        ],
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
        ],
        "sub_tasks": [
          {
            "sub_task": " sub Task:Create Task Dashboard Wireframe"
          }
        ],
        "attachments": [
          {
            "attachment": " attachment:Create Task Dashboard Wireframe"
          }
        ],
        "activities": [
          {
            "activity": " activity:Create Task Dashboard Wireframe"
          }
        ],
        "history": [
          {
            "history": " history:Create Task Dashboard Wireframe"
          }
        ],
        }
]

export default tasks;