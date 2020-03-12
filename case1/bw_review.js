"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 11
   Case Problem 1

   Author: 
   Date:   
   
   Filename: bw_review.js
	
   Functions List:

   init()
      Initializes the contents of the web page and sets up the
      event handlers.
      
   lightStars(e)
      Function that colors the stars representing the user rating
      for the book.
      
   turnOffStars(e)
      Function that restores the stars to empty colors, removing
      the user rating for the book.

   updateCount()
      Updates the count of characters in the wordCountBox
      element.

   countCharacters(textStr)
      Returns the number of a non-whitespace characters
      within textStr

*/
//runs the init() function when page is loaded in
window.onload = init();

function init() {
   //makes stars the items in the html inside <span id="stars"> <img>
   var stars = document.querySelectorAll("span#stars img");
   //makes a for loop that goes through each star image and adds an event istener to each and highlights it and changes your cursor
   for (var i = 0; i < stars.length; i++) {
      stars[i].style.cursor = "pointer";
      stars[i].addEventListener("mouseenter", lightStars);
   }
   //adds an event lsitener in the html with the object with the id comment and when keyup activates it runs updateCount function
   document.getElementById("comment").addEventListener("keyup", updateCount);
}


function lightStars(e) {
   //makes starNumber = to the event target 
   var starNumber = e.target.alt;
   var stars = document.querySelectorAll("span#stars img");
   //makes a for loop tha tgoes through all the img src and changes them to star2.png
   //when it is clicked but the next one goes through all the stars and see whihc one is clicked then changes it
   for (var i = 0; i < starNumber; i++) {
      stars[i].src = "bw_star2.png";
   }
   for (var x = starNumber; x < 5; x++) {
      stars[x].src = "bw_star.png";
   }
   //makes the value of the id rating = starnumber variable + stars to display how much you rated the place
   document.getElementById("rating").value = starNumber + " stars";
   //adds event listeners to the event and when the mouseleaves it activates the funtion turnOffStars and also makes another listener
   //that on click it removes the mouseLeave so once you click tehy will stay there
   e.target.addEventListener("mouseleave", turnOffStars);
   e.target.addEventListener("click",
      function () {
         e.target.removeEventListener("mouseleave", turnOffStars);
      }
   )
}

//Makes the stars turn off by going through and change the original stars and takes them off if not clicked 
function turnOffStars(e) {
   var stars = document.querySelectorAll("span#stars img");
   for (var i = 0; i < 5; i++) {
      stars[i].src = "bw_star.png";
   }
   document.getElementById("rating").value = "";
}

//makes a function that upadtes the word cout everytime a letter is pressed from keyboard
function updateCount() {
   //makes commontext variable equal to the value of the html id comment. 
   //Charcount put the value of all the text area and sents it to be counted on count character function 
   //and wordCOunt BOx gets the value of the number of words in th ebox
   var commentText = document.getElementById("comment").value; 
   var charCount = countCharacters(commentText);
   var wordCountBox = document.getElementById("wordCount");
   //gets the entire number of letter in the text area and puts it iver 100
   wordCountBox.value = charCount + "/1000";
   //if thhe count exceeds 1000 you get a red background and white text color to mean that you hae gon eover the count otherwise it 
   //black and white
   if (charCount > 1000) {
      wordCountBox.style.color = "white";
      wordCountBox.style.backgroundColor = "red";
   }
   else {
      wordCountBox.style.color = "black";
      wordCountBox.style.backgroundColor = "white";
   }

}
/*=================================================================*/

function countCharacters(textStr) {
   var commentregx = /\s/g;
   var chars = textStr.replace(commentregx, "");
   return chars.length;
}   