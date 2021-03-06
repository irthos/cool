/**
 * @ngdoc overview
 * @name cool
 * @description
 * # cool
 *
 * Main module of the application.
 */
'use strict';
screen.lockOrientation ? screen.lockOrientation('landscape') : null;
angular.module('cool', [
	'ngAnimate',
	'ngResource',
	'ui.router',
	'ngAdsense',
	'admob',
	'ionic'
]).run(function($ionicPlatform, $ionicPopup, State) {
	$ionicPlatform.ready(function() {
		console.log('ionic ready?');
		if(window.AdMob) {
			console.log('admob in effect');
			State.mobile = true;
			var admob_key = device.platform == "Android" ? "ca-app-pub-5382526155087966/3206386934" : "ca-app-pub-5382526155087966/7915788138";
			var admob = window.plugins.AdMob;
			admob.createBannerView(
				{
					'publisherId': admob_key,
					'adSize': admob.AD_SIZE.SMART_BANNER,
					'bannerAtTop': false
				},
				function() {
					admob.requestAd(
						{ 'isTesting': false },
						function() {
							admob.showAd(true);
						},
						function() { console.log('failed to request ad'); }
					);
				},
				function() { console.log('failed to create banner view'); }
			);
		} else {
			State.browser = true;
			console.log('no admob');
		}
	});
});

angular.module('cool').filter('reverse', function () {
	return function (items) {
		return items.slice().reverse();
	};
});
'use strict';

/**
* @ngdoc directive
* @name cool.directive:board
* @description
* # board
*/
angular.module('cool')
.directive('board', function ()
{
    return {
        templateUrl: 'scripts/board/board-d.html',
        
        restrict: 'E'
    };
});
'use strict';

/**
* @ngdoc directive
* @name cool.directive:card
* @description
* # card
*/
angular.module('cool')
.directive('card', function ()
{
    return {
        templateUrl: 'scripts/card/card-d.html',
        restrict: 'EA'
    };
});
'use strict';

/**
* @ngdoc directive
* @name cool.directive:debug
* @description
* # debug
*/
angular.module('cool')
.directive('debug', function ()
{
    return {
        restrict: 'E',
        transclude: true,
        template: '<ng-transclude ng-if="$root.debug"></ng-transclude>'

    };
});
'use strict';

/**
* @ngdoc directive
* @name cool.directive:fpv
* @description
* # fpv
*/
angular.module('cool')
    .directive('fpv', function ()
    {
        return {
            templateUrl: 'scripts/fpv/fpv-d.html',

            restrict: 'EA',
            link: function (scope, el, attrs)
            {

            },
            controller: function ($scope)
            {
                
            }
        };
    });
/**
 * @ngdoc service
 * @name cool.Api
 * @description
 * # Api
 * Factory in the cool.
 */
