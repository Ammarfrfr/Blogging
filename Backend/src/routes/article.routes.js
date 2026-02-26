import {Router} from "express";
import { createArticle, deleteArticle, getAllArticles, getArticleById, updateArticle } from "../controllers/article-controller";

const router = Router();

router.route("/").post(createArticle).get(getAllArticles);
router.route("/:id").get(getArticleById).put(updateArticle).delete(deleteArticle);


export default router;