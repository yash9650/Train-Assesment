"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trainRoutes = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const train_controller_1 = require("../Controllers/train.controller");
const router = express_1.default.Router();
router.get("/all", train_controller_1.TrainController.getTrains);
router.post("/book-seats", train_controller_1.TrainController.bookSeats);
router.get("/reset-seats", train_controller_1.TrainController.resetSeats);
exports.trainRoutes = router;
//# sourceMappingURL=train.routes.js.map