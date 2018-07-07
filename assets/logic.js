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

var database = firebase.database();

// Create Initial Values 
var trainName = "no name";
var destination = "";
var freq = 0;
var nextArrival = "";
var minsAway = 0;

// Snapshot of Current Page
database.ref().on("value", function (snapshot) {
  var val = snapshot.val();
  console.log(val);

  trainName = val.trainName;
  $("#nameDisplay").text(trainName);
  destination = val.destination;
  $("#destiantionDisplay").text(destination);


})

// adding data to firebase 
$("#submit-btn").on("click", function () {
  event.preventDefault();

  trainName = $("#newTrain").val().trim();
  destination = $("#newDestination").val().trim();
  freq = $("#newFreq").val().trim();

  console.log(trainName, destination, freq);

$("#table tr:last").after(trainName); 


})

database.ref().push({
trainName: trainName,
destination: destination,
freq: freq
})



