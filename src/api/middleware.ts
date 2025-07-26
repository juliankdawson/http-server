import type { NextFunction, Request, Response } from "express";
import { config } from "../config.js";
import { respondWithError } from "./json.js";
import {BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from "./errors.js";
import { stat } from "fs";

export function middlewareLogResponse(req: Request, res: Response, next: NextFunction): void {
    res.on("finish", () => {
        const statusCode = res.statusCode;

        if (statusCode >= 300) {
            console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${statusCode}`);
        }
    });

    next();
}

export function middlewareMetricsInc(req: Request, res: Response, next: NextFunction) {
    config.fileServerHits++;
    next();
}

export function errorMiddleWare(err: Error, req: Request, res: Response, next: NextFunction) {
    let statusCode = 500;

    if (err instanceof BadRequestError) {
        statusCode = 400;
    } else if ( err instanceof UnauthorizedError) {
        statusCode = 401;
    } else if (err instanceof ForbiddenError) {
        statusCode = 403;
    } else if (err instanceof NotFoundError) {
        statusCode = 404;
    }

    let message = statusCode !== 500 ? err.message : "Internal Server Errors";

    respondWithError(res, statusCode, message);
}
