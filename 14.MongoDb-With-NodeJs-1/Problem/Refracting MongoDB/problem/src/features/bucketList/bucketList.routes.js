import express from "express";
import BucketListController from "./bucketList.controller.js";

const router = express.Router();

const bucketListController = new BucketListController();

// router.post("/", bucketListController.add);
// router.get("/", bucketListController.get);

router.post("/", (req, res) => {
    bucketListController.add(req, res);
})

router.get("/", (req, res) => {
    bucketListController.get(req, res);
}) 

export default router;
