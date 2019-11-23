// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyAa1QPFhqcMLbtwUm2Qg7Z3sY9iJRH5UKs",
    authDomain: "school-project-91f27.firebaseapp.com",
    databaseURL: "https://school-project-91f27.firebaseio.com",
    projectId: "school-project-91f27",
    storageBucket: "school-project-91f27.appspot.com",
    messagingSenderId: "814684213245",
    appId: "1:814684213245:web:2e6bfb56c3eaa041fe9394",
    measurementId: "G-8HES5V940X"
  };

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-employee-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#employee-name-input").val().trim();
  var destination = $("#role-input").val().trim();
  var frequency = $("#start-input").val().trim();
  var arrival = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    where: destination,
    speed: frequency,
    tripArrival: arrival
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#employee-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().where;
  var frequency = childSnapshot.val().speed;
  var arrival = childSnapshot.val().tripArrival;

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(arrival)
  );

  // Append the new row to the table
  $("#employee-table > tbody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.