var SVG = SVG;
angular.module('cool')
	.factory('Api', function ($state, State, $window, Models, $timeout, $rootScope) {
		'use strict';
		var api = {
			hide: function () {
				var timeOut = function () {
					State.trip.splice(0, 1);
				};
				for (var x = 0; x < State.trip.length; x++) {
					$timeout(timeOut, (x * 200) + 500);
				}
			},
			killAudio: function () {
				document.getElementById('game-0').currentTime = 0;
				document.getElementById('game-0').pause();
			},
			audio: function (audio) {
				var themeSong = document.getElementById(audio);
				themeSong.play();
				
				$timeout(function () {
					themeSong.currentTime = 0;
					themeSong.pause();
					State.gameStarted ? document.getElementById('game-0').play() : null;
				}, 2000);
			},
			toNumber: function (num) {
				return parseInt(num, 10);
			},
			poly: function (points) {
				var pointsStr = '';
				points ?
					angular.forEach(points.split(' '), function (point) {
						var x = point.split(',')[0],
							y = point.split(',')[1];
						var hPx = Math.floor(($rootScope.screen.width / 100) * x),
							vPx = Math.floor(($rootScope.screen.height / 100) * y);
						pointsStr += hPx + ',' + vPx + ' ';
					}) : null;
				return pointsStr.length > 0 ? pointsStr : null;
			},
			sunglasses: function (x, y) {
				var pointsStr = '';
				var sunglasses = '0,0 20,0 24,4 28,4 32,0 56,0 56,32 36,32 28,16 24,16 20,32 0,32 0,0';
				angular.forEach(sunglasses.split(' '), function (point) {
					var hPx = api.toNumber(point.split(',')[0]) + x,
						vPx = api.toNumber(point.split(',')[1]) + y;
					pointsStr += hPx + ',' + vPx + ' ';
					
				});
				return pointsStr;
				
			},
			sunglassesFpv: function (x, y) {
				var pointsStr = '';
				var sunglasses = Models.sunglasses;
				angular.forEach(sunglasses.split(' '), function (point) {
					var hPx = api.toNumber(point.split(',')[0]) * x / 100,
						vPx = api.toNumber(point.split(',')[1]) * y / 100;
					pointsStr += hPx + ',' + vPx + ' ';
					
				});
				return pointsStr;
				
			},
			nextPlayer: function (key) {
				console.log('nextPlayer', key);
				
				State.liveTurn = false;
				
				api.audio('walking-0');
				
				$timeout(function () {
					if (State.turn.currentPosition === 57) {
						api.audio('win-0');
						api.killAudio();
						api.message({header: 'Winner!!', text: player.playerName + ' wins the game.'});
						State.gameStarted = false;
						State.show.ads.inter = true;
					}
					else if (State.players.length < 1) {
						api.message({header: 'Lost!!', text: 'No one wins.'});
						State.gameStarted = false;
						State.show.ads.inter = true;
						api.killAudio();
					}
					else if (State.players[key + 1]) {
						api.message({text: '', header: 'Next Player ' + State.players[key + 1].playerName});
						State.turn = State.players[key + 1];
						State.liveTurn = true;
						
					} else {
						api.message({text: '', header: 'Next Player ' + State.players[0].playerName});
						State.turn = State.players[0];
						State.liveTurn = true;
					}
					State.trip = [];
					
				}, (State.trip.length * 200) + 500);
				
			},
			movePlayer: function (player) {
				console.log('movePlayer', player);
				
				var startingSpace = player.currentPosition;
				State.trip = [Models.spaces[player.currentPosition]];
				State.direction = true;
				
				
				function move(direction) {
					direction ? (player.currentPosition = player.currentPosition + 1) :
						(player.currentPosition = player.currentPosition - 1);
					State.trip.push(Models.spaces[player.currentPosition]);
					return State.trip;
					
				}
				
				for (var x = 0; x < State.currentRoll; x++) {
					
					// Check for pass
					if (
						(startingSpace === 17 && player.currentPosition === 17) ||
						(startingSpace === 32 && player.currentPosition === 32) ||
						(startingSpace === 49 && player.currentPosition === 49)) {
						api.message({header: player.playerName, text: 'passing'});
						switch (player.currentPosition) {
							case 17:
								player.currentPosition = 24;
								State.trip.push(Models.spaces[player.currentPosition]);
								break;
							case 32:
								player.currentPosition = 38;
								State.trip.push(Models.spaces[player.currentPosition]);
								break;
							case 49:
								player.currentPosition = 50;
								State.trip.push(Models.spaces[player.currentPosition]);
								break;
						}
					}
					// Check for circles
					else if (
						(player.currentPosition > 10 && player.currentPosition < 24 ) ||
						(player.currentPosition >= 25 && player.currentPosition < 38 )) {
						if (
							(State.currentRoll - x === State.currentRoll) ||
							(player.currentPosition === 11 && startingSpace <= 11) ||
							(player.currentPosition === 25 && startingSpace <= 25)) {
							State.show.confirm = true;
						}
						State.splitMove = true;
						State.splitNum = State.currentRoll - x;
						State.splitPlayer = player;
						break;
						
						
					}
					// default movement
					else {
						console.log(State.turn.currentPosition, State.trip.length);
						move(State.direction);
					}
					// Fall back if passing the last pass
					if ((player.currentPosition > 49 && startingSpace !== 49) || player.currentPosition > 57) {
						player.currentPosition = 41;
						State.trip.push(Models.spaces[player.currentPosition]);
					}
					
					if (x === State.currentRoll && (player.currentPosition == 48 || startingSpace === 56)) {
						player.currentPosition = 1;
						State.trip.push(Models.spaces[player.currentPosition]);
					}
				}
			},
			rollDice: function (first, second) {
				// Random roll of two dice,with up to 4 players.
				// One set of sie per corner.
				api.audio('dice-0');
				var total = 0;
				var doubles = false;
				var firstDie = Math.floor(Math.random() * 6) + 1;
				var secondDie = Math.floor(Math.random() * 6) + 1;
				first || second ? State.dice = [first, second] : State.dice = [firstDie, secondDie];
				State.dice[0] === State.dice[1] ? (State.liveTurn = true, doubles = true) : doubles = false;
				total = State.dice[0] + State.dice[1];
				State.currentRoll = total;
				State.turn.playerName ? api.message({header: State.turn.playerName + ' Rolls ', text: State.dice}) : null;
				return {total: total, doubles: doubles};
			},
			startGame: function (players) {
				document.getElementById('game-0').play();
				document.getElementById('game-0').volume = 0.1;
				// Chooses players and initiates a new game.
				State.players = [];
				var playerRolls = {};
				State.playerRoll = {};
				var rollPlayers = {};
				for (var x = 0; x < players; x++) {
					var playerName = $window.prompt('What is player ' + (x + 1) + '\'s name?');
					State.players.push({playerName: playerName, currentPosition: 1});
				}
				angular.forEach(State.players, function (player) {
					var startingRoll = api.rollDice().total;
					if (rollPlayers[startingRoll]) {
						var newRoll = api.rollDice().total;
						while (rollPlayers[newRoll]) {
							newRoll = api.rollDice().total;
						}
						rollPlayers[newRoll] = player.playerName;
						playerRolls[player.playerName] = newRoll;
					} else {
						api.message({header: player.playerName, text: 'rolls ' + startingRoll});
						rollPlayers[startingRoll] = player.playerName;
						playerRolls[player.playerName] = startingRoll;
					}
				});
				var scores = [];
				var playerOrder = [];
				angular.forEach(playerRolls, function (score) {
					scores.push(score);
				});
				scores.sort(function (a, b) {
					return a - b;
				});
				angular.forEach(scores, function (score) {
					playerOrder.unshift({currentPosition: 1, playerName: rollPlayers[score]});
				});
				var playerColors = ['lightBlue', 'lightGreen', 'lightYellow', 'pink'];
				
				angular.forEach(playerOrder, function (player) {
					var randomColor = Math.floor(Math.random() * (playerColors.length - 1));
					player.color = playerColors[randomColor];
					playerColors.splice(randomColor, 1);
				});
				State.players = playerOrder;
				
				State.turn = playerOrder[0];
				api.message({
					text: playerOrder[0].playerName + ' goes first.',
					header: ''
				});
				$state.go('cool.board');
				State.dice = [0, 0];
				State.gameStarted = true;
				State.liveTurn = true;
				
			},
			splitTurn: function (x, direction, player) {
				console.log('splitTurn', x, direction, player);
				
				var key = State.key;
				var cool = false;
				function move(direction) {
					direction ? (player.currentPosition = player.currentPosition + 1) :
						(player.currentPosition = player.currentPosition - 1);
					State.trip.push(Models.spaces[player.currentPosition]);
					return State.trip;
					
				}
				for(var y = 0; y < x; y++){
					if (
						(player.currentPosition > 10 && player.currentPosition < 24 ) ||
						(player.currentPosition >= 25 && player.currentPosition < 38 )) {
						switch (player.currentPosition) {
							case 11:
								!State.direction ? (player.currentPosition = 23, State.trip.push(Models.spaces[player.currentPosition])) : move(State.direction);
								break;
							case 23:
								State.direction ? (player.currentPosition = 11, State.trip.push(Models.spaces[player.currentPosition])) : move(State.direction);
								break;
							case 25:
								!State.direction ? (player.currentPosition = 37, State.trip.push(Models.spaces[player.currentPosition])) : move(State.direction);
								break;
							case 37:
								State.direction ? (player.currentPosition = 25, State.trip.push(Models.spaces[player.currentPosition])) : move(State.direction);
								break;
							default:
								move(State.direction);
						}
					}
				}
				
				Models.spaces[player.currentPosition].color === 'cool?' ?
					(api.card(key), cool = true) :
					Models.spaces[player.currentPosition].color === 'trap' ?
						(
							api.audio('trap-0'),
								api.message({text: '' + player.playerName + ' sent back to start!', header: 'It\'s a trap!!'}),
								$timeout(function(){api.goHome(player)},1000)
						) :
						null;
				if (State.playerRoll.doubles === true) {
					api.message({
						text: player.playerName + ' goes again.',
						header: 'Doubles!!'
					});
					api.nextPlayer(key-1);
				} else {
					api.message({text: '', header: player.playerName + 's turn is over'});
					!cool ? api.nextPlayer(key) : null;
				}
				
				if (State.players.length < 1) {
					api.message({header: 'Lost!!', text: 'No one wins.'});
					State.gameStarted = false;
					State.show.ads.inter = true;
					api.killAudio();
				} else if (player.currentPosition === 57 || State.trip.length < 1) {
					api.audio('win-0');
					api.killAudio();
					api.message({header: 'Winner!!', text: player.playerName + ' wins the game.'});
					State.gameStarted = false;
					State.show.ads.inter = true;
					
				} else {
					!cool && !State.playerRoll.doubles ? api.nextPlayer(State.players.indexOf(player)): null;
				}
			},
			takeTurn: function (key, player, dice) {
				console.log('takeTurn', key, player, dice);
				
				State.key = key;
				State.playerRoll.doubles = State.playerRoll.doubles ? false: null;
				State.splitNum = null;
				State.splitPlayer = null;
				State.splitMove = null;
				State.liveTurn = true;
				// State.messages = [];
				State.trip = [];
				dice ? api.message({header: 'Warning', text: player.playerName + ' is a cheat!'}) : null;
				api.message({header: player.playerName + ' takes a turn.', text: 'Rolling...'});
				var cool = false;
				var playerRoll = dice ? api.rollDice(dice[0], dice[1]) : api.rollDice();
				State.playerRoll = playerRoll;
				if (typeof player.currentPosition !== 'number') {
					State.playerRoll.doubles ? player.currentPosition = 1 : api.nextPlayer(key);
					return;
				}
				
				api.movePlayer(player, State.playerRoll.total);
				
				if(!State.splitMove){
					Models.spaces[player.currentPosition].color === 'cool?' ?
						(api.card(key), cool = true) :
						Models.spaces[player.currentPosition].color === 'trap' ?
						 (
						 api.audio('trap-0'),
						 api.message({text: '' + player.playerName + ' sent back to start!', header: 'It\'s a trap!!'}),
						 api.goHome(player)
						 ) :
							null;
					if (State.playerRoll.doubles === true) {
						api.message({
							text: player.playerName + ' goes again.',
							header: 'Doubles!!'
						});
						api.nextPlayer(key-1);
					} else {
						api.message({text: '', header: player.playerName + 's turn is over'});
						!cool ? api.nextPlayer(key) : null;
					}
					
					if (State.turn.currentPosition === 57 && State.trip.length < 1) {
						api.audio('win-0');
						api.killAudio();
						api.message({header: 'Winner!!', text: player.playerName + ' wins the game.'});
						
						State.gameStarted = false;
						State.show.ads.inter = true;
						
					}

					if ((State.turn.currentPosition === 47 || State.turn.currentPosition === 56) && State.trip.length < 1) {
						api.audio('trap-0');
						api.killAudio();
						api.message({text: '' + player.playerName + ' sent back to start!', header: 'It\'s a trap!!'});
						$timeout(function(){api.goHome(player)},1000)
					}
					
					if (State.players.length < 1) {
						api.message({header: 'Lost!!', text: 'No one wins.'});
						State.gameStarted = false;
						State.show.ads.inter = true;
						
						api.killAudio();
					}
				}
				
			},
			message: function (message) {
				State.messages.push({
					text: message.text,
					header: message.header,
					type: message.type
				});
				$timeout(function () {
					State.messages = [];
				},5000);
			},
			card: function (player) {
				State.cardPlayer = player;
				$timeout(function () {
					var randomCard = Models.cards[Math.floor(Math.random() * Models.cards.length)];
					State.card = randomCard;
				}, (State.trip.length * 200) + 1000);
			},
			goHome: function (player) {
				player.currentPosition = 1;
				!State.playerRoll.doubles ? api.nextPlayer(State.players.indexOf(player)): null;
			},
			killPlayer: function (player) {
				api.audio('gun-0');
				var playerIndex = State.players.indexOf(player);
				State.players.splice(playerIndex, 1);
				api.nextPlayer(State.players.indexOf(player));
			},
			odPlayer: function (player) {
				api.audio('raven-0');
				var playerIndex = State.players.indexOf(player);
				State.players.splice(playerIndex, 1);
				api.nextPlayer(State.players.indexOf(player));
			},
			goStay: function (player) {
				api.audio('cool-0');
				!State.playerRoll.doubles ? api.nextPlayer(State.players.indexOf(player)): null;
			},
			goPass: function (player) {
				api.audio('yay-0');
				if (player.currentPosition < 24) {
					player.currentPosition = 17;
				}
				else if (player.currentPosition >= 24 && player.currentPosition < 38) {
					player.currentPosition = 32;
				}
				if (player.currentPosition >= 38 && player.currentPosition < 49) {
					player.currentPosition = 49;
				}
				!State.playerRoll.doubles ? api.nextPlayer(State.players.indexOf(player)): null;
			},
			goJail: function (player) {
				api.audio('siren-0');
				player.currentPosition = 'jail';
				!State.playerRoll.doubles ? api.nextPlayer(State.players.indexOf(player)): null;
			},
			goSchool: function (player) {
				api.audio('school-0');
				player.currentPosition = 'school';
				!State.playerRoll.doubles ? api.nextPlayer(State.players.indexOf(player)): null;
			},
			goWork: function (player) {
				api.audio('work-0');
				player.currentPosition = 'work';
				!State.playerRoll.doubles ? api.nextPlayer(State.players.indexOf(player)): null;
			},
			game: {
				start: function (players) {
					document.getElementById('game-0').play();
					document.getElementById('game-0').volume = 0.1;
					// Chooses players and initiates a new game.
					State.players = [];
					var playerRolls = {};
					var rollPlayers = {};
					for (var x = 0; x < players; x++) {
						var playerName = $window.prompt('What is player ' + (x + 1) + '\'s name?');
						State.players.push({playerName: playerName, currentPosition: 1});
					}
					angular.forEach(State.players, function (player) {
						var startingRoll = api.rollDice().total;
						if (rollPlayers[startingRoll]) {
							var newRoll = api.rollDice().total;
							while (rollPlayers[newRoll]) {
								newRoll = api.rollDice().total;
							}
							rollPlayers[newRoll] = player.playerName;
							playerRolls[player.playerName] = newRoll;
						} else {
							api.message({header: player.playerName, text: 'rolls ' + startingRoll});
							rollPlayers[startingRoll] = player.playerName;
							playerRolls[player.playerName] = startingRoll;
						}
					});
					var scores = [];
					var playerOrder = [];
					angular.forEach(playerRolls, function (score) {
						scores.push(score);
					});
					scores.sort(function (a, b) {
						return a - b;
					});
					angular.forEach(scores, function (score) {
						playerOrder.unshift({currentPosition: 1, playerName: rollPlayers[score]});
					});
					var playerColors = ['lightBlue', 'lightGreen', 'lightYellow', 'pink'];
					
					angular.forEach(playerOrder, function (player) {
						var randomColor = Math.floor(Math.random() * (playerColors.length - 1));
						player.color = playerColors[randomColor];
						playerColors.splice(randomColor, 1);
					});
					State.players = playerOrder;
					
					State.turn = playerOrder[0];
					api.message({
						text: playerOrder[0].playerName + ' goes first.',
						header: ''
					});
					$state.go('cool.board');
					State.dice = [0, 0];
					State.gameStarted = true;
					State.liveTurn = true;
				},
				roll: function (first, second) {
					api.audio('dice-0');
					var total = 0;
					var doubles = false;
					var firstDie = Math.floor(Math.random() * 6) + 1;
					var secondDie = Math.floor(Math.random() * 6) + 1;
					first || second ? State.dice = [first, second] : State.dice = [firstDie, secondDie];
					State.dice[0] === State.dice[1] ? (State.liveTurn = true, doubles = true) : doubles = false;
					total = State.dice[0] + State.dice[1];
					State.currentRoll = total;
					State.turn.playerName ? api.message({header: State.turn.playerName + ' Rolls ', text: State.dice}) : null;
					return {total: total, doubles: doubles};
				},
				move: function () {
					
				},
				turn: function () {
					
				},
				check: function () {
					
				}
			}
		};
		angular.element($window).bind('resize', function () {
			$rootScope.screen = {
				width: $window.innerWidth,
				height: $window.innerHeight
			};
			$rootScope.$apply();
			angular.forEach(Models.sections, function (section) {
				angular.forEach(section, function (space) {
					$rootScope.points[space] = api.poly(Models.spaces[space].poly);
				});
			});
		});
		return api;
	});
