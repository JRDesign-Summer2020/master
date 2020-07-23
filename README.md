# Excel Competency Tracker Web Application
![logo](https://github.com/Excel-Competency-Tracker/master/blob/master/src/img/georgia-tech-excel-logo.png)\
Junior Design project for GT excel

## Table of Contents
* [Release Notes Excel Competency Tracker App (1.0)](#release-notes)
  * [Current Features](#current-features)
  * [Bug Fixes](#bug-fixes)
  * [Known Bugs](#known-bugs)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Troubleshooting](#troubleshooting)



## Release Notes
#### Current Features
  * Evaluations page gets students assigned to you based on your role
  * Student Competencies page gets evaluated unevaluated competences
  * Can add an evaluation after saving
  * All Competencies page pulls data from the database
  * Second test database added

#### Bug Fixes
  * Competencies re-render automatically
  * Student Competencies now has a unique url path which allows it to successfully re-render on refresh/forward & back button.


#### Known Bugs
  *  All API calls data is not displayed on webpage
  * Issues with some original lambda functions and authorization
  * Lambda functions to test database tables need to be fixed


### Prerequisites
* nodeJS
* git
* yarn (or npm, if preferred)

#### Mac

Open up a terminal window and copy and paste this:
```console
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

Then type this into the terminal window:
```console
brew install git
```

Next, type this into the terminal window:
```console
brew install node
```

Finally, type this into the terminal window:
```console
brew install yarn
```

### Windows

Go to [npm's website](https://www.npmjs.com/get-npm) and follow the download link.

Then, navigate to [git's website](https://git-scm.com/download/win) and download the appropriate Windows version.

Finally, go to [yarns website](https://classic.yarnpkg.com/en/docs/install/#windows-stable) and download the latest version of yarn.

### Installation

1. Find a suitable location for the files and then clone the repo using git.
```sh
git clone https://github.com/JRDesign-Summer2020/master.git
```

2. Open preferred text editor and open the cloned files as a project folder

3. Open the IDE console tab, or open up a terminal or command prompt window. Then, if using terminal or command prompt, navigate to the project's home directory then type this command:
```console
npm install recharts
```

4. Next you will need to run a command in the same window to install all of the dependencies using yarn:
```console
yarn install
```

5. After that you will have to install crypto to access the API
```console
npm install crypto-js --save
```

6. Finally, you need to add aws amplify using the command line:
```console
npm install aws-amplify --save
```

### Run instructions
1. In the source directory of the project type:
```console
npm start
```

1. Open the link: [http://localhost:3000](http://localhost:3000)

#### Front End (deployed Amplify website):
1. Go to this link: [https://master.d19x1ye7qes4du.amplifyapp.com/](https://master.d19x1ye7qes4du.amplifyapp.com/)

#### Back End (deployed API):
1. To see the API, lambda functions, user permissions, etc. log in to the AWS Management Console with root access, use the credentials (Remember to change the billing method):
  * Email: Your Scheller email
  * Password: GTexcel2020

2. If you are making ANY changes you should be using the Administrator account (Remember to change password). On the AWS Management Console sign in page, choose IAM user. Input the credentials:
  * Account ID: 340421050030
  * IAM user name: Administrator
  * Password: GTexcel2020 
  
 3. If you want your own version of the API (not recommended) you can download an OpenApi 3.0 or Swagger yaml file from the API Gateway. In your own account AWS account, you can create a new REST API and use the downloaded yaml file. If you choose this method you will also have to export any lambda functions and roles/policies.


### Troubleshooting

If there seems to be an issue with calling the API, open the console using ctrl+shift+i or ctrl+shift+j. Under the network tab click on the name of the api call (if something went wrong it will be red text) and double click it to see the error. Then make the appropriate fixes to the lambda function. 
and the name of the dependency that is not working, usually this will give you the correctly formatted command to input.  
