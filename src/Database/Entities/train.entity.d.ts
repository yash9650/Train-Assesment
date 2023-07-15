import { SeatsEntity } from "./seats.entity";
export declare class TrainEntity {
    id: number;
    trainName: string;
    seatsAvailableCount: number;
    seatsBookedCount: number;
    waitingCount: number;
    fromStation: string;
    toStation: string;
    departureTime: Date;
    arrivalTime: Date;
    seats: SeatsEntity[];
}
