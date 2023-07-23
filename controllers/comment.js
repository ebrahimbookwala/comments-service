const express = require("express");
const router = express.Router();
const debug = require("debug")("comments-service:server");
const Comment = require("../models/Comments");

async function fetchAllComments(req, res) {
  try {
    const comment = await Comment.find();
    res.status(200).send(comment);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
}

async function createComment(req, res) {
  const { body: incomingComment } = req;

  const comment = new Comment({ ...incomingComment, postId: req.params.id });

  if (incomingComment.isReply) {
    try {
      const mainComment = await Comment.findById(incomingComment.replyId);
      if (!mainComment) {
        throw new Error("cant find the original comment");
      }
      console.log(mainComment);
      mainComment.reactions.replies.push(comment);
      mainComment.save();
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  try {
    await comment.save();
    res.status(200).send(comment);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
}

async function getPostComments(req, res) {
  try {
    const id = Number(req.params.id) ?? 0;
    console.log(req.params.id);

    if (!id) {
      throw new Error("Invalid id");
    }
    const comment = await Comment.find({ postId: req.params.id });

    if (!comment || !comment.length) {
      throw new Error("Comment not found");
    }
    res.status(200).send(comment);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = {
  fetchAllComments,
  createComment,
  getPostComments,
};