/**
 * @ngdoc service
 * @name cool.Models
 * @description
 * # Models
 * Factory in the cool.
 */
angular.module('cool')
	.factory('Models', function () {
		'use strict';

		// INITIALIZATION
		// console.log('Models: Is it cool?');
		var string = '';
		var number = 0;
		var array = [];
		var colors = {
			red: 'rgba(180, 23, 2, 1)',
			blue: 'rgba(1, 19, 108, 1)',
			yellow: 'rgba(255, 203, 0, 1)',
			black: 'rgba(0,1,2,1)',
			lightPurple: 'rgba(119, 68, 150, 1)',
			lightOrange: 'rgba(255, 87, 34, 1)',
			lightBlue: 'rgba(0, 87, 171, 1)',
			lightGreen: 'rgba(0, 234, 0, 1)',
			lightYellow: 'rgba(255, 251, 0, 1)',
			lightPink: 'rgba(255, 184, 191, 1)',
			pink: 'rgba(255, 43, 106, 1)'
		};


		// ACTUAL DEFINITION
		var models = {
			// Has every possible combination of app renderings
			// via these elements
			audio: {
				game:[
					{url:'audio/lets-go-outside-Solo-long.mp3', loop:true}
				],
				cool:[
					{url:'audio/lets-go-outside-20-sec-mix-1-A.mp3'},
					{url:'audio/lets-go-outside-20-sec-mix-1-B.mp3'}
				],
				trap:[
					{url:'audio/trap.mp3'}
				],
				win:[
					{url:'audio/applause.mp3'}
				],
				notCool:[
					{url:'audio/lets-go-outside-20-sec-mix-3-A.mp3'},
					{url:'audio/lets-go-outside-20-sec-mix-3-B.mp3'}
				],
				yay:[
					{url:'audio/yay.mp3'}
				],
				school:[
					{url:'audio/school.mp3'}
				],
				work:[
					{url:'audio/work.mp3'}
				],
				gun:[
					{url:'audio/gun.mp3'}
				],
				raven:[
					{url:'audio/raven.mp3'}
				],
				walking:[
					{url:'audio/walking.mp3'}
				],
				siren:[
					{url:'audio/siren.mp3'}
				],
				dice:[
					{url:'audio/dice.mp3'}
				]
			},
			player: {
				name: string,
				currentPosition: number,
				color: string
			},
			message: {
				text: string,
				header: string,
				type: string,
				duration: number
			},
			card: {
				topText: [],
				bottomText: [],
				action: string,
				image: string
			},
			cards: [
				// Pass
				{
					type: 'pass',
					topText: [
						'You applied for a job',
						'And got hired',
						'They said you can work there',
						'Until you retire!'
					],
					bottomText: [
						'That\'s cool!',
						'Go 2 Pass'
					],
					action: 'goPass',
					image: 'images/pass.jpg'
				},
				{
					type: 'pass',
					topText: [
						'You\'re always asking what is this',
						'and then you became a scientist'
					],
					bottomText: [
						'That\'s cool!',
						'Go 2 Pass'
					],
					action: 'goPass',
					image: 'images/pass.jpg'
				},
				{
					type: 'pass',
					topText: [
						'You went to college',
						'To be a boss',
						'Then paid the cost',
						'To be the boss'
					],
					bottomText: [
						'That\'s cool!',
						'Go 2 Pass'
					],
					action: 'goPass',
					image: 'images/pass.jpg'
				},
				{
					type: 'pass',
					topText: [
						'You started choking and',
						'then quit smoking!'
					],
					bottomText: [
						'That\'s cool!',
						'Go 2 Pass'
					],
					action: 'goPass',
					image: 'images/pass.jpg'
				},
				{
					type: 'pass',
					topText: [
						'You pushed your car in the past,',
						'when all you needed was some gas.'
					],
					bottomText: [
						'It\'s cool!',
						'You get your gas!',
						'Now go 2 Pass'
					],
					action: 'goPass',
					image: 'images/pass.jpg'
				},
				{
					type: 'pass',
					topText: [
						'You got a job and',
						'work real hard'
					],
					bottomText: [
						'It\'s cool!',
						'Go 2 Pass'
					],
					action: 'goPass',
					image: 'images/pass.jpg'
				},
				{
					type: 'pass',
					topText: [
						'You struck gold',
						'and don\'t have',
						'to work anymore'
					],
					bottomText: [
						'It\'s cool!',
						'Go 2 Pass'
					],
					action: 'goPass',
					image: 'images/pass.jpg'
				},
				{
					type: 'pass',
					topText: [
						'You went to college',
						'and gained some knowledge!'
					],
					bottomText: [
						'It\'s cool!',
						'Go 2 Pass'
					],
					action: 'goPass',
					image: 'images/pass.jpg'
				},
				// Stay
				{
					type: 'stay',
					topText: [
						'You donated to the Homeless in ',
						'the shelter to help the people',
						'get out of the weather!'
					],
					bottomText: [
						'That\'s cool!',
						'You can stay!'
					],
					action: 'goStay',
					image: 'images/stay.jpg'
				},
				{
					type: 'stay',
					topText: [
						'Yesterday you mopped the floor',
						'now you\'re happy every time',
						'you walk through the door!'
					],
					bottomText: [
						'That\'s cool!',
						'You can stay!'
					],
					action: 'goStay',
					image: 'images/stay.jpg'
				},
				{
					type: 'stay',
					topText: [
						'You did the favor',
						'for your neighbor'
					],
					bottomText: [
						'That\'s cool!',
						'You can stay!'
					],
					action: 'goStay',
					image: 'images/stay.jpg'
				},
				{
					type: 'stay',
					topText: [
						'You helped an old lady cross',
						'the street and then you gave',
						'her something to eat'
					],
					bottomText: [
						'That\'s cool!',
						'You can stay!'
					],
					action: 'goStay',
					image: 'images/stay.jpg'
				},
				{
					type: 'stay',
					topText: [
						'You grew up to be 7 feet tall',
						'and then you played',
						'NBA Basketball'
					],
					bottomText: [
						'That\'s cool!',
						'You can stay!'
					],
					action: 'goStay',
					image: 'images/stay.jpg'
				},
				{
					type: 'stay',
					topText: [
						'You helped your mom out with some money',
						'and that made your day sunny'
					],
					bottomText: [
						'That\'s cool!',
						'You can stay!'
					],
					action: 'goStay',
					image: 'images/stay.jpg'
				},
				{
					type: 'stay',
					topText: [
						'You ran a race and',
						'took first place!'
					],
					bottomText: [
						'That\'s cool!',
						'You can stay!'
					],
					action: 'goStay',
					image: 'images/stay.jpg'
				},
				{
					type: 'stay',
					topText: [
						'You struck gold and don\'t',
						'have to work anymore!'
					],
					bottomText: [
						'That\'s cool!',
						'You can stay!'
					],
					action: 'goStay',
					image: 'images/stay.jpg'
				},
				{
					type: 'stay',
					topText: [
						'You\'re a true-blue friend',
						'until the end!'
					],
					bottomText: [
						'That\'s cool!',
						'You can stay!'
					],
					action: 'goStay',
					image: 'images/stay.jpg'
				},
				{
					type: 'stay',
					topText: [
						'You helped your brother',
						'solve a puzzle!'
					],
					bottomText: [
						'That\'s cool!',
						'You can stay!'
					],
					action: 'goStay',
					image: 'images/stay.jpg'
				},
				{
					type: 'stay',
					topText: [
						'You bought a mop and',
						'you saw your pop!'
					],
					bottomText: [
						'That\'s cool!',
						'You can stay!'
					],
					action: 'goStay',
					image: 'images/stay.jpg'
				},
				{
					type: 'stay',
					topText: [
						'You started singing in a',
						'band and now you have',
						'twenty-grand $20,000!'
					],
					bottomText: [
						'That\'s cool!',
						'You can stay!'
					],
					action: 'goStay',
					image: 'images/stay.jpg'
				},
				{
					type: 'stay',
					topText: [
						'You did a favor',
						'for your neighbor.',
					],
					bottomText: [
						'That\'s cool!',
						'You can stay!'
					],
					action: 'goStay',
					image: 'images/stay.jpg'
				},
				{
					type: 'stay',
					topText: [
						'You bought a cat',
						'and you copt a cap'
					],
					bottomText: [
						'That\'s cool!',
						'You can stay!'
					],
					action: 'goStay',
					image: 'images/stay.jpg'
				},
				{
					type: 'stay',
					topText: [
						'You went out West and ',
						'won a beauty contest!'
					],
					bottomText: [
						'That\'s cool!',
						'You can stay!'
					],
					action: 'goStay',
					image: 'images/stay.jpg'
				},
				// Home
				{
					type: 'home',
					topText: [
						'You\'re always late and',
						'make people wait'
					],
					bottomText: [
						'That\'s not Cool!',
						'Too late!',
						'Go Home!'
					],
					action: 'goHome',
					image: 'images/home.jpg'
				},
				{
					type: 'home',
					topText: [
						'You got drunk and lost',
						'your cool, then started',
						'acting like a fool'
					],
					bottomText: [
						'That\'s not Cool!',
						'Go Home!'
					],
					action: 'goHome',
					image: 'images/home.jpg'
				},
				{
					type: 'home',
					topText: [
						'The mirror, mirror on the wall',
						'said that you didn\'t look',
						'at it at all!'
					],
					bottomText: [
						'That\'s not Cool!',
						'Go Back Home!'
					],
					action: 'goHome',
					image: 'images/home.jpg'
				},
				{
					type: 'home',
					topText: [
						'Mighty mouse lives',
						'in your house!'
					],
					bottomText: [
						'That\'s not Cool!',
						'Go Home!',
						'Clean up your house!'
					],
					action: 'goHome',
					image: 'images/home.jpg'
				},
				// Jail
				{
					type: 'jail',
					topText: [
						'You began abusing drugs',
						'and started hanging',
						'out with thugs!'
					],
					bottomText: [
						'That\'s not cool!',
						'Go to jail!'
					],
					action: 'goJail',
					image: 'images/jail.jpg'
				},
				{
					type: 'jail',
					topText: [
						'You went to the store and stole some rice,',
						'then got caught and have to pay the price!'
					],
					bottomText: [
						'That\'s not cool!',
						'Go to jail!'
					],
					action: 'goJail',
					image: 'images/jail.jpg'
				},
				{
					type: 'jail',
					topText: [
						'When you were young, you',
						'pushed people around and now',
						'you\'re grown and locked down!'
					],
					bottomText: [
						'That\'s not cool!',
						'Go to jail!'
					],
					action: 'goJail',
					image: 'images/jail.jpg'
				},
				{
					type: 'jail',
					topText: [
						'You killed someone in a fit of rage',
						'and now you\'re locked up in a cage.',
					],
					bottomText: [
						'That\'s not cool!',
						'Go to jail!'
					],
					action: 'goJail',
					image: 'images/jail.jpg'
				},
				{
					type: 'jail',
					topText: [
						'You killed someone in a fit',
						'of rage, and now you\'re',
						'locked in a cage!'
					],
					bottomText: [
						'That\'s not cool!',
						'Go to jail!'
					],
					action: 'goJail',
					image: 'images/jail.jpg'
				},
				// School
				{
					type: 'school',
					topText: [
						'You quit schooling at',
						'the age of 2'
					],
					bottomText: [
						'That\'s not Cool!',
						'Go to School Fool!'
					],
					action: 'goSchool',
					image: 'images/school.jpg'
				},
				{
					type: 'school',
					topText: [
						'You can\'t even count',
						'your money, and',
						'that is not funny'
					],
					bottomText: [
						'That\'s not Cool!',
						'Go back to School!'
					],
					action: 'goSchool',
					image: 'images/school.jpg'
				},
				{
					type: 'school',
					topText: [
						'You can\'t read or write!',
						'But you want to',
						'party all night!'
					],
					bottomText: [
						'That\'s not Cool!',
						'Go back to School!'
					],
					action: 'goSchool',
					image: 'images/school.jpg'
				},
				{
					type: 'school',
					topText: [
						'You have a boss who',
						'works you like',
						'a horse!'
					],
					bottomText: [
						'That\'s not Cool!',
						'Go back to School!'
					],
					action: 'goSchool',
					image: 'images/school.jpg'
				},
				// Work
				{
					type: 'work',
					topText: [
						'You spent your last dime',
						'on a bottle of wine!'
					],
					bottomText: [
						'That\'s not cool!',
						'Go to Work!'
					],
					action: 'goWork',
					image: 'images/work.jpg'
				},
				{
					type: 'work',
					topText: [
						'You want to lay in bed all day',
						'and then wonder why',
						'you don\'t get paid'
					],
					bottomText: [
						'That\'s not cool!',
						'Go to Work!'
					],
					action: 'goWork',
					image: 'images/work.jpg'
				},
				{
					type: 'work',
					topText: [
						'You don\'t even have a dime',
						'because all you do is',
						'waste your time!'
					],
					bottomText: [
						'That\'s not cool!',
						'Go to Work!'
					],
					action: 'goWork',
					image: 'images/work.jpg'
				},
				{
					type: 'work',
					topText: [
						'You don\'t have a honey',
						'because you don\'t',
						'have any money!'
					],
					bottomText: [
						'That\'s not cool!',
						'Go to Work!'
					],
					action: 'goWork',
					image: 'images/work.jpg'
				},
				// Death
				{
					type: 'dead',
					topText: [
						'You joined a gang ',
						'and got shot and died. ',
						'Then your friends and family cried!'
					],
					bottomText: [
						'That\'s not cool!',
						'You\'re out of the game!',
						'Sorry!'
					],
					action: 'killPlayer',
					image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/US_Capitol_Building_at_night_Jan_2006.jpg/1018px-US_Capitol_Building_at_night_Jan_2006.jpg'
				},
				{
					type: 'dead',
					topText: [
						'You got so high',
						'you couldn\'t come down',
						'and now you\'re 6 feet',
						'in the ground.'
					],
					bottomText: [
						'You O\'D',
						'You\'re out of the game!'
					],
					action: 'odPlayer',
					image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/US_Capitol_Building_at_night_Jan_2006.jpg/1018px-US_Capitol_Building_at_night_Jan_2006.jpg'
				}
			],
			spaces: {
				home: {
					color: 'home',
					poly: '1,0 20,0 20,15 1,15 1,0',
					img: 'images/city.png',
					textColor: 'black',
					bgColor: '#999'
				},
				work: {
					color: 'work',
					poly: '19,35 43,35 43,55 19,55 19,35',
					img: 'images/work.png',
					textColor: 'black',
					bgColor: '#999'
				},
				school: {
					color: 'school',
					poly: '39,35 64,35 64,55 39,55 39,35',
					img: 'images/school.png',
					textColor: 'black'},
				jail: {
					color: 'jail',
					poly: '60,35 85,35 85,55 60,55 60,35',
					img: 'images/jail.png',
					textColor: 'black'},
				1: {
					color: 'rgba(255,255,255,.6)',
					poly: '13,5 8,5 10,11 12,11 13,5'
				},
				2: {color: colors.yellow, poly: '8,5 4,8 7,13 10,11 8,5'},
				3: {color: colors.black, poly: '4,8 2,13 6,16 7,13 4,8'},
				4: {color: colors.red, poly: '2,13 0,19 5,19 6,16 2,13'},
				5: {color: 'cool?', poly: '0,19 1,26 5,23 5,19 0,19'},
				6: {color: colors.blue, poly: '1,26 4,31, 7,25 5,23 1,26'},
				7: {color: colors.yellow, poly: '4,31 9,33 10,26 7,25 4,31'},
				8: {color: colors.black, poly: '9,33 13,32 12,26 10,26 9,33'},
				9: {color: 'cool?', poly: '13,32 18,28 15,24 12,26 13,32'},
				10: {color: colors.red, poly: '18,28 21,25 20,20 15,24 18,28'},
				11: {color: colors.blue, poly: '21,25 25,21 25,15 20,20 21,25'},
				12: {color: colors.black, poly: '21,25 25,30 27,24 25,21 21,25'},
				13: {color: colors.yellow, poly: '25,30 29,32 30,25 27,24 25,30'},
				14: {color: 'cool?', poly: '29,32 34,31 32,25 30,25 29,32'},
				15: {color: colors.black, poly: '34,31 38,28 34,23 32,25 34,31'},
				16: {color: colors.yellow, poly: '38,28 41,19 35,21 34,23 38,28'},
				17: {color: 'pass', poly: '41,19 40,13 36,15 35,21 41,19'},
				18: {color: colors.black, poly: '40,13 37,8 34,12 36,15, 40,13'},
				19: {color: colors.red, poly: '37,8 33,5 32,11 34,12 37,8'},
				20: {color: 'cool?', poly: '33,5 28,5 29,11 32,11 33,5'},
				21: {color: colors.yellow, poly: '28,5 23,8 27,12 29,11 28,5'},
				22: {color: colors.black, poly: '23,8 21,12 25,15 27,12 23,8'},
				23: {color: 'cool?', poly: '21,12 20,20 25,15 25,15 21,12'},
				24: {color: colors.blue, poly: '41,19 45,19 45,14 40,13 41,19'},
				25: {color: colors.red, poly: '45,19 50,21 49,15 45,14 45,19'},
				26: {color: colors.yellow, poly: '50,21 51,22 47,26 45,19 50,21'},
				27: {color: colors.blue, poly: '51,22 52,23 51,29 47,26 51,22'},
				28: {color: 'cool?', poly: '51,29 56,30 55,24 52,23 51,29'},
				29: {color: colors.black, poly: '56,30 60,28 57,23 55,24 56,30'},
				30: {color: colors.yellow, poly: '60,28 63,25 59,21 57,23 60,28'},
				31: {color: colors.red, poly: '63,25 65,19 60,18 59,21 63,25'},
				32: {color: 'pass', poly: '65,19 64,13 60,15 60,18 65,19'},
				33: {color: colors.blue, poly: '64,13 62,8 59,12 60,15 64,13'},
				34: {color: 'cool?', poly: '62,8 57,4 56,10 59,12 62,8'},
				35: {color: colors.black, poly: '57,4 52,4 53,10 56,10 57,4'},
				36: {color: colors.yellow, poly: '52,4 47,8 51,12 53,10 52,4'},
				37: {color: 'cool?', poly: '47,8 45,14 49,15 51,12 47,8'},
				38: {color: colors.yellow, poly: '65,19 69,14 66,10 64,13 65,19'},
				39: {color: colors.blue, poly: '69,14 71,10 69,7 66,10 69,14'},
				40: {color: colors.black, poly: '71,10 72,7 72,3 69,7 71,10'},
				41: {color: colors.red, poly: '72,7 77,7 76,3 72,3 72,7'},
				42: {color: 'cool?', poly: '72,7 73,11 77,11 77,7 72,7'},
				43: {color: colors.blue, poly: '73,11 73,15 78,15 77,11 73,11'},
				44: {color: colors.yellow, poly: '73,15 74,19 78,19 78,15 73,15'},
				45: {color: colors.red, poly: '74,19 74,25 79,22 78,19 74,19'},
				46: {color: 'cool?', poly: '74,25 75,29 79,28 79,22 74,25'},
				47: {color: colors.black, poly: '79,28 83,28 82,22 79,22 79,28'},
				48: {color: 'trap', poly: '83,28 86,28 86,22 82,22 83,28'},
				49: {color: 'pass', poly: '84,11 88,11 89,8 85,5 84,10'},
				50: {color: colors.yellow, poly: '89,8 90,7 90,2 85,5 89,8'},
				51: {color: colors.black, poly: '90,7 92,8 94,4 90,2 90,7'},
				52: {color: colors.red, poly: '92,8 93,10 98,10 94,4 92,8'},
				53: {color: 'cool?', poly: '93,10 93,12 96,16 98,10 93,10'},
				54: {color: colors.blue, poly: '93,12 90,16 94,19 96,16 93,12'},
				55: {color: colors.yellow, poly: '90,16 90,21 94,21 94,19 90,16'},
				56: {color: 'trap', poly: '90,21 91,27 95,27 94,21 90,21'},
				57: {color: 'winner!!', poly: '90,30 85,40 98,40 97,30 90,30'}
			},
			sections: {
				timeouts: ['school', 'work', 'jail', 'home'],
				c: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				o1: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
				gap1: [24],
				o2: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37],
				gap2: [38, 39, 40],
				l: [41, 42, 43, 44, 45, 46, 47, 48],
				question: [49, 50, 51, 52, 53, 54, 55, 56],
				win: [57]
			},
			start: {
				players: number,
				colors: array,
				text: string
			},
			dice: {
				0: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2OUNCNUJFNUJDQUMxMUU1QkU4QkEzNENCOUM5NzVDQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2OUNCNUJFNkJDQUMxMUU1QkU4QkEzNENCOUM5NzVDQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjY5Q0I1QkUzQkNBQzExRTVCRThCQTM0Q0I5Qzk3NUNDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY5Q0I1QkU0QkNBQzExRTVCRThCQTM0Q0I5Qzk3NUNDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6MaTiwAAEcdJREFUeNrsXQmM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',
				1: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDMDYyMkZBRkJBRjcxMUU1OEFCQ0Y0OTNGRDBDNzZFMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDMDYyMkZCMEJBRjcxMUU1OEFCQ0Y0OTNGRDBDNzZFMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkMwNjIyRkFEQkFGNzExRTU4QUJDRjQ5M0ZEMEM3NkUyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkMwNjIyRkFFQkFGNzExRTU4QUJDRjQ5M0ZEMEM3NkUyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+xfaGigAAAkNJREFUeNrs2sEuA0Ecx/FZgisRPTk5cJd4BO3dAc+ANPUkJHSfAQd39QjCXSROIm0RHLWR+o9MiabbbXftdCb7/SW/k2T/zX7szm47QafTUcSdBIAAQgABhAACCAEEEAIIIJwFQAgggBBAACGAAEIAAYQAQgABhAACCAEEEAIIIAQQAgggBBBAUn+IIBjrfJf+KX0DmZKWpOvSNemSdNb87U16L72SXkovpG1AsgHRJ70i3ZEuDHnYZ2lVemiwvAD5/jDjbky2pXX9URO2bo7h9Dn4ORcOg0xKwxQQvQ3NMZ0GcfWWpU/cmXTjn0edSzeln6who4EcSfcyGlftPTYgg0G2pCcZj9Rryikg8SD6aepWWsh4ZFO60n36cglkwrEX1YoFDGVmVHhTH3yFTEsfRnjPSJsn6aK0xRXSP0WLGMrMKrp2hbgGYjslQKKzmpOZ3qwhTcu3rO46UuCxtz/Ih1nYbaYlnQEEEC/WkPeczPQG5C4nM70BuR7DzBtAolPLyUxvFnW9oD9K5y0+8vLVScwTz7HFeaGZyRUScYXo2Pr6XV8dy4qv32OjT1DZwpyyitmJwhXyN/rWtZvROH7CTQCS200ObANS7MtKslGukQKioTzaKOfTVtJ9s64M+57yYtaLA+XRVlJfN1vrXxe7m63nzN9e1e9m65ppa9jbNiDJQDJbRwEhgABCAAGEAAIIAQQQAggBBBACCCAEEEAIIIAQQAgggBBAACGAAEIAAYQAQgABhAACCAEEEAJIzvIlwADNquzPV4EhBAAAAABJRU5ErkJggg==',
				2: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3N0Q2N0M2OUJBRjQxMUU1OEFCQ0Y0OTNGRDBDNzZFMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3N0Q2N0M2QUJBRjQxMUU1OEFCQ0Y0OTNGRDBDNzZFMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjc3RDY3QzY3QkFGNDExRTU4QUJDRjQ5M0ZEMEM3NkUyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc3RDY3QzY4QkFGNDExRTU4QUJDRjQ5M0ZEMEM3NkUyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/OyqCgAAAvNJREFUeNrsnMFqFEEQhnt19aoievIkGO+Cj2D27kF9BoWwPokJmM0rqAfvxkcQvYvgSSQxinpdCWu19BAIGXdnpqd3qur74T8t6WL72+6Z6an8o8ViEdBwdI4pAAgCCEAQQACCAAIQBBCAIICgOo2tfrHRaLTW+m3PCMf8JsMF8UR8T3xXfFN8OX32S/xZ/E78VvxG/KfXH5LV094VVkic9Kn4sfjaisN+F++KtxOs7Cvk3x9a9BI9Eh/Er9/SB2mM7PPqDch58awDiNOepTGzAfG0ZcWJeyW+n7nUa/ED8XGOLcvTbe92DzBCGnOHi3qzFfJQ/KLnkvGa8rLrCvEAJN5NfRRf77nkN/Ht6u6LLate0wIwQqoxZcv6/wq5KP7S4Dmjq47EN8RzVsjZ2iwII6Ram10G8ACktCYAqdcdbTWtA9lYQ81bAKnXJW01eUE1MFkH8ltbTetAPmmraR3I+zXU/ACQeu1rq+nh6OSr+GqhshydLNFc/LxgvVmqyQqpWSFRpY7fj9KDKMfvSxQnaKtAna2wpBMFICeKb/J2exw/jp3ljSRNDt1Fk0NLHaeJ28s45t5ZMDrJcaPcYWjfj3UYemqU895K+lT8pMFzyo90vXgWemol9QykUtVsHd8uVs3WV9JnP8NJs/V+8nzVnQcg7YD0Iv4dIdOErFu8oAIIAghAEEAAggACEAQQgKAhqfHRidYzIrNAGmhQkRVa1Pi0V21khRZ5iaxQ86bTS2SFFufYslR0c3i67VURWeHloq4mssIDEFWRFR62LFWRFdZXiLrICusrRF1khQcgpTUBSL3URVZYB6IussI6EHWRFZ6e1NEAgKiLrLAORF1khXUg6iIrrANRF1mhRV2OTlRFVlhfIeoiK6yvkChVkRUenkNURVZ4eTBUE1nhYcuqRJPDgFZICFoiK7TIS2SFp76s0xpkZIWna0idBhVZAZAet1jLGjMh9u6yEEAAggACEAQQBBCAIIAABAEEIKiE/gowAFGVPmcVybujAAAAAElFTkSuQmCC',
				3: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyNjRGODA4OEJBRjcxMUU1OEFCQ0Y0OTNGRDBDNzZFMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyNjRGODA4OUJBRjcxMUU1OEFCQ0Y0OTNGRDBDNzZFMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI2NEY4MDg2QkFGNzExRTU4QUJDRjQ5M0ZEMEM3NkUyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjI2NEY4MDg3QkFGNzExRTU4QUJDRjQ5M0ZEMEM3NkUyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+2Nku6AAAA8hJREFUeNrsnb1uE0EUhcfgpE0QgooKidBH4hGwGyoK4BkgiswbhCcgCYnzCgEp9JgeCgQ9ikSFkB0HkXTIKDJ35LuS5WT2zzszd33PkU4T27OT+fbO7swe2Y3xeGwgObqGIQAQCEAABAIQAIEAZPHVzHpDo9GI2kFt66RmhW0tkdvkh+QH5LvkVX7tjPyD/IX8kfyB/A/1cEUBZJ2BOSrEDnqH/Jx8K+dxT8n75G2GhQqZ/ofTnKFn5L5tpqT73Ebp/i2aywK5Tu7OAWLWXW5TPZAyU5YduHfkxxUX63vyE/KF5imrzG3vtgcYhtvcwUW9WIU8JR967pO9przVWiFFgNi7qe/k2577dEK+n9x9YcpyqxMAhuFjdDBlpVfIMvlngXXGvBqS75BHqJCr1QoIw/CxWhorpAiQ0GoDiFvrEfq2DiBurUXo2z0AcWslQt9WAASqDZDzCH07BxC3jiP07RhA3PoaoW/fAMStXoS+9TQCKbJ18ot8M1C/sHWSoRF5L2C/unxMVIijQqxCbb8PeSGK7fcM2QHaDNCnTZORRFlolQg52Klr7Ml7EscAIQe3vITxRE2L0mNAU9evLTN5vJu3zSF/ZrVOFVJFUG4wB4iByQjKGWVhvHmBJGfvKzOJh+YdpFP+TNrZqzKMV0W2d3Z+b03N7zf4tT9T83uPPcqAoTOMV0GF+NCbkHdytaqQIKtThPHyr9QDA1EfxpP2xFB9GE9ShSCMJ6xCEMYTCCS02gDiFsJ4woAgjCcMCMJ4BkE5AyBuIYwnDAjCeMKAIIwnDAjCeEbe1on6MJ6kCkEYz+jdfhcbxpO2DlEfxpO4MLRP8vY9tm/bPjRSJSL6clk25HBkqn+efmTS81/Rx1kqkARKyDBeIpueeWQm30z0yUxyXX/Zff7bDr9nSROQRCHCeMkNxZaJnI6sA5BksHyE8aahi0hH1gXI7HSyS/7MZ/+IPeC/7fJ7lnO0Jy4dWTcgVSrojUOtgnKBF5+JbDpyw+Ot9cYskNqs1CMAEZuO1AhEdDpS4yNc0elIbRUiPh2prULEpyM1AgmtNoC4JT4dqQ2I+HSkNiDi05FILgqTNiDi05HagIhPR2oDIj4dqQ2I+HSkxq0T0elIbRUiPh2J7Xe/1VE4HalxHSI6Hal1YSg2Han5mbrIr4DSvHVywQN3UGGbByb7eyPTpeY3ZtPlPR2JGFD2lDUre/f1kvyiwDrlN18vXpuKfvUaQC6ryq8qBJAKgHhR3nFuarmC1+XEwwMqAIEABEAgAAEQCEAABAqt/wIMAHykb0eP6J91AAAAAElFTkSuQmCC',
				4: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyNjRGODA4NEJBRjcxMUU1OEFCQ0Y0OTNGRDBDNzZFMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyNjRGODA4NUJBRjcxMUU1OEFCQ0Y0OTNGRDBDNzZFMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjc3RDY3QzZCQkFGNDExRTU4QUJDRjQ5M0ZEMEM3NkUyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc3RDY3QzZDQkFGNDExRTU4QUJDRjQ5M0ZEMEM3NkUyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+rOvpvgAAAvJJREFUeNrsnE1uE0EQhWf42yYIkRUrJDhAJI5AcoTkFBFHgDMQ+RY5AOYICC4QiRVCcYgE2ZqFqVG6ZWQCmnZXd9cU35PeKrLnlb9Yme7pvH61WnXIju7wEQAEAQQgCCAAQQABCAIIQBBA0N90L/UFfd83DTx2720qObOBJOi++FD8UvxC/FS8G372Q/xZ/EH8XvxO/LPRZ2cr50AyxSM0DPNafDm8/Uh/C6/Z1co7lZx/5FYGciy+SBhw0xfhPUoDMZOzFJC74lnGgJuehffUBmIuZwkgQ6AzxSGjz24b1lvOEkDeFhgy+lQRiMmc2kCOCg4ZfaQAxGxOTSDDncaiwqCL3+9qvOXcdM5K/ZV4r8I6YS9cy3vOmwVt6ooyrIAfiL+IH1davA33/0/Ey8SVuvmcWntZBxWH7MK1DhznVAFSW4eOc2YD2W8w6L7jnNlAnjcY9JnjnNlAdhoMuuM4ZzYQVEjbArlukPXacc5sIOcNBj13nDMbyMcGg35ynDMbyLzBoHPHOdc7DBlbJ1/Fj6xuSUwlp9Y3ZNnd8gygoGbhml5zrjWB7ffLbhrb71vl1Nx+H47InFT4rTsJ1/KeM/sbEnXaTeMRrsmcHHL4Dw45xGE5BmQISNRx5h/QRVfvoJyJnKWBxLuaN+KrhAGvwmtqHyVtnnPT2y4MxygeYh6e2sVDzA/Dz75360PM8+Dl2JsQTzm1VurN5P3fEXq6TmyJB1QAQQABCAIIQBBAAIIAAhBkSVRrNM6ZDSRBVGtsS5JqDao1qNbgmbrNnJw6oVqDag2qNajWoFqjo1rDXc6bBS3VGm1zau1lUa2hm1MFSG1RrfEPUa1R6JpUa9jImQ2Eao1C1+QBlTFRrWEjZzYQqjUKXZNqDRs5s4FQrVHomlRrNM6p9Q2hWkM351pUa1CtkSqqNajWoFqDQw4cA6Jag2oNqjXs56Raw1hOrZV6M1GtgaqKB1QAQQABCAIIQBBAAIIAAhAEEASQqeiXAAMA5YDp6sW55QYAAAAASUVORK5CYII=',
				5: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyNjRGODA4Q0JBRjcxMUU1OEFCQ0Y0OTNGRDBDNzZFMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyNjRGODA4REJBRjcxMUU1OEFCQ0Y0OTNGRDBDNzZFMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI2NEY4MDhBQkFGNzExRTU4QUJDRjQ5M0ZEMEM3NkUyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjI2NEY4MDhCQkFGNzExRTU4QUJDRjQ5M0ZEMEM3NkUyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Ufc7jwAAA+xJREFUeNrsXbFuE0EUXEOSNkGIVFRIQB+JTyBuqChIviLiE8InJAR/Q0AKPaaHAkGPLFEhZCeRwB0yQuat2BOOFXJ79u7b2b0ZaZrY3ndzc3e+vZ08d6bTqSFwcI27gIYQNISGEDSEhhA0pHys1L2h0+kk3cBQ86RcdKwErLkq7AofCh8I7wg33Gs/hF+EH4RvhW+Ev0AP0rQ6rHNX0QN2Y/eFp3Y4T565z2wsu32+zEXHskJ2hcMGAuY5dGOkNgRGx6JCrgt7SwiYZ8+NqW0InI5FhNiCJwFFVDy5TExEQyB1LCLkeQQRFY8UDYHU0VTITkQRFXcUDIHV0USIvZMYKQgZzd61RDAEWkeTmfpT4abCPGDT1YoFaB2dultCN8NdE34V3lKanNn7+9vCSeCZOrwO3zNkW1GEcbW2I4wLr6OJIdroRjIEWoevIVsJhGxlMmbQmr6G3Esg5G6EMeF1+BqynkDIeiZjBq3JBSow+BoyTrBt40zGDFrT15BBAiGDTMYMWtPXkI8JhHyKMCa8Dl9D+gmE9DMZM2jNJo9Ovglvoj5yqBWaiQ7fM2RiLnnGHxE9VzM08HUAPrY+NWU8fl9IR5N5iI3A7CkcVXuuVixg61hg6fPIKC59RoSqjmJCDnOwIbZHwgPhO/M3fvPTcej+duDes1ozVjEhh0qMSnxm5rq/b8KH2IqIAc1id8kvyJGpCZgZhRCbhg4tQ6qj95nwvIGAc/cZiKM3so5GhvhODH1QhZTtqlwVUr7hXvtu/oWU+46TGjNeCR8H/iJ/LXwi/K2k44Ihse6yNKAaYtNAsDNEA3NnoQ2YHUcuaa/3LxsfvRr7AswQey3+bOLnpuzd2v1q4oZkCNqKYSlhvCLOkOzDeKWdIaWE8YoyRBtdGvJ/bLWkZjaGlBLGK8aQ9ZbUzOq2t/VAMmTckprZGDJoSc1sDCkljFeMIf2W1LwSaI9Osg7jlXaGlBLGK+YMsdB6/H7mJqJ8/F6DUsJ4RU0M7Urei4jj27GPDSpA19RThvGS7OeQMaAKIVOFlSmaMaBYOtQNidoaz+iE8aLrKKbF38zOihZiM2zxt/Tl5FD43h39E8eR+9uhe88a0mWx1PR7tjcObPHHFn9s8WfY4o8t/tjiL7IOtvgD08EWf2A62OIPTAdb/IHpYIs/MB1s8Qemg8lFMLDFH5gOtvgD08EWf2A62OIPTAdb/IHpYIs/NB1s8ccWf3Vgiz/kFn8Rl3DZ4s/wdwz5S59t+KXPWcC0xitFB3KLP01DYHSgtvi7ICTgxBBeR0hDoiCBIUl1dJD+nYvgAhUNIWgIDSFoCA0haAgNIfTxR4ABAKozcNnmLedRAAAAAElFTkSuQmCC',
				6: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDMDYyMkZBQkJBRjcxMUU1OEFCQ0Y0OTNGRDBDNzZFMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDMDYyMkZBQ0JBRjcxMUU1OEFCQ0Y0OTNGRDBDNzZFMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI2NEY4MDhFQkFGNzExRTU4QUJDRjQ5M0ZEMEM3NkUyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkMwNjIyRkFBQkFGNzExRTU4QUJDRjQ5M0ZEMEM3NkUyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+eG65pwAAA3JJREFUeNrsnUFuE0EQRWdMYJsgRFaskOAAkTgCyRGSU0QcAc5A5FvkAJgjROECkVghFIdIkK1ZmB6pR1hRFNfY3dW/7VdSrRJ3zVN5lOme+vntfD5vCJ3YWfYLbdsWvcBUX5haOHYS1nwa8ijk+5DvQr4OuRd/9ifk95AXIb+G/BLyr+iXtCxH17nH0hDdxX4MedMtZ8xf8TN7616fNWvhWBfkJOT1AID7eR3XKN0QGY5VQZ6EHK8BcD/HcU3vhshxrALSFTxPCNHn+UMwGRsiybEKyOcMEH2eOTZEkmMoyHFGiD6PHRoiyzEEpHuSmDqATBefWjI0RJpjNOAJ+UPIfYd9wH6slSukOdplj4Rxh/ss5I+QL502Z93z/auQs8Q7dXkO6x1y6AjRxFqHGdaV5xjSEO84ytQQaQ5rQw4KgBxUsmbSmtaGvC0A8ibDmvIc1obsFgDZrWTNpDVHDSEV1obcFbi2u0rWTFrT2pCrAiBXlayZtKa1IZcFQL5lWFOew9qQSQGQSSVrJq055OjkZ8gXqkcOS0Er4bDeIbPmgTP+jDGONVOHPofgsfVNsxnH7ytxDNmHdCMwpw7fqtNYK1doc6zw6vOs2YxXuJIcDDlswJBDD8MYkMgY0GKcrPkHctroDMpJcKQawfwU8nYAwG38jNooaXEO68bQEv2QcvdWrh9Sfh5/9rv5P6Q8iTmzPnQk3BjKc6RsSJbYNjnCiGZocaTSh6ANSdk9tCE6HGhDxDjYFIpxcGwixoE2RIwDbYgYB9oQMQ7rCyq0IU4cjx6doA3x57DcIWhDHDmsDfGOrdSGWBuCNsSxpqUhaEMcOSwNQRviWBN9iFhYGoI2xLGmpSFoQxxrWhqCNsSRw9IQtCGONa1HJ2hDnDgsdwjaEE8OtCFaHNZ9CNoQLw60IfW+wu2CIQexIYcehjEgkTGgxUAbkoEDbYgYh2VjaAm0IYk4UjUkS2yjHKHF0EUreEElFjjsiHHgsKPGgcOOFgcOO2Ic/GsNHHY4YMRhB4cdVFQNDjs47OQKHHYMO1xUVE4cOOyIceCwI8aBw44YBw47Yhw47Ihx8IJKLHDYEePAYUeMA4cdMQ4cdsQ4cNgR48BhR40Dhx0cdpYFDjuoqHDYYciBMaA6OHDYEePAYUeMA4cdMQ4cdsQ4UFCJxT8BBgA8AdoGRRuhswAAAABJRU5ErkJggg=='
			},
			colors: colors,
			sunglasses: '0,0 40,0 45,20 55,20 60,0 100,0 100,100 60,100 55,40 45,40 40,100 0,100 0,0'
		};

		return models;
	});
