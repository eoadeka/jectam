import janeSmith from '../assets/images/avatars/jane_smith.jpg'
import johnDoe from '../assets/images/avatars/john_doe.jpg'

const notifications = [
    {
        "id": 1,
        "type": "tag",
        "member_name": "Jane Smithon",
        "member_profile_pic": janeSmith,
        "timeStamp": "1 hour ago",
        "project_name": "AutoTasker",
        "category": "projects",
        "read": false
    },
    {
        "id": 2,
        "type": "button",
        "member_name": "John Doesn't",
        "member_profile_pic": johnDoe,
        "timeStamp": "3 hours ago",
        "project_name": "AutoTasker", 
        "category": "tasks",
        "read": false
    },
    {
        "id": 3,
        "type": "comment",
        "member_name": "Jane Smithe",
        "member_profile_pic": janeSmith,
        "timeStamp": "10 hours ago",
        "project_name": "Synthify", 
        "category": "projects",
        "read": true
    },
    {
        "id": 4,
        "member_name": "Jass Alasko",
        "member_profile_pic": janeSmith,
        "timeStamp": "Feb 8",
        "project_name": "Quantum",
        "category": "archived",
        "read": true
    },
]

export default notifications;