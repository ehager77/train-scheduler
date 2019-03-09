$(document).ready(function () {

    // 1. Initialize Firebase
    var config = {
        apiKey: "AIzaSyC8qJlAXROE1z9kcR18GFqTrELrUoUp1UM",
        authDomain: "bootcamp-b88d6.firebaseapp.com",
        databaseURL: "https://bootcamp-b88d6.firebaseio.com",
        projectId: "bootcamp-b88d6",
        storageBucket: "bootcamp-b88d6.appspot.com",
        messagingSenderId: "765456231024"
    };
    firebase.initializeApp(config);

    var database = firebase.database();



    // First Time (pushed back 1 year to make sure it comes before current time)

    // 2. Button for adding Trains
    $("#add-train").on("click", function (event) {
        event.preventDefault();
        console.log(event);

        // Grabs user input
        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = $("#firstTrain").val().trim();
        var trainFreq = $("#trainFrequency").val().trim();

        // Creates local "temporary" object for holding train data
        var newTrain = {
            name: trainName,
            destination: destination,
            start: firstTrain,
            frequency: trainFreq
        };

        // Uploads train data to the database
        database.ref().push(newTrain);

        // Clears all of the text-boxes
        $("#trainName").val("");
        $("#dest-input").val("");
        $("#firstTrain").val("");
        $("#trainFrequency").val("");
    });

    // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function (childSnapshot) {

        console.log(childSnapshot.val());

        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var trainFreq = childSnapshot.val().frequency;


        // Declare variable
        var trainFreq;

        // Time is to be entered on the entry form
        var firstTime = 0;

        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % trainFreq;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = trainFreq - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));


        // Add each train's data into the table
        $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + trainFreq +
            "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
    });

});
