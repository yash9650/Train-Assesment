import { Request, Response } from "express";
import { errorResponse, successResponse } from "../Utils/request.utils";
import { TrainService } from "../Services/train.service";
import { SeatsEntity } from "../Database/Entities/seats.entity";
import appDataSource from "../Database/DataSource";
import { TrainEntity } from "../Database/Entities/train.entity";

export class TrainController {
  static async getTrains(req: Request, res: Response) {
    try {
      const trains = await TrainService.getTrains();
      return successResponse(res, trains);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }
  static async bookSeats(req: Request, res: Response) {
    try {
      const requestedSeats: number | undefined = req.body.seats;
      const trainId: number | undefined = req.body.trainId;
      if (!requestedSeats || requestedSeats > 7) {
        return errorResponse(res, "Select seats between 1 to 7!!");
      }
      if (!trainId) {
        return errorResponse(res, "Internal Server Error!!", 500);
      }
      const bookedSeats = await TrainService.bookSeats(requestedSeats, trainId);
      return successResponse(res, bookedSeats);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  static async resetSeats(req: Request, res: Response) {
    try {
      const seatRepo = appDataSource.getRepository(SeatsEntity);
      const trainRepo = appDataSource.getRepository(TrainEntity);
      await seatRepo.update(
        {},
        {
          isAvailable: true,
          isBooked: false,
        }
      );
      await trainRepo.update(
        {},
        {
          seatsAvailableCount: 80,
        }
      );
      return successResponse(res, "Seats reset successfully");
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }
}
