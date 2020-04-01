"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 11
   Case Problem 4

   Wordsearch Game Script
   
   Filename: kg_search.js
   Author: Pete Burnham
   Date:   2018-03-01
   
   
   Global Variables
   
   allCells
      References all of the cells in the word search table
      
   found
      Stores a Boolean value indicating whether the currently
      selected letters represents a word in the word search list.
   
   Function List
   
   function drawWordSearch(letters, words)
      Returns the HTML code for a word search table based on the entries
      in the letters array and the location of the words
      in the words array
      
   showList(list)
      Returns the HTML for code for an unordered list of words based
      on the items in the list array

*/
//makes two global variables but found variable is set to false 
var allCells;
var found = false;

//runs init funtion when the page loads into the browser
window.onload = init;

function init() {
   //makes the first h1 element inside an aside element equal to wordSearhTitle varible 
   document.querySelectorAll("aside h1")[0].innerHTML = wordSearchTitle;
   //These get any element with the id wordTable = drawWordSearch functio with the letter grid and wordGrib as parameters 
   document.getElementById("wordTable").innerHTML = drawWordSearch(letterGrid, wordGrid);
   // this get any element with the id wordTable and makes it place showlist with wordArray as paramters inside the HTML
   document.getElementById("wordList").innerHTML = showList(wordArray);
   
   //Variable all cells = the td element inside the table element with id wordSearchTable
   allCells = document.querySelectorAll("table#wordSearchTable td");
   

   //Makes a for loop that goes through all of the allcells array and makes your mouse a pointer if you are hovering there and adds an event where on the mouse down it will run the 
   //start recording function
   for (var i = 0; i < allCells.length; i++) {
      allCells[i].style.cursor = "pointer";
      allCells[i].addEventListener("mousedown", startRecording);
   }
   
   //makes an anonomys function when the mouse click comes up 
   document.getElementById("wordSearchTable").onmouseup = function() {
      //runs stop recording
      stopRecording();
      //Makes two varibles and makes wordList equal to the li inside ul with the id wordSearchList inside the HTML and varible solved equals true
      var wordList = document.querySelectorAll("ul#wordSearchList li");
      var solved = true;
      //makes a for loop that goes through the wordList array
      for (var i = 0; i < wordList.length; i++) {
         //if any of the word list arrays does not equal line-through it makes solved equal to false and repeats
         if (wordList[i].style.textDecoration !== "line-through") {
            solved = false;
            break;
         }


      }
      //if solved you get the alert that you have solved it
      if (solved) {
         alert("You solved the puzzle!");
      }
   };
   
   //on the click of the id of showSolution it runs thios anonomys function
   document.getElementById("showSolution").onclick = function() {
      //Goes through the allCells array  and if that the objects calssname is wordCell it makes the background change to rgb(191, 191, 255)
      for (var i = 0; i < allCells.length; i++) {
         if (allCells[i].className === "wordCell") {
            allCells[i].style.backgroundColor = "rgb(191, 191, 255)";
         }
      }
   };

}


function startRecording(e) {
   //the value of the element with the id pickedLetters equals or adds onto the variable. It adds the event targets text content
   document.getElementById("pickedLetters").value += e.target.textContent;
   //if the background color of the target(the thing being cliked or focused on) does not equal rgb(28, 255, 132) it then makes it rgb(255, 197, 153)
   if (e.target.style.backgroundColor !== "rgb(28, 255, 132)") {
      e.target.style.backgroundColor = "rgb(255, 197, 153)";
   }
   //for all the allCells array it adds an event listner for when the mouse enter occurs it runs the continue recording function
   for (var i = 0; i < allCells.length; i++) {
      allCells[i].addEventListener("mouseenter", continueRecording);
   }
   //default action that was suppose to happen will not
   e.preventDefault();
}


function continueRecording(e) {
   //if the target background color does not equal "rgb(28, 255, 132)" then it equals rgb(255, 197, 153)
   if (e.target.style.backgroundColor !== "rgb(28, 255, 132)") {
      e.target.style.backgroundColor = "rgb(255, 197, 153)";
   }
   //The value in element with the ID pickedLetters adds or equals to the event targets text content
   document.getElementById("pickedLetters").value += e.target.textContent;
}


function stopRecording() {
   //for all the objects in all cells array it removes the event listner of the mouse enter and continue recording that we made in startrecording function
   for (var i = 0; i < allCells.length; i++) {
      allCells[i].removeEventListener("mouseenter", continueRecording);
   }
   //runs check letters function
   checkLetters();
}
  

function checkLetters() {
   //makes two varibles the Current letters var is equal to the id in html called Picked colors value and wordlist equals to all the ul#wordSearchList li in html
   var currentLetters = document.getElementById("pickedLetters").value;
   var wordList = document.querySelectorAll("ul#wordSearchList li");
   for (var i = 0; i < wordList.length; i++) {
      //if currentLetters = wordList array texts content then the style of the text decoration changes to line through and also changes the color of it to RGB(191, 191 ,191)
      if (currentLetters === wordList[i].textContent) {
         wordList[i].style.textDecoration = "line-through";
         wordList[i].style.color = "rgb(191, 191, 191)";
         //sets found equal to true
         found = true;
      }
   }
   //
   for (var i = 0; i < allCells.length; i++) {
      //if the background color of the allcells does not equal "rgb(28, 255, 132)" it runs another if statement that if the backkgroundcolor equals rgb(255, 197, 153) and found
      //then it sets the background color of those cells to "rgb(28, 255, 132)" ptherwise it equals nothing
      if (allCells[i].style.backgroundColor !== "rgb(28, 255, 132)") {
         if (allCells[i].style.backgroundColor === "rgb(255, 197, 153)" && found) {
            allCells[i].style.backgroundColor = "rgb(28, 255, 132)";
         } else {
            allCells[i].style.backgroundColor = "";
         }
      }
   }
   //the element value of the pickColors id sets it equal to nothing
   document.getElementById("pickedLetters").value = "";
   //sets found equal to false
   found = false;
}



/*============================================================*/

function drawWordSearch(letters, words) {
   var rowSize = letters.length;
   var colSize = letters[0].length;

   var htmlCode = "<table id='wordSearchTable'>";
   htmlCode += "<caption>Word Search</caption>";

   for (var i = 0; i < rowSize; i++) {
      htmlCode += "<tr>";

      for (var j = 0; j < colSize; j++) {
         if (words[i][j] == " ") {
            htmlCode += "<td>";
         } else {
            htmlCode += "<td class='wordCell'>";
         }
         htmlCode += letters[i][j];
         htmlCode += "</td>";
      }

      htmlCode += "</tr>";
   }
   htmlCode += "</table>";

   return htmlCode;
}

function showList(list) {
   var htmlCode = "<ul id='wordSearchList'>";

   for (var i = 0; i < list.length; i++) {
      htmlCode += "<li>" + list[i] + "</li>";
   }

   htmlCode += "</ul>";

   return htmlCode;
}
