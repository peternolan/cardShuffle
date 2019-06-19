'use strict';

// Declare app level module which depends on views, and core components
angular.module('cardShuffle.controllers', []).controller('cardsController', function ($scope) {
    //Create each Suit for the deck
    let suits = ["hearts", "spades", "diamonds", "clubs"];
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
                    face: faceWord,
                    imgSrc: (faceWord!=="NA") ?
                        "content/cards/"+faceWord+"_of_"+suits[i]+".png"
                        : "content/cards/"+j+"_of_"+suits[i]+".png",
                }
            });
        }
    }

    $scope.cardList = deck; //This will be the link that connects the UI to the card list.
    let origDeckArr = deck;//Keep the original deck aside, in case we want to reset the current deck.

    /**
     * Alternative way of shuffling the deck. This method provides much more random results.
     * The deck is shuffled using the Fisher--Yates (Knuth) Shuffle Algorithm.
     */
    $scope.shuffle = function () {
        let deck2 = $scope.cardList;//Holds the current cards.
        let finalDeck = [];
        /*
        In this for loop, we swap two random numbers between 0 and i within the deck.
        */
        for (let k = 0; k < deck2.length; k++) {
            finalDeck.push(deck2[k]);
        }
        for (let i = 0; i < deck2.length; i++) {
            let j = Math.floor(Math.random() * i);
            let temp = finalDeck[i];
            finalDeck[i] = finalDeck[j];
            finalDeck[j] = temp;
        }
        $scope.cardList = finalDeck;
    };

    /**
     * Second Method of shuffling the deck. In this method, we:
     *      Divide the deck into two halves.
     *      Alternate between adding one card from each deck
     *      Continue the process until we have reached the end of the deck.
     */
    $scope.shuffle2 = function () {
        let deck1 = $scope.cardList; //Variable to hold the current deck.
        let finalDeck = []; //Variable that will hold out final, shuffled deck.
        //We repeat this process 7 times in order to get a much more varied solution.
        for (let k = 0; k < 7; k++) {
            let right = 0; //Index of the right half of the deck.
            let left = 0; //Index of the left half of the deck.
            let deckLeft = []; //Array to hold the left half of the deck.
            let deckRight = []; //Array to hold the right half of the deck.
            //Put the first half of the array into the left deck.
            for (let i = 0; i < deck1.length/2; i++) {
                deckLeft.push(deck1[i]);
            }
            //Put the second half of the deck into the right deck.
            for (let j = deck1.length/2; j < deck1.length; j++) {
                deckRight.push(deck1[j]);
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
            deck1 = finalDeck;//Set the current deck to the finalDeck so that we can perform this action multiple times.
        }
        $scope.cardList = finalDeck;//Return the finalDeck as the new deck on the page.
    };

    /**
     * Reset the deck to its original order.
     */
    $scope.origDeck = function () {
        $scope.cardList = origDeckArr; //Set the current cardList to the original Deck Order.
    };



});
