import { TrainEntity } from "./train.entity";
export declare class SeatsEntity {
    id: number;
    seatNumber: number;
    rowNumber: number;
    trainId: number;
    trainName: string;
    isAvailable: boolean;
    isBooked: boolean;
    train: TrainEntity;
}
