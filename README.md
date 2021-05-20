# Code challenge Eduardo Magaldi

## How to run

1. Install [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/).
1. Run ```npm install```.
1. Run ```npm start```.
1. Navigate to [http://localhost:3000/](http://localhost:3000/).
1. For running end to end test, keep ```npm start``` running and run ```npm test``` on another window.

## Comments

### General comments
1. Made with React, React Router, Typescript and Bootstrap.
2. URLs slightely changed to become more user friendly.

### Data model
Some improvements were made to the data models, like creating some objects instead of arrays for instantly finding info of a quizz via its id. You can see how models are dealt with at the data service (```services/data.ts```). About persisting on the database, maybe a third table with 3 foreign keys: ```question_id```, ```user_id```, and ```answer_id```, making the combination of all of them into it's unique id, so there is no saving of duplicates.

### Infrastructure
In case the app uses server-side rendering for better performance, a small linux AWS EC2 instance is enough. If it's not the case, all static files served from a CDN like AWS S3 is best because of very low maintenance. As of security measures, avoiding leaving sensitive information on the disk of the server, making use of environment variables, is ideal.

### Backend
Since I'm only proficient in JavaScript, using Node.js with express framework is what I've been doing lately. Mostly preffering noSQL databases if it's not the case of relational data, otherwise PostgreSQL does have good features. Since the backends I built are simple, haven't reached scalability and complex arquitecture problems.




