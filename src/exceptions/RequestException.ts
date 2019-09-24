import Exception from './Exception';
import { INTERNAL_SERVER_ERROR } from 'http-status';

export default class RequestException extends Exception
{
    public readonly statusCode: number;

    public constructor(
        message: string,
        name: string       = 'Error',
        statusCode: number = INTERNAL_SERVER_ERROR )
    {
        super( message, name );

        this.statusCode = statusCode;
    }

}
