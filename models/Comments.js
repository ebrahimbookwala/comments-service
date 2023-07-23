const mongoose = require("mongoose");

const { Schema } = mongoose;

const CommentSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  postId: {
    type: Number,
    required: true,
  },
  reactions: {
    heart: {
      type: Number,
      default: 0,
    },
    thumbsUp: {
      type: Number,
      default: 0,
    },
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
