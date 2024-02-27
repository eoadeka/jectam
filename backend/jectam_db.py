import pymongo
from pymongo import MongoClient

# mongodb://localhost:27017
uri = 'mongodb://localhost:27017'
client = pymongo.MongoClient(uri)

notificationsDB = client["notificationsDB"]
notifications_collection = notificationsDB['notifications']
projectsDB = client["projectsDB"]
projects_collection = projectsDB['projects']
randa_DB = client["randaDB"]


# #Define Db Name
# dbname = client['admin']

# #Define Collection
# collection = dbname['mascot']