/**
 * @ngdoc service
 * @name cool.Rules
 * @description
 * # Rules
 * Factory in the cool.
 */
angular.module('cool')
    .factory('Rules', function ()
    {
        'use strict';
        var rules = {
            // checks the current State to apply various rules

        };

        return rules;
    });
/**
 * @ngdoc service
 * @name cool.State
 * @description
 * # State
 * Factory in the cool.
 */
angular.module('cool')
	.factory('State', function ($rootScope, $window) {
		'use strict';
		
		// INITIALIZATION
		// console.log('State: Is it cool?');
		$rootScope.points = {};
		$rootScope.screen = {
			width: $window.innerWidth,
			height: $window.innerHeight
		};
		// ACTUAL DEFINITION
		var state = {
			show:{fpv:0},
			turn: '',
			gameStarted: false,
			// current state of the game
			players: [],
			messages: [],
			dice: [],
			card: {},
			direction: true
		};
		
		return state;
	})
;
'use strict';

/**
* @ngdoc directive
* @name cool.directive:messages
* @description
* # messages
*/
angular.module('cool')
.directive('messages', function ()
{
    return {
        templateUrl: 'scripts/messages/messages-d.html',
        restrict: 'EA'
    };
});
/**
 * @ngdoc overview
 * @name cool.routes
 * @description
 * # cool.routes
 *
 * Routes module. All app states are defined here.
 */

