from pymongo import MongoClient

# Define the record to be inserted
record = {
    'dater': '2016-08-25',
    'time': '00:04:52',
    'number_people': 59
}

# Connect to MongoDB
mongo_uri = 'mongodb://localhost:27017/'  # Update with your MongoDB URI
client = MongoClient(mongo_uri)
db = client['density_of_people']  # Replace with your database name
collection = db['test']  # Replace with your collection name

# Insert the record into MongoDB
collection.insert_one(record)

print("Record uploaded to MongoDB successfully.")
