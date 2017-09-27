//Sentences to display on the page one at a time
let sentences = [
    'ten ate neite ate nee enet ite ate inet ent eate',
    'Too ato too nOt enot one totA not anot tOO aNot',
    'oat itain oat tain nate eate tea anne inant nean',
    'itant eate anot eat nato inate eat anot tain eat',
    'nee ene ate ite tent tiet ent ine ene ete ene ate'];

//Variable to keep track of which sentence I'm on
let sentIndex = -1;
//Variable to keep track of which character in the sentence I'm on
let charIndex = 0;
//Variable to keep track of the number of mistakes
let mistakes = 0;
//Variable to keep track of the start time of the game
let startTime;

//When the page loads, hide the upper-case keyboard
$(document).ready(function () {
    $("#keyboard-upper-container").hide();
    loadNextSentence();
});

//When a keydown event happens anywhere on the page...
$(document).keydown(function (event) {
    //If it was the shift key, hide the lower and show the upper
    if (event.keyCode === 16) {
        $("#keyboard-lower-container").hide();
        $("#keyboard-upper-container").show();
    }
});

//When a keyup (key released) event happens anywhere on the page...
$(document).keyup(function (event) {
    //If it's the shift key, hide the upper and show the lower
    if (event.keyCode === 16) {
        $("#keyboard-lower-container").show();
        $("#keyboard-upper-container").hide();
    }
});

//When a keypress event happens anywhere on the page...
$(document).keypress(function (event) {
    //Get the key that was pressed and store it in a variable
    let key = $("#" + event.keyCode);
    //Set the background-color to yellow and embolden the letter
    key.css({
        backgroundColor: 'yellow',
        fontWeight: 'bold'
    });
    //Check to see if the key pressed was the correct character to press
    if(sentences[sentIndex].charAt(charIndex) === String.fromCharCode(event.keyCode)) {
        //If it was... add a checkmark to the #feedback box
        $("#feedback").append($('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>'));
    } else {
        //Otherwise, increment mistakes and add a red 'x'
        mistakes++;
        $("#feedback").append($('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'));        
    }
    //Move the block along each time a key is pressed
    moveCarat();
    //Set the key's background back to plain when the key is released
    $(document).keyup(function () {
        key.css({
            backgroundColor: '',
            fontWeight: ''
        })
    })
});

//Function to move the yellow block in my HTML
function moveCarat() {
    //Increment the number of the character we're on
    charIndex++;
    //If the character is the last one in the setence, load the next sentence
    if(charIndex >= sentences[sentIndex].length) {
        loadNextSentence();
    //Otherwise move the block along and load the current character in the #target-letter box
    } else {
        $("#yellow-block").css('left', '+=17.5px');
        $("#target-letter").text(sentences[sentIndex].charAt(charIndex));        
    }    
}

//Function to load the next sentence in the array
function loadNextSentence() {
    //If this is the first sentence being loaded, set the startTime
    if(sentIndex === -1) startTime = Date.now();
    //Increment the sentence-index by 1
    sentIndex++;
    //Check to see if we're at the end of our array
    if(sentIndex >= sentences.length) {
        let wpm = 57 / 2 - 2 * mistakes;
        //If the game is over, show WPM and ask if they want to play again
        if(confirm("You have finished the game! Your WPM is: " + wpm +
         "\nWould you like to play again?")) {
             //If they do, restart the game
             restartGame();
         }
    } else {
        //Set the inner-text of #sentence to be the current sentence
        $("#sentence").text(sentences[sentIndex]);
        //Move the yellow block back to the start
        $("#yellow-block").css('left', '');
        //Reset charIndex to 0
        charIndex = 0;
        //Set the target letter in the next sentence
        $("#target-letter").text(sentences[sentIndex].charAt(charIndex)); 
        //Empty out the feedback div
        $("#feedback").empty();       
    }
}

//Function to reset and restart the game
function restartGame() {
    //Set all the variables back to the start and load the first sentence
    sentIndex = -1;
    charIndex = 0;
    mistakes = 0;
    loadNextSentence();
}