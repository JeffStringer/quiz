describe("Quiz", function() {
  describe("initialize", function() {
    it("creates a new quiz object", function() {
      var newQuiz = Object.create(Quiz);
      newQuiz.initialize();
      newQuiz.score.should.equal(0);
      newQuiz.allQuestions.length.should.equal(5);
    });
  });
  
  describe("nextQuestion", function() {
    it("selects the next item in the allQuestions array", function() {
      var newQuiz = Object.create(Quiz);
      newQuiz.initialize();
      newQuiz.allQuestions = [{question: "What is 1 + 1?", choices: ["3", "2", "1", "0"], correctAnswer:1},
                              {question: "What color is the sky?", choices: ["Red", "Orange", "Green", "Blue"], correctAnswer:3},
                              {question: "What are the colors of the Canadian Flag?", choices: ["Red and Green", "Yellow, Red and Black", "Red and White", "Red, White and Blue"], correctAnswer:2},
                              {question: "Who is the president of the United States of America?", choices: ["Obama", "Reagan", "Bush", "Warshington"], correctAnswer:0},
                              {question: "What state do you live in?", choices: ["Warshington", "Alabama", "Hawaii", "Oregon"], correctAnswer:3}

      ];
      var currentQuestion = newQuiz.allQuestions[0];
      var next = newQuiz.nextQuestion(currentQuestion);
      next.should.equal(newQuiz.allQuestions[1]);
    });
  });

  describe("previousQuestion", function() {
    it("selects the previous item in the allQuestions array", function() {
      var newQuiz = Object.create(Quiz);
      newQuiz.initialize();
      newQuiz.allQuestions = [{question: "What is 1 + 1?", choices: ["3", "2", "1", "0"], correctAnswer:1},
                              {question: "What color is the sky?", choices: ["Red", "Orange", "Green", "Blue"], correctAnswer:3},
                              {question: "What are the colors of the Canadian Flag?", choices: ["Red and Green", "Yellow, Red and Black", "Red and White", "Red, White and Blue"], correctAnswer:2},
                              {question: "Who is the president of the United States of America?", choices: ["Obama", "Reagan", "Bush", "Warshington"], correctAnswer:0},
                              {question: "What state do you live in?", choices: ["Warshington", "Alabama", "Hawaii", "Oregon"], correctAnswer:3}

      ];
      var currentQuestion = newQuiz.allQuestions[2];
      var previous = newQuiz.previousQuestion(currentQuestion);
      previous.should.equal(newQuiz.allQuestions[1]);
    });
  });
});
