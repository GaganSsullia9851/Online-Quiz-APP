module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      question: { type: String, required: true, max: 100 },
      answer: { type: String, required: true, max: 100 }
    });

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Quiz = mongoose.model("quiz", schema);
  return Quiz;
};
