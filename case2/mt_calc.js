"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 2

   Author:Nicholas Garcia 
   Date:   
   
   Filename: mt_calc.js
	
   Functions List:

   init()
      Initializes the contents of the web page and sets up the
      event handlers
      
   buttonClick(e)
      Adds functions to the buttons clicked within the calcutlor
      
   calcKeys(e)
      Adds functions to key pressed within the calculator window 
      
   eraseChar(textStr)
      Erases the last character from the text string, textStr
      
   evalEq(textStr, decimals) 
      Evaluates the equation in textStr, returning a value to the number of decimals specified by the decimals parameter

   lastEq(textStr) 
      Returns the previous expression from the list of expressions in the textStr parameter

*/
//loads the init() function when browser loaded in
window.onload = init();

function init(){
   //variable calcButtons = the items in the html with the class calsButtons
   var calcButtons = document.getElementsByClassName("calcButton");
   //for loop that goes through all of calcButtons and listens if the button is clicked then the function button click runs
   for(var i = 0; i<calcButtons.length; i++){
      calcButtons[i].addEventListener("click", buttonClick);
   }
   //the item witht the ID calcWindow has a event listner waiting for a keydown and calcKeys function starts
   document.getElementById("calcWindow").addEventListener("keydown", calcKeys);
}

function buttonClick(e){
   //makes variables calcvalue and calcDecimal the values in the box of the id of Calcwindow and decimals
   var calcValue = document.getElementById("calcWindow").value;
   var calcDecimal = document.getElementById("decimals").value;

   //makes the buttonvalue equal to the event of the button being pushed the value of it
   var buttonValue = e.target.value;
   //switch case for if special buttons get clicked from the keyboard it does certain things
   switch(buttonValue){
      case ("del"):
         calcValue = "";
         break;
      case ("bksp"):
         calcValue = eraseChar(calcValue);
         break;
      case ("enter"):
         calcValue += "=" + evalEq(calcValue, calcDecimal) + "\n";
         break;
      case ("prev"):
         calcValue += lastEq(calcValue);
         break;
      default:
         calcValue += buttonValue;
         break;
   }
   //makes calcValue equal to the box with id Calcwindow the value and it focus in that
   document.getElementById("calcWindow").value = calcValue;
   document.getElementById("calcWindow").focus();
}

function calcKeys(e){
      //makes variables calcvalue and calcDecimal the values in the box of the id of Calcwindow and decimals
   var calcValue = document.getElementById("calcWindow").value;
   var calcDecimal = document.getElementById("decimals").value;

      //makes the buttonvalue equal to the event of the button being pushed the value of it
   var buttonValue = e.target.value;

      //switch case for if special buttons get clicked from the calc it does certain things

   switch(buttonValue){
      //delets the string
      case ("Delete"):
         calcValue = "";
         break;
      case ("Enter"):
         calcValue += "=" + evalEq(calcValue, calcDecimal);
         break;
      case ("ArrowUp"):
         calcValue += lastEq(calcWindow.value);
         break;
      default:
         e.preventDefault();
         break;
   }
      //makes calcValue equal to the box with id Calcwindow the value
   document.getElementById("calcWindow").value = calcValue;

}



/* ===================================================================== */

function eraseChar(textStr) { 
   return textStr.substr(0, textStr.length - 1);
}

function evalEq(textStr, decimals) {
   var lines = textStr.split(/\r?\n/);
   var lastLine = lines[lines.length-1];
   var eqValue = eval(lastLine);
   return eqValue.toFixed(decimals);
}  

function lastEq(textStr) {
   var lines = textStr.split(/\r?\n/);
   var lastExp = lines[lines.length-2];
   return lastExp.substr(0, lastExp.indexOf("=")).trim();
}