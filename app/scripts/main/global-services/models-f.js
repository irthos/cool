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
				{
					topText: [
						'You went to college',
						'To be a boss',
						'Then paid the cost',
						'To be the boss'
					],
					bottomText: [
						'That\'s cool!',
						'You can go to pass'
					],
					action: 'goPass',
					background: 'green'
				},
				{
					topText: [
						'You applied for a job',
						'And got hired',
						'They said you can work there',
						'Until you retire!'
					],
					bottomText: [
						'That\'s cool!',
						'Go to pass'
					],
					action: 'goPass',
					background: 'green'
				},
				{
					topText: [
						'You joined a gang and got shot and died. Then your family cried!'
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
					topText: [
						'Locked in the can.'
					],
					bottomText: [
						'jailin'
					],
					action: 'goJail',
					image: 'http://www.liberalamerica.org/wp-content/uploads/2015/03/e15243d5-58a2-4215-8989-0d666bbb07d6.jpg'
				},
				{
					topText: [
						'Locked in the can.'
					],
					bottomText: [
						'schoolin'
					],
					action: 'goSchool',
					image: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjX4Ji27pvKAhVK5WMKHdKlCl4QjRwIBw&url=http%3A%2F%2Fwww.englishinbritain.co.uk%2Fschool_detail.cfm%3Fschoolid%3D421&bvm=bv.111396085,d.cGc&psig=AFQjCNGI9S-76H1wjc9C80PgZYGiFSy1oA&ust=1452399090198131'
				},
				{
					topText: [
						'Locked in the can.'
					],
					bottomText: [
						'workin'
					],
					action: 'goWork',
					image: 'https://pixabay.com/static/uploads/photo/2014/07/05/10/31/work-384745_640.jpg'
				}
			],
			spaces: {
				work: {color: 'work', poly:'1,40 25,35 25,50 1,50 1,40', img:'', textColor:'white',bgColor:'#999'},
				school: {color: 'school', poly:'27,35 52,40 52,50 27,50 27,35', img:'', textColor:'white'},
				jail: {color: 'jail', poly:'79,40 54,37.5 54,50 79,50 79,40',img:'', textColor:'white'},
				1: {color: colors.blue, poly:'13,5 8,5 10,11 12,11 13,5'},
				2: {color: colors.yellow, poly:'8,5 4,8 7,13 10,11 8,5'},
				3: {color: colors.black, poly:'4,8 1.8,13 5.5,16 7,13 4,8'},
				4: {color: colors.red, poly:'1.8,13 0,19 5,19 5.5,16 1.8,13'},
				5: {color: 'cool?', poly:'0,19 1,26 5.3,22.5 5,19 0,19'},
				6: {color: colors.blue, poly: '1,26 3.5,31, 7,25 5.3,22.5 1,26'},
				7: {color: colors.yellow, poly: '3.5,31 9,33 10,26 7,25 3.5,31'},
				8: {color: colors.black, poly: '9,33 13,32 12,25.5 10,26 9,33'},
				9: {color: 'cool?', poly:'13,32 18,28 15,24 12,25.5 13,32'},
				10: {color: colors.red, poly:'18,28 21,25 20,20 15,24 18,28'},
				11: {color: colors.blue, poly:'21,25 25,21 25.1,15 20,20 21,25'},
				12: {color: colors.black, poly:'21,25 24.5,30 27,24 25,21 21,25'},
				13: {color: colors.yellow, poly:'24.5,30 29,31.5 29.5,25 27,24 24.5,30'},
				14: {color: 'cool?', poly:'29,31.5 34,31 32,25 29.5,25 29,31.5'},
				15: {color: colors.black, poly:'34,31 37.5,27.5 34,23 32,25 34,31'},
				16: {color: colors.yellow, poly:'37.5,27.5 41,19 35,21 34,23 37.5,27.5'},
				17: {color: 'pass', poly:'41,19 40,13 35.5,15 35,21 41,19'},
				18: {color: colors.black, poly:'40,13 37,8 34,12 35.5,15, 40,13'},
				19: {color: colors.red,poly:'37,8 33,5 32,11 34,12 37,8'},
				20: {color: 'cool?', poly:'33,5 28,5 29,11 32,11 33,5'},
				21: {color: colors.yellow, poly:'28,5 23,8 27,12 29,11 28,5'},
				22: {color: colors.black, poly:'23,8 21,12 25.1,15 27,12 23,8'},
				23: {color: 'cool?', poly:'21,12 20,20 25.1,15 25.1,15 21,12'},
				24: {color: colors.blue, poly:'41,19 44.5,18.5 45,13.5 40,13 41,19'},
				25: {color: colors.red, poly:'44.5,18.5 50,21 49,15 45,13.5 44.5,18.5'},
				26: {color: colors.yellow, poly: '50,21 51,22 47,26 44.5,18.5 50,21'},
				27: {color: colors.blue, poly:'51,22 52,23 51,29 47,26 51,22'},
				28: {color: 'cool?', poly:'51,29 56,30 54.5,23.5 52,23 51,29'},
				29: {color: colors.black, poly:'56,30 60,28 57,23 54.5,23.5 56,30'},
				30: {color: colors.yellow, poly:'60,28 63,25 59,21 57,23 60,28'},
				31: {color: colors.red, poly:'63,25 64.5,19 60,18 59,21 63,25'},
				32: {color: 'pass', poly:'64.5,19 64,13 60,15 60,18 64.5,19'},
				33: {color: colors.blue, poly:'64,13 62,8 59,12 60,15 64,13'},
				34: {color: 'cool?', poly:'62,8 57,4 56,10 59,12 62,8'},
				35: {color: colors.black, poly:'57,4 52,4 53,9.5 56,10 57,4'},
				36: {color: colors.yellow, poly:'52,4 47,8 51,12 53,9.5 52,4'},
				37: {color: 'cool?', poly:'47,8 45,13.5 49,15 51,12 47,8'},
				38: {color: colors.yellow, poly:'64.5,19 68.5,13.5 66,10 64,13 64.5,19'},
				39: {color: colors.blue, poly:'68.5,13.5 71,9.5 69,6.5 66,10 68.5,13.5'},
				40: {color: colors.black, poly:'71,9.5 72,7 71.5,3 69,6.5 71,9.5'},
				41: {color: colors.red, poly:'72,7 76.5,6.5 76,2.5 71.5,3 72,7'},
				42: {color: 'cool?', poly:'72,7 72.5,10.5 77,10.5 76.5,6.5 72,7'},
				43: {color: colors.blue, poly:'72.5,10.5 73,15 77.5,14.5 77,10.5 72.5,10.5'},
				44: {color: colors.yellow, poly:'73,15 73.5,19 78,19 77.5,14.5 73,15'},
				45: {color: colors.red, poly:'73.5,19 74,25 78.5,22 78,19 73.5,19'},
				46: {color: 'cool?', poly:'74,25 74.5,28.5 79,28 78.5,22 74,25'},
				47: {color: colors.black, poly:'79,28 83,28 82,22 78.5,22 79,28'},
				48: {color: 'trap', poly:'83,28 86,28 85.5,21.5 82,22 83,28'},
/*
				49: {color: 'sunglasses', poly:''},
*/
				50: {color: 'pass',poly:'84,11 88,11 88.5,8 85,4.5 84,10'},
				51: {color: colors.yellow, poly:'88.5,8 90,7 89.5,1.5 85,4.5 88.5,8'},
				52: {color: colors.black, poly:'90,7 92,7.5 94,3.5 89.5,1.5 90,7'},
				53: {color: colors.red, poly:'92,7.5 93,9.5 97.5,9.5 94,3.5 92,7.5'},
				54: {color: 'cool?', poly:'93,9.5 92.5,12 96,16 97.5,9.5 93,9.5'},
				55: {color: colors.blue,poly:'92.5,12 90,15.5 94,19 96,16 92.5,12'},
				56: {color: colors.yellow, poly:'90,15.5 89.5,21 94,21 94,19 90,15.5'},
				57: {color: 'trap',poly:'89.5,21 90.5,27 95,26.5 94,21 89.5,21'},
				58: {color: 'win', poly:'89.5,30 90.5,40 98,39.5 97,30 89.5,30'}
			},
			sections: {
				timeouts: ['school', 'work', 'jail'],
				c: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				o1: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
				gap1: [24],
				o2: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37],
				gap2: [38, 39, 40],
				l: [41, 42, 43, 44, 45, 46, 47, 48],
