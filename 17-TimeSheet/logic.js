  var config = {
    apiKey: "AIzaSyBnTud_kLw4LwhpGfrbes1dnWFJHSM9GG4",
    authDomain: "employee-data-management-ccfd3.firebaseapp.com",
    databaseURL: "https://employee-data-management-ccfd3.firebaseio.com",
    projectId: "employee-data-management-ccfd3",
    storageBucket: "employee-data-management-ccfd3.appspot.com",
    messagingSenderId: "894008419011"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  
 

$('#submitBtn').on('click', function() {
  var nameInput = $('#employeeName').val().trim();
  var roleInput = $('#role').val().trim();
  var startDateInput = $('#startDate').val().trim();
  var monthlyRateInput = $('#monthlyRate').val().trim();
console.log("potato")


database.ref().push({
  name: nameInput,
  role: roleInput,
  startDate: startDateInput,
  monthlyRate: monthlyRateInput,
  timeStamp: firebase.database.ServerValue.TIMESTAMP

  })
})

// $(document).on("keyup",  function(event) {
//     if (event.keyCode === 13) {
//         $("#submitBtn").click();
//     }
// });

//TODAYS DATE IN MILISECONDS


function getMonths(childDate){
  // var date = moment(childDate).format("X");
  // console.log("date is " + date);
  var date = childDate;
  var format = "X";
  var momentDate = moment(date, format);      
  // todaysDate = moment().format("X");
  // console.log("todays date " + todaysDate)
  // var difference = todaysDate - date;
  // console.log("difference " + difference);
  // var months = moment(difference).format("M");
  var currentTime = moment();
  var currentTimeMilli = moment(currentTime).format("X");
  var monthsMilliseconds = (moment(momentDate).diff(currentTimeMilli, "months"));
  // var monthsMilliseconds = moment(todaysDate).diff(moment(date),'months');
  // console.log("attempt 1 " + monthsMilliseconds)
  return monthsMilliseconds;
  // todaysDate - momentDate;
  // var duration = moment.duration(monthsMilliseconds, 'milliseconds');
  // var months = duration.asMonths();
  // return months;
  // console.log("months is " + months);
  //console.log("subtraction equals " + monthsMilliseconds);
}

database.ref().on("child_added", function(childSnapshot) {
  var monthsWorked = getMonths(childSnapshot.val().timeStamp);
  console.log("months worked " + monthsWorked);
  var tr = $("<tr>");
  // var td= $("<td>");
  console.log(childSnapshot.val().name);
  var nameDisplay = $('<td>').text(childSnapshot.val().name);
  var roleDisplay = $('<td>').text(childSnapshot.val().role);
  var startDateDisplay = $('<td>').text(childSnapshot.val().startDate);
  var totalWorked = $('<td>').text(monthsWorked);
  var monthlyRateDisplay = $('<td>').text(childSnapshot.val().monthlyRate);
  var totalEarned = $('<td>').text("");
  tr.append(nameDisplay, roleDisplay, startDateDisplay,totalWorked, monthlyRateDisplay,totalEarned);
  $("tbody").append(tr);
  });
//   })

