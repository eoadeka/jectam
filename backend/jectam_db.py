import os
import pymongo
from pymongo import MongoClient
from pymongo.server_api import ServerApi


# # Create a new client and connect to the server
# client = MongoClient(uri, server_api=ServerApi('1'))

# # Send a ping to confirm a successful connection
# try:
#     client.admin.command('ping')
#     print("Pinged your deployment. You successfully connected to MongoDB!")
# except Exception as e:
#     print(e)

# mongodb://localhost:27017
uri = 'mongodb://localhost:27017'
# uri = os.environ.get('MONGO_DB_URI')
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