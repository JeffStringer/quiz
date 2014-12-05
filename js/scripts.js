var Quiz = {
  initialize: function() {
    this.allQuestions = [ {question: "What is 1 + 1?", choices: ["3", "2", "1", "0"], correctAnswer:1, myAnswer: ''},
                          {question: "What color is the sky?", choices: ["Red", "Orange", "Green", "Blue"], correctAnswer:3, myAnswer: ''},
                          {question: "What are the colors of the Canadian Flag?", choices: ["Red and Green", "Yellow, Red and Black", "Red and White", "Red, White and Blue"], correctAnswer:2, myAnswer: ''},
                          {question: "Who is the president of the United States of America?", choices: ["Obama", "Reagan", "Bush", "Warshington"], correctAnswer:0, myAnswer: ''},
                          {question: "What state do you live in?", choices: ["Warshington", "Alabama", "Hawaii", "Oregon"], correctAnswer:3, myAnswer: ''}];
  },
  markAnswer: function(question, answer) {
    var index = this.allQuestions.indexOf(question);
    this.allQuestions[index].myAnswer = answer;
  },
  nextQuestion: function(question) {
    return this.allQuestions[($.inArray(question, this.allQuestions) + 1) % this.allQuestions.length];
  },
  previousQuestion: function(question) {
    return this.allQuestions[($.inArray(question, this.allQuestions) - 1) % this.allQuestions.length];
  },
  totalScore: function() {
    var score = 0;
    var points = 100/(this.allQuestions.length);
    this.allQuestions.forEach(function(question) {
      if (question.correctAnswer === question.myAnswer) {
        score += points;
      }
    });
    return score;
  }
}

var User = {
  initialize: function(firstName, lastName, email, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.loggedin = false;
  }
}

Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj))
}

Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

var include = function(arr, obj) {
    for(var i=0; i<arr.length; i++) {
        if (arr[i] == obj) {
          return true;
        } else {
          return false;
        }
    }
}

$(document).ready(function(){

  console.log(localStorage);

  $("button#signup-show").click(function() {
    $("div.user").hide();
    $("div.signup").show();
  });

  $("button#login-show").click(function() {
    $("div.user").hide();
    $("div.login").show();
  });

  $("button#signup").click(function() {
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var email = $("#email").val();
    var password = $("#password").val();
    var passwordConfirmation = $("#passwordConfirmation").val();
    var items = [firstName,lastName,email,password,passwordConfirmation];
    var verified = false;
    if (include(items, "") === false) {
      if (password === passwordConfirmation) {
        verified = true;
      } else {
        $("span#signup-problem").prepend("<p>Passwords do not match!</p>");
        $("#password").val("");
        $("#passwordConfirmation").val("");
        event.preventDefault();
      }
    } else {
      $("span#signup-problem").prepend("<p>Fields can not be blank.</p>");
      event.preventDefault();
    }
    if (verified === true) {
      user = Object.create(User);
      user.initialize(firstName,lastName,email,password);
      alert("Welcome " + user.firstName);
      localStorage.setObj(user.email, user);
      quizBegin(user);
      $("div.signup").hide();
    }
  });

  $("button#login").click(function() {
    var username = $("#email-login").val();
    var password = $("#password-login").val();
    if ((localStorage.getObj(username).email === username) && (localStorage.getObj(username).password === password)) {
      user = Object.create(User);
      user.initialize(localStorage.getObj(username).firstName,localStorage.getObj(username).lastName,localStorage.getObj(username).email,localStorage.getObj(username).password);
      currentUser = user;
      currentUser.loggedin = true;
      quizBegin(currentUser);
    } else {
      $("span#signup-problem").prepend("<p>Email and/or password are not valid.</p>");
       event.preventDefault();
    }
  });

  var quizBegin = function(quizzee) {
    event.preventDefault();
    $("div.quiz").show();
    $("div.login").hide();
      
    var quiz = Object.create(Quiz);
    quiz.initialize();

    $("button#begin").click(function(event) {
      $("button#begin").remove();
      start();
    });
    
    var currentQuestion = quiz.allQuestions[0];

    $("button#previous").click(function() {
      currentQuestion = quiz.previousQuestion(currentQuestion);
      start();
      $("#choice" + currentQuestion.myAnswer).prop("checked", true);
    });

    $("button#next").click(function() {
      $("#choice" + currentQuestion.myAnswer).prop("checked", true);
      if ($("#select")) {
        $("#select").remove();
      }
      if (currentQuestion.myAnswer === '') {
        $("div.question").prepend("<p id='select'>Please make a selection.</p>");
        return;
      }
      currentQuestion = quiz.nextQuestion(currentQuestion);
      if (quiz.allQuestions.indexOf(currentQuestion) !== 0) {
        start(); 
      } else {
        end();
      }
    });

    var start = function() {
      $("button#previous").hide();
      $("button#next").show();
      if (quiz.allQuestions.indexOf(currentQuestion) > 0) {
        $("button#previous").show(); 
      } 
      $("div.question").empty();
      $("div.question").append("<p>" + currentQuestion['question'] + "</p>");
      currentQuestion.choices.forEach(function(choice) {
        $("div.question").append("<p><input type='radio' id='choice" + currentQuestion.choices.indexOf(choice) + "' value=" + currentQuestion.choices.indexOf(choice) + " class='choice' name='choice'>" + " " + choice + " " + "</input></p>");
        if (currentQuestion.myAnswer !== '') {
          $("#choice" + currentQuestion.myAnswer).prop("checked", true);
        }  
      });
      $("input[type='radio']").click(function(){
        var chosen = parseInt($(".choice:checked").val());
        quiz.markAnswer(currentQuestion,chosen); 
      });
    }

    var end = function() {
      $("button#next").remove();
      $("button#previous").remove(); 
      $("div.question").empty();
      if (quiz.totalScore() > 59) {
        $("div.question").append("<h4>" + quizzee.firstName + ", your final score is: " + quiz.totalScore() + ". You passed!</h4>");
      } else {
        $("div.question").append("<h4> Oh no! " + quizzee.firstName + ", your final score is: " + quiz.totalScore() + ". You failed the quiz.</h4>")
      }  
      $("button#again").show();
      $("button#again").click(function() {
        location.reload();
      });
    }
  }
});
