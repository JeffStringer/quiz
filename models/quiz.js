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