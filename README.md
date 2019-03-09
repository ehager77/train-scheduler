# train-scheduler

## Overview

This is a train scheduler that allow a train admin to add a train schedules to a database

## Requirements
- Take in user input of train name, destination, time of the first train (in military time) and arrival frequency.
- Store this information in Google Firebase so that the information can be viewed by anyone.
- Convert military time to civilian time via the Moment.js library.
- Use moment to calculate difference between current time and the time of the next game.
- jQuery 
- Google Firebase 
- HTML
- CSS
- JavaScript
- Moment.js

## Code Snippet 
```
var trainName = childSnapshot.val().name;
var destination = childSnapshot.val().destination;
var trainFreq = childSnapshot.val().frequency;

var firstTime = 0;

var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

var tRemainder = diffTime % trainFreq;
console.log(tRemainder);

var tMinutesTillTrain = trainFreq - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

```

## In  Action

![train gif](https://media.giphy.com/media/3kIXO3t7t9aeX0aYfn/giphy.gif)
