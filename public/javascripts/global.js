// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

  // Populate the user table on initial page load
  populateTable();

  // Submit the 'save ip from frontend-form
  $("#ipsave").submit(saveFromFrontend);

  // Username link click
  $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

  // Add User button click
  $('#btnAddUser').on('click', addUser);

  // Delete User link click
  $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);

});

// Functions =============================================================

// Fill table with data
function populateTable() {

  // Empty content string
  var tableContent = '';

  // jQuery AJAX call for JSON - gets last 1 ips
  $.getJSON( '/iplist', function( data ) {
    // Stick our data array into a userlist variable in the global object
    userListData = data;

    /** example data:
     * {
     *   _id: "53ea0a13b78481e438dd89b9",
     *   ip: "84.233.191.62",
     *   msg: "Test from Chrome REST client",
     *   host: "planon-laptop",
     *   date: 1420747580309
     * },
     */
    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function(){
      tableContent += '<tr>';
      tableContent += '<td>' + this.ip + '</td>';
      tableContent += '<td>' + this.msg + '</td>';
      tableContent += '<td>' + this.host + '</td>';
      if (this.date !== undefined) {
        tableContent += '<td>' + moment(this.date).format('DD/MM/YYYY H:mm:ss') + '</td>';
      } else {
        tableContent += '<td></td>';
      }
      tableContent += '</tr>';
    });

    // Inject the whole content string into our existing HTML table
    $('#ipList table tbody').html(tableContent);
  });
};

function saveFromFrontend(event) {
      //stops normal form submission and page refresh.
      event.preventDefault();
      $.ajax({
          url: '/ipsave',
          type: 'POST',
          data: $(this).serialize(),
          success: function (returndata) {
              console.log('returndata', returndata);
              $('#ipList table tbody tr:last').remove();
              var tableContent = "";
              tableContent += '<tr>';
              tableContent += '<td>' + returndata.savedip.ip + '</td>';
              tableContent += '<td>' + returndata.savedip.msg + '</td>';
              tableContent += '<td>' + returndata.savedip.host + '</td>';
              tableContent += '<td>' + moment(returndata.date).format('DD/MM/YYYY H:mm:ss') + '</td>';
              tableContent += '</tr>';
              $('#ipList table tbody').prepend(tableContent);
          },
          error: function(){
            alert("Error in ajax form submission");
          }
  });

  return false;
}

/* - DEPRECATED STUFF - DEPRECATED STUFF -*/
// Show User Info
function showUserInfo(event) {

  // Prevent Link from Firing
  event.preventDefault();

  // Retrieve username from link rel attribute
  var thisUserName = $(this).attr('rel');

  // Get Index of object based on id value
  var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.name; }).indexOf(thisUserName);

  // Get our User Object
  var thisUserObject = userListData[arrayPosition];

  //Populate Info Box
  $('#userInfoName').text(thisUserObject.name);
  $('#userInfoAge').text(thisUserObject.age);
  $('#userInfoGender').text(thisUserObject.gender);
  $('#userInfoLocation').text(thisUserObject.address);
  $('#userInfoAbout').text(thisUserObject.about);
  // $('#userInfoPicture').text(thisUserObject.picture);
  $('#userInfoPicture').empty().prepend('<img class="inline" src="' + thisUserObject.picture + '" />');

};

// Add User
function addUser(event) {
  event.preventDefault();

  // Super basic validation - increase errorCount variable if any fields are blank
  var errorCount = 0;
  $('#addUser input').each(function(index, val) {
    if($(this).val() === '') { errorCount++; }
  });

  // Check and make sure errorCount's still at zero
  if(errorCount === 0) {

    // If it is, compile all user info into one object
    var newUser = {
      'username': $('#addUser fieldset input#inputUserName').val(),
      'email': $('#addUser fieldset input#inputUserEmail').val(),
      'fullname': $('#addUser fieldset input#inputUserFullname').val(),
      'age': $('#addUser fieldset input#inputUserAge').val(),
      'location': $('#addUser fieldset input#inputUserLocation').val(),
      'gender': $('#addUser fieldset input#inputUserGender').val()
    }

    // Use AJAX to post the object to our adduser service
    $.ajax({
      type: 'POST',
      data: newUser,
      url: '/adduser',
      dataType: 'JSON'
    }).done(function( response ) {

      // Check for successful (blank) response
      if (response.msg === '') {

        // Clear the form inputs
        $('#addUser fieldset input').val('');

        // Update the table
        populateTable();

      }
      else {

        // If something goes wrong, alert the error message that our service returned
        alert('Error: ' + response.msg);

      }
    });
  }
  else {
    // If errorCount is more than 0, error out
    alert('Please fill in all fields');
    return false;
  }
};


// Delete User
function deleteUser(event) {

  event.preventDefault();

  // Pop up a confirmation dialog
  // var confirmation = confirm('Are you sure you want to delete this user?');

  // Skip the confirmation dialog for sake of test
  var confirmation = true

  // Check and make sure the user confirmed
  if (confirmation === true) {

    // If they did, do our delete
    $.ajax({
      type: 'DELETE',
      url: '/deleteuser/' + $(this).attr('rel')
    }).done(function( response ) {

      // Check for a successful (blank) response
      if (response.msg === '') {
      }
      else {
        alert('Error: ' + response.msg);
      }

      // Update the table
      populateTable();

    });

  }
  else {

    // If they said no to the confirm, do nothing
    return false;

  }

};

