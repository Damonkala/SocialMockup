'use strict';

angular.module('socialMockup')


.controller('dealingCardsCtrl', function($timeout, $scope, $location, $rootScope, $state, $cookies, UserService, jwtHelper, $firebaseObject, $firebaseArray, GameService, $http){

	var gameInstance = new Firebase("https://cardsagainsthumanity-ch.firebaseio.com");

	//******DEALING BOTH DECKS:
	$scope.startDeck = function(user){
		$scope.whiteCards.$add({text: whiteCards, player: ''})
		$scope.blackCards.$add(blackCards)
	}


	//******DEALING BLACK CARDS:
	var blackCardRef = gameInstance.child("blackCards")
	$scope.blackCards = $firebaseArray(blackCardRef)

	var scenarioCardRef = gameInstance.child("scenarioCardRef")
	$scope.scenarioCardRef = $firebaseArray(scenarioCardRef)


	$scope.dealBlackCard = function(user){
		$scope.blackCards.$remove(0);
		var rando = Math.floor((Math.random() * blackCards.length ) + 0);
		var takenCards = blackCards[rando];
		$scope.scenarioCardRef.$add(takenCards)
		blackCards.splice(rando, 1);
		$scope.blackCards.$add(blackCards);
	}


	//******DEALING WHITE CARDS:
	var whiteCardRef = gameInstance.child("whiteCards")
	$scope.whiteCards = $firebaseArray(whiteCardRef)

	var exampleHandRef = gameInstance.child("exampleHand")
	$scope.exampleHand = $firebaseArray(exampleHandRef)


	$scope.howManyCards = function(){
		console.log("Firebase", $scope.whiteCards.text.length);
		console.log("Local", whiteCards.length);
	}
	$scope.takeASingleCard = function(){
		$scope.whiteCards.$remove($scope.whiteCards[3])
		console.log($scope.whiteCards.$remove)
	}

	$scope.killCards = function(){
		$scope.whiteCards.$remove(0);
		$scope.blackCards.$remove(0);
		$scope.exampleHand.$remove(0);
	}
	$scope.startingHand = function(){
		var basedCards = $scope.whiteCards[0]
		console.log("New cards", basedCards)
		for(var i = 0; i<10; i++){
			var rando = Math.floor((Math.random() * basedCards.text.length ) + 0);
			var takenCards = basedCards.text[rando];
			console.log("Rando", rando)
			console.log("Taken cards", takenCards)
			basedCards.text.splice(rando, 1);
			$scope.exampleHand.$add(takenCards)
			console.log("Cards left", basedCards.text.length)
			$scope.whiteCards.$remove(0);
		}
			$scope.whiteCards.$add(basedCards);
	}
	$scope.drawOne = function(user){
		var basedCards = $scope.whiteCards[0]
		var rando = Math.floor((Math.random() * basedCards.text.length ) + 0);
		var takenCards = basedCards.text[rando];
		basedCards.text.splice(rando, 1);
		$scope.exampleHand.$add(takenCards)
		$scope.whiteCards.$remove(0);
		$scope.whiteCards.$add(basedCards);
		console.log("Cards left", basedCards.text.length)
	}
});
