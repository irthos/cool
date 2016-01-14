/**
 * @ngdoc service
 * @name cool.Api
 * @description
 * # Api
 * Factory in the cool.
 */
angular.module('cool')
	.factory('Api', function ($state, State, $window, Models) {
		'use strict';

		var api = {
			nextPlayer: function (key) {
				if (State.players[key + 1]) {
					api.message({text: 'moving on', header: 'Next Player ' + State.players[key + 1].playerName});
					State.turn = State.players[key + 1];
				} else {
					api.message({text: 'moving on', header: 'Next Player ' + State.players[0].playerName});
					State.turn = State.players[0];
				}
			},
			movePlayer: function (player) {
				var startingSpace = player.currentPosition;
				var currentRoll = State.currentRoll;
				State.direction = true;
				function chooseDirection() {
					api.message({header:player.playerName, text:'choose direction!'});
					return State.direction = $window.confirm(player.playerName + ' rolled ' + State.currentRoll + '. Press OK to move forward. CANCEL to move backwards');
				}
				function move(direction) {
					api.message('moving', direction ?'up':'down');
					direction ? player.currentPosition = player.currentPosition + 1 :
						player.currentPosition = player.currentPosition - 1;
				}
				api.message({header: player.playerName + ' is on ' + startingSpace, text: 'Rolled a ' + currentRoll});

				for (var x = 0; x < State.currentRoll; x++) {

					// Check for pass
					if(
						(startingSpace === 17 && player.currentPosition === 17) ||
						(startingSpace === 32 && player.currentPosition === 32) ||
						(startingSpace === 50 && player.currentPosition === 50)) {
						api.message({header:player.playerName, text:'passing'});
						switch(player.currentPosition){
							case 17: player.currentPosition = 24; break;
							case 32: player.currentPosition = 38; break;
							case 50: player.currentPosition = 51; break;
						}
					}
					// Check for circles
					else if (
						(player.currentPosition > 10 && player.currentPosition < 24 ) ||
						(player.currentPosition >= 25 && player.currentPosition < 38 )) {
						if(
							(State.currentRoll - x === State.currentRoll) ||
							(player.currentPosition === 11 && startingSpace <= 11) ||
							(player.currentPosition === 25 && startingSpace <= 25) ){
							State.direction = chooseDirection();
						}
						switch(player.currentPosition){
							case 11: !State.direction ? player.currentPosition = 23 : move(State.direction); break;
							case 23: State.direction ? player.currentPosition = 11 : move(State.direction); break;
							case 25: !State.direction ? player.currentPosition = 37 : move(State.direction); break;
							case 37: State.direction ? player.currentPosition = 25 : move(State.direction); break;
							default: move(State.direction);
						}
					}
					// default movement
					else {
						move(State.direction);
					}
					// Fall back if passing the last pass
				if ((player.currentPosition > 50 && startingSpace !== 50) || player.currentPosition > 58){
						player.currentPosition = 41;
						break;
					}
				}

			},
			rollDice: function (first, second) {
				// Random roll of two dice, with up to 4 players.
				// One set of sie per corner.
				var total = 0;
				var doubles = false;
				var firstDie = Math.floor(Math.random() * 6) + 1;
				State.dice[0] = first || firstDie;
				var secondDie = Math.floor(Math.random() * 6) + 1;
				State.dice[1] = second || secondDie;
				firstDie === secondDie ? doubles = true : null;
				(first === second) && (first + second > 1) ? doubles = true : null;
				total = (first + second || firstDie + secondDie);
				State.currentRoll = total;
				State.turn.playerName ? api.message({header: State.turn.playerName + ' Rolls ', text: State.dice}) : null;
				return {total: total, doubles: doubles};
			},
			startGame: function (players) {
				// Chooses players and initiates a new game.
				State.players = [];
				var playerRolls = {};
				var rollPlayers = {};
				for (var x = 0; x < players; x++) {
					var playerName = $window.prompt('What is player ' + (x + 1) + '\'s name?');
					State.players.push({playerName: playerName, currentPosition: 1});
				}
				angular.forEach(State.players, function (player, key) {
					var startingRoll = api.rollDice().total;
					if (rollPlayers[startingRoll]) {
						var newRoll = api.rollDice().total;
						while (rollPlayers[newRoll]) {
							newRoll = api.rollDice().total;
						}
						rollPlayers[newRoll] = player.playerName;
						playerRolls[player.playerName] = newRoll;
					} else {
						api.message({header: player.playerName, text: 'has rolled ' + startingRoll});
						rollPlayers[startingRoll] = player.playerName;
						playerRolls[player.playerName] = startingRoll;
					}
				});
				var scores = [];
				var playerOrder = [];
				angular.forEach(playerRolls, function (score, player) {
					scores.push(score);
				});
				scores.sort(function (a, b) {
					return a - b;
				});
				angular.forEach(scores, function (score) {
					playerOrder.unshift({currentPosition: 1, playerName: rollPlayers[score]});
				});
				var playerColors = ['lightPurple', 'lightOrange', 'lightBlue', 'lightGreen', 'lightYellow', 'lightPink', 'pink'];

				angular.forEach(playerOrder, function (player) {
					var randomColor = Math.floor(Math.random() * (playerColors.length - 1));
					player.color = playerColors[randomColor];
					playerColors.splice(randomColor, 1);
				});
				State.players = playerOrder;

				State.turn = playerOrder[0];
				api.message({
					text: playerOrder[0].playerName + ' goes first.',
					header: 'Game ready to begin.'
				});
				$state.go('cool.board');
				State.gameStarted = true;

			},
			takeTurn: function (key, player, dice) {
				State.messages = {};
				dice ? api.message({header:'Warning', text: player.playerName + ' is a cheat!'}):null;
				api.message({header: player.playerName + ' takes a turn.', text: 'Rolling...'});
				var cool = false;
				var playerRoll = dice ? api.rollDice(dice[0],dice[1]): api.rollDice();
				if (typeof player.currentPosition !== 'number') {
					playerRoll.doubles ? player.currentPosition = 1 : api.nextPlayer(key);
					return;
				}
				api.movePlayer(player, playerRoll.total);
				Models.spaces[player.currentPosition] === 'cool?' ?
					(api.card(key), cool = true) :
					Models.spaces[player.currentPosition] === 'trap' ?
						(
								api.message({text: 'Oh no, ' + player.playerName + ' sent back to start!', header: 'It\'s a trap!!'}),
								api.goHome(player)
						) :
						null;
				if (playerRoll.doubles === true) {
					api.message({
						text: player.playerName + ' goes again.',
						header: 'Doubles!!'
					});
					playerRoll.doubles = false;
				} else {
					api.message({text: 'next player is up.', header: player.playerName + 's turn is over'});
					!cool ? api.nextPlayer(key) : null;
				}

				if(player.currentPosition === 58) {
					api.message({header:'Winner!!', text: player.playerName + ' wins the game.'});
					State.gameStarted = false;
				}
			},
			message: function (message) {
				console.info(message.header, message.text);
				var time = Date.now();
				State.messages[time] = {
					text: message.text,
					header: message.header,
					type: message.type,
					expires: (time + message.duration)
				}
			},
			card: function () {
				api.message({header: 'Getting card', text: 'Is it cool?'});
				var randomCard = Models.cards[Math.floor(Math.random() * Models.cards.length)];
				State.card = randomCard;
			},
			goHome: function (player) {
				api.message({header: 'Going home', text: player.playerName + 'Is it cool?'});
				player.currentPosition = 1;
			},
			killPlayer: function (player) {
				var playerIndex = State.players.indexOf(player);
				api.message({
					text: 'Rough, son. Better luck on the next one',
					header: State.players[playerIndex].playerName + 'is dead.'
				});
				api.nextPlayer(State.players.indexOf(player));
				State.players.splice(playerIndex, 1);
			},
			goPass: function (player) {
				api.message({text: 'Getting a pass, finishing fast!!', header: player.playerName + ' is lucky.'});
				if(player.currentPosition < 24){player.currentPosition = 17}
				else if(player.currentPosition >= 24 && player.currentPosition < 38){player.currentPosition = 32}
				if(player.currentPosition >= 38 && player.currentPosition < 50){player.currentPosition = 50}
				api.nextPlayer(State.players.indexOf(player));
			},
			goJail: function (player) {
				api.message({
					text: 'Getting sent to jail sucks, too bad now you\'re stuck!!',
					header: player.playerName + ' is locked-up.'
				});
				player.currentPosition = 'jail';
				api.nextPlayer(State.players.indexOf(player));
			},
			goSchool: function (player) {
				api.message({text: 'Smarten up, level up', header: player.playerName + ' is getting schooled.'});
				player.currentPosition = 'school';
				api.nextPlayer(State.players.indexOf(player));
			},
			goWork: function (player) {
				api.message({text: 'An empty wallet will get you nowhere fast', header: player.playerName + ' gone broke!!'});
				player.currentPosition = 'work';
				api.nextPlayer(State.players.indexOf(player));
			}
		};
		return api;
	});