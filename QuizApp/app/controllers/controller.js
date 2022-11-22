const db = require("../models");
const Quiz = db.quizData;

// Create and Save a new question and answer
exports.create = (req, res) => {
  // Validate request
  if (!req.body.question) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create question and answer
  const quiz = new Quiz({
    question: req.body.question,
    answer: req.body.answer
  });

  // Save question and answer in the database
  quiz
    .save(quiz)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || " Error occurred while creating question and answer."
      });
    });
};

// Retrieve all questions and answers from the database.
exports.findAll = (req, res) => {
  const question = req.query.question;
  var condition = question ? { question: { $regex: new RegExp(question), $options: "i" } } : {};

  Quiz.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occurred while retrieving question and answer"
      });
    });
};

// Find a single question and answer with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Quiz.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found question and answer with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving question and answer with id=" + qid });
    });
};

// Update question and answer by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Quiz.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update quiz with id=${id}`
        });
      } else res.send({ message: "Question was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating with id=" + id
      });
    });
};

// Delete a question and answer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Quiz.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Quiz with id=${id}. Maybe qiz was not found!`
        });
      } else {
        res.send({
          message: "Quiz Data was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete with id=" + id
      });
    });
};

// Delete all question and answer from the database.
exports.deleteAll = (req, res) => {
  Quiz.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Quiz data were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || " Error occurred while removing all data"
      });
    });
};
