"use strict";angular.module("cool",["ngAnimate","ngResource","ui.router"]),angular.module("cool").directive("board",function(){return{templateUrl:"scripts/board/board-d.html",restrict:"E"}}),angular.module("cool").directive("debug",function(){return{restrict:"E",transclude:!0,template:'<ng-transclude ng-if="$root.debug"></ng-transclude>'}}),angular.module("cool").factory("Api",["$state","State","$window",function(o,l,e){var r={rollDice:function(){var o=0,e=!1,r=Math.floor(6*Math.random())+1,a=Math.floor(6*Math.random())+1;return o=r+a,l.currentRoll=o,r==a?(console.log("Doubles!"),e=!0):null,{total:o,doubles:e}},startGame:function(a){l.players=[];for(var t={},c={},n=0;a>n;n++){console.log("startGame() - get names",n);var s=e.prompt("What is player "+(n+1)+"'s name?");l.players.push({playerName:s,currentPosition:1})}angular.forEach(l.players,function(o,l){console.info(l,o);var e=r.rollDice().total;if(console.info(c[e]),c[e]){for(var a=r.rollDice().total;c[a];)console.error("Tied! Rolling Again"),console.info("player "+o.playerName+" has rolled the same and will now re-roll"),a=r.rollDice().total;c[a]=o.playerName,t[o.playerName]=a}else console.info(o.playerName+" has rolled "+e),c[e]=o.playerName,t[o.playerName]=e}),console.log(t);var u=[],i=[];angular.forEach(t,function(o,l){console.log(o,l),u.push(o)}),u.sort(function(o,l){return o-l}),angular.forEach(u,function(o){i.unshift({currentPosition:1,playerName:c[o]})}),console.log("%c",i,"color:#00ff00"),l.players=i,l.turn=i[0],console.log("%c Game ready to begin. Player "+i[0].playerName+" goes first.","font-size:2em"),o.go("cool.board"),l.gameStarted=!0},takeTurn:function(o,e){var a=r.rollDice();e.currentPosition=e.currentPosition+a.total,console.log("player "+e.playerName+" rolled "+a.total+" "+(a.doubles?"and got doubles!":"")),a.doubles===!0?console.log("player "+e.playerName+" goes again."):l.players[o+1]?l.turn=l.players[o+1]:l.turn=l.players[0]}};return r}]),angular.module("cool").factory("Models",function(){var o="",l=0,e=[],r={player:{name:o,currentPosition:l,color:o},cards:{type:o,text:o,action:o},spaces:{1:"blue",2:"yellow",3:"black",4:"red",5:"cool?",6:"blue",7:"yellow",8:"black",9:"cool?",10:"red",11:"blue",12:"black",13:"yellow",14:"cool",15:"black",16:"yellow",17:"pass",18:"black",19:"red",20:"cool?",21:"yellow",22:"black",23:"cool?",24:"blue",25:"red",26:"yellow",27:"blue",28:"cool?",29:"black",30:"yellow",31:"red",32:"pass",33:"blue",34:"cool?",35:"black",36:"yellow",37:"cool?",38:"yellow",39:"blue",40:"black",41:"red",42:"cool",43:"blue",44:"yellow",45:"red",46:"cool",47:"black",48:"trap",49:"blue",50:"yellow",51:"black",52:"red",53:"cool?",54:"blue",55:"yellow",56:"trap",57:"win"},sections:{c:[1,2,3,4,5,6,7,8,9,10],o1:[11,12,13,14,15,16,17,18,19,20,21,22,23],gap1:[24],o2:[25,26,27,28,29,30,31,32,33,34,35,36,37],gap2:[38,39,40],l:[41,42,43,44,45,46,47,48],question:[49,50,51,52,53,54,55,56],win:[57]},start:{players:l,colors:e,text:o}};return r}),angular.module("cool").factory("Rules",function(){var o={moveLogic:function(o,l,e){},cardLogic:function(){},winLogic:function(){}};return o}),angular.module("cool").factory("State",function(){var o={turn:"",gameStarted:!1,players:[],message:""};return o}),angular.module("cool").config(["$stateProvider","$urlRouterProvider",function(o,l){l.otherwise("/"),o.state("cool",{url:"/",template:"<start></start>",controller:coolCtrl,controllerAs:"cool"}).state("cool.board",{url:"board",template:"<board></board>"}).state("cool.board.space",{url:"/:space",template:"Space: Is it cool?"}).state("cool.cards",{url:"cards",template:"Cards: Is it cool?<ui-view></ui-view>"}).state("cool.cards.card",{url:"/:card",template:"Card: Is it cool?"})}]);var coolCtrl=function(o,l,e,r){var a=this;a.di={state:o,rules:l,api:e,models:r},a.cool="very"};coolCtrl.$inject=["State","Rules","Api","Models"],angular.module("cool").directive("start",function(){return{templateUrl:"scripts/start/start-d.html",restrict:"E"}});