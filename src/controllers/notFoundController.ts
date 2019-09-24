import { NextFunction, Request, Response } from 'express';
import RequestException from '../exceptions/RequestException';
import { ErrorCodes } from '../types/error/ErrorCodes';
import { NOT_FOUND } from 'http-status';

export default ( req: Request, res: Response, next: NextFunction ) =>
{
    return next(
        new RequestException(
            'Provided route does not exist.',
            ErrorCodes.RouteNotFound,
            NOT_FOUND
        )
    );
}
