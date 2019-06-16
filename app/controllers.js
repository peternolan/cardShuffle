'use strict';

// Declare app level module which depends on views, and core components
angular.module('cardShuffle.controllers', []).controller('cardsController', function ($scope) {

    let suits = ["Heart", "Spade", "Diamond", "Club"];
    let deck = [];
    for (let i = 0; i < suits.length; i++) {
        for (let j = 1; j <= 13; j++) {

            let faceWord = "NA";

            if (j === 1) {
                faceWord = "Ace";
            }
            else if (j === 11){
                faceWord = "Jack";
            }
            else if (j === 12){
                faceWord = "Queen";
            }
            else if (j === 13){
                faceWord = "King";
            }

            deck.push({
                Card : {
                    suit: suits[i],
                    value: j,
                    face: faceWord
                }
            });
        }
    }
    $scope.cardList = deck;

    $scope.shuffle = function () {

        let finalDeck = [];
        for (let k = 0; k < 7; k++) {
            let right = 0;
            let left = 0;
            let deck = $scope.cardList;
            let deckLeft = [];
            let deckRight = [];

            console.log(deck.length);
            for (let i = 0; i < deck.length/2; i++) {

                deckLeft.push(deck[i]);
                console.log(deckLeft[i]);
            }
            for (let j = deck.length/2; j < deck.length; j++) {
                var x = 0;

                deckRight.push(deck[j]);
                console.log(deckRight[x]);
                x++;
            }

            for (let n = 0; n < 52; n++) {
                if (n % 2 === 0) {
                    finalDeck[n] = deckRight[right];
                    right++;
                }
                else {
                    finalDeck[n] = deckLeft[left];
                    left++;
                }
            }
        }

        $scope.cardList = finalDeck;
    };
});
