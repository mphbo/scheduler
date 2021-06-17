# Interview Scheduler

Interview Scheduler is a single page application that allows users to create, edit or delete appointments. The project allowed me to practice and improve my React skills with various hooks, custom hooks and components. Getting the front end online and attaching it to the api which held the data was very exciting. Can be viewed at https://the-appointment-scheduler.netlify.app

## Screenshots

### Hovering on appointment
!["Hovering on appointment"](https://raw.githubusercontent.com/mphbo/scheduler/master/docs/schedulerHover.png)

### Editing or creating appointment
!["Editing or deleting appointment"](https://raw.githubusercontent.com/mphbo/scheduler/master/docs/schedulerEdit.png)

### Confirm message before deletion
!["Confirm message before deletion](https://raw.githubusercontent.com/mphbo/scheduler/master/docs/schedulerConfirm.png)

### Spinning delete indicator
!["Spinning delete indicator](https://raw.githubusercontent.com/mphbo/scheduler/master/docs/schedulerDeleting.png)


## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

##Extra Features

* Implemented the useReducer hook as opposed to useState.

* Used a webSocket to allow users to stay connected to eachother and see messages displayed in real time.

* Used CircleCI, Netlify and Heroku to automate a lot of the production and testing process.