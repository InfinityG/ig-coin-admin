igcoin-admin
============

A gateway application built in AngularJS, used to demonstrate the redemption and assignment of digital "crypto-rewards" to users. 

The application uses a Sqlite backend to record user registrations and transaction records. It communicates with the [ig-coin-api](https://github.com/InfinityG/ig-coin-api) RESTful API to manage reward assignment and redemption on the Ripple network.

Installation
------------
The application uses the Rack web server (Ruby based). Installation is done as follows:

- install ruby locally (see https://www.ruby-lang.org/en/installation/)
- install git locally (eg: http://git-scm.com/download/mac for OSX)
- install the bundler gem via 'gem install bundler'
- create a directory for the project (eg: 'ig-coin-admin')
- clone the project from github via 'git clone https://github.com/InfinityG/ig-coin-admin.git ig-coin-admin'
- cd to the root of the new directory
- run 'bundler install' (this will install the dependencies required by the project, eg: rack)

Running the application
-----------------------
- to run the web server on port 8001, execute 'rackup -p 8001'
- you will now be able to browse to the site via 'http://localhost:8001'
 
Notes
-----
- This is a prototype application and is NOT intended for production use
- The steps indicated above are for running the application in an INSECURE mode.  Further steps should be taken to run this via SSL if hosting on a public facing server (such as on EC2)
