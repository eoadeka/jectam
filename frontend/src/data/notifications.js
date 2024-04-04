import janeSmith from '../assets/images/avatars/jane_smith.jpg'
import johnDoe from '../assets/images/avatars/john_doe.jpg'

const notifications = [
    {
        "id": 1,
        "type": "added_new_tags",
        "member_name": "Jane Smithon",
        "member_profile_pic": janeSmith,
        "timeStamp": "1 hour ago",
        "project_name": "AutoTasker",
        "category": "projects",
        "read": false
    },
    {
        "id": 2,
        "type": "asked_to_join",
        "member_name": "John Doesn't",
        "member_profile_pic": johnDoe,
        "timeStamp": "3 hours ago",
        "project_name": "AutoTasker", 
        "category": "tasks",
        "read": false
    },
    {
        "id": 3,
        "type": "mentioned_you",
        "member_name": "Jane Smithe",
        "member_profile_pic": janeSmith,
        "timeStamp": "10 hours ago",
        "project_name": "Synthify", 
        "category": "projects",
        "read": true
    },
    {
        "id": 4,
        "type": "task_assigned",
        "member_name": "Jane Smithe",
        "member_profile_pic": janeSmith,
        "timeStamp": "10 hours ago",
        "project_name": "Synthify", 
        "category": "projects",
        "read": true
    },
    {
        "id": 5,
        "type": "deadline_approaching",
        "timeStamp": "10 hours ago",
        "project_name": "Synthify", 
        "category": "projects",
        "read": true
    },
    {
        "id": 6,
        "type": "deadline_passed",
        "timeStamp": "10 hours ago",
        "project_name": "Synthify", 
        "category": "projects",
        "read": true
    },
    {
        "id": 7,
        "type": "commented",
        "member_name": "Jane Smithe",
        "member_profile_pic": janeSmith,
        "timeStamp": "10 hours ago",
        "project_name": "Synthify", 
        "category": "projects",
        "read": true
    },
    {
        "id": 8,
        "member_name": "Jass Alasko",
        "member_profile_pic": janeSmith,
        "timeStamp": "Feb 8",
        "project_name": "Quantum",
        "category": "archived",
        "read": true
    },
]

export default notifications;