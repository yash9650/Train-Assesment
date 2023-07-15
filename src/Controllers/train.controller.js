"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainController = void 0;
const tslib_1 = require("tslib");
const request_utils_1 = require("../Utils/request.utils");
const train_service_1 = require("../Services/train.service");
const seats_entity_1 = require("../Database/Entities/seats.entity");
const DataSource_1 = tslib_1.__importDefault(require("../Database/DataSource"));
const train_entity_1 = require("../Database/Entities/train.entity");
class TrainController {
    static async getTrains(req, res) {
        try {
            const trains = await train_service_1.TrainService.getTrains();
            return (0, request_utils_1.successResponse)(res, trains);
        }
        catch (error) {
            return (0, request_utils_1.errorResponse)(res, error.message);
        }
    }
    static async bookSeats(req, res) {
        try {
            const requestedSeats = req.body.seats;
            const trainId = req.body.trainId;
            if (!requestedSeats || requestedSeats > 7) {
                return (0, request_utils_1.errorResponse)(res, "Select seats between 1 to 7!!");
            }
            if (!trainId) {
                return (0, request_utils_1.errorResponse)(res, "Internal Server Error!!", 500);
            }
            const bookedSeats = await train_service_1.TrainService.bookSeats(requestedSeats, trainId);
            return (0, request_utils_1.successResponse)(res, bookedSeats);
        }
        catch (error) {
            return (0, request_utils_1.errorResponse)(res, error.message);
        }
    }
    static async resetSeats(req, res) {
        try {
            const seatRepo = DataSource_1.default.getRepository(seats_entity_1.SeatsEntity);
            const trainRepo = DataSource_1.default.getRepository(train_entity_1.TrainEntity);
            await seatRepo.update({}, {
                isAvailable: true,
                isBooked: false,
            });
            await trainRepo.update({}, {
                seatsAvailableCount: 80,
            });
            return (0, request_utils_1.successResponse)(res, "Seats reset successfully");
        }
        catch (error) {
            return (0, request_utils_1.errorResponse)(res, error.message);
        }
    }
}
exports.TrainController = TrainController;
//# sourceMappingURL=train.controller.js.map