var coolCtrl = function (State, Rules, Api, Models, $window, $sce) {
	'use strict';
	var vm = this;
	vm.di = {state: State, rules: Rules, api: Api, models: Models, window: $window, sce: $sce};
	vm.cool = 'very';
};

angular.module('cool')
	.config(function ($stateProvider, $urlRouterProvider) {
		'use strict';
		
		$urlRouterProvider.otherwise('/');
		
		
		$stateProvider
			.state('cool', {
				url: '/',
				template: '<start></start>',
				controller: coolCtrl,
				controllerAs: 'cool'
			})
			.state('cool.board', {
				url: 'board',
				template: '<board></board>'
			})
			.state('cool.board.space', {
				/*// Various space types will
				 // have params set as well
				 // to help with styling*/
				url: '/:space',
				template: 'Space: Is it cool?'
			})
			.state('cool.cards', {
				url: 'cards',
				template: 'Cards: Is it cool?<ui-view></ui-view>'
			})
			.state('cool.cards.card', {
				/*// Various card types will
				 // have params set as well
				 // to help with styling*/
				url: '/:card',
				template: 'Card: Is it cool?'
			})
			.state('cool.board.fpv', {
				/*// Various card types will
				 // have params set as well
				 // to help with styling*/
				url: '/fpv',
				template: '<fpv></fpv>'
			})
		/* STATES-NEEDLE - DO NOT REMOVE THIS */;
		
	});


'use strict';

/**
* @ngdoc directive
* @name cool.directive:rules
* @description
* # rules
*/
angular.module('cool')
.directive('rules', function ()
{
    return {
        templateUrl: 'scripts/rules/rules-d.html',
        restrict: 'EA'
    };
});
'use strict';

/**
* @ngdoc directive
* @name cool.directive:start
* @description
* # start
*/
angular.module('cool')
.directive('start', function ()
{
    return {
        templateUrl: 'scripts/start/start-d.html',
        restrict: 'E'
    };
});