module.exports = app => {
  const quizData = require("../controllers/controller.js");
  var router = require("express").Router();

  // Create a new question and answer
  router.post("/", quizData.create);

  // Retrieve all questions and answers
  router.get("/", quizData.findAll);

  // Retrieve a single question and answer with id
  router.get("/:id", quizData.findOne);

  // Update a question and answer with id
  router.put("/:id", quizData.update);

  // Delete a question and answer with id
  router.delete("/:id", quizData.delete);

  // Delete all questions and answers
  router.delete("/", quizData.deleteAll);

  app.use("/api/quizData", router);
};
