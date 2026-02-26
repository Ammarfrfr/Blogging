import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import Article from "../models/article.model.js";
import { ApiResponse } from "../utils/ApiResponse";

const createArticle = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const author = req.user._id;

  if (!title || !content) {
    throw new ApiError(400, "Title and content are required");
  }

  const article = await Article.create({ title, content, author });

  res.status(201).json(new ApiResponse(true, "Article created successfully", article));
});

export default {
  createArticle,
};