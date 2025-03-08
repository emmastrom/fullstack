const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({ content: String });

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [commentSchema],
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    if (returnedObject.comments) {
      returnedObject.comments.map((comment) => {
        comment.id = comment._id;
        delete comment._id;
      });
    }
  },
});

module.exports = mongoose.model("Blog", blogSchema);
