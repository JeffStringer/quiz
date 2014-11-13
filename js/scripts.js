//put your logic here
var Quiz = {
  initialize: function() {
    this.score = 0;
    this.allQuestions = [ {question: "What is 1 + 1?", choices: ["3", "2", "1", "0"], correctAnswer:1},
                          {question: "What color is the sky?", choices: ["Red", "Orange", "Green", "Blue"], correctAnswer:3},
                          {question: "What are the colors of the Canadian Flag?", choices: ["Red and Green", "Yellow, Red and Black", "Red and White", "Red, White and Blue"], correctAnswer:2},
                          {question: "Who is the president of the United States of America?", choices: ["Obama", "Reagan", "Bush", "Warshington"], correctAnswer:0},
                          {question: "What state do you live in?", choices: ["Warshington", "Alabama", "Hawaii", "Oregon"], correctAnswer:3}

    ];
    this.nextQuestion = function(question) {
      return this.allQuestions[($.inArray(question, this.allQuestions) + 1) % this.allQuestions.length];
    }
  }
}

$(document).ready(function(){
  var quiz = Object.create(Quiz);
  quiz.initialize();

  $("button#begin").click(function(event) {
    $("button#begin").remove();
    start();
  });
  
  var currentQuestion = quiz.allQuestions[0];

  $("button#next").click(function() {
    currentQuestion = quiz.nextQuestion(currentQuestion);
    if (quiz.allQuestions.indexOf(currentQuestion) !== 0) {
      start(); 
    } else {
      end();
    }
  });

  var start = function() {
    $("button#next").show();
    $("div.question").empty();
    $("div.question").append(currentQuestion['question']);
    currentQuestion.choices.forEach(function(choice) {
      $("div.question").append("<p><input type='radio' value=" + currentQuestion.choices.indexOf(choice) + " class='choice' name='choice'>" + " " + choice + " " + "</input></p>");
    });
    $("input[type='radio']").click(function(){
      var chosen = parseInt($(".choice:checked").val());
      if (chosen === currentQuestion.correctAnswer) {
        quiz.score += 20;
      } 
    });
  }

  var end = function() {
    $("button#next").remove();
    $("div.question").empty();
    $("div.question").append("<h4>Your final score is: " + quiz.score + "</h4>");
    $("button#again").show();
    $("button#again").click(function() {
      location.reload();
    });
  }
});
