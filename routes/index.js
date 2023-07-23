const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comment");

const routes = {
  COMMENTS: "/",
  COMMENT: "/:id",
};
/* GET home page. */

router.get(routes.COMMENTS, commentsController.fetchAllComments);

router.post(routes.COMMENT, commentsController.createComment);

router.get(routes.COMMENT, commentsController.getPostComments);

module.exports = router;
