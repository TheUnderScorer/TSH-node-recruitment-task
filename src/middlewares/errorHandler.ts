import { NextFunction, Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status';
import RequestException from '../exceptions/RequestException';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default ( err: Error, req: Request, res: Response, next: NextFunction ) =>
{
    let status: number = INTERNAL_SERVER_ERROR;

    if ( err instanceof RequestException ) {
        status = err.statusCode;
    }

    return res.status( status ).json( {
        error: {
            message: err.message,
            code:    err.name
        }
    } );
}
