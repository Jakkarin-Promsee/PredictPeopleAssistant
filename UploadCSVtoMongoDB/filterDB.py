import pandas as pd

#read csv file in this folder
df = pd.read_csv(r'UploadCSVtoMongoDB\data.csv')

# Convert the 'datetime' column to pandas datetime objects
df['date'] = pd.to_datetime(df['date'], utc=True)

# Extract date and time components, Add it to df in new column
df['dater'] = df['date'].dt.date
df['time'] = df['date'].dt.time

# Extract hour and minute components, Add it to df in new column
df['hour'] = df['date'].dt.hour
df['minute'] = df['date'].dt.minute

# Filter the data for the specific day and other conditions
df_working_during_semester = df[
    (df['is_weekend'] == 0) &
    (df['is_holiday'] == 1) &
    (df['is_during_semester'] == 1)
]

# Cleaning column that unused.
df_working_during_semester = df_working_during_semester[['dater', 'time', 'number_people']]

# Optionally, reset the index if needed (index will reset, start to  0 again)
df_working_during_semester.reset_index(drop=True, inplace=True)

# Count amount of data from each day
count_date = df_working_during_semester['dater'].value_counts()


# Keep sample day for use in future
day_sample = 10

#Create datafram center
DB = pd.DataFrame(columns=df_working_during_semester.columns)


for date_idx in range(day_sample):
  date = count_date.index[date_idx]

  # Filter the data for the specific day and other conditions
  filtered_df = df_working_during_semester[
      df_working_during_semester['dater'] == date
  ]

  DB = pd.concat([DB, filtered_df], ignore_index=True)

DB = DB.astype({
    'dater': 'object',
    'time': 'object',
    'number_people': 'int64'
})

# Define the new file name
new_file_name = 'UploadCSVtoMongoDB/df_working_during_semester.csv'

# Save the DataFrame to the new CSV file
DB.to_csv(new_file_name, index=False)

print(DB.head(5))
