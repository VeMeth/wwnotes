# Note Tool for Wwes 


## Todo

- ~~Relationship between events and notes~~
- ~~UI~~
- ~~API Integration~~
- Phase handling, connected to the archive for dead/living state of players
- Logic on top of checks to offer the approriate check options for events

## Issues

 - None at the moment

 ## Install
 - Set MongoDB parameters in .env file
 - npm install
 - cd svelte
 - npm install

 # Run
 - Run npm start in root directory for nestjs backend
 - run npm run dev in ./svelte for Interface

 # Access points
  - http://localhost:5000/ for UI
  - http://localhost:3000/api for API

# .ENV Parameters 
 - MONGO_HOST=
 - MONGO_PASSWORD=
 - MONGO_USER=
 - MONGO_DATABASE=
 - MONGO_PORT=27017
 - API_HOST=localhost