/*
				sunglasses:[49],
*/
				question: [50, 51, 52, 53, 54, 55, 56, 57],
				win: [58]
			},
			start: {
				players: number,
				colors: array,
				text: string
			},
			dice: {
				1: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDMDYyMkZBRkJBRjcxMUU1OEFCQ0Y0OTNGRDBDNzZFMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDMDYyMkZCMEJBRjcxMUU1OEFCQ0Y0OTNGRDBDNzZFMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkMwNjIyRkFEQkFGNzExRTU4QUJDRjQ5M0ZEMEM3NkUyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkMwNjIyRkFFQkFGNzExRTU4QUJDRjQ5M0ZEMEM3NkUyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+xfaGigAAAkNJREFUeNrs2sEuA0Ecx/FZgisRPTk5cJd4BO3dAc+ANPUkJHSfAQd39QjCXSROIm0RHLWR+o9MiabbbXftdCb7/SW/k2T/zX7szm47QafTUcSdBIAAQgABhAACCAEEEAIIIJwFQAgggBBAACGAAEIAAYQAQgABhAACCAEEEAIIIAQQAgggBBBAUn+IIBjrfJf+KX0DmZKWpOvSNemSdNb87U16L72SXkovpG1AsgHRJ70i3ZEuDHnYZ2lVemiwvAD5/jDjbky2pXX9URO2bo7h9Dn4ORcOg0xKwxQQvQ3NMZ0GcfWWpU/cmXTjn0edSzeln6who4EcSfcyGlftPTYgg0G2pCcZj9Rryikg8SD6aepWWsh4ZFO60n36cglkwrEX1YoFDGVmVHhTH3yFTEsfRnjPSJsn6aK0xRXSP0WLGMrMKrp2hbgGYjslQKKzmpOZ3qwhTcu3rO46UuCxtz/Ih1nYbaYlnQEEEC/WkPeczPQG5C4nM70BuR7DzBtAolPLyUxvFnW9oD9K5y0+8vLVScwTz7HFeaGZyRUScYXo2Pr6XV8dy4qv32OjT1DZwpyyitmJwhXyN/rWtZvROH7CTQCS200ObANS7MtKslGukQKioTzaKOfTVtJ9s64M+57yYtaLA+XRVlJfN1vrXxe7m63nzN9e1e9m65ppa9jbNiDJQDJbRwEhgABCAAGEAAIIAQQQAggBBBACCCAEEEAIIIAQQAgggBBAACGAAEIAAYQAQgABhAACCAEEEAJIzvIlwADNquzPV4EhBAAAAABJRU5ErkJggg==',
				2: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3N0Q2N0M2OUJBRjQxMUU1OEFCQ0Y0OTNGRDBDNzZFMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3N0Q2N0M2QUJBRjQxMUU1OEFCQ0Y0OTNGRDBDNzZFMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjc3RDY3QzY3QkFGNDExRTU4QUJDRjQ5M0ZEMEM3NkUyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc3RDY3QzY4QkFGNDExRTU4QUJDRjQ5M0ZEMEM3NkUyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/OyqCgAAAvNJREFUeNrsnMFqFEEQhnt19aoievIkGO+Cj2D27kF9BoWwPokJmM0rqAfvxkcQvYvgSSQxinpdCWu19BAIGXdnpqd3qur74T8t6WL72+6Z6an8o8ViEdBwdI4pAAgCCEAQQACCAAIQBBCAIICgOo2tfrHRaLTW+m3PCMf8JsMF8UR8T3xXfFN8OX32S/xZ/E78VvxG/KfXH5LV094VVkic9Kn4sfjaisN+F++KtxOs7Cvk3x9a9BI9Eh/Er9/SB2mM7PPqDch58awDiNOepTGzAfG0ZcWJeyW+n7nUa/ED8XGOLcvTbe92DzBCGnOHi3qzFfJQ/KLnkvGa8rLrCvEAJN5NfRRf77nkN/Ht6u6LLate0wIwQqoxZcv6/wq5KP7S4Dmjq47EN8RzVsjZ2iwII6Ram10G8ACktCYAqdcdbTWtA9lYQ81bAKnXJW01eUE1MFkH8ltbTetAPmmraR3I+zXU/ACQeu1rq+nh6OSr+GqhshydLNFc/LxgvVmqyQqpWSFRpY7fj9KDKMfvSxQnaKtAna2wpBMFICeKb/J2exw/jp3ljSRNDt1Fk0NLHaeJ28s45t5ZMDrJcaPcYWjfj3UYemqU895K+lT8pMFzyo90vXgWemol9QykUtVsHd8uVs3WV9JnP8NJs/V+8nzVnQcg7YD0Iv4dIdOErFu8oAIIAghAEEAAggACEAQQgKAhqfHRidYzIrNAGmhQkRVa1Pi0V21khRZ5iaxQ86bTS2SFFufYslR0c3i67VURWeHloq4mssIDEFWRFR62LFWRFdZXiLrICusrRF1khQcgpTUBSL3URVZYB6IussI6EHWRFZ6e1NEAgKiLrLAORF1khXUg6iIrrANRF1mhRV2OTlRFVlhfIeoiK6yvkChVkRUenkNURVZ4eTBUE1nhYcuqRJPDgFZICFoiK7TIS2SFp76s0xpkZIWna0idBhVZAZAet1jLGjMh9u6yEEAAggACEAQQBBCAIIAABAEEIKiE/gowAFGVPmcVybujAAAAAElFTkSuQmCC',
				3: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyNjRGODA4OEJBRjcxMUU1OEFCQ0Y0OTNGRDBDNzZFMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyNjRGODA4OUJBRjcxMUU1OEFCQ0Y0OTNGRDBDNzZFMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI2NEY4MDg2QkFGNzExRTU4QUJDRjQ5M0ZEMEM3NkUyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjI2NEY4MDg3QkFGNzExRTU4QUJDRjQ5M0ZEMEM3NkUyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+2Nku6AAAA8hJREFUeNrsnb1uE0EUhcfgpE0QgooKidBH4hGwGyoK4BkgiswbhCcgCYnzCgEp9JgeCgQ9ikSFkB0HkXTIKDJ35LuS5WT2zzszd33PkU4T27OT+fbO7swe2Y3xeGwgObqGIQAQCEAABAIQAIEAZPHVzHpDo9GI2kFt66RmhW0tkdvkh+QH5LvkVX7tjPyD/IX8kfyB/A/1cEUBZJ2BOSrEDnqH/Jx8K+dxT8n75G2GhQqZ/ofTnKFn5L5tpqT73Ebp/i2aywK5Tu7OAWLWXW5TPZAyU5YduHfkxxUX63vyE/KF5imrzG3vtgcYhtvcwUW9WIU8JR967pO9przVWiFFgNi7qe/k2577dEK+n9x9YcpyqxMAhuFjdDBlpVfIMvlngXXGvBqS75BHqJCr1QoIw/CxWhorpAiQ0GoDiFvrEfq2DiBurUXo2z0AcWslQt9WAASqDZDzCH07BxC3jiP07RhA3PoaoW/fAMStXoS+9TQCKbJ18ot8M1C/sHWSoRF5L2C/unxMVIijQqxCbb8PeSGK7fcM2QHaDNCnTZORRFlolQg52Klr7Ml7EscAIQe3vITxRE2L0mNAU9evLTN5vJu3zSF/ZrVOFVJFUG4wB4iByQjKGWVhvHmBJGfvKzOJh+YdpFP+TNrZqzKMV0W2d3Z+b03N7zf4tT9T83uPPcqAoTOMV0GF+NCbkHdytaqQIKtThPHyr9QDA1EfxpP2xFB9GE9ShSCMJ6xCEMYTCCS02gDiFsJ4woAgjCcMCMJ4BkE5AyBuIYwnDAjCeMKAIIwnDAjCeEbe1on6MJ6kCkEYz+jdfhcbxpO2DlEfxpO4MLRP8vY9tm/bPjRSJSL6clk25HBkqn+efmTS81/Rx1kqkARKyDBeIpueeWQm30z0yUxyXX/Zff7bDr9nSROQRCHCeMkNxZaJnI6sA5BksHyE8aahi0hH1gXI7HSyS/7MZ/+IPeC/7fJ7lnO0Jy4dWTcgVSrojUOtgnKBF5+JbDpyw+Ot9cYskNqs1CMAEZuO1AhEdDpS4yNc0elIbRUiPh2prULEpyM1AgmtNoC4JT4dqQ2I+HSkNiDi05FILgqTNiDi05HagIhPR2oDIj4dqQ2I+HSkxq0T0elIbRUiPh2J7Xe/1VE4HalxHSI6Hal1YSg2Han5mbrIr4DSvHVywQN3UGGbByb7eyPTpeY3ZtPlPR2JGFD2lDUre/f1kvyiwDrlN18vXpuKfvUaQC6ryq8qBJAKgHhR3nFuarmC1+XEwwMqAIEABEAgAAEQCEAABAqt/wIMAHykb0eP6J91AAAAAElFTkSuQmCC',
				4: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyNjRGODA4NEJBRjcxMUU1OEFCQ0Y0OTNGRDBDNzZFMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyNjRGODA4NUJBRjcxMUU1OEFCQ0Y0OTNGRDBDNzZFMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjc3RDY3QzZCQkFGNDExRTU4QUJDRjQ5M0ZEMEM3NkUyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc3RDY3QzZDQkFGNDExRTU4QUJDRjQ5M0ZEMEM3NkUyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+rOvpvgAAAvJJREFUeNrsnE1uE0EQhWf42yYIkRUrJDhAJI5AcoTkFBFHgDMQ+RY5AOYICC4QiRVCcYgE2ZqFqVG6ZWQCmnZXd9cU35PeKrLnlb9Yme7pvH61WnXIju7wEQAEAQQgCCAAQQABCAIIQBBA0N90L/UFfd83DTx2720qObOBJOi++FD8UvxC/FS8G372Q/xZ/EH8XvxO/LPRZ2cr50AyxSM0DPNafDm8/Uh/C6/Z1co7lZx/5FYGciy+SBhw0xfhPUoDMZOzFJC74lnGgJuehffUBmIuZwkgQ6AzxSGjz24b1lvOEkDeFhgy+lQRiMmc2kCOCg4ZfaQAxGxOTSDDncaiwqCL3+9qvOXcdM5K/ZV4r8I6YS9cy3vOmwVt6ooyrIAfiL+IH1davA33/0/Ey8SVuvmcWntZBxWH7MK1DhznVAFSW4eOc2YD2W8w6L7jnNlAnjcY9JnjnNlAdhoMuuM4ZzYQVEjbArlukPXacc5sIOcNBj13nDMbyMcGg35ynDMbyLzBoHPHOdc7DBlbJ1/Fj6xuSUwlp9Y3ZNnd8gygoGbhml5zrjWB7ffLbhrb71vl1Nx+H47InFT4rTsJ1/KeM/sbEnXaTeMRrsmcHHL4Dw45xGE5BmQISNRx5h/QRVfvoJyJnKWBxLuaN+KrhAGvwmtqHyVtnnPT2y4MxygeYh6e2sVDzA/Dz75360PM8+Dl2JsQTzm1VurN5P3fEXq6TmyJB1QAQQABCAIIQBBAAIIAAhBkSVRrNM6ZDSRBVGtsS5JqDao1qNbgmbrNnJw6oVqDag2qNajWoFqjo1rDXc6bBS3VGm1zau1lUa2hm1MFSG1RrfEPUa1R6JpUa9jImQ2Eao1C1+QBlTFRrWEjZzYQqjUKXZNqDRs5s4FQrVHomlRrNM6p9Q2hWkM351pUa1CtkSqqNajWoFqDQw4cA6Jag2oNqjXs56Raw1hOrZV6M1GtgaqKB1QAQQABCAIIQBBAAIIAAhAEEASQqeiXAAMA5YDp6sW55QYAAAAASUVORK5CYII=',
				5: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyNjRGODA4Q0JBRjcxMUU1OEFCQ0Y0OTNGRDBDNzZFMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyNjRGODA4REJBRjcxMUU1OEFCQ0Y0OTNGRDBDNzZFMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI2NEY4MDhBQkFGNzExRTU4QUJDRjQ5M0ZEMEM3NkUyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjI2NEY4MDhCQkFGNzExRTU4QUJDRjQ5M0ZEMEM3NkUyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Ufc7jwAAA+xJREFUeNrsXbFuE0EUXEOSNkGIVFRIQB+JTyBuqChIviLiE8InJAR/Q0AKPaaHAkGPLFEhZCeRwB0yQuat2BOOFXJ79u7b2b0ZaZrY3ndzc3e+vZ08d6bTqSFwcI27gIYQNISGEDSEhhA0pHys1L2h0+kk3cBQ86RcdKwErLkq7AofCh8I7wg33Gs/hF+EH4RvhW+Ev0AP0rQ6rHNX0QN2Y/eFp3Y4T565z2wsu32+zEXHskJ2hcMGAuY5dGOkNgRGx6JCrgt7SwiYZ8+NqW0InI5FhNiCJwFFVDy5TExEQyB1LCLkeQQRFY8UDYHU0VTITkQRFXcUDIHV0USIvZMYKQgZzd61RDAEWkeTmfpT4abCPGDT1YoFaB2dultCN8NdE34V3lKanNn7+9vCSeCZOrwO3zNkW1GEcbW2I4wLr6OJIdroRjIEWoevIVsJhGxlMmbQmr6G3Esg5G6EMeF1+BqynkDIeiZjBq3JBSow+BoyTrBt40zGDFrT15BBAiGDTMYMWtPXkI8JhHyKMCa8Dl9D+gmE9DMZM2jNJo9Ovglvoj5yqBWaiQ7fM2RiLnnGHxE9VzM08HUAPrY+NWU8fl9IR5N5iI3A7CkcVXuuVixg61hg6fPIKC59RoSqjmJCDnOwIbZHwgPhO/M3fvPTcej+duDes1ozVjEhh0qMSnxm5rq/b8KH2IqIAc1id8kvyJGpCZgZhRCbhg4tQ6qj95nwvIGAc/cZiKM3so5GhvhODH1QhZTtqlwVUr7hXvtu/oWU+46TGjNeCR8H/iJ/LXwi/K2k44Ihse6yNKAaYtNAsDNEA3NnoQ2YHUcuaa/3LxsfvRr7AswQey3+bOLnpuzd2v1q4oZkCNqKYSlhvCLOkOzDeKWdIaWE8YoyRBtdGvJ/bLWkZjaGlBLGK8aQ9ZbUzOq2t/VAMmTckprZGDJoSc1sDCkljFeMIf2W1LwSaI9Osg7jlXaGlBLGK+YMsdB6/H7mJqJ8/F6DUsJ4RU0M7Urei4jj27GPDSpA19RThvGS7OeQMaAKIVOFlSmaMaBYOtQNidoaz+iE8aLrKKbF38zOihZiM2zxt/Tl5FD43h39E8eR+9uhe88a0mWx1PR7tjcObPHHFn9s8WfY4o8t/tjiL7IOtvgD08EWf2A62OIPTAdb/IHpYIs/MB1s8Qemg8lFMLDFH5gOtvgD08EWf2A62OIPTAdb/IHpYIs/NB1s8ccWf3Vgiz/kFn8Rl3DZ4s/wdwz5S59t+KXPWcC0xitFB3KLP01DYHSgtvi7ICTgxBBeR0hDoiCBIUl1dJD+nYvgAhUNIWgIDSFoCA0haAgNIfTxR4ABAKozcNnmLedRAAAAAElFTkSuQmCC',
				6: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDMDYyMkZBQkJBRjcxMUU1OEFCQ0Y0OTNGRDBDNzZFMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDMDYyMkZBQ0JBRjcxMUU1OEFCQ0Y0OTNGRDBDNzZFMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI2NEY4MDhFQkFGNzExRTU4QUJDRjQ5M0ZEMEM3NkUyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkMwNjIyRkFBQkFGNzExRTU4QUJDRjQ5M0ZEMEM3NkUyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+eG65pwAAA3JJREFUeNrsnUFuE0EQRWdMYJsgRFaskOAAkTgCyRGSU0QcAc5A5FvkAJgjROECkVghFIdIkK1ZmB6pR1hRFNfY3dW/7VdSrRJ3zVN5lOme+vntfD5vCJ3YWfYLbdsWvcBUX5haOHYS1nwa8ijk+5DvQr4OuRd/9ifk95AXIb+G/BLyr+iXtCxH17nH0hDdxX4MedMtZ8xf8TN7616fNWvhWBfkJOT1AID7eR3XKN0QGY5VQZ6EHK8BcD/HcU3vhshxrALSFTxPCNHn+UMwGRsiybEKyOcMEH2eOTZEkmMoyHFGiD6PHRoiyzEEpHuSmDqATBefWjI0RJpjNOAJ+UPIfYd9wH6slSukOdplj4Rxh/ss5I+QL502Z93z/auQs8Q7dXkO6x1y6AjRxFqHGdaV5xjSEO84ytQQaQ5rQw4KgBxUsmbSmtaGvC0A8ibDmvIc1obsFgDZrWTNpDVHDSEV1obcFbi2u0rWTFrT2pCrAiBXlayZtKa1IZcFQL5lWFOew9qQSQGQSSVrJq055OjkZ8gXqkcOS0Er4bDeIbPmgTP+jDGONVOHPofgsfVNsxnH7ytxDNmHdCMwpw7fqtNYK1doc6zw6vOs2YxXuJIcDDlswJBDD8MYkMgY0GKcrPkHctroDMpJcKQawfwU8nYAwG38jNooaXEO68bQEv2QcvdWrh9Sfh5/9rv5P6Q8iTmzPnQk3BjKc6RsSJbYNjnCiGZocaTSh6ANSdk9tCE6HGhDxDjYFIpxcGwixoE2RIwDbYgYB9oQMQ7rCyq0IU4cjx6doA3x57DcIWhDHDmsDfGOrdSGWBuCNsSxpqUhaEMcOSwNQRviWBN9iFhYGoI2xLGmpSFoQxxrWhqCNsSRw9IQtCGONa1HJ2hDnDgsdwjaEE8OtCFaHNZ9CNoQLw60IfW+wu2CIQexIYcehjEgkTGgxUAbkoEDbYgYh2VjaAm0IYk4UjUkS2yjHKHF0EUreEElFjjsiHHgsKPGgcOOFgcOO2Ic/GsNHHY4YMRhB4cdVFQNDjs47OQKHHYMO1xUVE4cOOyIceCwI8aBw44YBw47Yhw47Ihx8IJKLHDYEePAYUeMA4cdMQ4cdsQ4cNgR48BhR40Dhx0cdpYFDjuoqHDYYciBMaA6OHDYEePAYUeMA4cdMQ4cdsQ4UFCJxT8BBgA8AdoGRRuhswAAAABJRU5ErkJggg=='
			},
			colors: colors
		};

		return models;
	});