# G/O Host MEAN App #

Simple MEAN App that manages sites provided in JSON file output from the go-host.py script

### Set Up Locally ###

~~~~
npm install 
~~~~

### Import Database ###
Import data into your mongo database. Create a database named 'gohost' and a colleciton named 'sites'. Import documents located in '~/mock/mock_data.json'

### Start Server ###

~~~~
mongod // To start mongo daemon
npm run start or nodemon(if installed) 
~~~~


**Have Fun! Create an entry, delete and view all of them. Update route soon to come**
