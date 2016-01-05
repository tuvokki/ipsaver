# Mereorized ipsaver

> Save your ip, just because it's possible. This time with the Meteor framework

## Install
- Make sure you have [Meteor](https://www.meteor.com/install) installed, on OSX:

`curl https://install.meteor.com/ | sh`

- Install the scaffolding tool iron-cli which is available on GitHub. Install is done via command line:

`npm install -g iron-meteor`

- Clone the github repo:

`git clone git@github.com:tuvokki/ipsaver.git`

- Checkout this branch  (while this is a branch):

`git checkout new-lister`

- Skip this step or set your local mongo and database:

`export MONGO_URL=mongodb://localhost:27017/[yourdb]`

- run the app with iron:

`iron run`

- or cd into `app` and run as meteor app:

`meteor`

- open url [localhost:3000](http://localhost:3000/)

## Add data from the frontend or the console:

from mongo console: `db.iphits.insert({host:"console",ip:"127.0.0.1",msg:"from mongo console",date:Date.now()})`

## Author

**Wouter Roosendaal**
 
+ [github/tuvokki](https://github.com/tuvokki)
+ [twitter/tuvokki](http://twitter.com/tuvokki) 

## License
Copyright (c) 2015 Wouter Roosendaal, contributors.  
