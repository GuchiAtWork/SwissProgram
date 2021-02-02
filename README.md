# ~~The Swiss Program~~
## The Personal Diary

### How to run this program ###
Prerequisities 
- Installed PostgreSQL
- Installed NPM
- Installed NodeJS

How to setup program
- Create a .env file
- Create a new database in PostgreSQL - Name left to you, just remember to add database user, password and database name in .env file
- Insert a Secret Key for JWT in .env file
- Make sure you install all dependencies by running this command, `npm i`
- First, run the migrate command, `npm run migrate`
- Second, run the seed command, `npm run seed`
- Finally, run the server, `npm run start`

### API Documentation ###
The API Documentation can be found when you start the server and go to endpoint `/docs`. Alternatively, you can also fork this repository and open up index.html inside the directory `doc/schema/index.html`.
