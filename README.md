# User-interaction-service
<br/>

#### API documentation : https://bit.ly/UI-Service-g17

This is a Node Express Mongo application which is made along with User-Service and Content-Service.

### To start the service 

Locate the service in the terminal.

If not already created , create a bridge network to connect docker containers of all the services .

`docker network create bridge-network`

After the bridge network has been created , use the command below to run the service , make sure your port 3001 is free

`docker-compose up --build -d`

This service contains two containers - 

**1) ui :** Node Express Backend to execute read and like operations on ui(user-interaction). A list of all APIs can be found here https://bit.ly/UI-Service-g17 .Service makes use of port 3001 which has to be free.


**2) mongoui :** A mongo database to store uis. Schema of the database can be found here https://github.com/Yash-g17/User-interaction-service/blob/main/models/ui.model.js . Service makes use of port 27017 which is an internal port.


### To stop the service gracefully

Simply go to the terminal where you started the service and run

`docker-compose down`
<br/>
<br/>
<br/>
<br/>
<br/>
