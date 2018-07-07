# deanery-frontend
Frontend for an example app of virtual deanery.
Server running on Heroku: [Server](https://frozentear7-deanery-example.herokuapp.com/)
Heroku server without any frontend interaction available for now

## About the app
The app for the moment being has such functionalities as:
- managing users (students and teachers)
- managing subjects - subjects have teachers that teach them and students
- managing grades - teachers can assign grades to students that study subjects they teach

## Other
The app uses mongoDB in cloud at https://mlab.com.
Users get jwt tokens when signed in, which are later used to authorize their actions.
At the moment there is no restrictions for students nor teachers. Later on admins will have full authority of the app, students will be able to view their profiles with subjects they study and their grades and teachers will be able to view subjects they teach and assign grades to students.

### Author: [Paweł Mendroch](https://github.com/FrozenTear7)
