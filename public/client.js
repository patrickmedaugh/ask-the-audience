var socket = io();

var connectionCount = document.getElementById('connection-count');

socket.on('usersConnected', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
  $('#status-message').append('<p>' + connectionCount.innerText + '</p>');
});

var statusMessage = document.getElementById('status-message');

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});

var buttons = document.querySelectorAll('#choices button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    var thisVote = this.innerText
    socket.send('voteCast', thisVote);
    thisVote = "";
  });
}

socket.on('voteCount', function (votes) {
  console.log(votes);
  $('#vote-counter').empty();
  $('#vote-counter').append('<p>A: ' + votes.A + '</p>' +
                            '<p>B: ' + votes.B + '</p>' +
                            '<p>C: ' + votes.C + '</p>' +
                            '<p>D: ' + votes.D + '</p>'
      );
});
