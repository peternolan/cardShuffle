'use strict';

// Declare app level module which depends on views, and core components
angular.module('cardShuffle.controllers', []).controller('cardsController', function ($scope) {

    //Create each Suit for the deck
    let suits = ["Heart", "Spade", "Diamond", "Club"];
    let deck = [];//Array that will hold the deck

    //In this for loop, we set the initial deck, with the cards in order according to the above list, suits/
    for (let i = 0; i < suits.length; i++) {

        //For each suit, we prepare 13 cards, Ace-King
        for (let j = 1; j <= 13; j++) {

            let faceWord = "NA"; //The current face value of the cards.

            //Depending on the current value of j, provide the current face value.
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

            //Add the newly made card to the deck array.
            deck.push({
                Card : {
                    suit: suits[i],
                    value: j,
                    face: faceWord
                }
            });
        }
    }
    $scope.cardList = deck; //This will be the link that connects the UI to the card list.
    let origDeck = deck;//Keep the original deck aside, in case we want to reset the current deck.

    /**
     * First Method of shuffling the deck. In this method, we:
     *      Divide the deck into two halves.
     *      Alternate between adding one card from each deck
     *      Continue the process until we have reached the end of the deck.
     */
    $scope.shuffle = function () {

        let deck = $scope.cardList; //Variable to hold the current deck.
        let finalDeck = []; //Variable that will hold out final, shuffled deck.

        //We repeat this process 7 times in order to get a much more varied solution.
        for (let k = 0; k < 7; k++) {

            let right = 0; //Index of the right half of the deck.
            let left = 0; //Index of the left half of the deck.

            let deckLeft = []; //Array to hold the left half of the deck.
            let deckRight = []; //Array to hold the right half of the deck.

            //Put the first half of the array into the left deck.
            for (let i = 0; i < deck.length/2; i++) {
                deckLeft.push(deck[i]);
            }
            //Put the second half of the deck into the right deck.
            for (let j = deck.length/2; j < deck.length; j++) {
                deckRight.push(deck[j]);
            }
            //Iterate through both decks, alternating between the two in terms of which deck we must add.
            for (let n = 0; n < 52; n++) {
                //Right deck gets the even indexes. Left gets the odd.
                if (n % 2 === 0) {
                    finalDeck[n] = deckRight[right];
                    right++;
                }
                else {
                    finalDeck[n] = deckLeft[left];
                    left++;
                }
            }
            deck = finalDeck;//Set the current deck to the finalDeck so that we can perform this action multiple times.
        }

        $scope.cardList = finalDeck;//Return the finalDeck as the new deck on the page.
    };

    /**
     * Reset the deck to its original order.
     */
    $scope.reset = function () {

        $scope.cardList = origDeck;
    };

    /**
     * Alternative way of shuffling the deck. This method provides much more random results.
     *
     */
    $scope.shuffle2 = function () {

        let deck = $scope.cardList;

        for (let i = 0; i < deck.length; i++) {
            let j = Math.floor(Math.random() * i);

            let temp = deck[i];
            deck[i] = deck[j];
            deck[j] = temp;

        }

        $scope.cardList = deck;
    };

});
