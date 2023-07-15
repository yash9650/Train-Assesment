import { TrainEntity } from "../Database/Entities/train.entity";
export declare class TrainService {
    static getTrains(): Promise<TrainEntity[]>;
    /**
     * @param seats Sorted available seats in ascending order of seat number
     * @returns IAvaialbleSeatCountRowWiSe[] - available seats count row wise
     */
    private static _getAvailableSeatCountRowWise;
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
    private static _selectRowsTobeBooked;
    /**
     * @param seatsRepo seats repository
     * @param rowNumber row number
     * @param limit Limit of seats to be fetched it will be equal to requested seats
     * @returns this fuction returns the seats that are available in a row and will be booked
     */
    private static _getAvailableSeatsInRow;
    static bookSeats(requestedSeats: number, trainId: number): Promise<number[]>;
}
