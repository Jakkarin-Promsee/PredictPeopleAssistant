import pandas as pd
from pymongo import MongoClient

datagbase_name = 'density_of_people'
collection_name = 'weekend'

# Load your original DataFrame
df = pd.read_csv(r'UploadCSVtoMongoDB\df_working_during_semester.csv')

# Connect to MongoDB
mongo_uri = 'mongodb://localhost:27017/'  # Update with your MongoDB URI
client = MongoClient(mongo_uri)
db = client[datagbase_name]  # Replace with your database name
collection = db[collection_name]  # Replace with your collection name

# Convert DataFrame to a dictionary
data_dict = df.to_dict(orient='records')

# Insert data into MongoDB
collection.insert_many(data_dict)

print("Data uploaded to MongoDB successfully.")
