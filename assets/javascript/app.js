

let tryitout = $(document).ready(function() {

  let config = {
    apiKey: "AIzaSyBG0Bqvp--YU3_rEujhRkjVcwSQ-0LQ0P8",
    authDomain: "traindatabase.firebaseapp.com",
    databaseURL: "https://traindatabase.firebaseio.com",
    projectId: "traindatabase",
    storageBucket: "",
    messagingSenderId: "123485194938"
  };
  firebase.initializeApp(config);

  let database = firebase.database();

$(".btn-primary").on("click", function(event) {
  event.preventDefault();

  let trainName = $("#trainName").val().trim();
  let trainDest = $("#trainDestination").val().trim();
  let firstTrainTime = moment($("#trainTime").val().trim(), "HH:mm").format("LT");
  let trainFrequency = $("#trainFreq").val().trim();

  let newRoute = {
    name: trainName,
    dest: trainDest,
    firstTrain: firstTrainTime,
    moreTrain: trainFrequency
  };

  database.ref().push(newRoute);

  alert("Route successfully added");

  $("#trainName").val("");
  $("#trainDestination").val("");
  $("#trainTime").val("");
  $("#trainFreq").val("");
});

database.ref().on("child_added", function(childSnapshot) {
  let trainName = childSnapshot.val().name;
  let trainDest = childSnapshot.val().dest;
  let firstTrainTime = childSnapshot.val().firstTrain;
  let trainFrequency = childSnapshot.val().moreTrain;
  let currentTime = moment().format("LT")
  let nextTrain = firstTrainTime;

  while ((moment(currentTime, "LT") - moment(nextTrain, "LT")) > 0) {
  	let nextTrain2 = moment(nextTrain, "LT").add(trainFrequency, "m").format("LT");
  	nextTrain = nextTrain2;
  }

  let minutesAway = Math.ceil((moment(nextTrain, "LT") - moment()) / 60000);

  let newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextTrain),
    $("<td>").text(minutesAway)
  );

  $("#train-table > tbody").append(newRow);
});
})

