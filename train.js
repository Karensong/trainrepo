/* global firebase moment */
// Steps to complete:
// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed
// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyDun8k4KCBXWHJmGwTTJR6-DMN53jMlGss",
    authDomain: "trainfirebase-ba5d7.firebaseapp.com",
    databaseURL: "https://trainfirebase-ba5d7.firebaseio.com",
    projectId: "trainfirebase-ba5d7",
    storageBucket: "trainfirebase-ba5d7.appspot.com",
    messagingSenderId: "416132897891"
  };
  firebase.initializeApp(config);

// var config = {
//   apiKey: "AIzaSyA_QypGPkcjPtylRDscf7-HQl8ribnFeIs",
//   authDomain: "time-sheet-55009.firebaseapp.com",
//   databaseURL: "https://time-sheet-55009.firebaseio.com",
//   storageBucket: "time-sheet-55009.appspot.com"
// };
// firebase.initializeApp(config);
var database = firebase.database();
// 2. Button for adding Employees
$("#add-employee-btn").on("click", function(event) {
  event.preventDefault();
  // Grabs user input
  var empName = $("#employee-name-input").val().trim();
  var empRole = $("#role-input").val().trim();
  var empStart = moment($("#start-input").val().trim(), "hh:mm").format("HH:mm");
  var empRate = $("#rate-input").val().trim();
  // Creates local "temporary" object for holding employee data
  var newEmp = {
    name: empName,
    role: empRole,
    start: empStart,
    rate: empRate
  };
  // Uploads employee data to the database
  database.ref().push(newEmp);
  // Logs everything to console
  console.log(newEmp.name);
  console.log(newEmp.role);
  console.log(newEmp.start);
  console.log(newEmp.rate);
  // Alert
  alert("Train successfully added");
  // Clears all of the text-boxes
  $("#employee-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});
// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());
  // Store everything into a variable.
  var empName = childSnapshot.val().name;
  var empRole = childSnapshot.val().role;
  var empStart = childSnapshot.val().start;
  var empRate = childSnapshot.val().rate;
  // Employee Info
  console.log(empName);
  console.log(empRole);
  console.log(empStart);
  console.log(empRate);
  // Prettify the employee start
  // var empStartPretty = moment.unix(empStart).format("MM/DD/YY");
  // Calculate the months worked using hardcore math
  // To calculate the months worked
  // var now = moment();
  // var unixTime = now.unix();
  // var startTime = moment('now.date() ' + empStart ).unix();
  // var empMinutes = unixTime - startTime;
  var firstTime = moment(empStart





    , "hh:mm").subtract(1, "years");
  console.log("firstTime " + firstTime);
  var currentTime = moment();
  console.log("currentTime " + currentTime);
  var diffTime = moment().diff(moment(firstTime), "minutes");
  console.log("diffTime " + diffTime);

  var tRemainder = diffTime % empRate;
  console.log("remainder " + tRemainder);

  var tMinutesTillTrain = empRate - tRemainder;
  console.log("minutes until train " + tMinutesTillTrain);

  // var empMinutes = moment().diff(moment.unix(empStart, "HH:mm"), "minutes");
  // console.log(empMinutes);
  // var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
  // console.log(empMonths);
  // // Calculate the total billed rate
  // var empBilled = empMonths * empRate;
  // console.log(empBilled);
  // Add each train's data into the table
  $("#employee-table > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" +
  empRate + "</td><td>" + empStart + "</td><td>"  + tMinutesTillTrain + "</td></tr>");
});
// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016
// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case