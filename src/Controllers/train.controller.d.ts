import { Request, Response } from "express";
export declare class TrainController {
    static getTrains(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static bookSeats(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getSeats(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
