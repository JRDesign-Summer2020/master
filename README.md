# Excel Competency Tracker Web Application
This project was developed for the Georgia Tech Excel Program.
The goal of this project was to help the Excel Program transfer the program's compentency tracking from paper to a digital format.

## Release Notes for beta version of Excel Competency Tracker App (1.0)
#### Current Features
  Website pages for: Login, Home, Competency Evaluation for an individual student, Management of Users/Comptencies/Classes&Advising under Admin Settings, Sidebar for page navigation

#### Bug Fixes
  * There was an issue with a datatable that constantly expanded that has been    resolved
  * Sidebar on website is now consistently rendered on every page
  * Issue with build error on AWS Amplify solved via adding .env~ files

#### Known Bugs
  * Dummy data is used throughout website, there is a need for API calls and connection to backend implementation
  * Due to use of dummy data, data does not always persist when pressing forward or back button in web browser

## Built With

* [Create React App](https://github.com/facebook/create-react-app) - The web framework used
* [MaterialUI](https://material-ui.com/) - React components for faster and easier web development.

## Table of Contents
* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)

## About the Project
### Built With

* [Create React App](https://github.com/facebook/create-react-app) - The web framework used
* [MaterialUI](https://material-ui.com/) - React components for faster and easier web development.

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

3. 

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
