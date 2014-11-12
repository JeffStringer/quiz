describe("Quiz", function() {
  describe("initialize", function() {
    it("creates a new quiz object", function() {
      var newQuiz = Object.create(Quiz);
      newQuiz.initialize();
      newQuiz.score.should.equal(0);
      newQuiz.allQuestions.length.should.equal(4);
    });
  });
});
