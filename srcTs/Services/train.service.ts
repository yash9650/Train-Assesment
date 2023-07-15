import { In, Repository } from "typeorm";
import appDataSource from "../Database/DataSource";
import { SeatsEntity } from "../Database/Entities/seats.entity";
import { TrainEntity } from "../Database/Entities/train.entity";

interface IAvailableSeatCountRowWise {
  rowNumber: number;
  availableSeats: number;
}

export class TrainService {
  static async getTrains() {
    const trainRepo = appDataSource.getRepository(TrainEntity);
    const trains = await trainRepo.find();
    return trains;
  }

  /**
   * @param seats Sorted available seats in ascending order of seat number
   * @returns IAvaialbleSeatCountRowWiSe[] - available seats count row wise
   */
  private static _getAvailableSeatCountRowWise(seats: SeatsEntity[]): {
    availableSeatsCountRowWise: IAvailableSeatCountRowWise[];
    totalAvailableSeats: number;
  } {
    let availableSeatsCountRowWise: IAvailableSeatCountRowWise[] = [];
    let totalAvailableSeats = 0;

    availableSeatsCountRowWise = seats.reduce(
      (acc: IAvailableSeatCountRowWise[], seat) => {
        /**
         * If row is already present in accumulator then increment the available seats count
         * else add a new row to accumulator
         *
         * note row is a reference so incrementing the available seats count will update the value in accumulator too
         */
        const row = acc.find((row) => row.rowNumber === seat.rowNumber);
        if (row) {
          row.availableSeats += 1;
        } else {
          acc.push({
            rowNumber: seat.rowNumber,
            availableSeats: 1,
          });
        }
        return acc;
      },
      []
    );

    totalAvailableSeats = availableSeatsCountRowWise.reduce(
      (acc, row) => acc + row.availableSeats,
      0
    );

    return { availableSeatsCountRowWise, totalAvailableSeats };
  }

  /**
   * In this function we will try to find the best fit row for requested seats
   * if we find a row with available seats equal to requested seats then we will book those seats
   * else we will find the first fit row with available seats greater than requested seats
   * else we will find the row with max available seats and book those seats
   * and then call the function recursively with remaining seats
   * @param availableSeatsCountRowWise available seats count row wise
   * @param requestedSeats requested seats
   * @param totalAvailableSeats total available seats
   * @returns Array of rows to be booked or null if requested seats or total available seats is 0
   */
  private static _selectRowsTobeBooked(
    availableSeatsCountRowWise: IAvailableSeatCountRowWise[],
    requestedSeats: number,
    totalAvailableSeats: number
  ) {
    const rowsTobeBooked: IAvailableSeatCountRowWise[] = [];
    if (!requestedSeats || !totalAvailableSeats) {
      return null;
    }

    const bestFitRow = availableSeatsCountRowWise.find(
      (row) => row.availableSeats === requestedSeats
    );
    if (bestFitRow) {
      rowsTobeBooked.push(bestFitRow);
      return rowsTobeBooked;
    }

    const firstFitRow = availableSeatsCountRowWise.find(
      (row) => row.availableSeats > requestedSeats
    );
    if (firstFitRow) {
      rowsTobeBooked.push(firstFitRow);
      return rowsTobeBooked;
    }
    /**
     * if code execution reaches here, it means that there is no row with available seats
     * greater than or equal to requested seats
     *
     * so we need to find the row with max available seats and book those seats
     * and then call the function recursively with remaining seats
     */
    const maxAvailableSeatsWithRoomNumber = availableSeatsCountRowWise.reduce(
      (prev, current) => {
        return prev.availableSeats > current.availableSeats ? prev : current;
      }
    );

    rowsTobeBooked.push(maxAvailableSeatsWithRoomNumber);

    requestedSeats -= maxAvailableSeatsWithRoomNumber.availableSeats;
    totalAvailableSeats -= maxAvailableSeatsWithRoomNumber.availableSeats;

    const newAvailableSeatsCountRowWise = availableSeatsCountRowWise.map(
      (row) => {
        if (row.rowNumber === maxAvailableSeatsWithRoomNumber.rowNumber) {
          return {
            ...row,
            availableSeats: 0,
          };
        }
        return { ...row };
      }
    );

    const newRowsTobeBooked = this._selectRowsTobeBooked(
      newAvailableSeatsCountRowWise,
      requestedSeats,
      totalAvailableSeats
    );

    if (newRowsTobeBooked) {
      rowsTobeBooked.push(...newRowsTobeBooked);
    }

    return rowsTobeBooked;
  }

  /**
   * @param seatsRepo seats repository
   * @param rowNumber row number
   * @param limit Limit of seats to be fetched it will be equal to requested seats
   * @returns this fuction returns the seats that are available in a row and will be booked
   */
  private static async _getAvailableSeatsInRow(
    seatsRepo: Repository<SeatsEntity>,
    rowNumber: number,
    limit: number
  ) {
    /**
     * we will fetch the seats in ascending order of seat number
     * so that we can book the seats in ascending order of seat number
     * and we will limit the seats to be fetched to requested seats
     * limit can be greater than the available seats in a row but it will not be greater than requested seats
     */
    const seats = await seatsRepo.find({
      where: {
        rowNumber,
        isAvailable: true,
      },
      order: {
        seatNumber: "ASC",
      },
      take: limit,
    });
    return seats;
  }

  static async bookSeats(requestedSeats: number, trainId: number) {
    const bookedSeats = await appDataSource.transaction(async (manager) => {
      const seatsRepo = manager.getRepository(SeatsEntity);

      let availableSeats = await seatsRepo.count({
        where: {
          trainId,
          isAvailable: true,
        },
      });

      let seats = await seatsRepo.find({
        where: {
          trainId,
          isAvailable: true,
        },
        order: {
          seatNumber: "ASC",
        },
      });

      if (availableSeats < requestedSeats) {
        throw new Error("Requested seats are not available!!");
      }

      const availableSeatsCountRowWise =
        this._getAvailableSeatCountRowWise(seats);

      const rowsTobeBooked = this._selectRowsTobeBooked(
        availableSeatsCountRowWise.availableSeatsCountRowWise,
        requestedSeats,
        availableSeatsCountRowWise.totalAvailableSeats
      );

      if (!rowsTobeBooked) {
        throw new Error("Requested seats are not available!!");
      }

      let bookedSeatsNumbers: number[] = [];
      // Gettting the seats to be booked in each row
      for (let index = 0; index < rowsTobeBooked.length; index++) {
        const row = rowsTobeBooked[index];
        const seatsInRow = await this._getAvailableSeatsInRow(
          seatsRepo,
          row.rowNumber,
          requestedSeats
        );
        /**
         * if rowsTobeBooked.length === 1 means we have found the best fit row or first fit row
         * else we have to book the seats in multiple rows
         */
        if (rowsTobeBooked.length === 1) {
          bookedSeatsNumbers = seatsInRow.map((seat) => seat.seatNumber);
        } else {
          let seatNumbers = seatsInRow.map((seat) => seat.seatNumber);
          bookedSeatsNumbers.push(...seatNumbers);
        }
      }

      /**
       * Updating the seats availability and booked status
       */
      await seatsRepo.update(
        {
          seatNumber: In(bookedSeatsNumbers),
        },
        {
          isBooked: true,
          isAvailable: false,
        }
      );

      await manager.getRepository(TrainEntity).update(
        {
          id: trainId,
        },
        {
          seatsAvailableCount: availableSeats - requestedSeats,
        }
      );

      return bookedSeatsNumbers;
    });

    return bookedSeats;
  }
}
