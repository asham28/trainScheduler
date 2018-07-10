// Initializing Firebase 
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAujA9d7S6ehTa-l6qh9nX8jcHzficq-GE",
  authDomain: "trainscheduler-7f506.firebaseapp.com",
  databaseURL: "https://trainscheduler-7f506.firebaseio.com",
  projectId: "trainscheduler-7f506",
  storageBucket: "",
  messagingSenderId: "374812690144"
};
firebase.initializeApp(config);


//MAIN JS FUNCTIONS
$(document).ready(function () {
  // Link to Firebase
  var database = firebase.database();

  // SETUP VARIABLES 
  // =================================
  // Create Initial Values 
  var trainName = " ";
  var destination = " ";
  var trainTimeInput = 0;
  var frequencyInput = 0;

  // MAIN PROCESS: ADDING NEW TRAIN
  // =================================
  // adding data to firebase 
  $("#submit-btn").on("click", function (event) {
    event.preventDefault();

    // Assign form inputs into variables 
    trainName = $("#trainNameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
    frequencyInput = $("#frequencyInput").val().trim();

    // create object for firebase
    var newTrain = {
      name: trainName,
      destination: destination,
      trainTime: trainTimeInput,
      frequency: frequencyInput
    }

    // connect train info to firebase 
    database.ref().push(newTrain);

    // clear textboxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#trainTimeInput").val("");
    $("#frequencyInput").val("");

  });
  
  //MAIN PROCESS : SNAPSHOT AND UPDATING TABLE
  // ===========================================
  database.ref().on("child_added", function (childSnapshot, prevChildKey) {
    //for testing
    console.log(childSnapshot.val());

    // assign firebase variables to snapshots to use as shorthand
    var firebaseName = childSnapshot.val().name;
    var firebaseDestination = childSnapshot.val().destination;
    var firebaseTrainTimeInput = childSnapshot.val().trainTime;
    var firebaseFrequency = childSnapshot.val().frequency;

    // Time Conversions 
    var firstTimeConverted = moment(firebaseTrainTimeInput, "hh:mm").subtract(1, "years");
    var diffTime = moment().diff(moment.unix(firstTimeConverted), "minutes");
    var timeRemainder = diffTime % firebaseFrequency;
    var minutes = firebaseFrequency - (-timeRemainder);
    var nextTrainArrival = moment().add(minutes, "minutes").format("hh:mm");

    //Test for correct times and info
    console.log(moment().format("hh:mm A"));
    console.log("Minutes " + minutes);
    console.log("Next Arrival " + nextTrainArrival);
    console.log("Frequency " + firebaseFrequency);
    console.log("Remainder " + timeRemainder);

    // Append train info to table on page 
    $("#trainTable").append("<tr><td>" + firebaseName + "</td><td>" + firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

  });
});