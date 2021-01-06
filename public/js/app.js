function Countdown(options) {
  var timer,
  instance = this,
  seconds = options.seconds || 10,
  onUpdate = options.onUpdate || function () {},
  onComplete = options.onComplete || function () {};

  function decrementCounter() {
    onUpdate(seconds);
    if (seconds === 0) {
      onComplete();
      instance.stop();
    }
    seconds--;
  }

  this.start = function () {
    clearInterval(timer);
    timer = 0;
    seconds = options.seconds;
    timer = setInterval(decrementCounter, 1000);
  };

  this.stop = function () {
    clearInterval(timer);
  };
}

var socket = io.connect();
var COUNTDOWNTIMER = new Countdown({  
    seconds:5,  // number of seconds to count down
    onUpdate: function(sec){console.log(sec);}, // callback for each second
    onComplete: function(){ alert('counter ended!');} // final action
});

var app = angular.module( 'app', ['ngRoute'] ).config( function( $routeProvider, $locationProvider ) {
	$routeProvider.when('/table-10/:tableId', {
		templateUrl: '/partials/table-10-handed.html',
		controller: 'TableController', 
	});

	$routeProvider.when('/table-6/:tableId', {
		templateUrl: '/partials/table-6-handed.html',
		controller: 'TableController', 
	});

	$routeProvider.when('/table-2/:tableId', {
		templateUrl: '/partials/table-2-handed.html',
		controller: 'TableController', 
	});

	$routeProvider.when('/', {
		templateUrl: '/partials/lobby.html',
		controller: 'LobbyController', 
	});

	$routeProvider.otherwise( { redirectTo: '/' } );

	$locationProvider.html5Mode(true).hashPrefix('!');
});

app.run( function( $rootScope ) {
	$rootScope.screenName = '';
	$rootScope.totalChips = 0;
	$rootScope.sittingOnTable = '';
});