
var config = {
  apiKey: "AIzaSyDaLgJMFON0G4H2Yr_TjCpYz1JH330LRKw",
    authDomain: "clickbutton-cbfd5.firebaseapp.com",
    databaseURL: "https://clickbutton-cbfd5.firebaseio.com",
    projectId: "clickbutton-cbfd5",
    storageBucket: "clickbutton-cbfd5.appspot.com",
    messagingSenderId: "896242567353",
    appId: "1:896242567353:web:17903a48c9ff7aa97fb368"
};

firebase.initializeApp(config);

var database = firebase.database();


$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDes = $("#destination-input").val().trim();
  var trainStart = moment($("#first-input").val().trim(), "HH:mm").format("X");
  var trainFreq = $("#frequency-input").val().trim();

 // firebase data
  var newTrain = {
    name: trainName,
    destination: trainDes,
    start: trainStart,
    frequency: trainFreq
  };

  
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);


  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#frequency-input").val("");
});


database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDes = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainFreq = childSnapshot.val().frequency;

  // Employee Info
  console.log(trainName);
  console.log(trainDes);
  console.log(trainStart);
  console.log(trainFreq);

  
  var firstTime = moment.unix(trainStart).format("HH:mm");
  console.log(firstTime)

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
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");
    console.log("ARRIVAL TIME: " + nextTrain);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDes),
    $("<td>").text(trainFreq),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain) 
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});


