import { Response } from "express";
export declare const successResponse: <T>(res: Response, data: T, code?: number) => Response<any, Record<string, any>>;
export declare const errorResponse: (res: Response, errorMessage: string, code?: number) => Response<any, Record<string, any>>;
