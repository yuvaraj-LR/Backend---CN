import express from "express";

import { LikeController } from "./like.controller.js";

const likeRouter = express.Router();

const likeController = new LikeController();

likeRouter.post("/likeProduct", (req, res) => {
    likeController.likeItem(req, res);
})

likeRouter.get("/getLikes", (req, res, next) => {
    likeController.getLikes(req, res, next);
})

export default likeRouter;