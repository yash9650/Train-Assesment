import { Request, Response } from "express";
import { errorResponse, successResponse } from "../Utils/request.utils";
import { TrainService } from "../Services/train.service";
import { SeatsEntity } from "../Database/Entities/seats.entity";
import appDataSource from "../Database/DataSource";

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

  static async getSeats(req: Request, res: Response) {
    try {
      const seatRepo = appDataSource.getRepository(SeatsEntity);
      //   const seats = await seatRepo.update(
      //     {
      //       isBooked: true,
      //     },
      //     {
      //       isAvailable: true,
      //       isBooked: false,
      //     }
      //   );

      const seats = await seatRepo.count({
        where: {
          isAvailable: true,
          isBooked: false,
        },
      });
      return successResponse(res, seats);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }
}
