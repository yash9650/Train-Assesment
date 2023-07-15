import express from "express";
import { TrainController } from "../Controllers/train.controller";

const router = express.Router();

router.get("/all", TrainController.getTrains);
router.post("/book-seats", TrainController.bookSeats);
router.get("/seats", TrainController.getSeats);
export const trainRoutes = router;
