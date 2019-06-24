# Table of contents
* [WikiLactic](README.md#wikilatic)
* [Technologies](README.md#technologies)
* [Install](README.md#install)

# WikiLatic
Wikilatic is a web application that illustrates statistics about a set of Wikipedia's article in the most convinience way.

# Technologies
* NodeJs
* ExpressJs
* AngularJs

# Install

## IDE
- To run this project, first install the IntelliJ IDEA Community.

## Secondly, install the following software:
### 1. Node.js 
- Download the installer from Node.js web site https://nodejs.org/en/ download/. For example, you may want to choose 64-bit .msi installer.
- Run the installer (the .msi file you downloaded.) • Next, Next, Next (make sure you accept the License Agreement). • Restart your computer.

### 2. Express.js
- The official guide for installing express can be found at this Link https://expressjs.com/en/starter/installing.html).

### 3 MongoDB
- An official guide is provided by MongoDB https://docs.mongodb.com/manual/ tutorial/install-mongodb-on-windows/

### 4 Robo 3T
- Download Robo 3T

## Process the file
### Import data to MongoDB
- Access the directory where you install the MongoDB and go to the bin folder using with terminal.
- Start MongoDB with the following commandline: "mongodb".
- Import the dataset to the database with the following commandlines
    + Import revisions for %i in (<Dir where you put the dataset>\Dataset\revisions\*) do mongoimport --file %i --type json --db wikipedia --collection revisions --jsonArray
    + Import Admin account: mongoimport --db wikipedia --collection admins --type tsv --fields user --file <Dir where you put the dataset>\Dataset\Admin.txt
    + Import Bots account: mongoimport --db wikipedia --collection bots --type tsv --fields user --file <Dir where you put the dataset>\Dataset\Bot.txt
  
### Open the backend and frontend with IntelliJ IDEA
- Backend
![Backend](https://github.com/Jordan-Ly/WikiLatic/blob/master/image/backend.png)

- Frontend
![Frontend](https://github.com/Jordan-Ly/WikiLatic/blob/master/image/frontend.png)

### Change String field in the database to Date
- Open Robo3T and connect to the localhost.
- Access the "revisions" collection in the "Wikipedia" database
- Type the following commandline in the Robo3T: db.revisions.find().forEach(function(doc){ doc.timestamp = new ISODate(doc.timestamp); db.revisions.save(doc)
});

![Processdatabase](https://github.com/Jordan-Ly/WikiLatic/blob/master/image/Processdatabase.png)

## Open the Wikilatic page
- Open your browser and access "http://localhost:4200" URL.

![Homepage](https://github.com/Jordan-Ly/WikiLatic/blob/master/image/Wikilatic.png)


