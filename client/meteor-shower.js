Meteor.subscribe('repos');
Meteor.subscribe('events');

var launchMeteor = function() {
  console.log("Launching Meteor");
  var star = document.createElement('span');
  star.setAttribute('class', 'star animate');
  var horizontalPlane = Math.floor(Math.random() * (($(window).width() - 250) - 0)) + 0;
  var verticalPlane = Math.floor(Math.random() * (300 - 100)) + 100;
  var z = Math.floor(Math.random() * (2000 - 0)) + 0;
  $(star).css({
    left: horizontalPlane,
    top: verticalPlane,
    "z-index": z
  });

  var tmp = document.getElementById("space");
  tmp.appendChild(star);

  setTimeout(function() {
    tmp.removeChild(star);
  }, 1000);
}

MeteorEventsStream.on('launch', function(data) {
  console.log(data.eventType + " in repo: " + data.repoName);
  launchMeteor();
});