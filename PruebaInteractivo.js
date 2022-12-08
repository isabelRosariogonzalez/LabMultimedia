window.onload = init;

var mivideo;
let stopTimes = [5, 10, 20, 25, 30];

  var question_panel;
  var feedback_panel;

function init(){
  
  mivideo = document.querySelector("#mivideo");

  question_panel = document.querySelector("#question");
  feedback_panel = document.querySelector("#feedback");
  
  //mivideo.ontimeupdate = displayTime;
  mivideo.ontimeupdate = displayQuestion;
  
}

function playVideo() {
  mivideo.play();
  document.getElementsByClassName("video-playlist").disabled = true;
}
function pauseVideo() {
  mivideo.pause();
}
function stopVideo() {
  mivideo.load();
}  
function rewindVideo() {
  mivideo.currentTime = 0;
}

var question_index; // variable to store the index of the question in the array
var formName; // form with the answer choices

var questions = [
  'Which actor played in Titanic?',
  'Who directed movie Jurassic Park (1993)?',
  'Which actor starred in the Matrix movie?',
  'Who directed movie War of the Worlds?',
  'Which actor starred in movie War of the Worlds?'
];

var answers = [
  'Leonardo Di Caprio',
  'Stephen Spielberg',
  'Keanu Reeves',
  'Steven Spielberg',
  'Tom Cruise'
];

var choices = [
  ['Christian Bale', 'Leonardo Di Caprio', 'Madonna'],
  ['Stephen Spielberg', 'J. A. Bayona', 'Wachowski Brothers'],
  ['Mark Wahlberg', 'Bruce Willis', 'Keanu Reeves'],
  ['Quentin Tarantino', 'J. A. Bayona', 'Steven Spielberg'],
  ['Danny Glover', 'Kate Winslet', 'Tom Cruise']
];

var totalScore = 0;  //total score
var pointsForCorrectAnswer = 10;


function checkAnswer(theQuestion, theInput, radioGroup){

  var _feedback = "";
  var feedback_div = document.querySelector("#feedback");
  var score_div = document.querySelector("#score");

  var val = getRadioVal(theInput, radioGroup);
    // display value obtained
  //alert(val);
  //fetch correct answer
  var correctAnswer = answers[theQuestion];
  if (correctAnswer === val){ 
    feedback = val + " is CORRECT!";
    feedback_div.style.backgroundColor = 'green';
    feedback_div.innerHTML = feedback;
    
    //update and display new score
    totalScore += pointsForCorrectAnswer;
    score_div.innerHTML = "Total Points: " + totalScore;

    //clear the question
    question_panel.innerHTML = "";
    feedback_panel.innerHTML = "";

    //remove the question from the quiz 
    questions.splice(theQuestion,1);
    choices.splice(theQuestion,1);
    answers.splice(theQuestion,1);

    //continue play video
    playVideo();

  }else{
    feedback = val + " is WRONG!";
    feedback_div.innerHTML = feedback;
    feedback_div.style.backgroundColor = 'red';
  }  
  
}

//code below adapted from the one at http://www.dyn-web.com/tutorials/forms/radio/get-selected.php 
function getRadioVal(form, name) {
    var val;

    ourForm = document.getElementById(form);
    // get list of radio buttons with specified name
    var radios = ourForm.elements[name];
    
    // loop through list of radio buttons
    for (var i=0, len=radios.length; i<len; i++) {
        if ( radios[i].checked ) { // radio checked?
            val = radios[i].value; // if so, hold its value in val
            break; // and break out of for loop
        }
    }
    return val; // return value of checked radio or undefined if none checked
}

function displayTime (evt) {
  var  timepanel = document.querySelector("#timepanel");

  timepanel.innerHTML = parseInt(mivideo.currentTime);
}

function displayQuestion(evt) {
  
    var timeMark = parseInt(mivideo.currentTime);

    question_index = stopTimes.indexOf(timeMark);
    
    if(question_index > -1) {
      
      formName = question_index + "_form";
      var radioGroupName = question + "_group";
      // pause video
      pauseVideo();
      
      //display question and choices
      var sInnerHTML = questions[question_index];

      sInnerHTML += '<form id="' + formName + '">';

      choicesArray = choices[question_index];
      for(var i=0; i < choicesArray.length; i++) {
        sInnerHTML += "<input type=\"radio\" name=\"" + radioGroupName + "\" onclick=\"checkAnswer('" + question_index + "', '" + formName + "', '" + radioGroupName + "')\" value=\"" + choicesArray[i] + "\">" + choicesArray[i] + "<br>"; 
        //document.getElementById("questions").innerHTML += "<input type=\"radio\" name=\"" + radioGroupName + "\" onclick=\"checkAnswer(\"" + question + "\", \"" + formName + "\", \"" + radioGroupName + "\")\" value=\"" + choicesArray[i] + "\">" + choicesArray[i] + "<br>"; 
      }
      sInnerHTML += '</form>';      
      question_panel.innerHTML = sInnerHTML;

      //remove the stop time from the array of stopping times
      stopTimes.splice(question_index, 1);
    }
    
}