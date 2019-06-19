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
     * Reset the deck to its original order.
     */
    $scope.origDeck = function () {
        $scope.cardList = origDeckArr; //Set the current cardList to the original Deck Order.
    };



});
