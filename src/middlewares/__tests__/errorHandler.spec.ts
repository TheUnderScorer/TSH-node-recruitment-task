import errorHandler from '../errorHandler';
import RequestException from '../../exceptions/RequestException';
import { ErrorCodes } from '../../types/error/ErrorCodes';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status';

let req: any;
let res: any;
const next = jest.fn();

describe( 'errorHandler', () =>
{
    beforeEach( () =>
    {
        req = {
            params: {},
            body:   {}
        };

        res = {
            data: null,
            code: null,
            status( status: number )
            {
                this.status = status;

                return this;
            },
            json( data: any )
            {
                this.data = data;

                return this;
            }
        }
    } );

    it( 'Should handle RequestException', () =>
    {
        errorHandler(
            new RequestException(
                'Invalid request!',
                ErrorCodes.InvalidRequestFields,
                BAD_REQUEST
            ),
            req,
            res,
            next
        );

        expect( res.status ).toEqual( BAD_REQUEST );
        expect( res.data ).toEqual( {
            error: {
                message: 'Invalid request!',
                code:    ErrorCodes.InvalidRequestFields
            }
        } )
    } );

    it( 'Should handle errors', () =>
    {
        errorHandler(
            new Error( 'Error!' ),
            req,
            res,
            next
        );

        expect( res.status ).toEqual( INTERNAL_SERVER_ERROR );
        expect( res.data ).toEqual( {
            error: {
                message: 'Error!',
                code:    'Error'
            }
        } )
    } );
} );
