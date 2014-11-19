describe("Quiz", function() {
  describe("initialize", function() {
    it("creates a new quiz object", function() {
      var newQuiz = Object.create(Quiz);
      newQuiz.initialize();
      newQuiz.allQuestions.length.should.equal(5);
    });
  });

  describe("markAnswer", function() {
    it("allow user to mark their answer", function() {
      var newQuiz = Object.create(Quiz);
      newQuiz.initialize();
      newQuiz.allQuestions = [{question: "What is 1 + 1?", choices: ["3", "2", "1", "0"], correctAnswer:1, myAnswer: ''},
                              {question: "What color is the sky?", choices: ["Red", "Orange", "Green", "Blue"], correctAnswer:3, myAnswer: ''},
                              {question: "What are the colors of the Canadian Flag?", choices: ["Red and Green", "Yellow, Red and Black", "Red and White", "Red, White and Blue"], correctAnswer:2, myAnswer: ''},
                              {question: "Who is the president of the United States of America?", choices: ["Obama", "Reagan", "Bush", "Warshington"], correctAnswer:0, myAnswer: ''},
                              {question: "What state do you live in?", choices: ["Warshington", "Alabama", "Hawaii", "Oregon"], correctAnswer:3, myAnswer: ''}

      ];
      var currentQuestion = newQuiz.allQuestions[0];
      var chosen = 2;
      newQuiz.markAnswer(currentQuestion, chosen);
      currentQuestion.myAnswer.should.equal(2);
    });
  });
  
  describe("nextQuestion", function() {
    it("selects the next item in the allQuestions array", function() {
      var newQuiz = Object.create(Quiz);
      newQuiz.initialize();
      newQuiz.allQuestions = [{question: "What is 1 + 1?", choices: ["3", "2", "1", "0"], correctAnswer:1, myAnswer: ''},
                              {question: "What color is the sky?", choices: ["Red", "Orange", "Green", "Blue"], correctAnswer:3, myAnswer: ''},
                              {question: "What are the colors of the Canadian Flag?", choices: ["Red and Green", "Yellow, Red and Black", "Red and White", "Red, White and Blue"], correctAnswer:2, myAnswer: ''},
                              {question: "Who is the president of the United States of America?", choices: ["Obama", "Reagan", "Bush", "Warshington"], correctAnswer:0, myAnswer: ''},
                              {question: "What state do you live in?", choices: ["Warshington", "Alabama", "Hawaii", "Oregon"], correctAnswer:3, myAnswer: ''}

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
      newQuiz.allQuestions = [{question: "What is 1 + 1?", choices: ["3", "2", "1", "0"], correctAnswer:1, myAnswer: ''},
                              {question: "What color is the sky?", choices: ["Red", "Orange", "Green", "Blue"], correctAnswer:3, myAnswer: ''},
                              {question: "What are the colors of the Canadian Flag?", choices: ["Red and Green", "Yellow, Red and Black", "Red and White", "Red, White and Blue"], correctAnswer:2, myAnswer: ''},
                              {question: "Who is the president of the United States of America?", choices: ["Obama", "Reagan", "Bush", "Warshington"], correctAnswer:0, myAnswer: ''},
                              {question: "What state do you live in?", choices: ["Warshington", "Alabama", "Hawaii", "Oregon"], correctAnswer:3, myAnswer: ''}

      ];
      var currentQuestion = newQuiz.allQuestions[2];
      var previous = newQuiz.previousQuestion(currentQuestion);
      previous.should.equal(newQuiz.allQuestions[1]);
    });
  });

    describe("totalScore", function() {
    it("totals the score at the end of the quiz", function() {
      var newQuiz = Object.create(Quiz);
      newQuiz.initialize();
      newQuiz.allQuestions = [{question: "What is 1 + 1?", choices: ["3", "2", "1", "0"], correctAnswer:1, myAnswer:1},
                              {question: "What color is the sky?", choices: ["Red", "Orange", "Green", "Blue"], correctAnswer:3, myAnswer:3},
                              {question: "What are the colors of the Canadian Flag?", choices: ["Red and Green", "Yellow, Red and Black", "Red and White", "Red, White and Blue"], correctAnswer:2, myAnswer:3},
                              {question: "Who is the president of the United States of America?", choices: ["Obama", "Reagan", "Bush", "Warshington"], correctAnswer:0, myAnswer:0},
                              {question: "What state do you live in?", choices: ["Warshington", "Alabama", "Hawaii", "Oregon"], correctAnswer:3, myAnswer:3}

      ];
      newQuiz.totalScore().should.equal(80);
    });
  });
});

describe("User", function() {
  describe("initialize", function() {
    it("creates a new user", function() {
      var newUser = new Object(User);
      newUser.initialize("John", "Smith", "john@gmail.com", "johnny18");
      newUser.firstName.should.equal("John");
      newUser.lastName.should.equal("Smith");
      newUser.email.should.equal("john@gmail.com");
      newUser.password.should.equal("johnny18")
    });
  });
});
