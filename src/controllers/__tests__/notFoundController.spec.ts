import { bootstrap } from '../../app';
import { NOT_FOUND } from 'http-status';
import { ErrorCodes } from '../../types/error/ErrorCodes';
import { Server } from 'http';
import { Application } from 'express';

let app: Application;
const request = require( 'supertest' );

describe( 'notFoundController', () =>
{
    beforeAll( async () =>
    {
        app = await bootstrap();
    } );

    afterAll( ( done ) =>
    {
        const server = app.get( 'server' ) as Server;
        server.close( done );
    } );

    it( 'Should return error', () =>
    {
        return request( app )
            .get( '/invalidRoute' )
            .expect( NOT_FOUND )
            .then( response =>
            {
                expect( response.body.error ).toEqual( {
                    message: 'Provided route does not exist.',
                    code:    ErrorCodes.RouteNotFound
                } )
            } )
    } );
} );
