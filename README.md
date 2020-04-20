# Excel Competency Tracker Web Application
This project was developed for the Georgia Tech Excel Program.
The goal of this project was to help the Excel Program transfer the program's compentency tracking from paper to a digital format.

## Table of Contents
* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Release Notes for Beta Version of Excel Competency Tracker App (1.0)] (#release-notes)
  * [Current Features](#current-features)
  * [Bug Fixes](#bug-fixes)
  * [Known Bugs](#known-bugs)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Troubleshooting](#troubleshooting)

## About the Project
### Built With

* [Create React App](https://github.com/facebook/create-react-app) - The web framework used
* [MaterialUI](https://material-ui.com/) - React components for faster and easier web development.

## Release Notes
#### Current Features
  Website pages for: Login, Home, Competency Evaluation for an individual student, Management of Users/Comptencies/Classes&Advising under Admin Settings, Sidebar for page navigation

#### Bug Fixes
  * There was an issue with a datatable that constantly expanded that has been    resolved
  * Sidebar on website is now consistently rendered on every page
  * Issue with build error on AWS Amplify solved via adding .env~ files

#### Known Bugs
  * Dummy data is used throughout website, there is a need for API calls and connection to backend implementation
  * Due to use of dummy data, data does not always persist when pressing forward or back button in web browser

## Getting Started
First, if you do not have an IDE or text editor we would reccomend [WebStorm](https://www.jetbrains.com/webstorm/), which is free using your Georgia Tech email, or [Visual Studio Code](https://code.visualstudio.com/).

### Prerequisites
You will need:

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
git clone https://github.com/Excel-Competency-Tracker/master.git
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

5. Finally you should be ready to launch the app using yarn.
```console
yarn start
```

6. Open this link using your web browser: [http://localhost:3000](http://localhost:3000)

Now the application should be up and running!

### Troubleshooting

Generally, the command window will tell you what command needs to be entered in order to fix the error. Simply copy the command from the error message, and paste it into the terminal window and run the command.

The most common errors we encountered when deplying this on a new machine were sporadic dependency errors. Usually this is a quick fix. We reccomend looking at the terminal output window, and reading the error, for example, it might say "missing material-ui". To fix this you can type this into the terminal window:\
`yarn add material-ui
`\
\
If that does not work, try `npm add material-ui`\
\
If the terminal says command/package not found, try searching with google: `npm _________`\
and the name of the dependency that is not working, usually this will give you the correctly formatted command to input.  
