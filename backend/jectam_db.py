import pymongo
from pymongo import MongoClient

# mongodb://localhost:27017
uri = 'mongodb://localhost:27017'
client = pymongo.MongoClient(uri)

commentsDB = client["commentsDB"]
comments_collection = commentsDB['comments']
notificationsDB = client["notificationsDB"]
notifications_collection = notificationsDB['notifications']
projectsDB = client["projectsDB"]
projects_collection = projectsDB['projects']
assignee_collection = projectsDB['projects_task_assignee']
team_members_collection = projectsDB['projects_project_team_members']
randa_DB = client["randaDB"]

# assignees = assignee_collection.find({'customuser_id': 1})
# print(list(assignees))

# print(assignee_collection)

# assignees = assignee_collection.find({})
# for document in assignees:
#     print(document)


# #Define Db Name
# dbname = client['admin']

# #Define Collection
# collection = dbname['mascot']